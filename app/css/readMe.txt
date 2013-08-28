0.  App Front End Strategy
    Bootstrap                   -       Twitter Bootstrap
                                        http://getbootstrap.com/2.3.2/
    Font                        -       Google web font ~ Driod Sans
                                        Droid Sans was optimized for user interfaces and to be comfortable for reading on a mobile handset in menus, web browser and other screen text.
                                        http://www.google.com/fonts/specimen/Droid+Sans
                                        developer ~ https://developers.google.com/fonts/
                                        blog ~ http://googlewebfonts.blogspot.com/
    No static icons             -       Font icons
                                        http://fontawesome.io/icons/
    No pixels                   -       .em or % ~ base pixel size = 14px
    No hex colors               -       RGB/A values
    No tables                   -       Grids
                                        https://github.com/angular-ui/ng-grid
    Animations                  -       ng-animate and animate.css
                                        http://code.angularjs.org/1.1.4/docs/api/ng.directive:ngAnimate
                                        https://github.com/daneden/animate.css
    Scroll breakpoints          -       Directive
    Gestures                    -       ...in progress??
                                        https://github.com/wzr1337/angular-gestures
    Responsive breakpoints      -       app media queries that play nice with Twitter Bootstrap
                                        breakpoint.css

1.  Bootstrap CSS
    What's inside

    Reset via Normalize

    The reset block has been dropped in favor of Normalize.css, a project by Nicolas Gallagher and Jonathan Neal that also powers the HTML5 Boilerplate.
    While we use much of Normalize within our reset.less, we have removed some elements specifically for Bootstrap.reset.less

    scaffolding.less    Basic and global styles for generating a grid system, structural layout, and page templates
    type.less           Headings, body text, lists, code, and more for a versatile and durable typography system
    patterns.less       Repeatable interface elements like navigation, modals, popovers, and tooltips to take you beyond the default scaffolding styles
    forms.less          Durable styles for various input types, form layouts, and control states.
    tables.less         Styles for tabular data in a number of varied displays

    Bootstrap CSS
    http://twitter.github.io/bootstrap/

    Using CDN for Bootstrap.css, Bootstrap-responsive.css and font-awesome.css
    CDN: http://www.bootstrapcdn.com/index.html

    Bootstrap Font Icons CSS (Font Awesome)
    http://fontawesome.io/icons/

**  ?? mauyber pixel breakpoints in window size added as a body class for device widths for ie: https://github.com/snapjay/angularjs-breakpoint
    another example: https://github.com/xoxco/breakpoints

    Default Breakpoints:
    See breakpoint.css for responsive styles
        1024    Desktop
                Tablet      Landscape
        798     Tablet      Portrait
        518     Phone       Landscape
                            Portrait

2.  Priorities              -   top to bottom

    Navigation              -   gesture based is the primary goal
        AdminNav
        CategoryNav
        ProductNav

    Buttons

    Messaging

    Orders
        Search              - tied to expanding Product Search, need to ensure consistency

    Forms

    Spending Accounts

    Product View            - expand on user experience here also

    Product Search          - I really want to see this expanded upon with user experience





