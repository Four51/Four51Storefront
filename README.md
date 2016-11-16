![](https://github.com/Four51/Four51StorefrontWiki/blob/master/Four51_Storefront.png?raw=true)
# Four51Storefront (formerly AngularJSOrder)
> This repository provides the app code needed for the Four51 Storefront Application

There are three primary goals to making this repository open source.

 1. Gives Four51 customers and dev partners the ability to [Fork](https://guides.github.com/activities/forking/) this repository to make their own custom apps
 2. Gives Four51 customers and dev partners the power to use Pull Requests to contribute new features to the code
 3. Gives Four51 customers and dev partners the power to use [Issues](https://guides.github.com/features/issues/) to have control over the development road map to the application

![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/header.png?raw=true)

## Important Resources
[Four51 Storefront API Documentation](http://four51.github.io/#/api/) (The API documentation)<br />
[AngularJS](https://docs.angularjs.org/api/) (The JavaScript framework)<br />
[Bootstrap CSS](http://getbootstrap.com/css/) (The css guide for the responsive design)<br />
[UI Bootstrap](http://angular-ui.github.io/bootstrap/#/top) (Tools used throughout the application) 
[Four51 Storefront Wiki](http://wiki.four51.com) (Description of Four51 resources)<br />

## Installation

This code base does require the existence of a Four51 Storefront app to run.

 1. Create a new [Fork](https://guides.github.com/activities/forking/) of this repository
 2. Log on to: [http://www.four51.com/ui/logon.aspx](http://www.four51.com/ui/logon.aspx)
 3. Navigate to the Admin tab
 4. Click Get File Deployment<br />![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/deployment.PNG?raw=true)<br />(*please submit a case with four51 if this is not available*)
 5. Click New Git Repository...
   * Enter the Repository URL (*eg. https://github.com/yourusername/AngularJS.git*)
   * Name the App Code Folder (*this is what will appear in the application drop-down list*)
   * Set "app" as the Deployment Sub Folder in Repository<br />![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/deployemnt_settings.PNG?raw=true)<br />
 6. Click the "Save" button
 7. Click the newly added App Code Folder<br />![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/newly_created.PNG?raw=true)<br />
 8. Click the "Pull Repository" button
 9. Click the "Deploy Commit" on the top most commit in the list<br />![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/deploy.PNG?raw=true)<br />
 10. Assign the newly added app to your 2.0 application<br />![](https://github.com/Four51/Four51StorefrontWiki/blob/master/img/assign.PNG?raw=true)

## Tips
 * Four51 developers recommend [WebStorm](https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html?&gclid=CPOpi-GE2M4CFYQAaQodLgsDXg&gclsrc=aw.ds.ds&dclid=CPjjleGE2M4CFVNsAQodrnMEMQ) for developing within a repository
 * Four51 developers recommend [SourceTree](https://www.sourcetreeapp.com/) for managing commits
 * The js/routing.js file contains the basic road map to the app
 * The js/directives/product.js contains a listing of directives used on the product list and product detail pages
 * In general do not manipulate the js/services.  Instead update the js/controllers for custom business logic
 * All Custom Solution modules should be placed in the lib/oc directory

## Basic Contribution Steps

Four51 has made this repository open to the public which allows Four51 customers and dev partners to have the ability to effect the roadmap of the project by submitting code via GitHub's Pull Request functionality.  If you are interested in contributing code, please see the list of open Issues, or submit your Pull Request with your new functionality.  Below are some basic steps to follow if you wish to have your code reviewed by Four51.

 1. Create a new [Fork](https://guides.github.com/activities/forking/) of this repository
 2. Clone the new Fork locally
 3. Make updates and test your code
 4. Pull Request from your Branch to the Master
 5. Four51 will review the Pull Request and collaborate
 6. After new code is Merged Four51 will deploy the new code when appropriate
