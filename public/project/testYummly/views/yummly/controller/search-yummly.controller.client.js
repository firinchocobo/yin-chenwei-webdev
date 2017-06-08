(function () {
    angular
        .module("testYummly")
        .controller("searchYummlyController", searchYummlyController);

    function searchYummlyController($location, $routeParams, yummlyService) {

        var model = this;

        model.goBack = goBack;
        model.searchRecipes = searchRecipes;
        model.goToDetail = goToDetail;

        model.currentName = "Search Yummly";


        function searchRecipes(searchText) {
            yummlyService
                .searchRecipes(searchText)
                .then(function (response) {
                    // console.log(response.data);

                    // data = response.data.replace('{"criteria":{"q":null,"allowedIngredient":null,"excludedIngredient":null},','');
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    model.recipes = response.data.matches;

                    // model.photos = model.recipes.imageUrlsBySize.String(90);
                    // model.recipes = data.recipes;
                });
        }


        function goToDetail(recipe) {
            var recipeId = recipe.id;
            $location.path("/detail/"+recipeId);
            // var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_b.jpg";
            // yummlyService
            //     .detailRecipe(recipeId)
            //     .then(function (response) {
            //         $location.path("/detail"+recipeId)

                    // data = response.data.replace('{"criteria":{"q":null,"allowedIngredient":null,"excludedIngredient":null},','');
                    // data = data.substring(0,data.length - 1);
                    // data = JSON.parse(data);
                    // model.recipes = response.data.matches;

            // widgetService
            //     .findWidgetById(model.widgetId)
            //     .then(function (widget) {
            //         model.widget = widget;
            //         // console.log(model.widget);
            //         model.widget.url = url;
                    // console.log(model.widget);

                    // widgetService
                    //     .updateWidget(model.widgetId, model.widget)
                    //     .then(
                    //         $location.path("/user/" + model.userId + "/website/" + model.websiteId + "/page/" + model.pageId + "/widget/" + model.widgetId)
                    //     );

        }

        function goBack() {
            $location.path('/');
        }
    }
})();

