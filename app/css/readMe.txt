//== Front End Strategy

    There are 2 ways to design the app:
    ie: change a color
        1. Customization - when you make a change to a LESS variable to update the color
        2. Theme - when you make a change to the static css ID/Class

    Customize the Four51 SPA    -       Do not edit custom.css, work in the LESS framework
                                        Do not edit the core bootstrap-451.less/css file
                                        Do not edit the bootstrap or fourfiveone directories
                                        Do edit the customizations directory and files
                                            ~/less/customizations
                                            http://lesscss.org/

    Theme the Four51 SPA        -       Do not edit the LESS,
                                        Do edit the static custom.css file

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
    Pagination                  -       You have two options when including pagination for select checkboxes:
                                        1. Remove 'checkall' from selections
                                        2. Accommodate for it
                                        Include pagination in the panel-footer above buttons
                                        example:
                                            <div class="panel-footer">
                                                <pagination page="settings.currentPage" max-size="8" rotate="false" boundary-links="true" total-items="(messages|filter:searchTerm).length"
                                                            items-per-page="settings.pageSize" direction-links="false"></pagination>
                                                <button type="button" class="btn btn-danger" ng-click="deleteSelected($event)" ng-show="(messages | filter:searchTerm | filter:{Selected:true}).length > 0">
                                                    <span>{{'Delete' | r}} {{'Selected' | r}}</span>
                                                </button>
                                                <button class="btn btn-info pull-right" type="button" redirect="message/new">
                                                    <span>{{'Compose' | r}}</span>
                                                </button>
                                            </div>
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