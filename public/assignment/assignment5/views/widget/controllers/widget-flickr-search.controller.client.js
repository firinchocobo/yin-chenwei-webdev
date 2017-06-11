(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, flickrService, widgetService) {

        var model = this;

        model.goBack = goBack;
        model.searchPhotos = searchPhotos;
        model.selectPhoto = selectPhoto;

        model.currentName = "Search Flickr";
        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;
        model.widgetId = $routeParams.wgid;


        function searchPhotos(searchText) {
            flickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    // console.log(response.data);
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    model.photos = data.photos;
                });
        }

        function selectPhoto(photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            widgetService
                .findWidgetById(model.widgetId)
                .then(function (widget) {
                    model.widget = widget;
                    // console.log(model.widget);
                    model.widget.url = url;
                    // console.log(model.widget);
                    widgetService
                        .updateWidget(model.widgetId, model.widget)
                        .then(function () {
                            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
                        }, function () {
                            model.error = "Can't assign the selected photo to the widget at this moment, try again!";
                        });
                }, function () {
                    model.error = "Can't assign the selected photo to the widget at this moment, try again!";
                });
        }

        function goBack() {
            $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId);
        }
    }
})();
