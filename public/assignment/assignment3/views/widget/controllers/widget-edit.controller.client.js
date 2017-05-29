(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, widgetService) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.checkIfNew = checkIfNew;
        model.funcButton = funcButton;
        model.goBack = goBack;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        function init() {
            model.widget = widgetService.findWidgetById(model.widgetId);
            model.funcButtonPattern = "glyphicon glyphicon-ok";
            checkIfNew();
        }

        init();

        function checkIfNew() {
            if ($location.hash() === "new") {
                model.currentName = "New Widget";
                model.new = true;
            } else {
                model.currentName = "Edit Widget";
                model.edit = true;
            }
        }

        function widgetUrl(widget) {
            return 'views/widget/editors/widget-' + widget.widgetType.toLowerCase() + '-edit.view.client.html';
        }

        function funcButton() {
            widgetService.updateWidget(model.widgetId, model.widget);
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function goBack() {
            widgetService.deleteWidget(model.widgetId);
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }
    }
})();