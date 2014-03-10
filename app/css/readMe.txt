//== Front End Strategy

    Customize the Four51 SPA    -       Do not edit CSS, work in the LESS framework
                                            http://lesscss.org/
    Theme the Four51 SPA        -       Do not edit the LESS, work in the custom.css file
                                            ~/less/custom.css



    Bootstrap 3.1.1             -       http://getbootstrap.com/

    Font                        -       Google web font ~ Driod Sans for body & Lato for headings
                                            Droid Sans was optimized for user interfaces and to be comfortable for reading on a mobile handset in menus, web browser and other screen text.
                                            https://developers.google.com/fonts/
                                            http://googlewebfonts.blogspot.com/
    Font Awesome Icons 4.0.3    -       http://fortawesome.github.io/Font-Awesome/
    Animate.css                 -       http://daneden.github.io/animate.css/
    Angular strap               -       Is running alongside bootstrap.js files for UI utilities
                                            http://mgcrea.github.io/angular-strap/
    Classes                     -       No Id's unless they are 451 specific / bug tracking

//== Templates

    Form icons                  -       Form input field icons use the font-awesome resource
                                        - Add the class "view-form-icon" to the parent lblock container
                                        - Add a <div> around the form field and label
                                        - Add the font-awesome <i> tag with your custom icon class anywhere in the form field block container
                                            <div class="view-form-icon">
                                                <div>
                                                    <label ng-show="address.Street1">Label</label>
                                                    <input class="form-control" type="text" ng-model="address.Street1" placeholder="Address Name" />
                                                    <i class="fa fa-map-marker"></i>
                                                </div>
                                            </div>
                                        - Remove browser HTML validation popovers with novalidate=""
                                        http://afarkas.github.io/webshim/demos/demos/webforms/1-webforms-lang-custom-bubble.html