

0.  App Front End Strategy
    * If ng-cloak is not working as intended on a static file, instead of calling the partial in a directive - try including the partial as an ng-include.

    Customizing the Four51 SPA  -       Do not modify the app.css files
                                        - no !important rules in the app.css file, everything should cascade according to specificity
                                        - apply custom app styles in the ~/css custom.css file. IE:
                                            /*
                                            Theme name: My SPA Theme
                                            Version: 1.0
                                            Template: Welcome
                                            */
                                        - apply custom breakpoint styles in ~/breakpoint custom css files.
    Bootstrap                   -       Twitter Bootstrap 3
                                            http://getbootstrap.com/
    Themes                      -       Bootstrap driven color themes via colourlovers API and paintstrap
                                        - bootstrap-451.css
                                        - bootstrap-black-white.css
                                        - bootstrap-blue.css
                                        - bootstrap-green.css
                                        - bootstrap-red.css
                                            http://paintstrap.com/
                                            http://www.colourlovers.com/
    Font                        -       Google web font ~ Driod Sans
                                            Droid Sans was optimized for user interfaces and to be comfortable for reading on a mobile handset in menus, web browser and other screen text.
                                            http://www.google.com/fonts/specimen/Droid+Sans
                                            https://developers.google.com/fonts/
                                            http://googlewebfonts.blogspot.com/
    Font Combiner               -       This looks interesting
                                            http://fontcombiner.com/
    No static icons             -       Font icons 4.0.1
                                            http://fontawesome.io/icons/
    No pixels                   -       .em or % ~ base pixel size = 14px
    No hex colors               -       RGB/A values
    Limited tables              -       Bootstrap wells and panels
    Animations                  -       ng-animate and animate.css
                                            http://code.angularjs.org/1.1.4/docs/api/ng.directive:ngAnimate
                                        Animate CSS for a library of pre-made animations is included
                                            https://github.com/daneden/animate.css
    Swipe                       -       A swipe is currently working on category and product list views to show description
                                            ngTouch
    Responsive breakpoints      -       app media queries that work alongside Twitter Bootstrap to provide more bulletproof design styles
                                        - /breakpoint
    Form icons                  -       Form input field icons use the font-awesome resource
                                        use class="required" for required fields
                                        use ng-show="model.name" for styling
                                        use ng-class="{required: isModelRequired}" for variable required fields
                                        - Add the class "view-form-icon" to the parent block container
                                        - Add a block container around the form field and label
                                        - Add the font-awesome <i> tag with your custom icon class anywhere in the form field block container
                                            <div class="view-form-icon">
                                                <div>
                                                    <label ng-show="address.Street1">Label</label>
                                                    <input class="form-control" type="text" ng-model="address.Street1" placeholder="Address Name" />
                                                    <i class="fa fa-map-marker"></i>
                                                </div>
                                            </div>
                                        - remove HTML validation popovers
                                        use novalidate=""
                                        http://afarkas.github.io/webshim/demos/demos/webforms/1-webforms-lang-custom-bubble.html
    Classes                     -       No Id's unless they are 451 specific and primarily for bug tracking
                                -       Classes are view specific starting with the partial view name ie: class="cart-view-[custom]"
                                -       App wide classes will always start with the word "view" ie: class="view-[custom]"
1.  Responsive

1.0     Bootstrap 3
        http://getbootstrap.com/

        *Local Bootstrap and font-awesome files, no external URL

        When using CDN for Bootstrap.css, Bootstrap-responsive.css and font-awesome.css
        CDN: http://www.bootstrapcdn.com/

        Bootstrap Font Icons CSS (Font Awesome) 4.0.1
        http://fontawesome.io/icons/

        App Responsive Styles:
        Do not modify the app.css files
        - apply custom app styles in the ~/css custom.css file. IE:
            custom-extra-small.css  - Extra small devices (phone, ~ 618px) x-xs
            custom-small.css        - Small devices (tablet portrait, ~ 768px) x-sm
            custom-medium.css       - Medium devices (desktops, tablet landscape ~ 1024px)  x-md
            custom-large.css        - Large devices (large desktops, 1200px ~) x-lg

        Toolips
            No tooltips on phone, tablet portrait
        Dropdowns
            No dropdowns on phone, tablet portrait

1.1     Content scales up IE:mobile first
            Admin navigation
                Fixed top
                Branding        uses Bootstrap .jumbotron and default is set to appear if a buyer logo is available
                Product icon + text is always visible and available
                    ~xs         limited icons
                    ~sm         icons
                    ~md         home | icons + text
                    ~lg         home | icons + text
            Content
                Category and Products
                    ~xs                1 category or product in a view
                    ~sm                2 categories or products in a view
                    ~md                3 categories or products in a view
                    ~lg                4 categories or products in a view

2.      Animations
        http://www.yearofmoo.com/2013/08/remastered-animation-in-angularjs-1-2.html
        More specifically:
            Event 	CSS Class 	Ending CSS class 	Directives that fire it
            enter 	.ng-enter 	.ng-enter-active 	ngRepeat, ngInclude, ngIf, ngView
            leave 	.ng-leave 	.ng-leave-active 	ngRepeat, ngInclude, ngIf, ngView
            move 	.ng-move 	.ng-move-active 	ngRepeat

            Action 	                            CSS Class 	        Ending CSS class 	    Directives that fire it
            hide an element 	                .ng-hide-add 	    .ng-hide-add-active 	ngShow, ngHide
            show an element 	                .ng-hide-remove 	.ng-hide-remove-active 	ngShow, ngHide
            adding a class to an element 	    .CLASS-add 	        .CLASS-add-active 	    ngClass and class=""
            removing a class from an element 	.CLASS-remove 	    .CLASS-remove-active 	ngClass and class=""

        noted issues:
        https://github.com/angular-ui/ui-router/issues/458

        -webkit-...  // For Webkit browser(Chrome, Safari...)
        -moz-...     // For Mozilla browser
        -o-...       // For Opera browser
        -ms-...      // For Microsoft browser
        none...      // For all browser(Newest version)





