/**
 * Created with JetBrains WebStorm.
 * User: rmelanson
 * Date: 6/13/13
 * Time: 10:31 AM
 * To change this template use File | Settings | File Templates.
 */
//this file should contain common shared matchers and support functions

//ngScenario for Test Runner doesn't like nested IT blocks, so DON'T DO IT, it will fail miserably and not tell you why.

angular.scenario.dsl('scope', function() {
    return function(selector, entry) {
        return this.addFutureAction('find scope variable for \'' + selector + '\'',
            function($window, $document, done) {
                var $ = $window.$; // jQuery inside the iframe
                var elem = $(selector);
                if (!elem.length) {
                    return done('No element matched \'' + selector + '\'.');
                }
                var entries = entry.split('.');
                var prop = elem.scope();
                for (var i in entries) {
                    prop = prop[entries[i]];
                }
                done(null, prop);
            });
    };
});
angular.scenario.matcher('toEqualFuture', function(future) {
    return this.actual === future.value;
});
angular.scenario.matcher('toBeGreaterThanFuture', function(future) {
    return +this.actual > +future.value;
});
function includes(array, obj) {
    return indexOf(array, obj) != -1;
}
function indexOf(array, obj) {
    if (array.indexOf) return array.indexOf(obj);

    for ( var i = 0; i < array.length; i++) {
        if (obj === array[i]) return i;
    }
    return -1;
}
angular.scenario.matcher('toContainFuture', function(future) {
    return includes(this.actual, future.value);
});

//localization value constants
const C_currSymbol = "$"; const C_currThousandSeparator = ","; const C_currDecimalSeparator = ".";

