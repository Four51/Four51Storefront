'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */
//Product list and view test Scenarios

//handy stuff:
//console.dir(scope('.nav-header', 'tree'));
//console.dir(scope('.nav-header', 'category'));
//console.dir(scope('.nav-header', 'category.Name'));
//console.dir(scope('.nav-header', 'category.InteropID'));
//console.dir(binding('currentCategory.Name'));

// test product interopIDs
/////////////////////////////////////
// stat_prod_stat_specs_ALL_autotest
// stat_prod_stat_specs_bc_autotest
// stat_prod_stat_specs_env_autotest
// stat_prod_stat_specs_pap_autotest
// stat_prod_stat_specs_cont_autotest
// stat_prod_stat_specs_unitset_autotest
// stat_prod_stat_specs_pads_autotest
// stat_prod_stat_specs_fastening_autotest
// stat_prod_stat_specs_number_autotest
// stat_prod_stat_specs_ink_autotest
// stat_prod_stat_specs_marg_autotest
// stat_prod_stat_specs_label_autotest
// stat_prod_stat_specs_custom_autotest
// stat_prod_stat_specs_variant_autotest
    //stat_prod_stat_specs_variant_autotest_var1_all_override
    //stat_prod_stat_specs_variant_autotest_var1_some_override
    //stat_prod_stat_specs_variant_autotest_var1_no_override

//reqvarspecmarkup_vboss_test1 TODO-__start new tests at this product
    //vboss_variant_torgo_cooper
    //vboss_variant_fergu_cooper
    //vboss_variant_ander_cooper
    //vboss_variant_torgo_jagger
    //vboss_variant_fergu_jagger


var C_debug = true;

////////////////////////////////////////////////////

describe('Product login', function() {
    it("should allow a user to login", function() {
        browser().navigateTo('../../app/');
    });

    e2eLogin("coreproduser","fails345", C_debug);

});

