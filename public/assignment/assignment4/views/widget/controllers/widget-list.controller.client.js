(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($location, $sce, $routeParams, widgetService) {

        var model = this;

        model.widgetUrl = widgetUrl;
        model.trust = trust;
        model.getYouTubeEmbedUrl = getYouTubeEmbedUrl;
        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        //console.log(model.pageId);

        function init() {
            widgetService
                .findWidgetsByPageId(model.pageId)
                .then(function (widgets) {
                    model.widgets = widgets;
                });
            model.currentName = "Widgets";
            model.funcButtonPattern = "glyphicon glyphicon-plus";
        }

        init();



        function widgetUrl(widget) {
            return 'views/widget/templates/widget-' + widget.widgetType.toLowerCase() + '.view.client.html';
        }

        function getYouTubeEmbedUrl(linkUrl) {

            var embedUrl = "https://www.youtube.com/embed/";
            var linkUrlParts = linkUrl.split('/');
            embedUrl += linkUrlParts[linkUrlParts.length - 1];
            return $sce.trustAsResourceUrl(embedUrl);
        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page");
        }

        function funcButton() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/new");
        }
    }
})();
