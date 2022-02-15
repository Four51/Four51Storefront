angular.module('OrderCloud-CategoryCollapse', []);

angular.module('OrderCloud-CategoryCollapse')
    .directive('categorycollapse', categorycollapse)
    .directive('collapsenode', collapsenode)
;

function categorycollapse() {
    var directive = {
        restrict: 'E',
        scope: {
            tree: '=',
            current: '='
        },
        template: template
    };
    return directive;

    function template() {
        return [
            '<ul>',
            '<collapsenode class="nav" ng-repeat="node in tree" node="node" current="current"></collapsenode>',
            '</ul>'
        ].join('');
    }
}

collapsenode.$inject = ['$compile'];
function collapsenode($compile) {
    var directive = {
        restrict: 'E',
        replace: true,
        scope: {
            node: '=',
            current: '='
        },
        template: template,
        link: function(scope, element) {
            scope.toggle = function() {
                scope.node.expanded = !scope.node.expanded;
            };
            if (angular.isArray(scope.node.SubCategories)) {
                element.append($compile("<categorytree collapse='!node.expanded' tree='node.SubCategories' current='current'/>")(scope));
            }
        }
    };
    return directive;

    function template() {
        return [
            '<li class="451_cat_item" ng-class="{\'active\':  current.InteropID == node.InteropID}">',
            '<a ng-show="node.SubCategories" ng-click="toggle()">{{node.Name}}&nbsp;<i class="fa fa-caret-down"></i></a>',
            '<a ng-hide="node.SubCategories" ng-href="catalog/{{node.InteropID}}" ng-bind-html="node.Name"></a>',
            '</li>'
        ].join('');
    }
}