describe('Product List: ', function() {

    it('should display some products after a top level category has been clicked', function() {

        e2eClickHome();
        e2eClickOpenCategory();
        //check existence of categories, datawise
        expect(repeater('.451_cat_item').count()).toBeGreaterThan(0);

        if(C_debug){pause();}

        e2eClickSideNavCategory(0);

        e2eClickOpenCategory();
        //now check that the displayed category matches the nav item we clicked
        expect(binding('currentCategory.Name')).toEqualFuture(scope('.451_cat_item a', 'node.Name'));

        if(C_debug){pause();}

        expect(repeater('#451_lst_prod').count()).toBeGreaterThan(0); //there should be at least one product

    });

    it('should let us click a product from a top level category and display it', function() {
        if(C_debug){pause();}

        expect(repeater('.451qa_prod_item').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lst_prod .451qa_prod_item:eq(0) div div h3').text(); //get the product name for comparison later
        e2eClickProductFromList(0);

        var strShowedProductName = binding('LineItem.Product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}
    });

    it('should let us click a product from a sub category and display it', function() {
        e2eClickHome();
        e2eClickOpenCategory();
        e2eClickSideNavCategory(1); //click first subcat
        expect(repeater('.451qa_prod_item').count()).toBeGreaterThan(0); //there should be at least one product

        var strClickedProductName = element('#451_lst_prod .451qa_prod_item:eq(0) div div h3').text(); //get the product name for comparison later
        e2eClickProductFromList(0);

        var strShowedProductName = binding('LineItem.Product.Name');

        console.dir(strClickedProductName);
        console.dir(strShowedProductName);

        expect(strClickedProductName).toContainFuture(strShowedProductName);

        if(C_debug){pause();}

    });

    //TODO- add some expectations around line-item type productlist display

}); //TODO - validate various fields on Product List display view, validate Product sort order based on category options

//TODO - verify permissions are applied.  specifically, there is a permission setting for static specs, verify the page observes and follows it.
//TODO - more permissions?

describe('Product View - Static No Variants "stat_prod_stat_specs_ALL_autotest"', function() {
    it('should display a product', function(){
        e2eClickHome();
        e2eClickOpenCategory();
        e2eClickSideNavCategory(0,"Auto Static Products");
        e2eClickProductFromList(0,"Static Prod With Static Specs-ALL Auto Test Product");
        if(C_debug){pause();}
    });
    it('should have an image', function(){
        if(C_debug){pause();}
        expect(element('#451_img_prod_lg[src]').count()).toBe(1);
    });
    it('should have a name', function(){
        expect(element('#451qa_prod_name:contains("Static Prod With Static Specs-ALL Auto Test Product")').count()).toBe(1); //name
    });
    it('should have a description', function(){
        expect(element('#451qa_prod_desc:contains("Static Prod With Static Specs Auto Test Product")').count()).toBe(1);  //description
    });
    it('should have a price box, and only one price box', function(){
        expect(element("#451qa_input_qty").count()).toBe(1);
    });
    it('should display a long list of all static specs', function(){
        expect(element('#451_list_specgroup .451qa_spec_item').count()).toBe(252); //actually 251, but the hidden spec is still counted even though it's not displayed
    });
    it('should have grouped sets of static specs', function(){
        expect(element('.451qa_sg_item:contains("BUSINESS CARD") ~ li div').count()).toBe(9);
        expect(element('.451qa_sg_item:contains("CONTINUOUS") ~ li div').count()).toBe(22);
        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 1") ~ li div').count()).toBe(3); //it counts as 3, though only 2 are "displayed"
        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 2") ~ li div').count()).toBe(1);
        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 3") ~ li div').count()).toBe(1); //this should have a file link in it.  TODO- add check for file link.
        expect(element('.451qa_sg_item:contains("ENVELOPE") ~ li div').count()).toBe(16);
        expect(element('.451qa_sg_item:contains("FASTENING") ~ li div').count()).toBe(18);
        expect(element('.451qa_sg_item:contains("INK") ~ li div').count()).toBe(91); //holy vegetable based inks, batman!
        expect(element('.451qa_sg_item:contains("LABEL") ~ li div').count()).toBe(24);
        expect(element('.451qa_sg_item:contains("MARGINAL WORDS") ~ li div').count()).toBe(12); //there is a possibility that there's a bug on the existing app that is not showing 7 fields that SHOULD be here. may want to add a TODO- here
        expect(element('.451qa_sg_item:contains("NUMBERING") ~ li div').count()).toBe(15);
        expect(element('.451qa_sg_item:contains("PADS") ~ li div').count()).toBe(2);
        expect(element('.451qa_sg_item:contains("PAPER") ~ li div').count()).toBe(9);
        expect(element('.451qa_sg_item:contains("UNIT SET") ~ li div').count()).toBe(29);
    });
    it('should have several specs in each spec group', function(){
        expect(element('.451qa_sg_item:contains("BUSINESS CARD") ~ li div').count()).toBe(9);
            verifyStaticSpecRow("BUSINESS CARD",0,"# of Inks","4");
            verifyStaticSpecRow("BUSINESS CARD",1,"# of Inks Back","1");
            verifyStaticSpecRow("BUSINESS CARD",2,"# of Inks Front","3");
            verifyStaticSpecRow("BUSINESS CARD",3,"Additional Comments","BC Comment");
            verifyStaticSpecRow("BUSINESS CARD",4,"Ink Colors","Cyan Magenta Yellow Black");
            verifyStaticSpecRow("BUSINESS CARD",5,"Ink Colors on Back","Black");
            verifyStaticSpecRow("BUSINESS CARD",6,"Ink Colors on Front","Cyan Magenta Yellow");
            verifyStaticSpecRow("BUSINESS CARD",7,"Size","2 x 3-1/2");
            verifyStaticSpecRow("BUSINESS CARD",8,"Stock","Aluminum");

        expect(element('.451qa_sg_item:contains("CONTINUOUS") ~ li div').count()).toBe(22);
            verifyStaticSpecRow("CONTINUOUS",0,"Additional Comments","Continuous Comment");
            verifyStaticSpecRow("CONTINUOUS",1,"Carbonless attr. Ply 1","CFB");
            verifyStaticSpecRow("CONTINUOUS",2,"Carbonless attr. Ply 2","CB");
            verifyStaticSpecRow("CONTINUOUS",3,"Carbonless attr. Ply 3","CB");
            verifyStaticSpecRow("CONTINUOUS",4,"Carbonless attr. Ply 4","CF");
            verifyStaticSpecRow("CONTINUOUS",5,"Carbonless attr. Ply 5","CF");
            verifyStaticSpecRow("CONTINUOUS",6,"Carbonless attr. Ply 6","CF");
            verifyStaticSpecRow("CONTINUOUS",7,"Color Ply 1","CANARY");
            verifyStaticSpecRow("CONTINUOUS",8,"Color Ply 2","PINK");
            verifyStaticSpecRow("CONTINUOUS",9,"Color Ply 3","BLUE");
            verifyStaticSpecRow("CONTINUOUS",10,"Color Ply 4","WHITE");
            verifyStaticSpecRow("CONTINUOUS",11,"Color Ply 5","GOLDENROD");
            verifyStaticSpecRow("CONTINUOUS",12,"Color Ply 6","GREEN");
            verifyStaticSpecRow("CONTINUOUS",13,"Detached Size","3\" x 2 1/2\"");
            verifyStaticSpecRow("CONTINUOUS",14,"Number of Ply's","6");
            verifyStaticSpecRow("CONTINUOUS",15,"Size","4\" x 2 1/2\"");
            verifyStaticSpecRow("CONTINUOUS",16,"Weight Ply 1","5lb");
            verifyStaticSpecRow("CONTINUOUS",17,"Weight Ply 2","7lb");
            verifyStaticSpecRow("CONTINUOUS",18,"Weight Ply 3","30lb");
            verifyStaticSpecRow("CONTINUOUS",19,"Weight Ply 4","1lb");
            verifyStaticSpecRow("CONTINUOUS",20,"Weight Ply 5","1#");
            verifyStaticSpecRow("CONTINUOUS",21,"Weight Ply 6","25#");

        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 1") ~ li div').count()).toBe(3); //it counts as 3, though only 2 are "displayed"
            verifyStaticSpecRow("CUSTOM SPEC GROUP 1",0,"Custom Spec 1","CustomSpecValue1");
            verifyStaticSpecRow("CUSTOM SPEC GROUP 1",1,"Custom Spec 2","CustomSpecValue2");
            verifyStaticSpecRow("CUSTOM SPEC GROUP 1",2,"Custom Spec 3 INVISIBLE","CustomSpecValue3"); //not sure why we should bother verifying this...

        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 2") ~ li div').count()).toBe(1);
            verifyStaticSpecRow("CUSTOM SPEC GROUP 2",0,"Custom Spec 1 Group 2","CustomSpecValue2Spec1Group2");

        expect(element('.451qa_sg_item:contains("CUSTOM SPEC GROUP 3") ~ li div').count()).toBe(1);
            verifyStaticSpecRow("CUSTOM SPEC GROUP 3",0,"Custom Spec 1 Group 3 FILE","441725_Four51logo2008.eps.jpg");

        expect(element('.451qa_sg_item:contains("ENVELOPE") ~ li div').count()).toBe(16);
            verifyStaticSpecRow("ENVELOPE",0,"# Ink Back","2");
            verifyStaticSpecRow("ENVELOPE",1,"# Ink Front","1");
            verifyStaticSpecRow("ENVELOPE",2,"Additional Comments","Envelope Comments");
            verifyStaticSpecRow("ENVELOPE",3,"Commercial Style","#10 4-1/8\" x 9-1/2\"");
            verifyStaticSpecRow("ENVELOPE",4,"Ink Colors Back","Red Cyan");
            verifyStaticSpecRow("ENVELOPE",5,"Ink Colors Front","Black");
            verifyStaticSpecRow("ENVELOPE",6,"Open End Catalog","#15 Catalog 10 x 15");
            verifyStaticSpecRow("ENVELOPE",7,"Open Side Booklet","#9 1/2 9\" x 12\"");
            verifyStaticSpecRow("ENVELOPE",8,"Paper Stock","Granite");
            verifyStaticSpecRow("ENVELOPE",9,"Paper Weight","15lb");
            verifyStaticSpecRow("ENVELOPE",10,"Social Style","3-5/8\" x 5-1/2\"");
            verifyStaticSpecRow("ENVELOPE",11,"Type","Commercial");
            verifyStaticSpecRow("ENVELOPE",12,"Window","Yes");
            verifyStaticSpecRow("ENVELOPE",13,"Window from Bottom","1\"");  //TODO-SORTING BUG FOUND.
            verifyStaticSpecRow("ENVELOPE",14,"Window from Left","2\"");
            verifyStaticSpecRow("ENVELOPE",15,"Window Size","2 1/2\" 3\"");

        expect(element('.451qa_sg_item:contains("FASTENING") ~ li div').count()).toBe(18);
            verifyStaticSpecRow("FASTENING",0,"Crimp Left","No");
            verifyStaticSpecRow("FASTENING",1,"Crimp Right","Yes");
            verifyStaticSpecRow("FASTENING",2,"Edge Glue","Yes");
            verifyStaticSpecRow("FASTENING",3,"Edge Glue At","Left");
            verifyStaticSpecRow("FASTENING",4,"Line Glue","Yes");
            verifyStaticSpecRow("FASTENING",5,"Line Glue - Cont Form L","Yes");
            verifyStaticSpecRow("FASTENING",6,"Line Glue - Cont Form R","No");
            verifyStaticSpecRow("FASTENING",7,"Line Glue At","Top");
            verifyStaticSpecRow("FASTENING",8,"Line Glue Carbon","Yes");
            verifyStaticSpecRow("FASTENING",9,"Line Glue Paper","Yes");
            verifyStaticSpecRow("FASTENING",10,"Line Glue Points","1");
            verifyStaticSpecRow("FASTENING",11,"Notes","Fastening Notes");
            verifyStaticSpecRow("FASTENING",12,"Spot Glue","Yes");
            verifyStaticSpecRow("FASTENING",13,"Spot Glue At","Left Center Right Top");
            verifyStaticSpecRow("FASTENING",14,"Spot Glue Carbon","Probably");
            verifyStaticSpecRow("FASTENING",15,"Spot Glue Paper","Yes?");
            verifyStaticSpecRow("FASTENING",16,"Spot Glue Pts","3");
            verifyStaticSpecRow("FASTENING",17,"Standard Glueing","Yes");

        //ink is a long beast...

        expect(element('.451qa_sg_item:contains("LABEL") ~ li div').count()).toBe(24);
            verifyStaticSpecRow("LABEL",0,"# of labels per roll","150");
            verifyStaticSpecRow("LABEL",1,"Adhesive","Permanent");
            verifyStaticSpecRow("LABEL",2,"Center to Center Width","1.5\"");
            verifyStaticSpecRow("LABEL",3,"Horizontal center to center","Center");
            verifyStaticSpecRow("LABEL",4,"Ink Colors -Back","Red");
            verifyStaticSpecRow("LABEL",5,"Ink Colors -Front","Black Yellow");
            verifyStaticSpecRow("LABEL",6,"Ink Quantity -Back","1");
            verifyStaticSpecRow("LABEL",7,"Ink Quantity -Front","2");
            verifyStaticSpecRow("LABEL",8,"Label Depth","3\"");
            verifyStaticSpecRow("LABEL",9,"Label Width","6\"");
            verifyStaticSpecRow("LABEL",10,"Labels Across -Qty.","1");
            verifyStaticSpecRow("LABEL",11,"Liner Material","Stuff");
            verifyStaticSpecRow("LABEL",12,"Liner Width","2\"");
            verifyStaticSpecRow("LABEL",13,"Paper Stock","Waxy");
            verifyStaticSpecRow("LABEL",14,"Perforation locations","Each");
            verifyStaticSpecRow("LABEL",15,"Perforations","Yes");
            verifyStaticSpecRow("LABEL",16,"Punching","Yes");
            verifyStaticSpecRow("LABEL",17,"Punching locations","Around");
            verifyStaticSpecRow("LABEL",18,"Repeat Length","1");
            verifyStaticSpecRow("LABEL",19,"Roll diameter (inside)","3\"");
            verifyStaticSpecRow("LABEL",20,"roll max. diameter","4\"");  //TODO-SORTING BUG FOUND. probably same reason as above (Capitalization affects sorting somehow)
            verifyStaticSpecRow("LABEL",21,"Type","CONTINUIOUS"); //(SIC)
            verifyStaticSpecRow("LABEL",22,"Unwind Direction","Forward");
            verifyStaticSpecRow("LABEL",23,"Usage Information","Peel sticker and apply");

        //there are plenty more static specs to check on this product, but after a certain point these tests become redundant.  optionally this can be expanded.

    });

    it('should NOT display custom static specs that are set to be NOT visible to customer (visibletocustomer=false)', function(){
        expect(element('#451_list_specgroup tbody tr td:contains("INVISIBLE")').count()).toBe(1); //row with the INVISIBLE custom spec exists...
        expect(element('#451_list_specgroup tbody tr td:contains("INVISIBLE"):hidden').count()).toBe(1); //but should NOT be displayed (should be hidden)
        expect(element('#451_list_specgroup tbody tr td:contains("INVISIBLE"):visible').count()).toBe(0); //but should NOT be displayed (should be hidden)
        //this custom static spec actually has INVISIBLE in the spec name, that's just an easy way of selecting the element
    });
    it('should display an A tag around custom specs that are FILE specs', function(){
        expect(element('#451_list_specgroup tbody tr td:contains("441725_Four51logo2008.eps.jpg") a').count()).toBe(1); //this should have a filename in it.
        expect(element('#451_list_specgroup tbody tr td:contains("441725_Four51logo2008.eps.jpg") a[href]:contains("441725_Four51logo2008.eps.jpg")').count()).toBe(1); //this should have a file link in it.
    });
    e2eLogout(false)

});


describe('Product View - Static With Variants "stat_prod_stat_specs_variant_autotest"', function() {
    e2eLoginProduct("coreproduser","fails345",false,"stat_prod_stat_specs_variant_autotest");

    it('should have an image', function(){
        if(C_debug){pause();}
        expect(element('#451_img_prod_lg[src]').count()).toBe(1);
    });
    it('should have variants', function(){
        expect(repeater('.451_list_vars tr').count()).toBe(4); //there should be 3 variants, including a header row
            //test variant display...
                //check order input box exists
                //check add to order button exists

        verifyVariantRow(1,"stat_prod_stat_specs_variant_autotest_var1_all_override","Variant 1\r\nstat_prod_stat_specs_variant_autotest_var1_all_override\r\n(Business Card Static Specs, All Override)");
        verifyVariantRow(2,"stat_prod_stat_specs_variant_autotest_var1_no_override","Variant 3\r\nstat_prod_stat_specs_variant_autotest_var1_no_override\r\n(Business Card - No Specs Override)");
        verifyVariantRow(3,"stat_prod_stat_specs_variant_autotest_var1_some_override","Variant 2\r\nstat_prod_stat_specs_variant_autotest_var1_some_override\r\n(Business Card Specs, Some Override)");
    });
    it('should have a static spec group', function(){
        expect(element('tr.451_hdr_spec_grp:contains("Business Card") ~ tr').count()).toBe(9);
            verifyStaticSpecRow("Business Card",0,"# of Inks","6");
            verifyStaticSpecRow("Business Card",1,"# of Inks Back","1");
            verifyStaticSpecRow("Business Card",2,"# of Inks Front","1");
            verifyStaticSpecRow("Business Card",3,"Additional Comments","Product Comments");
            verifyStaticSpecRow("Business Card",4,"Ink Colors","Inky Pinky Blinky Clyde Sue Snagglepuss");
            verifyStaticSpecRow("Business Card",5,"Ink Colors on Back","Black");
            verifyStaticSpecRow("Business Card",6,"Ink Colors on Front","Red");
            verifyStaticSpecRow("Business Card",7,"Size","2 x 3-1/2");
            verifyStaticSpecRow("Business Card",8,"Stock","Gold Leaf");

    });
    it('should allow us to click on a variant and display it', function(){
        expect(repeater('.451_list_vars tr').count()).toBeGreaterThan(1); //there should be at least one variant
        e2eClickVariantFromProductList(2); //click the first variant
        //element('.451_list_vars tr:nth-child(2) td a').click();

        if(C_debug){pause();}
    });
    it('should display existing product description and pricing', function(){
        expect(repeater('.451_list_vars tr:hidden').count()).toBe(4); //there should be no variants displayed (they're there, they are just hidden)
        //todo-rerun tests that check description and pricing, maybe turn those checks into functions








        expect(element('tr.451_hdr_spec_grp:contains("Business Card") ~ tr').count()).toBe(9);

        if(C_debug){pause();}
    });
    it('should display specs for the 1st variant (all override)', function(){
        expect(repeater('.451_list_vars tr:hidden').count()).toBe(4); //there should be no variants displayed

        expect(element('tr.451_hdr_spec_grp:contains("Business Card") ~ tr').count()).toBe(9);
        verifyStaticSpecRow("Business Card",0,"# of Inks","2");
        verifyStaticSpecRow("Business Card",1,"# of Inks Back","2");
        verifyStaticSpecRow("Business Card",2,"# of Inks Front","2");
        verifyStaticSpecRow("Business Card",3,"Additional Comments","Variant Comment");
        verifyStaticSpecRow("Business Card",4,"Ink Colors","PacMan Mrs.PacMan");
        verifyStaticSpecRow("Business Card",5,"Ink Colors on Back","Red Blue");
        verifyStaticSpecRow("Business Card",6,"Ink Colors on Front","Yellow Green");
        verifyStaticSpecRow("Business Card",7,"Size","2 x 3-1/2"); //strictly speaking this isn't overriding the original spec, but that's because there's only one possible value
        verifyStaticSpecRow("Business Card",8,"Stock","Silver Leaf");

        if(C_debug){pause();}
        e2eViewProductFromInteropID("stat_prod_stat_specs_variant_autotest") //go back to our parent product preparing for the next variant

    });
    it('should display specs for the 3rd variant (no override)', function(){
        e2eClickVariantFromProductList(3);
        expect(repeater('.451_list_vars tr:hidden').count()).toBe(4); //there should be no variants displayed

        expect(element('tr.451_hdr_spec_grp:contains("Business Card") ~ tr').count()).toBe(9);
        verifyStaticSpecRow("Business Card",0,"# of Inks","6");
        verifyStaticSpecRow("Business Card",1,"# of Inks Back","1");
        verifyStaticSpecRow("Business Card",2,"# of Inks Front","1");
        verifyStaticSpecRow("Business Card",3,"Additional Comments","Product Comments");
        verifyStaticSpecRow("Business Card",4,"Ink Colors","Inky Pinky Blinky Clyde Sue Snagglepuss");
        verifyStaticSpecRow("Business Card",5,"Ink Colors on Back","Black");
        verifyStaticSpecRow("Business Card",6,"Ink Colors on Front","Red");
        verifyStaticSpecRow("Business Card",7,"Size","2 x 3-1/2");
        verifyStaticSpecRow("Business Card",8,"Stock","Gold Leaf");

        if(C_debug){pause();}
        e2eViewProductFromInteropID("stat_prod_stat_specs_variant_autotest") //go back to our parent product preparing for the next variant

    });
    it('should display specs for the 2nd variant (some override)', function(){
        e2eClickVariantFromProductList(4);
        expect(repeater('.451_list_vars tr:hidden').count()).toBe(4); //there should be no variants displayed

        expect(element('tr.451_hdr_spec_grp:contains("Business Card") ~ tr').count()).toBe(9);
        verifyStaticSpecRow("Business Card",0,"# of Inks","6");
        verifyStaticSpecRow("Business Card",1,"# of Inks Back","1");
        verifyStaticSpecRow("Business Card",2,"# of Inks Front","1");
        verifyStaticSpecRow("Business Card",3,"Additional Comments","Variant 2 Comments");
        verifyStaticSpecRow("Business Card",4,"Ink Colors","Inky Pinky Blinky Clyde Sue Snagglepuss");
        verifyStaticSpecRow("Business Card",5,"Ink Colors on Back","Override Red");
        verifyStaticSpecRow("Business Card",6,"Ink Colors on Front","Red");
        verifyStaticSpecRow("Business Card",7,"Size","2 x 3-1/2");
        verifyStaticSpecRow("Business Card",8,"Stock","Copper Leaf");

        if(C_debug){pause();}
        e2eViewProductFromInteropID("stat_prod_stat_specs_variant_autotest") //go back to our parent product

    });
});
//TODO - test inventory


//TODO - test Variant Level Inventory //stat_prod_stat_specs_inventory_variant_autotest


describe('Product View - Price Schedules 1 Display Tests "pstest1", nonrestricted quantity, no markups, input field', function(){
    it('should display product containing price 5 price breaks',function(){
        e2eViewProductFromInteropID("pstest1") //this test is setup to have 5 price breaks and set to a specific price schedule (associated with this user)
        expect(repeater('#451_list_pric_schd tbody tr').count()).toBe(6); //there should be 5 price breaks, but 1 header row (for now)
        if(C_debug){pause();}
    });
    it('should have a header for the price schedule table', function(){
        //1-4 $3, 5-14 $2.50, 15-34 $2.25, 35-74 $2.00, 75+ $1.50

        //check the headers
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(1)').text()).toContain("Quantity"); //quantity
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(1) span:hidden').text()).toContainFuture(binding("p.QuantityMultiplier")); //the multiplier should be hidden unless quantity is restricted

        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(2)').text()).toContain("Price");
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(2) span:hidden').text()).toContainFuture(binding("p.QuantityMultiplier")); //the multiplier should be hidden unless quantity is restricted

    });
    it('should have 5 price breaks', function(){

        //TODO- jeff will write a function that will provide the content of the Quantity column in a more readable fashion so this next check will be usable
        //expect(element('#451_list_pric_schd tr:nth-child(2) td:first-child').text()).toBe("1 - 4"); //quantity
        //repeat for each row

        //row 1 is the header row
        expect(element('#451_list_pric_schd tr:nth-child(2) td:nth-child(2)').text()).toBe((3).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(3) td:nth-child(2)').text()).toBe((2.5).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(4) td:nth-child(2)').text()).toBe((2.25).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(5) td:nth-child(2)').text()).toBe((2).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(6) td:nth-child(2)').text()).toBe((1.50).formatMoney(2)); //price


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
    });
});

