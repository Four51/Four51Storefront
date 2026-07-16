/*
 * SupportTicketCtrl — centralized ticketing bridge.
 *
 * The support-ticket form and logic now live in the shared "ticketing" iframe
 * served from the app server (https://apps.vividimpact.com/ticketing/). This
 * controller is only a thin bridge: it hands the signed-in Four51 user, the
 * storefront category tree, the environment, the brand color, and the existing
 * Vampire Ticketing client token to the iframe, then auto-sizes the frame.
 *
 * Brand color: defaults to the Vivid color below, but if this storefront defines
 * a --brand-color (or --brand-theme) CSS custom property on :root, that value is
 * used instead.
 */
four51.app.controller('SupportTicketCtrl', ['$scope', function ($scope) {
    var IFRAME_ORIGIN = 'https://apps.vividimpact.com';

    // Default brand color for the iframe (ticket banner + Create Ticket button).
    // Override per storefront by setting --brand-color on :root in its CSS.
    var VIVID_COLOR = '#1d4f91';

    // Existing Ticketing-application client token (applicationId 3, clientId 5)
    // this storefront already shipped in its previous supportTicketCtrl.js. The
    // iframe reuses it, so no new Vampire backend is required.
    var VAMPIRE_TOKEN = 'eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJhcHBsaWNhdGlvbklkIjozLCJjbGllbnRJZCI6NSwiYXV0aG9yaXplZCI6dHJ1ZX0.4w9s6Cf_OQYsk8SluOIR5WGpif28j4h_qDmYJrX0OC8';

    var env = (window.location.host === 'teststore.four51.com') ? 'test' : 'production';

    // Prefer a storefront-defined brand color CSS variable; else the Vivid default.
    function brandColor() {
        try {
            var root = getComputedStyle(document.documentElement);
            var v = (root.getPropertyValue('--brand-color') ||
                     root.getPropertyValue('--brand-theme') || '').trim();
            return v || VIVID_COLOR;
        } catch (e) {
            return VIVID_COLOR;
        }
    }

    function sendInit() {
        var frame = document.getElementById('ticketingFrame');
        if (!frame || !frame.contentWindow || !$scope.user) return;
        frame.contentWindow.postMessage({
            type: 'ticketing:init',
            payload: {
                env: env,
                storefront: window.location.host,
                vampireToken: VAMPIRE_TOKEN,
                color: brandColor(),
                user: {
                    id: $scope.user.ID,
                    firstName: $scope.user.FirstName,
                    lastName: $scope.user.LastName,
                    email: $scope.user.Email,
                    companyName: $scope.user.Company && $scope.user.Company.Name,
                    allowTicketing: $scope.user.AllowTicketing === true,
                    ticketingDashboard: $scope.user.TicketingDashboard === true
                },
                categoryTree: $scope.tree || []
            }
        }, IFRAME_ORIGIN);
    }

    // The iframe announces itself when ready; respond with the init payload.
    // Also auto-size the frame as its content grows or shrinks.
    window.addEventListener('message', function (evt) {
        if (evt.origin !== IFRAME_ORIGIN) return;
        var msg = evt.data || {};
        if (msg.type === 'ticketing:ready') {
            sendInit();
        } else if (msg.type === 'ticketing:resize' && msg.height) {
            var frame = document.getElementById('ticketingFrame');
            if (frame) frame.style.height = (msg.height + 24) + 'px';
        }
    });

    // In case the iframe loaded before this controller wired up.
    sendInit();
}]);
