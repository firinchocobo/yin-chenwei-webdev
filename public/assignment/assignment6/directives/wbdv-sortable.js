(function () {
    angular
        .module("wbdvDirectives", [])
        .directive('wdDraggable', wdDraggable);

    function wdDraggable($http, $routeParams) {

        var pageId = $routeParams.pid;

        function sendPosition(index1, index2) {
            var url = '/api/page/' + pageId + '/widget?initial=' + index1 + '&final=' + index2;
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

                stop: function (event, ui) {
                    var index2 = ui.item.index();
                    ui.item.data('index2', index2);
                    sendPosition(ui.item.data('index1'), ui.item.data('index2'));
                    // var sortedIDs = $(element).sortable( "toArray" );
                }
            });
        }

        return {
            restrict: 'A',
            link: linkFunction
            // template: "123"
        }
    }
})();
