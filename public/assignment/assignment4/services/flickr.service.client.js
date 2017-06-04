(function () {
    angular
        .module("WebAppMaker")
        .service("flickrService", FlickrService);

    function FlickrService($http) {

        this.searchPhotos = searchPhotos;

        var key = "ec3ed511cecf70e21389c35287417fde";
        var secret = "88fc70a468a624f7";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search" +
            "&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();
