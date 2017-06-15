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

        function init() {
            model.user = {};
        }

        init();

        function login() {
            if (model.user.username === null || typeof model.user.username === 'undefined'
                || model.user.username.trim() === "") {
                model.error = "username is required";
                return;
            }
            if (model.user.password === null || typeof model.user.password === 'undefined'
                || model.user.password.trim() === "") {
                model.error = "passwords is required";
                return;
            }
            userService
                .login(model.user.username, model.user.password)
                .then(
                    function (found) {
                        if (found !== null) {
                            // console.log('sucess')
                            $location.url("/profile");
                        }
                    }, function (found) {
                        // console.log(found);
                        if (found.data.error) {
                            model.error = "incorrect password. Please try again";
                        } else {
                            model.error = "sorry, " + model.user.username + " doesn't found. Please try again";
                        }
                    });
        }

        function goBack() {
            $location.path("/");
        }
    }
})();
