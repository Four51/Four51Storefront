angular.module('OrderCloud-SpecForms', []);

angular.module('OrderCloud-SpecForms')
    .directive('ocmaskfield', ocmaskfield)
    .directive('jmask', ocmask)
    .directive('occasefield', occasefield)
    .directive('octitlefield', octitlefield)
    .directive('octextfield', octextfield)
    .directive('ocemailfield', ocemailfield)
    .directive('ocselectionfield', ocselectionfield)
    .directive('ocfilefield', ocfilefield)
    .directive('ocdatefield', ocdatefield)
    .directive('octimefield', octimefield)
    .directive('occheckboxfield', occheckboxfield)
    .directive('octextboxfield', octextboxfield)
;

function ocmaskfield() {
    var directive = {
        scope: {
            customfield : '=',
            changed: '=',
            hidesuffix: '@',
            hideprefix: '@',
            label: '@',
            mask: '@'
        },
        restrict: 'E',
        template: template
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div ng-if="customfield.Lines <= 1">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input class="form-control" size="{{customfield.Width * .13}}" ng-maxlength="{{customfield.MaxLength}}" jmask="{{customfield.MaskedInput || mask}}" type="text" autocomplete="off" ng-required="{{customfield.Required}}" ng-model="customfield.Value">',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

function ocmask() {
    var directive = {
        restrict: 'A',
        link: link
    };
    return directive;

    function link(scope, elem, attr, ctrl) {
        if (attr.jmask)
            elem.mask(attr.jmask, { placeholder: attr.maskPlaceholder });
    }
}

function occasefield() {
    var directive = {
        scope: {
            customfield : '=',
            changed: '=',
            label: '@',
            placeholder: '@',
            hidesuffix: '@',
            hideprefix: '@',
            case: '@'
        },
        restrict: 'E',
        template: template,
        link: function (scope) {
            scope.$watch('customfield.Value', function(val) {
                if (!val) return;
                scope.customfield.Value =  val[scope.case == 'upper' ? 'toUpperCase' : 'toLowerCase']();
            });
        }
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div>',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input class="form-control" placeholder="{{placeholder || label || customfield.Label || customfield.Name}}" size="{{customfield.Width * .13}}" ng-maxlength="{{customfield.MaxLength}}" ui-mask="{{customfield.MaskedInput}}" type="text" autocomplete="off" ng-required="{{customfield.Required}}" ng-model="customfield.Value">',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

function octitlefield() {
    var directive = {
        scope: {
            customfield : '=',
            changed: '=',
            label: '@',
            placeholder: '@',
            hidesuffix: '@',
            hideprefix: '@',
            case: '@'
        },
        restrict: 'E',
        template: template,
        link: function (scope) {
            String.prototype.toTitleCase = function() {
              var i, j, str, lowers, uppers;
              str = this.replace(/\b[\w-\']+/g, function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
              });

              // Certain minor words should be left lowercase unless 
              // they are the first or last words in the string
              lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At', 
              'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
              for (i = 0, j = lowers.length; i < j; i++)
                str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'), 
                  function(txt) {
                    return txt.toLowerCase();
                  });

              // Certain words such as initialisms or acronyms should be left uppercase
              uppers = ['Id', 'Tv'];
              for (i = 0, j = uppers.length; i < j; i++)
                str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'), 
                  uppers[i].toUpperCase());

              return str;
            }

            scope.$watch('customfield.Value', function(val) {
                if (!val) return;
                scope.customfield.Value =  val.toTitleCase();
            });
        }
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div>',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input class="form-control" placeholder="{{placeholder || label || customfield.Label || customfield.Name}}" size="{{customfield.Width * .13}}" ng-maxlength="{{customfield.MaxLength}}" ui-mask="{{customfield.MaskedInput}}" type="text" autocomplete="off" ng-required="{{customfield.Required}}" ng-model="customfield.Value">',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

function octextfield() {
    var directive = {
        scope: {
            customfield : '=',
            changed: '=',
            label: '@',
            placeholder: '@',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        transclude: true,
        template: template
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div ng-if="customfield.Lines <= 1">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input class="form-control" placeholder="{{placeholder || label || customfield.Label || customfield.Name}}" size="{{customfield.Width * .13}}" ng-maxlength="{{customfield.MaxLength}}" jmask="{{customfield.MaskedInput}}" type="text" autocomplete="off" ng-required="{{customfield.Required}}" ng-model="customfield.Value">',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '<div ng-if="customfield.Lines > 1">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<textarea class="form-control"  ng-attr-placeholder="{{placeholder || label || customfield.Label || customfield.Name}}" cols="{{customfield.Width * .13}}" rows="{{customfield.Lines}}" ng-maxlength="{{customfield.MaxLength}}" ng-required="{{customfield.Required}}" ng-model="customfield.Value"></textarea>',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

function ocemailfield() {
    var directive = {
        scope: {
            customfield : '=',
            changed: '=',
            label: '@',
            placeholder: '@',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        transclude: true,
        template: template
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div ng-if="customfield.Lines <= 1">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input class="form-control" placeholder="{{placeholder || label || customfield.Label || customfield.Name}}" size="{{customfield.Width * .13}}" ng-maxlength="{{customfield.MaxLength}}" jmask="{{customfield.MaskedInput}}" type="email" autocomplete="off" ng-required="{{customfield.Required}}" ng-model="customfield.Value">',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>',
            '</div>'
        ].join('');
    }
}

ocselectionfield.$inject = ['$451'];
function ocselectionfield($451) {
    var directive = {
        scope: {
            customfield : '=',
            change: '=',
            label: '@',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        transclude: true,
        template: template,
        link: OCSelectionFieldLink
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon" ng-class="{\'view-form-icon-input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<div>',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon"  ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<select class="form-control" ng-init="init()" ng-required="customfield.Required" ng-change="changed()" ng-model="item" ng-options="option.Value for option in customfield.Options" ng-if="customfield.Options">',
            '<option value=""></option></select>',
            '<input class="form-control" type="text" ng-change="otherChanged()" ng-model="other" ng-show="customfield.isOtherSelected" autocomplete="off" ng-required="customfield.Required && customfield.isOtherSelected" />',
            '<span class="input-group-addon"  ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '<i class="fa fa-edit"></i>',
            '</div>',
            '</div>'
        ].join('');
    }

    function OCSelectionFieldLink(scope, element, attr) {
        scope.changed = function() {
            //reset values
            scope.customfield.isOtherSelected = false;
            angular.forEach(scope.customfield.Options, function(opt) {
                opt.Selected = false;
            });
            // end reset
            scope.customfield.Value = this.item == null ? null : this.item.Value;
            scope.customfield.SelectedOptionID = this.item == null ? null : this.item.ID;
            if (this.item != null) this.item.Selected = true;

            if (this.item != null && this.item.Value.indexOf('Other') > -1 && this.item.ID.indexOf('_other') > -1) {
                scope.customfield.isOtherSelected = true;
                this.item.Selected = true;
                scope.customfield.SelectedOptionID = this.item.ID;
                scope.customfield.Value = scope.other;
            }
            if (scope.change)
                scope.change(scope.customfield);
        };
        scope.otherChanged = function() {
            scope.customfield.isOtherSelected = true;
            scope.customfield.Value = scope.other;
            if (scope.change)
                scope.change(scope.customfield);
        };
        scope.item = {}, scope.other = ''; // initialize the item variable to avoid checking for null

        scope.init = function() {
            var id = scope.customfield.Value != null ? scope.customfield.Options[scope.customfield.Options.length-1].ID : scope.customfield.DefaultOptionID;
            var matched = false;
            angular.forEach(scope.customfield.Options, function(n,i) {
                if (matched) return;
                if (scope.customfield.Value == n.Value) {
                    id = n.ID;
                    matched = true;
                }
                if  (scope.customfield.Value == null) {
                    id = scope.customfield.DefaultOptionID;
                    if (id != null) scope.customfield.Value = $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0].Value;
                    matched = true;
                }
            });
            this.item = scope.customfield.Value != null ? $451.filter(scope.customfield.Options, { 'Property': 'ID', 'Value': id })[0] : null;
            if (this.item && this.item.Value == 'Other') {
                scope.other = scope.customfield.Value;
                this.otherChanged();
            }
        };
    }
}

ocfilefield.$inject = ['$parse', '$resource', '$451', 'fileReader', 'Security'];
function ocfilefield($parse, $resource, $451, fileReader, Security) {
    var directive = {
        scope: {
            customfield: '=',
            label: '@',
            replace: '@ngModel'
        },
        restrict: 'E',
        template: template,
        replace: true,
        link: OCFileFieldLink
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon">',
            '<div class="fileInput">',
            '<loadingindicator ng-show="uploadFileIndicator" title="Uploading"/>',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<img ng-show="customfield.File.IsImage && customfield.FileType == \'Image\'" ng-src="{{customfield.File.Url}}">',
            '<a ng-href="{{customfield.File.Url}}">{{customfield.File.OriginalName}}</a>',
            '<div ng-show="customfield.File">',
            '<input name="replace" class="replace" type="checkbox" ng-model="replace"> Replace',
            '<input name="delete" class="delete" type="checkbox"> Delete',
            '</div>',
            '<div ng-show="replace || !customfield.File" ng-class="{\'file-upload-required text-danger\': customfield.Required }" class="btn btn-default">',
            '<i class="fa fa-upload"></i> Upload File',
            '<input name="upload" class="upload" type="file">',
            '</div>',
            '<hr />',
            '<input type="hidden" ng-required="customfield.Required" ng-model="customfield.File.ID">',
            '<div class="error ui-state-error-text text-danger"></div>',
            '<div class="alert alert-info" ng-show="replace || !customfield.File">',
            '{{customfield.UploadInstructions}}',
            '<ul ng-show="replace || !customfield.File">',
            '<li>Allowed File Types: {{customfield.AllowedExt}}</li>',
            '<li ng-if="customfield.MinSize > 0">Minimum File Size: {{customfield.MinSize}}</li>',
            '<li ng-if="customfield.MaxSize > 0">Maximum File Size: {{customfield.MaxSize}}</li>',
            '<li ng-if="customfield.MinHeight > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Minimum Height: {{customfield.MinHeight + \' px\'}}</li>',
            '<li ng-if="customfield.MaxHeight > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Maximum Height: {{customfield.MaxHeight + \' px\'}}</li>',
            '<li ng-if="customfield.MinWidth > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Minimum Width: {{customfield.MinWidth + \' px\'}}</li>',
            '<li ng-if="customfield.MaxWidth > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Maximum Width: {{customfield.MaxWidth + \' px\'}}</li>',
            '<li ng-if="customfield.MinDPI > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Minimum DPI: {{(customfield.MinDPI) + \' dpi\'}}</li>',
            '<li ng-if="customfield.MaxDPI > 0 && (customfield.File.IsImage || customfield.FileType == \'Image\')">Maximum DPI: {{(customfield.MaxDPI) + \' dpi\'}}</li>',
            '</ul>',
            '</div>',
            '</div>',
            '</div>'

        ].join('');
    }

    function OCFileFieldLink(scope, element, attrs) {
        var cache = angular.copy(scope.customfield);
        var file_input = $parse("file");
        var replace_box = $('.replace', element)[0];
        var delete_box = $('.delete', element)[0];
        var file_control = $('.upload', element)[0];
        var error_element = $('.error', element)[0];

        var afterSelection = function(file) {
            scope.uploadFileIndicator = true;
            $resource($451.api('uploadfile')).save({ Data: file.result, Name: file_control.files[0].name, ID: scope.customfield.ID, SourceType: scope.customfield.SourceType, SourceID: scope.customfield.SourceID }).$promise.then(function(u) {
                u.Url += "&auth=" + Security.auth();
                scope.customfield.File = u;
                scope.customfield.Value = u.ID;
                scope.uploadFileIndicator = false;
            }).catch(function(ex) {
                error_element.innerHTML = (!ex.data.Message) ?
                    "An error occurred. Please select a new file and try again." :
                    ex.data.Message;
                scope.uploadFileIndicator = false;
            });
        };

        var reset = function() {
            scope.$apply(function() {
                scope.customfield = angular.copy(cache);
            });
        };

        var updateModel = function (event) {
            error_element.innerHTML = "";
            switch (event.target.name) {
                case "delete":
                    scope.replace = false;
                    if (event.target.checked) {
                        scope.$apply(function() {
                            scope.customfield.File = null;
                            scope.customfield.Value = null;
                            replace_box.checked = false;
                        });
                        break;
                    }
                    reset();
                    break;
                case "replace":
                    if (delete_box.checked) {
                        scope.customfield = cache;
                        reset();
                        delete_box.checked = false;
                    }
                    if (!event.target.checked && cache.Value) {
                        reset();
                    }
                    break;
                case "upload":
                    if (event.target.files[0] == null) return;
                    scope.$apply(function () {
                        fileReader.readAsDataUrl(event.target.files[0], scope)
                            .then(afterSelection);
                        file_input.assign(scope,  event.target.files[0]);
                    });
                    scope.replace = replace_box.checked = false;
                    scope.delete = delete_box.checked = false;
                    break;
            }
        };
        element.bind('change', updateModel);
    }
}

ocdatefield.$inject = ['$filter'];
function ocdatefield($filter) {
    var directive = {
        scope: {
            customfield : '=',
            label: '@',
            hidesuffix: '@',
            hideprefix: '@',
            format: '@'
        },
        restrict: 'E',
        template: template,
        link: function (scope) {
            scope.$watch('customfield.Date', function (newVal){
                if (!newVal) return;
                scope.customfield.Value = $filter('date')(scope.customfield.Date, scope.format);
            });
            scope.$watch('customfield.Value', function (newVal){
                if (!newVal) return;
                scope.customfield.Date = new Date(getDateFromFormat(scope.customfield.Value, scope.format));
            });
        }
    };
    return directive;

    function template() {
        return [
            '<div class="view-form-icon">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<input is-open="fieldopened" datepicker-popup="{{format}}" class="form-control" type="text" ng-required="customfield.Required" ng-model="customfield.Date"/>',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '<i class="fa fa-calendar"></i>',
            '</div>',
            '<div class="btn btn-default btn-block btn-date hidden-lg hidden-md" ng-click="$event.preventDefault();$event.stopPropagation();fieldopened = !fieldopened;" style="margin:0; height:40px; padding-top:8px;">{{(customfield.Date | date: format) ? \'\' : \'Tap\'}}<span class="text-info">{{customfield.Date | date: format}}</span> </div>',
            '</div>'
        ].join('');
    }
}

octimefield.$inject = ['$filter'];
function octimefield($filter) {
    var directive = {
        scope: {
            customfield : '=',
            label: '@',
            hidesuffix: '@',
            hideprefix: '@'
        },
        restrict: 'E',
        template: template,
        link: function (scope) {
            scope.$watch('customfield.Time', function(newVal) {
                if (!newVal) return;
                scope.customfield.Value = $filter('date')(scope.customfield.Time, 'shortTime');
            });
            scope.$watch('customfield.Value', function(newVal){
                if (!newVal) return;
                var dateParts = scope.customfield.Value.split(':');
                var hours = parseInt(dateParts[0]);
                var minutes = parseInt(dateParts[1].split(' ')[0]);
                var meridian = dateParts[1].split(' ')[1];
                if ((meridian == 'PM' && hours != 12) || (meridian == 'AM' && hours == 12))
                    hours = hours + 12;
                scope.customfield.Time = new Date();
                scope.customfield.Time.setHours(hours);
                scope.customfield.Time.setMinutes(minutes);
            });
        }
    };
    return directive;

    function template() {
        return [
            '<div class="form-group">',
            '<label class="small" ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}</label>',
            '<div ng-class="{\'input-group\':((customfield.Prefix && !hideprefix) || (customfield.Suffix && !hidesuffix))}">',
            '<span class="input-group-addon" ng-if="customfield.Prefix && !hideprefix && !((customfield.Prefix) == \'\')">{{customfield.Prefix}}</span>',
            '<timepicker ng-model="customfield.Time" show-meridian="true"></timepicker>',
            '<span class="input-group-addon" ng-if="customfield.Suffix && !hidesuffix && !((customfield.Suffix) == \'\')">{{customfield.Suffix}}</span>',
            '</div>',
            '</div>'
        ].join('');
    }
}

function occheckboxfield() {
    var directive = {
        scope: {
            customfield : '=',
            label: '@',
            checked: '@',
            unchecked: '@'
        },
        restrict: 'E',
        template: template
    };
    return directive;

    function template() {
        return [
            '<div class="checkbox">',
            '<label ng-class="{\'required\': customfield.Required}">{{label || customfield.Label || customfield.Name}}',
            '<input type="checkbox" ng-true-value="{{checked}}" ng-false-value="{{unchecked}}" ng-model="customfield.Value">',
            '</label>',
            '</div>',
        ].join('');
    }
}

function octextboxfield() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, elm, attr, ngModel) {
            /* Replace whatever element this directive is on with a ck-editor */
            var ck = CKEDITOR.replace(elm[0], {
                removeButtons: 'Source,NumberedList,BulletedList,Outdent,Indent,Link,Unlink,Anchor'
                /* remove or add any custom buttons as needed here */
            });

            /* Take no additional action if there is no ngModel value on the element */
            if(!ngModel) return;

            /* Directive detects that text has been pasted in from the clipboard */
            ck.on('pasteState', function() {
                scope.$apply(function() {
                    ngModel.$setViewValue(ck.getData());
                });
            });

            /* When the text is changed the ng-model value is updated */
            ngModel.$render = function() {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
}

/*
 jQuery Masked Input Plugin
 Copyright (c) 2007 - 2014 Josh Bush (digitalbush.com)
 Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
 Version: 1.4.0
 */
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin,
                this.each(function() {
                    this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(),
                        range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin),
                        range.select());
                })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(),
                begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length),
            {
                begin: begin,
                end: end
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length,
                firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])),
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function androidInputEvent() {
                    var curVal = input.val(), pos = input.caret();
                    if (curVal.length < oldVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
                        if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(),
                            begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1),
                            end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1),
                            e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText),
                            input.caret(0, checkVal()), e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)),
                                    p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1),
                                tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) {
                            clearBuffer(i + 1, len);
                            break;
                        }
                    } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""),
                        clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))),
                        partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                            writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos);
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent),
                    checkVal();
            });
        }
    });
});

