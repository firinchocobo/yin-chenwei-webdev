(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, currentUser, $routeParams, widgetService) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.goBack = goBack;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            model.widgetTypes = ["HEADING", "IMAGE", "YOUTUBE", "HTML", "TEXT"];
            model.currentName = "Choose Widget";
        }

        init();

        function widgetUrl(widgetType) {
            var widget = {
                widgetType: widgetType
            };
            // console.log(widget);
            widgetService
                .createWidget(model.pageId, widget)
                .then(function (widget) {
                    $location.url("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id + "#new");

                });
            // console.log(widgetService.createWidget(model.pageId, widget));
            // $location.url("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + widget._id + "#new");
        }

        function goBack() {
            $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();
