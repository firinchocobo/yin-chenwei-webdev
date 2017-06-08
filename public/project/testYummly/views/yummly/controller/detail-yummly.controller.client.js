(function () {
    angular
        .module("testYummly")
        .controller("detailYummlyController", detailYummlyController);

    function detailYummlyController($location, $routeParams, yummlyService) {

        var model = this;


        model.recipeId = $routeParams.recipeId;
        model.goBack = goBack;
        // model.ifJson = ifJson;

        model.currentName = "Recipe Detail";

        function init() {
            yummlyService
                .detailRecipe(model.recipeId)
                .then(function (response) {
                    model.recipe = response.data;
                    // console.log(model.recipe.images.hostedSmallUrl);
                })
        }
        init();
        //
        // function ifJson(something) {
        //     // return (something.constructor === {}.constructor);
        //     return (typeof something !== 'string');
        // }

        function goBack() {
            $location.path('/search');
        }
    }
})();