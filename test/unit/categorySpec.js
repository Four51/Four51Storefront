'use strict';
//this file contains test specs for categoryCtrl.js and/or categoryService.js?

var C_debug = false;

//let's test that the Category Controller works
describe('$451 Category Controller:',function(){

    //these JSON objects were copied/pasted from actual service responses
    var jsonCategories = [{"Name":"Variable Text","Description":"","InteropID":"VariableText","Image":{"URL":"http://qa.four51.com/images/category/43FBA6F5C56B4DDF94F7EBEDCE3B8627.jpg","x":64,"y":64},"SubCategories":[{"Name":"Training2012","Description":"","InteropID":"25B8D12C-A1C8-4DB7-AA44-4F553A20108F","Image":null,"SubCategories":null}]},{"Name":"Static Product's RQ","Description":"<center>\r\n<h3><b>Welcome [[FirstName]] [[LastName]] [[UserName]]</b></h3>\r\n</center>","InteropID":"StaticProductsRQ","Image":{"URL":"http://qa.four51.com/images/category/FE59666C9E734C76892E05225560907D.gif","x":102,"y":100},"SubCategories":null},{"Name":"Static Products FP","Description":"<br />","InteropID":"StaticProductsFP","Image":{"URL":"http://qa.four51.com/images/category/83afbd3c87fb426c8044fd4b824bee26.jpg","x":130,"y":89},"SubCategories":null},{"Name":"Marketing","Description":"","InteropID":"42C2667E-AAE1-4CAE-9C14-DCC9600CBBF7","Image":{"URL":"http://qa.four51.com/images/category/94d5c40e12dd4ab9ac52f3f396795242.gif","x":94,"y":82},"SubCategories":[{"Name":"Testing","Description":"<br />","InteropID":"0E422425-EDAC-40EE-8865-CC8D3FA298DB","Image":null,"SubCategories":[{"Name":"SDfheisos","Description":"","InteropID":"DE58C7FC-C0E5-4F90-AB83-02E54EB6E00A","Image":null,"SubCategories":[{"Name":"33333","Description":"","InteropID":"3333333","Image":null,"SubCategories":null}]},{"Name":"sdfwerfqwefwf","Description":"","InteropID":"6DB3C5A2-ACC6-45DB-9C56-BCEB23C380A3","Image":{"URL":"http://qa.four51.com/images/category/4FD767EAB9AF446C99EFF0748D269BF7.gif","x":399,"y":180},"SubCategories":null}]}]},{"Name":"Rob's ONC","Description":"","InteropID":"91112932-278C-4028-8EC9-B7399E45FAD5","Image":null,"SubCategories":[{"Name":"Variable Products","Description":"","InteropID":"0FD049FA-CE67-4EC8-9645-A91A3871283B","Image":null,"SubCategories":null}]},{"Name":"Outbound Punchout Test","Description":"","InteropID":"F0D91D25-CD32-40DB-89A9-4D1ECA4CDCAA","Image":null,"SubCategories":null},{"Name":"Flozio","Description":"","InteropID":"4E53758A-713C-437F-B1A3-FE4588AF2261","Image":null,"SubCategories":null}];
    var jsonCategory = {"Name":"Variable Text","Description":"","InteropID":"VariableText","Image":{"URL":"http://qa.four51.com/images/category/43FBA6F5C56B4DDF94F7EBEDCE3B8627.jpg","x":64,"y":64},"SubCategories":[{"Name":"Training2012","Description":"","InteropID":"25B8D12C-A1C8-4DB7-AA44-4F553A20108F","Image":null,"SubCategories":null}]};
    //var jsonCategory = {Name:'Variable Text1', Description:'1', InteropID:'VariableText'};

    var $451, $rootScope, $routeParams, scope, $httpBackend, $http, ctrlCategory, svcCategory;
    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_,$http, _$routeParams_, CategoryService){

        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();
        ctrlCategory = $controller;

        //$httpBackend.expectGET("/api/russ/categories/").respond(jsonCategories);
        //$httpBackend.expectGET("/api/russ/categories/VariableText").respond(jsonCategory);

        $routeParams = _$routeParams_;

        svcCategory = CategoryService;

    }));

    it('Should be a defined object', function(){

        ctrlCategory('CategoryCtrl', {
            $scope: scope
        });

        expect(ctrlCategory).toBeDefined();

    });
    it('Should get data from the service and apply it to the scope (category specified)', function(){

        $routeParams.categoryInteropID = jsonCategory.InteropID;

        $httpBackend.expectGET("/api/russ/categories/" + jsonCategory.InteropID).respond(jsonCategory); //intercept the API call to the service and slip in a mocked category object

        ctrlCategory('CategoryCtrl', {
            $scope: scope
        });

        scope.$apply(); //this does all the magic that triggers the controller and makes the service get the mocked request we set up before
        $httpBackend.flush();

        //let's just test that a few properties are applied and match
        expect(scope.categoryInteropID).toBe(jsonCategory.InteropID);
        expect(scope.currentCategory.Description).toBe(jsonCategory.Description);
        expect(scope.currentCategory.Name).toBe(jsonCategory.Name);
        expect(scope.currentCategory.Image.URL).toBe(jsonCategory.Image.URL);

        //expect(scope.currentCategory).toBe(jsonCategory); //this comparison won't work right now because of an odd angular bug/nuance on the way that the result object is returned


    });
 });

