(function () {
    angular
        .module("WebAppMaker")
        .controller("MainController", MainController);

    function MainController(currentUser, userService, $location,$route) {
        console.log("loading controller");

        console.log(currentUser);
        var model = this;
        model.logout = logout;

        if (currentUser._id) {
            model.userId = currentUser._id;
        }
        // model.currentUser = currentUser;
        function logout() {
            userService
                .logout()
                .then(function () {
                    $route.reload();
                    // $location.url('/');
                })
        }
    }
})();
