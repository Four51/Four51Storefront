'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//Product list and view test Scenarios

//handy stuff:
//console.dir(scope('.nav-header', 'tree'));
//console.dir(scope('.nav-header', 'category'));
//console.dir(scope('.nav-header', 'category.Name'));
//console.dir(scope('.nav-header', 'category.InteropID'));
//console.dir(binding('currentCategory.Name'));

//console.dir(repeater('#451_lst_prod').row(0));
//console.dir(repeater('#451_lst_prod').column('p.Variants.length'));
//console.dir(scope('#451_lst_prod', 'p.StandardPriceSchedule.Name'));
//console.dir(scope('#451_lst_prod', 'p'));

/*
 element('.nav-header li a:first').click(); //clicks first category's subcategory nav link
 element('.nav-header:nth-child(2) a:first').click(); //clicks second category nav link
 element('.nav-header:nth-child(3) a:first').click(); //clicks third category nav link
 */

var C_debug = true;

////////////////////////////////////////////////////
//TODO - add a e2eLoginProduct function that logs in to a specific product automatically, for product scenarios

describe('Product login', function() {
    it("should allow a user to login", function() {
        browser().navigateTo('../../app/index.html');
    });

    e2eLogin("coreproduser","fails345", C_debug);

});

describe('ProductList: ', function() {

    it('should display some products after a top level category has been clicked', function() {

        browser().navigateTo('#/catalog');
        //check existence of categories, datawise
        expect(repeater('.nav-header').count()).toBeGreaterThan(0);

        if(C_debug){pause();}

        e2eClickSideNavCategory(0);

        //now check that the displayed category matches the nav item we clicked
        expect(binding('currentCategory.Name')).toEqualFuture(scope('.nav-header', 'category.Name'));

        if(C_debug){pause();}

        expect(repeater('#451_lst_prod').count()).toBeGreaterThan(0); //there should be at least one product

    });

    it('should let us click a product from a top level category and display it', function() {

        expect(repeater('#451_lst_prod').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lst_prod li:nth-child(1) a').text(); //get the product name for comparison later
        e2eClickProductFromList(1);

        var strShowedProductName = binding('product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}
    });

    it('should let us click a product from a sub category and display it', function() {

        e2eClickSideNavCategory(1); //click first subcat
        expect(repeater('#451_lst_prod').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lst_prod li:nth-child(1) a').text(); //get the product name for comparison later
        e2eClickProductFromList(1);

        var strShowedProductName = binding('product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}

    });

    //TODO- add some expectations around line-item type productlist display

});

describe('Product View - Static No Variants', function() {
    it('should display a product', function(){
        browser().navigateTo('#/catalog'); //start fresh on the catalog view
        e2eClickSideNavCategory(0);
        if(C_debug){pause();}
        e2eClickProductFromList(1); //here's a nice product to work with for now
    });
    it('should have an image', function(){
        expect(element('#451_img_prod_lg').count()).toBe(1);
    });
    it('should have a description', function(){
        expect(element('#451_area_prod_desc').count()).toBe(1);
        //verify the product name and description?


    });
    it('should have variants', function(){
        console.dir(repeater('#451_list_vars').row(0));
        expect(repeater('#451_list_vars').count()).toBeGreaterThan(0); //there should be at least one variant
    });
    it('should have spec groups', function(){
        console.dir(repeater('#451_list_specgroup').row(0));
        expect(repeater('#451_list_specgroup').count()).toBeGreaterThan(0); //there should be at least one variant
    });
});


describe('Product View - Static With Variants', function() {
    e2eLogout(false)
    e2eLoginProduct("coreproduser","fails345",false,"BC-ImageUpload");

    it('should have an image', function(){
        if(C_debug){pause();}
        expect(element('#451_img_prod_lg').count()).toBe(1);
    });
    it('should have a description', function(){
        expect(element('#451_area_prod_desc').count()).toBe(1);
        //verify the product name and description?

    });
    it('should have variants', function(){
        console.dir(repeater('#451_list_vars').row(0));
        expect(repeater('#451_list_vars').count()).toBeGreaterThan(0); //there should be at least one variant
    });
    it('should have spec groups', function(){
        console.dir(repeater('#451_list_specgroup').row(0));
        expect(repeater('#451_list_specgroup').count()).toBeGreaterThan(0); //there should be at least one variant
    });
    it('should allow us to click on a variant and display it', function(){
        expect(repeater('#451_list_vars').count()).toBeGreaterThan(0); //there should be at least one variant
        element('#451_list_vars ul li a').click(); //click the first variant
        if(C_debug){pause();}
    });
});

//TODO:  add a ton of product scenarios once the product list view and product view are fleshed out.

describe('testing e2eLoginProduct nav functions', function(){

    e2eLoginProduct("coreproduser","fails345",false,"Static%20Prod")


});
describe('logout/cleanup', function(){
    e2eLogout(C_debug);
});