//even though we shouldn't need to, let's test the category service
describe('$451 Category Service:',function(){

    var jsonCategories = [{"Name":"Variable Text","Description":"","InteropID":"VariableText","Image":{"URL":"http://qa.four51.com/images/category/43FBA6F5C56B4DDF94F7EBEDCE3B8627.jpg","x":64,"y":64},"SubCategories":[{"Name":"Training2012","Description":"","InteropID":"25B8D12C-A1C8-4DB7-AA44-4F553A20108F","Image":null,"SubCategories":null}]},{"Name":"Static Product's RQ","Description":"<center>\r\n<h3><b>Welcome [[FirstName]] [[LastName]] [[UserName]]</b></h3>\r\n</center>","InteropID":"StaticProductsRQ","Image":{"URL":"http://qa.four51.com/images/category/FE59666C9E734C76892E05225560907D.gif","x":102,"y":100},"SubCategories":null},{"Name":"Static Products FP","Description":"<br />","InteropID":"StaticProductsFP","Image":{"URL":"http://qa.four51.com/images/category/83afbd3c87fb426c8044fd4b824bee26.jpg","x":130,"y":89},"SubCategories":null},{"Name":"Marketing","Description":"","InteropID":"42C2667E-AAE1-4CAE-9C14-DCC9600CBBF7","Image":{"URL":"http://qa.four51.com/images/category/94d5c40e12dd4ab9ac52f3f396795242.gif","x":94,"y":82},"SubCategories":[{"Name":"Testing","Description":"<br />","InteropID":"0E422425-EDAC-40EE-8865-CC8D3FA298DB","Image":null,"SubCategories":[{"Name":"SDfheisos","Description":"","InteropID":"DE58C7FC-C0E5-4F90-AB83-02E54EB6E00A","Image":null,"SubCategories":[{"Name":"33333","Description":"","InteropID":"3333333","Image":null,"SubCategories":null}]},{"Name":"sdfwerfqwefwf","Description":"","InteropID":"6DB3C5A2-ACC6-45DB-9C56-BCEB23C380A3","Image":{"URL":"http://qa.four51.com/images/category/4FD767EAB9AF446C99EFF0748D269BF7.gif","x":399,"y":180},"SubCategories":null}]}]},{"Name":"Rob's ONC","Description":"","InteropID":"91112932-278C-4028-8EC9-B7399E45FAD5","Image":null,"SubCategories":[{"Name":"Variable Products","Description":"","InteropID":"0FD049FA-CE67-4EC8-9645-A91A3871283B","Image":null,"SubCategories":null}]},{"Name":"Outbound Punchout Test","Description":"","InteropID":"F0D91D25-CD32-40DB-89A9-4D1ECA4CDCAA","Image":null,"SubCategories":null},{"Name":"Flozio","Description":"","InteropID":"4E53758A-713C-437F-B1A3-FE4588AF2261","Image":null,"SubCategories":null}];
    var jsonCategory = {"Name":"Variable Text","Description":"","InteropID":"VariableText","Image":{"URL":"http://qa.four51.com/images/category/43FBA6F5C56B4DDF94F7EBEDCE3B8627.jpg","x":64,"y":64},"SubCategories":[{"Name":"Training2012","Description":"","InteropID":"25B8D12C-A1C8-4DB7-AA44-4F553A20108F","Image":null,"SubCategories":null}]};
    //var jsonCategory = {Name:'Variable Text1', Description:'1', InteropID:'VariableText'};

    var $451, $rootScope, $routeParams, scope, $httpBackend, $http, ctrlCategory, svcCategory;
    beforeEach(module('451order'));

    beforeEach(inject(function($rootScope,$controller,_$httpBackend_,$http, _$routeParams_, CategoryService){

        $httpBackend = _$httpBackend_;
        scope = $rootScope.$new();

        //$httpBackend.expectGET("/api/russ/categories/").respond(jsonCategories);
        //$httpBackend.expectGET("/api/russ/categories/VariableText").respond(jsonCategory);

        svcCategory = CategoryService;

    }));

    it('Should be a defined object', function(){

        expect(svcCategory).toBeDefined();

    });
    it('Should get a tree', function(){

        $httpBackend.expectGET("/api/russ/categories").respond(jsonCategories); //intercept the API call to the service and slip in a mocked category object
        var arrTree = svcCategory.tree();

        scope.$apply(); //this does all the magic that triggers the controller and makes the service get the mocked request we set up before
        $httpBackend.flush();
        console.dir(arrTree);

        expect(arrTree[0].InteropID).toBe(jsonCategories[0].InteropID);
        expect(arrTree[1].InteropID).toBe(jsonCategories[1].InteropID);

        expect(arrTree[0].Description).toBe(jsonCategories[0].Description);
        expect(arrTree[1].Image.URL).toBe(jsonCategories[1].Image.URL);
    });
});

