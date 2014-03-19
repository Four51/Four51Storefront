//== Front End Strategy

    Customize the Four51 SPA    -       Do not edit custom.css, work in the LESS framework
                                            ~/less/customizations
                                            http://lesscss.org/

    Theme the Four51 SPA        -       Do not edit the LESS, work in the static custom.css file
                                            ~/less/customizations/custom.css

    Bootstrap 3.1.1             -       http://getbootstrap.com/

    UI-Bootstrap 0.10           -       http://angular-ui.github.io/bootstrap/
                                        ==  we are editing the src file with base changes; see Google shared google doc for UI-Bootstrap Review
                                            https://github.com/angular-ui/bootstrap/blob/gh-pages/ui-bootstrap-0.10.0.js


    Headroom 0.5.0              -       https://github.com/WickyNilliams/headroom.js/blob/master/dist/headroom.js

    Font                        -       Google web font ~ Driod Sans for body & Lato for headings
                                            Droid Sans was optimized for user interfaces and to be comfortable for reading on a mobile handset in menus, web browser and other screen text.
                                            https://developers.google.com/fonts/
                                            http://googlewebfonts.blogspot.com/

    Icons
    Font Awesome Icons 4.0.3    -       http://fortawesome.github.io/Font-Awesome/

    Animations                  -       http://daneden.github.io/animate.css/

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