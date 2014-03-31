four51.app.factory('Nav', function() {
    var _status = { "visible" : true};

    var _toggle = function() {
        _status.visible = !_status.visible;
    }

    return {
        status: _status,
        toggle: _toggle
    };
});