describe('Product View - Price Schedules 1 Value Tests "pstest1", nonrestricted quantity, no markups, input field', function(){
    it('should display product containing price 5 price breaks',function(){
        e2eViewProductFromInteropID("pstest1") //this test is setup to have 5 price breaks and set to a specific price schedule (associated with this user)
        expect(repeater('#451_list_pric_schd tbody tr').count()).toBe(6); //there should be 5 price breaks, but 1 header row (for now)
        if(C_debug){pause();}
    });
    it('should apply 5 price breaks based on quantity', function(){

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
    it('should allow changing the quantity INPUT field and prevent invalid values, disabling Add To Order button', function(){

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //button should be disabled by default

        e2eChangeProdQty(false,"foo");
        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0);
        e2eChangeProdQty(false,1);
        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //nope, still need a required spec
        e2eChangeProdQty(false,0);
        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0);
        e2eChangeProdQty(false,100);
        using('#451_list_vspec tbody tr:nth-child(2) td:nth-child(2)').input("s.Value").enter("playstation portable");
        expect(element("#451_btn_orderadd:enabled").count()).toBeGreaterThan(0); //now we should have an enabled button
        e2eChangeProdQty(false,"foo");
        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //now back to disabled
        e2eChangeProdQty(false,1);
        expect(element("#451_btn_orderadd:enabled").count()).toBeGreaterThan(0); //enabled
        e2eChangeProdQty(false,0);
        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //will you make up your mind?

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
     });
});