Number.prototype.formatMoney = function(c){ //found this currency formatting function on stackoverflow, modified a little

    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2 : c,
        cn = C_currSymbol,
        d = C_currDecimalSeparator,
        t = C_currThousandSeparator,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + cn + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function e2eRepeaterRowValue(rptToExecute,intRow){

    console.dir(rptToExecute)
    var ftrRepeaterRow = rptToExecute;

     //execute the future so we can access it now
    ftrRepeaterRow.execute(function(){
    });
    return ftrRepeaterRow.value;
}

//function to execute a future and return a row value array
//function e2eRepeaterRowValue(rowToExecute){
//    console.log("EXECUTE");
//    rowToExecute.execute(function(){}) //execute the future so we can access it now
//
//    var rowValue = rowToExecute;
//    rowValue.execute(function(){
//
//        console.dir(rowValue.value)
//        return rowValue.value;
//    })
//    return rowToExecute.value;
//}

//navigation shortcut (for maintenance reasons) functions
function e2eClickHome(){
    element('#451qa_home_link').click();
}
function e2eClickOrders(){
    element('#451qa_order_link').click();
}
function e2eClickReports(){
    element('#451qa_report_link').click();
}
function e2eClickFaves(){
    element('#451qa_fave_link').click();
}
function e2eClickAccount(){
    element('#451qa_acct_link').click();
}
function e2eClickUser(){
    element('#451qa_acct_link2').click();
    element('#451qa_user_link').click();
} //this doesn't seem to work
function e2eClickAddresses(){
    element('#451qa_acct_link2').click();
    element('#451qa_addy_link').click();
} //this doesn't seem to work
function e2eClickMessages(){
    element('#451qa_acct_link2').click();
    element('#451qa_mesg_link').click();
} //this doesn't seem to work

function e2eClickSideNavCategory(intCatLevel,strCatName){
    var strNLevelsSelect = ""; //each level of depth is "ul li "
    var strSelector = "";
    for(var i = 0; i < intCatLevel; i++){
        strNLevelsSelect = strNLevelsSelect + "ul li "
    }

    if(strCatName != null){
        strSelector = ".451qa_sidenav .451_cat_item " + strNLevelsSelect + "a:contains('" + strCatName + "'):first"
    }
    else{//if strcatname isn't specified just pick the first at the nth level
        strSelector = ".451qa_sidenav .451_cat_item " + strNLevelsSelect + "a:first"
    }

    element(strSelector).click();
}
function e2eClickMainNavCategory(intNthCat,strCatName){
    var strSelector = "";

    if(strCatName != null){
        strSelector = ".451_lbl_subcatlist ul li a h5:contains('" + strCatName + "'):first"
    }
    else{//if strcatname isn't specified just pick the first at the nth level
        strSelector = ".451_lbl_subcatlist ul li:eq(" + intNthCat + ") a h5"
    }

    element(strSelector).click();
}
function e2eClickOpenCategory(){
    //open the category tree that's hidden by default
    sleep(3); //timing issue, sleep a few seconds
    element('#451qa_nav_hdr ul li').click();
}
function e2eClickDropCategory(){
    //open the category tree that's hidden by default
    sleep(3); //timing issue, sleep a few seconds
    element('a.dropdown-toggle').click();
}


//product functions
function e2eClickProductFromList(intNthProd,strProdName){
    var strSelector = "";

    if(strProdName != null){
        strSelector = "#451_lst_prod .451qa_prod_item:has(div h3:contains('" + strProdName + "')) div a";
    }
    else{//if strProdName isn't specified just pick the first at the nth level
        strSelector = "#451_lst_prod .451qa_prod_item:eq(" + intNthProd + ") div a";
    }

    element(strSelector).click();
}
function e2eViewProductFromInteropID(strProdInteropID){
    browser().navigateTo('../../app/product/default/' + strProdInteropID);
}

function e2eClickVariantFromProductList(intNthVariant,strVariantName){
    var strSelector = "";

    if(strVariantName != null){
        strSelector = "#451qa_list_variants li div a:contains('" + strVariantName + "')";

    }
    else{//if strProdName isn't specified just pick the first at the nth level
        strSelector = "#451qa_list_variants li:eq(" + intNthVariant + ") div a"; //this may function incorrectly until the header <TR> is changed to <TH> or something else
    }

    element(strSelector).click();
}

//inside product functions (changing, checking, etc)
function e2eChangeProdQty(blnRestrictedQty,intQty){

    if(blnRestrictedQty){ //if restricted quantity we use the select box, otherwise the input box
        //keep in mind the selectbox is 0 based, conditional upon the options presented, so the 1st option is 0, 2nd option is 1, and so on, not necessarily qty 0, qty 2, qty 4, etc
        select("lineitem.Quantity").option(intQty);
    }
    else{
        input("lineitem.Quantity").enter(intQty);
    }
}

function e2eCheckButtonStatus(blnShouldItBeEnabled){
    if(blnShouldItBeEnabled){
        expect(element("#451_btn_orderadd i.ng-hide").count()).toBeGreaterThan(0); //if the icon (i) is hidden, the form is valid
    }
    else{
        expect(element("#451_btn_orderadd i.ng-hide").count()).toBe(0); //if the icon (i) is shown, the form is invalid
    }
}

function e2eCheckLineItemTotal(intExpectedPrice){
    expect(element("#451qa_lineitem_total").text()).toContain((intExpectedPrice).formatMoney(2));
}


function verifyStaticSpecRow(strGroup,intRow,strLabel,strValue){
    expect(element('.451qa_sg_item:contains("' + strGroup + '") ~ li div:eq(' + intRow + ') span:first').text()).toBe(strLabel);
    expect(element('.451qa_sg_item:contains("' + strGroup + '") ~ li div:eq(' + intRow + ') span:eq(1)').text()).toBe(strValue);
}

//TODO - let's add a set of VSPEC changing and checking functions here
function e2eChangeTextSpec(strSpecName, strSpecValue){

    using('#451_list_vspec label:contains("' + strSpecName + '") ~').input("customfield.Value").enter(strSpecValue);
}
function e2eChangeSelectionSpec(strSpecName,strSpecValue,blnOther,strOtherValue){

    if(blnOther){
        using('#451_list_vspec label:contains("' + strSpecName + '") ~').select("item").option("Other");
        using('#451_list_vspec label:contains("' + strSpecName + '") ~').input("other").enter(strOtherValue);
    }
    else{
        using('#451_list_vspec label:contains("' + strSpecName + '") ~').select("item").option(strSpecValue);
    }
}

function e2eCheckTextSpec(strSpecName,strDefault,strPre,strSuf){
    if(strPre != ""){
        expect(element('#451_list_vspec label:contains("' + strSpecName + '") ~ span:eq(0)').text()).toBe(strPre);
    }
    expect(using('#451_list_vspec label:contains("' + strSpecName + '") ~').input("customfield.Value").val()).toBe(strDefault);
    if(strSuf != ""){
        expect(element('#451_list_vspec label:contains("' + strSpecName + '") ~ span:eq(1)').text()).toBe(strSuf);
    }
}
function e2eCheckSelectionSpec(strSpecName,strDefault,arrOptions,strPre,strSuf){

    var blnTruthy = element('#451_list_vspec label:contains("' + strSpecName + '") ~ select option').query(function (selectedElements, done) {
        for(var i=0; i < selectedElements.length; i++){
            if(arrOptions[i] == selectedElements[i].text){
                blnTruthy = true;
            }
            else{
                blnTruthy= false
                console.log("mismatched element was:" + i)
                break;
            }
        }
        done(null,blnTruthy);

    });

    expect(blnTruthy).toEqual(true);  //compared the elements in the option list

    if(strPre != ""){
        expect(element('#451_list_vspec label:contains("' + strSpecName + '") ~ div').text()).toBe(strPre);
    }

    expect(using('#451_list_vspec label:contains("' + strSpecName + '") ~').input("item").val()).toBe(strDefault);

    if(strSuf != ""){
        expect(element('#451_list_vspec label:contains("' + strSpecName + '") ~ span').text()).toBe(strSuf);
    }
}


function verifyVariantRow(intRow,strLabel,strDescription){
    expect(element('#451qa_list_variants li:eq(' + intRow + ') div a h5 strong').text()).toBe(strLabel);
    expect(element('#451qa_list_variants li:eq(' + intRow + ') div p:eq(0)').text()).toBe(strDescription);

}