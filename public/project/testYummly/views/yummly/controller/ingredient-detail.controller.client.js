(function () {
    angular
        .module("testYummly")
        .controller("ingredientDetailController", IngredientDetailController);

    function IngredientDetailController(edamamService) {

        var model = this;


        model.sectionTitle = "Ingredient Detail";

        model.getIngredientDetail = getIngredientDetail;

        function getIngredientDetail(searchText) {
            edamamService
                .getIngredientDetail(searchText)
                .then(function (ingredient) {
                    // console.log(ingredient);
                    model.ingredient = ingredient;
                });
        }

    }
})();
