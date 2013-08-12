0.  Bootstrap Strategy
    No images - font icons
    No Pixels - .em or %        -       base pixel size = 14px
    No hex colors - RGBA values
    No tables - grids
    Animations
    Scroll position
    Gestures
    Responsive breakpoints

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

**  I want to see breakpoints in window size added as a body class for device widths for ie: https://github.com/snapjay/angularjs-breakpoint
    another example: https://github.com/xoxco/breakpoints

    Breakpoints will provide more bulletproof design for content alongside the Bootstrap-responive.css media queries
    Default Breakpoints: (can be modified to fit a clients needs for specific devices)
    See breakpoint.css for app responsive defaults via media queries for now
        1024    Desktop
                Tablet      Landscape
        798     Tablet      Portrait
        518     Phone       Landscape
                            Portrait

//TODO remove tables and add ng-grid https://github.com/angular-ui/ng-grid

2.  Animations
    https://github.com/daneden/animate.css

    Simply add the class".animated" and the class for the type of animation you would like to see.


3.  Priorities              -   top to bottom

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