describe('Product View - Price Schedules 2 Display Tests "pstest2", restricted quantity, no markup, select field', function(){
    it('should display product containing 10 price breaks',function(){
        e2eViewProductFromInteropID("pstest2"); //this test is setup to have 10 price breaks and set to a specific price schedule (associated with this user)
        expect(repeater('#451_list_pric_schd tbody tr').count()).toBe(11); //there should be 10 price breaks (incl header row). restricted to multiples of 250
        if(C_debug){pause();}
    });
    it('should have a header for the price schedule table', function(){
        //1 250, 2 480, 3 675, 4 800, 5 950, 6 1050, 7 1050, 8 1000, 9 900, 10 750

        //check the headers
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(1)').text()).toContain("Quantity"); //quantity
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(1) span:hidden').text()).toContainFuture(binding("p.QuantityMultiplier")); //the multiplier shouldn't appear here

        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(2)').text()).toContain("Price");
        expect(element('#451_list_pric_schd tr:nth-child(1) td:nth-child(2) span:hidden').text()).toContainFuture(binding("p.QuantityMultiplier")); //the multiplier shouldn't appear here

        //right now the QuantityMultiplier is hidden, to match the live site, this may be a future feature addition
    });
    it('should have 10 price breaks', function(){

        //TODO- jeff will write a function that will provide the content of the Quantity column in a more readable fashion so this next check will be usable
        //expect(element('#451_list_pric_schd tr:nth-child(2) td:first-child').text()).toBe("1 - 4"); //quantity
        //repeat for each row

        //row 1 is the header row
        expect(element('#451_list_pric_schd tr:nth-child(2) td:nth-child(2)').text()).toBe((250).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(3) td:nth-child(2)').text()).toBe((480).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(4) td:nth-child(2)').text()).toBe((675).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(5) td:nth-child(2)').text()).toBe((800).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(6) td:nth-child(2)').text()).toBe((950).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(7) td:nth-child(2)').text()).toBe((1050).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(8) td:nth-child(2)').text()).toBe((1050).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(9) td:nth-child(2)').text()).toBe((1000).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(10) td:nth-child(2)').text()).toBe((900).formatMoney(2)); //price
        expect(element('#451_list_pric_schd tr:nth-child(11) td:nth-child(2)').text()).toBe((750).formatMoney(2)); //price


        if(C_debug){pause();}
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((250).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,4);
        expect(binding("LineItem.LineTotal")).toEqual((950).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,9);
        expect(binding("LineItem.LineTotal")).toEqual((750).formatMoney(2));
        if(C_debug){pause();}
    });
});

