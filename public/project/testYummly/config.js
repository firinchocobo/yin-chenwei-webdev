(function () {
    angular
        .module("testYummly")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "home.html"
            })
            .when("/search", {
                templateUrl: "views/yummly/templates/search-yummly.view.client.html",
                controller: "searchYummlyController",
                controllerAs: "model"
            })
            .when("/detail/:recipeId", {
                templateUrl: "views/yummly/templates/detail-yummly.view.client.html",
                controller: "detailYummlyController",
                controllerAs: "model"
            })
            // .when("/register", {
            //     templateUrl: "views/user/templates/register.view.client.html",
            //     controller: "RegisterController",
            //     controllerAs: "model"
            // })
    }
})();
