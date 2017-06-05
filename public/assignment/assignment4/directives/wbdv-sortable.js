(function () {
    angular
        .module("wbdvDirectives", [])
        // .controller('controller', function ($scope, WidgetListController) {
        //     $scope.pageId = WidgetListController.pageId;
        // })
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($location, $http, $routeParams) {

        var pageId = $routeParams.pid;
        // var controller = function ($scope) {
        //     $scope.controller = $injector
        // }
        // angular.injector(['WebAppMaker']).invoke(function (WidgetListController) {
        //     console.log(WidgetListController.pageId);
        // });
        // var controller = $injector.get('WidgetListController');
        // var controller = angular.module('WebAppMaker').controller('WidgetListController');

       // var pageId = $location.path().split('/')[6];

        function sendPosition(index1, index2) {

            var url = '/api/page/' + pageId + '/widget?index1=' + index1 + '&index2=' +index2;
            return $http.put(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function linkFunction(scope, element) {
            $(element).sortable({

                start: function (event, ui) {
                    var index1 = ui.item.index();
                    ui.item.data('index1', index1);

                },

                stop: function (event, ui){
                    var index2 = ui.item.index();
                    ui.item.data('index2', index2);
                    sendPosition(ui.item.data('index1'), ui.item.data('index2'));
                    // var sortedIDs = $(element).sortable( "toArray" );
                    // console.log(sortedIDs);
                }

            // sendPosition(index1, index2);
            });

            // var sortedIDs = $(element).sortable( "toArray" );
            // console.log(sortedIDs);
        }
        return {
            restrict: 'A',

            // template: "123"
            link: linkFunction

        }
    }
})();
