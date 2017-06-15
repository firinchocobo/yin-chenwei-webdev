(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, currentUser, $routeParams, widgetService) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.deleteWidget = deleteWidget;
        model.funcButton = funcButton;
        model.goBack = goBack;
        model.goSearchImg = goSearchImg;

        model.userId = currentUser._id;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;

        model.displayWidth = [
            {'value': '100%', 'label': 'XL'},
            {'value': '80%', 'label': 'L'},
            {'value': '60%', 'label': 'M'},
            {'value': '40%', 'label': 'S'},
            {'value': '20%', 'label': 'XS'}
        ];
        model.defaultDisplayWidth = model.displayWidth[0].value;

        model.displaySize = [
            {'value': 1, 'label': 'Largest'},
            {'value': 2, 'label': 'Larger'},
            {'value': 3, 'label': 'Large'},
            {'value': 4, 'label': 'Small'},
            {'value': 5, 'label': 'Smaller'},
            {'value': 6, 'label': 'Smallest'}
        ];
        model.defaultDisplaySize = model.displaySize[0].value;

        function init() {
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                }, function () {
                    $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
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
                    $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                }, function () {
                    model.error = "Can't delete website at this moment, try again!";
                });
        }

        function widgetUrl(widget) {
            return 'views/widget/editors/widget-' + widget.widgetType.toLowerCase() + '-edit.view.client.html';
        }

        function funcButton() {
            if (model.widget.name) {
                widgetService
                    .updateWidget(model.widgetId, model.widget)
                    .then(function () {
                        $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
                    }, function () {
                        model.error = "Can't update website at this moment, try again!";
                    });
            } else {
                model.error = "Widget name is required";
            }
        }

        function goBack() {
            if (model.new) {
                deleteWidget();
            } else {
                $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget");
            }
        }

        function goSearchImg() {
            widgetService
                .updateWidget(model.widgetId, model.widget)
                .then(function () {
                    $location.path("/website/" + model.websiteId + "/page/" + model.pageId + "/widget/"
                        + model.widgetId + "/search");
                }, function () {
                    model.error = "Can't update website at this moment, try again!";
                });
        }
    }
})();