describe('Product View - Price Schedules 2 Value Tests "pstest2", restricted quantity, no markup, select field', function(){
    it('should display product containing 10 price breaks',function(){
        e2eViewProductFromInteropID("pstest2") //this test is setup to have 10 price breaks and set to a specific price schedule (associated with this user)
        if(C_debug){pause();}
    });
    it('should apply 10 price breaks (no markup yet)', function(){

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
    it('should allow changing the quantity SELECT field and enable/disable Add To Order button', function(){

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //button should be disabled by default

        e2eChangeProdQty(true,"foo");

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0);
        e2eChangeProdQty(true,1);

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //nope, still need a required spec
        e2eChangeProdQty(true,0);

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0);
        e2eChangeProdQty(true,100);

        using('#451_list_vspec tbody tr:nth-child(2) td:nth-child(2)').input("s.Value").enter("playstation portable");
        expect(element("#451_btn_orderadd:enabled").count()).toBeGreaterThan(0); //now we should have an enabled button
        e2eChangeProdQty(true,"foo");

        e2eChangeProdQty(true,1);
        expect(element("#451_btn_orderadd:enabled").count()).toBeGreaterThan(0); //enabled
        e2eChangeProdQty(false,"##"); //angular's UI controls should handle some of these invalid values
        expect(element("#451_btn_orderadd:enabled").count()).toBeGreaterThan(0);

        if(C_debug){pause();}
        e2eChangeProdQty(true,0);
        expect(binding("LineItem.LineTotal")).toEqual((250).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,4);
        expect(binding("LineItem.LineTotal")).toEqual((950).formatMoney(2));
        if(C_debug){pause();}
        e2eChangeProdQty(true,9);
        expect(binding("LineItem.LineTotal")).toEqual((750).formatMoney(2));
        if(C_debug){pause();}
    });
});