/* Extra functions for ocdatefield */
// ===================================================================
// Author: Matt Kruse <matt@mattkruse.com>
// WWW: http://www.mattkruse.com/
//
// NOTICE: You may use this code for any purpose, commercial or
// private, without any further permission from the author. You may
// remove this notice from your final code if you wish, however it is
// appreciated by the author if at least my web site address is kept.
//
// You may *NOT* re-distribute this code in any way except through its
// use. That means, you can include it in your product, or your web
// site, or any other form where the code is actually being used. You
// may not put the plain javascript up on your site for download or
// include it in your javascript libraries for download.
// If you wish to share this code with others, please just point them
// to the URL instead.
// Please DO NOT link directly to my .js files from your site. Copy
// the files to your server and use them there. Thank you.
// ===================================================================
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');
var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}
// ------------------------------------------------------------------
// getDateFromFormat( date_string , format_string )
//
// This function takes a date string and a format string. It matches
// If the date string matches the format string, it returns the
// getTime() of the date. If it does not match, it returns 0.
// ------------------------------------------------------------------
function getDateFromFormat(val,format) {
    val=val+"";
    format=format+"";
    var i_val=0;
    var i_format=0;
    var c="";
    var token="";
    var token2="";
    var x,y;
    var now=new Date();
    var year=now.getYear();
    var month=now.getMonth()+1;
    var date=1;
    var hh=now.getHours();
    var mm=now.getMinutes();
    var ss=now.getSeconds();
    var ampm="";

    while (i_format < format.length) {
        // Get next token from format string
        c=format.charAt(i_format);
        token="";
        while ((format.charAt(i_format)==c) && (i_format < format.length)) {
            token += format.charAt(i_format++);
        }
        // Extract contents of value based on format token
        if (token=="yyyy" || token=="yy" || token=="y") {
            if (token=="yyyy") { x=4;y=4; }
            if (token=="yy")   { x=2;y=2; }
            if (token=="y")    { x=2;y=4; }
            year=_getInt(val,i_val,x,y);
            if (year==null) { return 0; }
            i_val += year.length;
            if (year.length==2) {
                if (year > 70) { year=1900+(year-0); }
                else { year=2000+(year-0); }
            }
        }
        else if (token=="MMM"||token=="NNN"){
            month=0;
            for (var i=0; i<MONTH_NAMES.length; i++) {
                var month_name=MONTH_NAMES[i];
                if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
                    if (token=="MMM"||(token=="NNN"&&i>11)) {
                        month=i+1;
                        if (month>12) { month -= 12; }
                        i_val += month_name.length;
                        break;
                    }
                }
            }
            if ((month < 1)||(month>12)){return 0;}
        }
        else if (token=="EE"||token=="E"){
            for (var i=0; i<DAY_NAMES.length; i++) {
                var day_name=DAY_NAMES[i];
                if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
                    i_val += day_name.length;
                    break;
                }
            }
        }
        else if (token=="MM"||token=="M") {
            month=_getInt(val,i_val,token.length,2);
            if(month==null||(month<1)||(month>12)){return 0;}
            i_val+=month.length;}
        else if (token=="dd"||token=="d") {
            date=_getInt(val,i_val,token.length,2);
            if(date==null||(date<1)||(date>31)){return 0;}
            i_val+=date.length;}
        else if (token=="hh"||token=="h") {
            hh=_getInt(val,i_val,token.length,2);
            if(hh==null||(hh<1)||(hh>12)){return 0;}
            i_val+=hh.length;}
        else if (token=="HH"||token=="H") {
            hh=_getInt(val,i_val,token.length,2);
            if(hh==null||(hh<0)||(hh>23)){return 0;}
            i_val+=hh.length;}
        else if (token=="KK"||token=="K") {
            hh=_getInt(val,i_val,token.length,2);
            if(hh==null||(hh<0)||(hh>11)){return 0;}
            i_val+=hh.length;}
        else if (token=="kk"||token=="k") {
            hh=_getInt(val,i_val,token.length,2);
            if(hh==null||(hh<1)||(hh>24)){return 0;}
            i_val+=hh.length;hh--;}
        else if (token=="mm"||token=="m") {
            mm=_getInt(val,i_val,token.length,2);
            if(mm==null||(mm<0)||(mm>59)){return 0;}
            i_val+=mm.length;}
        else if (token=="ss"||token=="s") {
            ss=_getInt(val,i_val,token.length,2);
            if(ss==null||(ss<0)||(ss>59)){return 0;}
            i_val+=ss.length;}
        else if (token=="a") {
            if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
            else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
            else {return 0;}
            i_val+=2;}
        else {
            if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
            else {i_val+=token.length;}
        }
    }
    // If there are any trailing characters left in the value, it doesn't match
    if (i_val != val.length) { return 0; }
    // Is date valid for month?
    if (month==2) {
        // Check for leap year
        if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
            if (date > 29){ return 0; }
        }
        else { if (date > 28) { return 0; } }
    }
    if ((month==4)||(month==6)||(month==9)||(month==11)) {
        if (date > 30) { return 0; }
    }
    // Correct hours value
    if (hh<12 && ampm=="PM") { hh=hh-0+12; }
    else if (hh>11 && ampm=="AM") { hh-=12; }
    var newdate=new Date(year,month-1,date,hh,mm,ss);
    return newdate.getTime();
}
// ------------------------------------------------------------------
// Utility functions for parsing in getDateFromFormat()
// ------------------------------------------------------------------
function _isInteger(val) {
    var digits="1234567890";
    for (var i=0; i < val.length; i++) {
        if (digits.indexOf(val.charAt(i))==-1) { return false; }
    }
    return true;
}
function _getInt(str,i,minlength,maxlength) {
    for (var x=maxlength; x>=minlength; x--) {
        var token=str.substring(i,i+x);
        if (token.length < minlength) { return null; }
        if (_isInteger(token)) { return token; }
    }
    return null;
}