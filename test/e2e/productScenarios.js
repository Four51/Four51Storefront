'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//Product list and view test Scenarios

//handy stuff:
//console.dir(scope('.nav-header', 'tree'));
//console.dir(scope('.nav-header', 'category'));
//console.dir(scope('.nav-header', 'category.Name'));
//console.dir(scope('.nav-header', 'category.InteropID'));
//console.dir(binding('currentCategory.Name'));

var C_debug = false;

////////////////////////////////////////////////////

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

        var strClickedProductName = element('#451_lst_prod span:nth-child(1) shortproductview a').text(); //get the product name for comparison later
        e2eClickProductFromList(1);

        var strShowedProductName = binding('LineItem.Product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}
    });

    it('should let us click a product from a sub category and display it', function() {

        e2eClickSideNavCategory(1); //click first subcat
        expect(repeater('#451_lst_prod').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lst_prod span:nth-child(1) shortproductview a').text(); //get the product name for comparison later
        e2eClickProductFromList(1);

        var strShowedProductName = binding('LineItem.Product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}

    });

    //TODO- add some expectations around line-item type productlist display

});

describe('Product View - Static No Variants "Static%20Prod"', function() {
    it('should display a product', function(){
        browser().navigateTo('#/catalog'); //start fresh on the catalog view
        e2eClickSideNavCategory(0);
        if(C_debug){pause();}
        e2eClickProductFromList(1); //here's a nice product to work with for now "Static%20Prod"
    });
    it('should have an image', function(){
        expect(element('#451_img_prod_lg').count()).toBe(1);
    });
    it('should have a description', function(){
        expect(element('#451_area_prod_desc').count()).toBe(1);
        //verify the product name and description?


    });
});

describe('Product View - Static With Variants "StaticProdWithVar"', function() {
    e2eLogout(false)
    e2eLoginProduct("coreproduser","fails345",false,"StaticProdWithVar");

    it('should have an image', function(){
        if(C_debug){pause();}
        expect(element('#451_img_prod_lg').count()).toBe(1);
    });
    it('should have a description', function(){
        expect(element('#451_area_prod_desc').count()).toBe(1);
        //verify the product name and description?

    });
    it('should have variants', function(){
        expect(repeater('#451_list_vars').count()).toBeGreaterThan(0); //there should be at least one variant
    });
    it('should have spec groups', function(){
        expect(repeater('#451_list_specgroup').count()).toBeGreaterThan(0); //there should be at least one spec group?
    });
    it('should allow us to click on a variant and display it', function(){
        expect(repeater('#451_list_vars table tr').count()).toBeGreaterThan(1); //there should be at least one variant
        element('#451_list_vars table tr:nth-child(2) td a').click(); //click the first variant
        if(C_debug){pause();}
    });
});

//TODO:  add a ton of product scenarios once the product list view and product view are fleshed out.
describe('Product View - quantity field tests "pstest1"', function(){
    it('should display product containing price 5 price breaks',function(){
        e2eViewProductFromInteropID("pstest1") //this test is setup to have 5 price breaks and set to a specific price schedule (associated with this user)
        if(C_debug){pause();}
    });
    it('should have 5 price breaks', function(){
        expect(repeater('#451_list_pric_schd').count()).toBe(5); //there should be 5 price breaks
        //1-4 $3, 5-14 $2.50, 15-34 $2.25, 35-74 $2.00, 75+ $1.50
        if(C_debug){pause();}
        e2eChangeProdQty(false,1);
        expect(binding("LineItem.LineTotal")).toEqual(C_currSymbol + "3.00");
        if(C_debug){pause();}
        e2eChangeProdQty(false,5);
        expect(binding("LineItem.LineTotal")).toEqual(C_currSymbol + "12.50");
        if(C_debug){pause();}
        e2eChangeProdQty(false,14);
        expect(binding("LineItem.LineTotal")).toEqual(C_currSymbol + "35.00");
        if(C_debug){pause();}
     });

});

