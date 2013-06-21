'use strict';
//this file contains test specs for directives.js

//very helpful tutorial/article on directives:
//http://onehungrymind.com/angularjs-directives-basics/

//when testing directives... the restrict property determines whether the directive is for an "A"ttribute or "E"element.

//these tests don't do much other than verify the directives are applied...the text they are being compared to comes from the innerHTML of the console.dir.
describe('$451 textuserfield Directive:',function(){

    var $451, $compile, $rootScope, scope;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_, _$rootScope_, _$compile_) {
        $451 = _$451_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    it('Should only replace textuserfield elements, not textuserfield attributes', function(){

        var element=$compile('<foo textuserfield="bar"/>')(scope);
        expect(element.html()).toEqual('');
    });
    it('Should replace textuserfield elements with a customized input tag', function(){

        var element=$compile("<textuserfield></textuserfield>")(scope);
        expect(element.html()).toEqual('<input placeholder="{{field.Label}}" ui-mask="{{field.MaskedInput}}" type="text" ng-required="{{field.IsRequired}}" ng-model="field.Value" class="ng-pristine ng-valid">');
    });

    it('Should replace {{values}} with scope variables if present', function(){

        scope.field = {Label: "thelabel", MaskedInput: "themaskedinput", IsRequired: true};

        var element=$compile("<textuserfield></textuserfield>")(scope);
        scope.$digest();

        expect(element.html()).toEqual('<input placeholder="thelabel" ui-mask="themaskedinput" type="text" ng-required="true" ng-model="field.Value" class="ng-pristine ng-invalid ng-invalid-required" required="required">');
    });
    //TODO- test that data binding works; when the field gets a value populated into it verify the model works

});
describe('$451 selectionuserfield Directive:',function(){

    var $451, $compile, $rootScope, scope;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_, _$rootScope_, _$compile_) {
        $451 = _$451_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    it('Should only replace selectionuserfield elements, not selectionuserfield attributes', function(){

        var element=$compile('<foo selectionuserfield="bar"/>')(scope);
        expect(element.html()).toEqual('');
    });
    it('Should replace selectionuserfield with a customized select/options input if its not radiobuttons', function(){

        scope.field = {Label: "thelabel", IsRadioButtons: false, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<selectionuserfield></selectionuserfield>")(scope);
        scope.$apply();

        expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngIf: field.Options && !field.IsRadioButtons && field.DisplayToUser --><select ng-model="field.Value" ng-options="option.ID as option.Value for option in field.Options" ng-if="field.Options &amp;&amp; !field.IsRadioButtons &amp;&amp; field.DisplayToUser" class="ng-scope ng-pristine ng-valid"><option value="?" selected="selected"></option><option value="0">optionValue1</option><option value="1">optionValue2</option><option value="2">optionValue3</option></select>');
    });
    it('Should create specific array of option elements', function(){

        scope.field = {Label: "thelabel", IsRadioButtons: false, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<selectionuserfield></selectionuserfield>")(scope);
        scope.$apply();

        expect(element.find('option').length).toBe(3); //we put 3 options in the Options object above

    });
    it('Should NOT replace selectionuserfield with a customized select/options input if radiobuttons true', function(){

        scope.field = {Label: "thelabel", IsRadioButtons: true, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<selectionuserfield></selectionuserfield>")(scope);
        scope.$apply();

        expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngIf: field.Options && !field.IsRadioButtons && field.DisplayToUser -->');

    });
    it('Should NOT replace selectionuserfield with a customized select/options input if displaytouser false', function(){

        scope.field = {Name:"selectName", Label: "thelabel", IsRadioButtons: false, DisplayToUser: false, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<selectionuserfield></selectionuserfield>")(scope);
        scope.$apply();
        expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngIf: field.Options && !field.IsRadioButtons && field.DisplayToUser -->');
    });
    it('Should update model when a select option is clicked', function(){

        scope.field = {Name:"selectName", Label: "thelabel", IsRadioButtons: false, DisplayToUser: true, Options: [{Name:"optionName1", ID: "optionID1", Value: "optionValue1"},{Name:"optionName2", ID: "optionID2", Value: "optionValue2"},{Name:"optionName3",ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<selectionuserfield></selectionuserfield>")(scope);
        scope.$apply();
        console.dir(element.html());
        console.dir(element.find('option'));
        element.find('option')[2].click();

        expect(scope.field.Value).toEqual("1")
        console.dir(scope.field);
        expect(scope.field.Value).not.toEqual("2")
        //expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngRepeat: option in field.Options --><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID1" class="ng-pristine ng-valid">optionValue1<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID2" class="ng-valid ng-dirty">optionValue2<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID3" class="ng-pristine ng-valid">optionValue3<br></span>');
    });
});
describe('$451 radiobuttonuserfield Directive:',function(){

    var $451, $compile, $rootScope, scope;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_, _$rootScope_, _$compile_) {
        $451 = _$451_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    it('Should only replace radiobuttonuserfield elements, not radiobuttonuserfield attributes', function(){

        var element=$compile('<foo radiobuttonuserfield="bar"/>')(scope);
        expect(element.html()).toEqual('');
    });
    it('Should replace radiobuttonuserfield with a customized bank of radio buttons', function(){

        scope.field = {Name: "fieldName", Label: "thelabel", IsRadioButtons: true, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<radiobuttonuserfield></radiobuttonuserfield>")(scope);
        scope.$apply();
        expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngRepeat: option in field.Options --><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID1" class="ng-pristine ng-valid">optionValue1<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID2" class="ng-pristine ng-valid">optionValue2<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID3" class="ng-pristine ng-valid">optionValue3<br></span>');

    });
    it('Should create specific array of radio buttons', function(){

        scope.field = {Name: "fieldName", Label: "thelabel", IsRadioButtons: true, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<radiobuttonuserfield></radiobuttonuserfield>")(scope);
        scope.$apply();
        expect(element.find('input').length).toBe(3);

    });
    it('Should update model when a radio button is clicked', function(){

        scope.field = {Name: "fieldName", Label: "thelabel", IsRadioButtons: true, DisplayToUser: true, Options: [{ID: "optionID1", Value: "optionValue1"},{ID: "optionID2", Value: "optionValue2"},{ID: "optionID3", Value: "optionValue3"}]};

        var element=$compile("<radiobuttonuserfield></radiobuttonuserfield>")(scope);
        scope.$apply();

        element.find('input')[1].click(); //what happens is the second input item gets marked as dirty by angular (class ng-pristine changes to ng-dirty)
        expect(scope.field.Value).toEqual("optionID2")
        expect(scope.field.Value).not.toEqual("optionID3")
        expect(element.html()).toEqual('<label class="ng-binding">thelabel</label><!-- ngRepeat: option in field.Options --><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID1" class="ng-pristine ng-valid">optionValue1<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID2" class="ng-valid ng-dirty">optionValue2<br></span><span ng-repeat="option in field.Options" class="ng-scope ng-binding"><input type="radio" name="fieldName" ng-model="field.Value" value="optionID3" class="ng-pristine ng-valid">optionValue3<br></span>');
    });
});
describe('$451 authorization Directive:',function(){

    var $451, $compile, $rootScope, scope;
    beforeEach(module('451order'));
    beforeEach(inject(function(_$451_, _$rootScope_, _$compile_) {
        $451 = _$451_;
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        scope = $rootScope.$new();
    }));

    it('Should only replace authorization attributes, not authorization elements', function(){

        var element=$compile('<authorization foo="bar"/>')($rootScope);
        expect(element.html()).toEqual('');
    });
    it('Should replace authorization attributes with proper authorization string', function(){

        var element=$compile("<a authorization name='phud'></a>")($rootScope);
        //TODO- figure out how this is supposed to work so we can write a test against it
        //console.dir(element);
        //expect(element.html()).toEqual('<input placeholder="{{field.Label}}" ui-mask="{{field.MaskedInput}}" type="text" ng-required="{{field.IsRequired}}" ng-model="field.Value" class="ng-pristine ng-valid">');
    });

});