describe('Product View - Required Variable Specs With Markup 1 Display Tests "reqvarspecmarkuptest1", required variable specs, restricted quantity, markups, select field', function(){
    it('should display product containing with required variable specs with markups',function(){
        e2eViewProductFromInteropID("reqvarspecmarkuptest1") //this test is setup to have 10 price breaks with variable specs that add markups
        if(C_debug){pause();}
    });
    it('should display 7 variable specs in a particular order', function(){
        expect(repeater('#451_list_vspec tr').count()).toBe(7); //there should be 7 variable specs
        //test display order of specs
        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(1):contains("ReqVarTextSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarDropMarkupUnitSpec1
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(1):contains("ReqVarDropMarkupUnitSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarImageSpec1
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(1):contains("ReqVarRadioMarkupLineSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarRadioMarkupLineSpec1
        expect(element('#451_list_vspec tr:nth-child(4) td:nth-child(1):contains("ReqVarImageSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextDefToolSpec1
        expect(element('#451_list_vspec tr:nth-child(5) td:nth-child(1):contains("ReqVarTextDefToolSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextSpec1
        expect(element('#451_list_vspec tr:nth-child(6) td:nth-child(1):contains("VariableSpecTextNonReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1
        expect(element('#451_list_vspec tr:nth-child(7) td:nth-child(1):contains("VariableSpecTextReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1

        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(2):contains("mr")').count()).toEqual(1); //should have the prefix "mr"
        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(2) input[placeholder="foo1"]').count()).toEqual(1); //this spec should be set to "foo1" by default
        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(2):contains("son")').count()).toEqual(1); //should have the prefix "son"
        //TODO- check text spec inputs for rows, width, and character length, not implemented yet

        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2):contains("mr")').count()).toEqual(1); //should have the prefix "mr"
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2) select:contains("Torgo")').count()).toEqual(1); //no default but it should have 3 values populated in the options
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2) select:contains("Fergu")').count()).toEqual(1); //no default but it should have 3 values populated in the options
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2) select:contains("Ander")').count()).toEqual(1); //no default but it should have 3 values populated in the options
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2) select:contains("Melan")').count()).toEqual(0); //should definitely not include this value
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(2):contains("son")').count()).toEqual(1); //should have the prefix "son"

        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2):contains("mr")').count()).toEqual(1); //should have the prefix "mr"
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Cooper")').count()).toEqual(1); //radio button exists next to a text label
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Jagger")').count()).toEqual(1); //radio button exists next to a text label
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Petty")').count()).toEqual(1); //radio button exists next to a text label
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Gilmour")').count()).toEqual(1); //radio button exists next to a text label
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Other")').count()).toEqual(1); //have the Other option


        //when we click the Other radio button, a new field should appear to allow us to enter an "other" value
        //element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[type="radio"] + label:contains("Other")').click(); //click the other radio

        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[ng-Model="s.OtherTextValue"]:hidden ').count()).toEqual(1);
        element('#451_list_vspec tr:nth-child(3) td:nth-child(2) span:contains("other")').click(); //click the other radio/text
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(2) input[ng-Model="s.OtherTextValue"]:visible ').count()).toEqual(1);

    });
    it('should display 7 variable specs in a particular order (pt 2)', function(){

        pause();
        //next 2 spec fields aren't implemented yet and no idea how we will, so it's pointless to write tests for them yet
        expect(element('#451_list_vspec tr:nth-child(4) td:nth-child(2):contains("ReqVarImageSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextDefToolSpec1
        expect(element('#451_list_vspec tr:nth-child(5) td:nth-child(2):contains("ReqVarTextDefToolSpec1")').count()).toEqual(1); //expects the first rows first cell to be ReqVarTextSpec1
        expect(element('#451_list_vspec tr:nth-child(6) td:nth-child(2):contains("VariableSpecTextNonReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1
        expect(element('#451_list_vspec tr:nth-child(7) td:nth-child(2):contains("VariableSpecTextReq1")').count()).toEqual(1); //expects the first rows first cell to be VariableSpecTextNonReq1

        if(C_debug){pause();}

    });
    it('should display 7 variable specs most of which are required', function(){
        //test that specs are required

        expect(element('#451_list_vspec tr:nth-child(1) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the first rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(2) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the 2nd rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(3) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the third rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(4) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the fourth rows first cell to be required and thus have an *
        expect(element('#451_list_vspec tr:nth-child(5) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the fifth rows first cell to be required and thus have an *
        //6 is not required
        expect(element('#451_list_vspec tr:nth-child(7) td:nth-child(1):contains("*")').count()).toEqual(1); //expects the seventh rows first cell to be required and thus have an *

        expect(element("#451_btn_orderadd:disabled").count()).toBeGreaterThan(0); //add to order button should be disabled by default

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

//TODO - VBOSS product - reqvarspecmarkup_vboss_test1



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
        e2eClickVariantFromProductList(2); //uses TRs right now and there's a header row

        if(C_debug){pause();}
        pause();
        e2eViewProductFromInteropID("StaticProdWithVar")
        pause();
        e2eClickVariantFromProductList(0,"Blue");
        if(C_debug){pause();}
    });

});

describe('logout/cleanup', function(){
    if(C_debug){pause();}
    e2eLogout(C_debug);
});



