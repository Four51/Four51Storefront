0.  App Front End Strategy

    Customizing the Four51 SPA  -       Do not modify the app.css file
                                        - no !important rules in the app.css file, everything should cascade according to specificity
                                        - apply custom styles in the custom.css file as a child theme IE:
                                            /*
                                            Theme name: My SPA Theme
                                            Version: 1.0
                                            Template: Welcome
                                            */
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
    Scroll breakpoints          -       Currently a directive to watch for scrolling and add a static/scroll class to body
                                        - scrollposition.js
    Swipe                       -       A swipe is currently working on category and product list views to show description
                                            ngTouch
    Responsive breakpoints      -       app media queries that work alongside Twitter Bootstrap to provide more bulletproof design styles
                                        - /breakpoint

1.  Responsive

1.0     Bootstrap
        Reset via Normalize

        The reset block has been dropped in favor of Normalize.css, a project by Nicolas Gallagher and Jonathan Neal that also powers the HTML5 Boilerplate.
        While we use much of Normalize within our reset.less, we have removed some elements specifically for Bootstrap.reset.less

        scaffolding.less    Basic and global styles for generating a grid system, structural layout, and page templates
        type.less           Headings, body text, lists, code, and more for a versatile and durable typography system
        patterns.less       Repeatable interface elements like navigation, modals, popovers, and tooltips to take you beyond the default scaffolding styles
        forms.less          Durable styles for various input types, form layouts, and control states.
        tables.less         Styles for tabular data in a number of varied displays

        Bootstrap CSS
        http://getbootstrap.com/

        *Local Bootstrap and font-awesome files

        When using CDN for Bootstrap.css, Bootstrap-responsive.css and font-awesome.css
        CDN: http://www.bootstrapcdn.com/

        Bootstrap Font Icons CSS (Font Awesome) 4.0.1
        http://fontawesome.io/icons/

        Default Breakpoints:
        See ~/breakpoint for responsive styles that work alongside Bootstrap responsive classes
            xs.css Extra small devices (phone, ~ 618px) x-xs
            sm.css Small devices (tablet portrait, ~ 768px) x-sm
            md.css Medium devices (desktops, tablet landscape ~ 1024px)  x-md
            lg.css Large devices (large desktops, 1200px ~) x-lg

        Toolips
            No tooltips on phone, tablet portrait

1.1     Content scales up IE:mobile first
            Admin navigation
                Fixed top
                Product icon + text is always visible and available
                    ~xs                limited icons
                    ~sm                icons
                    ~md                home | icons + text
                    ~lg                home | icons + text
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





