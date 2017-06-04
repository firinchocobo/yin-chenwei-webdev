(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, widgetService) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.checkIfNew = checkIfNew;
        model.deleteWidget = deleteWidget;
        model.funcButton = funcButton;
        model.goBack = goBack;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.displayWidth = [
            {'value': '100%','label':'XL'},
            {'value': '80%','label':'L'},
            {'value': '60%','label':'M'},
            {'value': '40%','label':'S'},
            {'value': '20%','label':'XS'}
        ];
        model.defaultDisplayWidth = model.displayWidth[0].value;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                });
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

        function deleteWidget() {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");

                });
            // $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function widgetUrl(widget) {
            return 'views/widget/editors/widget-' + widget.widgetType.toLowerCase() + '-edit.view.client.html';
        }

        function funcButton() {
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                })
            // $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
        }

        function goBack() {
            if (model.new) {
                model.deleteWidget();
            } else {
                $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
            }
        }
    }
})();