describe('Product View - Price Schedules 1 "pstest1"', function(){
    it('should display product containing price schedules',function(){
        e2eViewProductFromInteropID("pstest1") //this test is setup to have 5 price breaks and set to a specific price schedule (associated with this user)
        if(C_debug){pause();}
    });
    it('should have 5 price breaks', function(){
        console.dir(repeater('#451_list_pric_schd').row(0));
        expect(repeater('#451_list_pric_schd').count()).toBe(5); //there should be 5 price breaks
        //1-4 $3, 5-14 $2.50, 15-34 $2.25, 35-74 $2.00, 75+ $1.50
        if(C_debug){pause();}
        e2eChangeProdQty(false,1);
        expect(binding("LineItem.LineTotal")).toEqual((3).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,5);
        expect(binding("LineItem.LineTotal")).toEqual((12.50).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,14);
        expect(binding("LineItem.LineTotal")).toEqual((35).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,15);
        expect(binding("LineItem.LineTotal")).toEqual((33.75).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,35);
        expect(binding("LineItem.LineTotal")).toEqual((70).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,75);
        expect(binding("LineItem.LineTotal")).toEqual((112.50).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,74);
        expect(binding("LineItem.LineTotal")).toEqual((148).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(false,112);
        expect(binding("LineItem.LineTotal")).toEqual((168).formatMoney(2));
        if(C_debug){pause();}
    });

});
describe('Product View - Price Schedules 2 "pstest2", restricted quantity', function(){
    it('should display product containing 10 price breaks',function(){
        e2eViewProductFromInteropID("pstest2"); //this test is setup to have 10 price breaks and set to a specific price schedule (associated with this user)
        if(C_debug){pause();}
    });
    it('should have 10 price breaks', function(){
        console.dir(repeater('#451_list_pric_schd').row(0));
        expect(repeater('#451_list_pric_schd').count()).toBe(10); //there should be 10 price breaks. restricted to multiples of 250
        //1 250, 2 480, 3 675, 4 800, 5 950, 6 1050, 7 1050, 8 1000, 9 900, 10 750
        if(C_debug){pause();}
        e2eChangeProdQty(true,0); //The select box is 0 based instead of 1 based
        expect(binding("LineItem.LineTotal")).toEqual((250).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,1);
        expect(binding("LineItem.LineTotal")).toEqual((480).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,2);
        expect(binding("LineItem.LineTotal")).toEqual((675).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,3);
        expect(binding("LineItem.LineTotal")).toEqual((800).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,4);
        expect(binding("LineItem.LineTotal")).toEqual((950).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,5);
        expect(binding("LineItem.LineTotal")).toEqual((1050).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,6);
        expect(binding("LineItem.LineTotal")).toEqual((1050).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,7);
        expect(binding("LineItem.LineTotal")).toEqual((1000).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,8);
        expect(binding("LineItem.LineTotal")).toEqual((900).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,9);
        expect(binding("LineItem.LineTotal")).toEqual((750).formatMoney(2));
        if(C_debug){pause();}
    });

});
describe('Product View - Required Variable Specs With Markup 1 "reqvarspecmarkuptest1"', function(){
    it('should display product containing with required variable specs with markups',function(){
        e2eViewProductFromInteropID("reqvarspecmarkuptest1") //this test is setup to have 10 price breaks with variable specs that add markups
        if(C_debug){pause();}
    });
    it('should have 7 variable specs in a particular order', function(){
        expect(repeater('#451_list_vspec tr').count()).toBe(7); //there should be 7 variable specs
        //test display order of specs
        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(1):contains("ReqVarTextSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarDropMarkupUnitSpec1
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(1):contains("ReqVarDropMarkupUnitSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarImageSpec1
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(1):contains("ReqVarRadioMarkupLineSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarRadioMarkupLineSpec1
        expect(element('#451_list_vspec tr:nth-child(4) td:nth-child(1):contains("ReqVarImageSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextDefToolSpec1
        expect(element('#451_list_vspec tr:nth-child(5) td:nth-child(1):contains("ReqVarTextDefToolSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextSpec1
        expect(element('#451_list_vspec tr:nth-child(6) td:nth-child(1):contains("VariableSpecTextNonReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1
        expect(element('#451_list_vspec tr:nth-child(7) td:nth-child(1):contains("VariableSpecTextReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1

        if(C_debug){pause();}

    });
    it('should have 7 variable specs most of which are required', function(){
        //test that specs are required

        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the first rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the 2nd rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the third rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(4) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the fourth rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(5) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the fifth rows first cell to be required and thus have an *
        //6 is not required
        expect(element('#451_list_vspec tr:nth-child(7) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the seventh rows first cell to be required and thus have an *

        expect(element())
        pause();
        //todo - check Add to Order button is disabled until required fields are populated.

    });
    it('should apply markup values as specified', function(){
        pause();

        //TODO - for each added spec, verify line item total price is incremented by quantity as well as markup, each time
        //BASE price breaks
        //1 250, 2 480, 3 675, 4 800, 5 950, 6 1050, 7 1050, 8 1000, 9 900, 10 750
        //markups: 0, 1.12 (PER UNIT), 1.13 (PER LINE), 0, 0, 0, 0

        if(C_debug){pause();}
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((250).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,5);
        expect(binding("LineItem.LineTotal")).toEqual((1050).formatMoney(2));
        //at this point no markups should be applied
        if(C_debug){pause();}

        //now let's apply some specs without markup
        using('#451_list_vspec tbody tr:nth-child(1) td:nth-child(2)').input("s.Value").enter("foo2");//change foo1 to foo2 in the first text input.  this should not change the markup/line item total.
        //the reason we use Using is because there are multiple fields with the same "name" (ng-model) so we can narrow it down using Using to specify the DOM branch it's in
        e2eChangeProdQty(true,5);
        expect(binding("LineItem.LineTotal")).toEqual((1050).formatMoney(2)); //still 1050

        using('#451_list_vspec tbody tr:nth-child(4) td:nth-child(2)').input("s.Value").enter("image upload");//change (image control) to "image" in the image upload input.  this should not change the markup/line item total.
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((250).formatMoney(2)); //should only be 250

        using('#451_list_vspec tbody tr:nth-child(5) td:nth-child(2)').input("s.Value").enter("cusack");
        e2eChangeProdQty(true,1);
        expect(binding("LineItem.LineTotal")).toEqual((480).formatMoney(2));

        //specifically not changing the value in #6 because it's not required

        using('#451_list_vspec tbody tr:nth-child(7) td:nth-child(2)').input("s.Value").enter("playstation portable");
        e2eChangeProdQty(true,2);
        expect(binding("LineItem.LineTotal")).toEqual((675).formatMoney(2));

        //now let's apply some specs WITH markup (by quantity)

        using('#451_list_vspec tbody tr:nth-child(2) td:nth-child(2)').select("s.SelectedOptionID").option(1); //torgo
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((251.12).formatMoney(2));

        using('#451_list_vspec tbody tr:nth-child(2) td:nth-child(2)').select("s.SelectedOptionID").option(2); //fergu
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((251.12).formatMoney(2));
        e2eChangeProdQty(true,1);
        expect(binding("LineItem.LineTotal")).toEqual((482.24).formatMoney(2));

        //now let's apply some specs WITH markup (by lineitem total)

        using('#451_list_vspec tbody tr:nth-child(3) td:nth-child(2)').select("s.SelectedOptionID").option(0); //cooper
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((252.25).formatMoney(2));

        using('#451_list_vspec tbody tr:nth-child(3) td:nth-child(2)').select("s.SelectedOptionID").option(0); //cooper
        e2eChangeProdQty(true,1);
        expect(binding("LineItem.LineTotal")).toEqual((483.37).formatMoney(2));

        using('#451_list_vspec tbody tr:nth-child(3) td:nth-child(2)').select("s.SelectedOptionID").option(5); //gilmore
        e2eChangeProdQty(true,9);
        expect(binding("LineItem.LineTotal")).toEqual((762.33).formatMoney(2));
        using('#451_list_vspec tbody tr:nth-child(3) td:nth-child(2)').input("s.OtherTextValue").enter("Van Halen"); //other value
        e2eChangeProdQty(true,7);
        expect(binding("LineItem.LineTotal")).toEqual((1010.09).formatMoney(2));

        expect(using('#451_list_vspec tbody tr:nth-child(5) td:nth-child(2)').input("s.Value")).toBe("Core"); //default set to be [[FirstName]], SPA may not support this
    });
});

//TODO - variable spec image upload, test file/image size/dimension/dpi constraints
//TODO - variable spec PDF upload, test file size constraints
//TODO - variable spec "other" upload, test file size constraints, extensions, default file

//TODO - inventory via product versus inventory via variant, and whether it overrides product or not

//TODO - required/non static specs with / without markups

//TODO- cumulative price breaks per price schedule (not per line item) - this probably belongs in order or checkout script


describe('testing e2eProduct nav functions', function(){
    e2eLogout(C_debug);
    e2eLoginProduct("coreproduser","fails345",false,"BC-ImageUpload");

    it(':e2eClickProductFromList(nth-child method) should display product',function(){
        if(C_debug){pause();}
        e2eClickSideNavCategory("Products")
        e2eClickProductFromList(1)
    });

    it(':e2eClickProductFromList(product name method) should display product',function(){
        if(C_debug){pause();}
        e2eClickSideNavCategory("Products")
        e2eClickProductFromList(0,"Simple")
    });
    it(':e2eViewProductFromInteropID should display product when given an interopid',function(){

        e2eViewProductFromInteropID("BC-ImageUpload")
        if(C_debug){pause();}
    });
    it(':e2eClickVariantFromProductList should display variant when clicked inside a product',function(){

        e2eViewProductFromInteropID("StaticProdWithVar")
        pause();
        e2eClickVariantFromProductList(1);

        if(C_debug){pause();}
        pause();
        e2eViewProductFromInteropID("StaticProdWithVar")
        pause();
        e2eClickVariantFromProductList("Blue");
        if(C_debug){pause();}
    });

});
describe('logout/cleanup', function(){
    if(C_debug){pause();}
    e2eLogout(C_debug);
});



