(function () {
    angular
        .module("testYummly")
        .service("yummlyService", YummlyService);

    function YummlyService($http, $sce) {

        this.searchRecipes = searchRecipes;
        this.detailRecipe = detailRecipe;

        var id = 'ef65e9c2';
        var key = 'efd5ede00f6c4b4f7fd8e210a4529a9a';

        var urlBase = 'http://api.yummly.com/v1/api/recipes?_app_id=app-id&_app_key=app-key&q=your_search_parameters';
        // '&callback=package';


        function searchRecipes(searchTerm) {
            var url = trust(urlBase
                .replace("app-id", id)
                .replace("app-key", key)
                .replace("your_search_parameters", searchTerm));
            return $http.get(url);
        }

        function detailRecipe(recipeId) {
            // console.log(recipeId);
            // console.log(id);
            // console.log(key);
            // var url = 'http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=app-id&_app_key=app-key';
            var url = trust('http://api.yummly.com/v1/api/recipe/recipe-id?_app_id=app-id&_app_key=app-key'
                .replace("recipe-id", recipeId)
                .replace("app-id", id)
                .replace("app-key", key));
            return $http.get(url);

        }

        function trust(html) {
            // scrubbing the html
            return $sce.trustAsHtml(html);
        }
    }

})();

