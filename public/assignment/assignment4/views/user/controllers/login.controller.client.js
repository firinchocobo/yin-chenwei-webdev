(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    function LoginController($location, userService) {

        var model = this;

        //event handler
        model.login = login;
        model.goBack = goBack;

        model.currentName = "Login";

        function login() {
            userService
                .findUserByCredentials(model.user.username, model.user.password)
                .then(
                    function (found) {
                        if (found !== null) {
                            $location.url("/user/" + found._id);
                        }
                    }, function () {
                        model.message = "sorry, " + model.user.username + " doesn't found. please try again!";
                    });
                //     } else if (found === 'incorrect password') {
                //         model.message = "incorrect password, please try again!";
                //     } else if (found === 'incorrect username') {
                //         model.message = "incorrect username, please try again!";
                //     }
                // } else {
        }

        function goBack() {
            $location.path("/");
        }
    }
})();
