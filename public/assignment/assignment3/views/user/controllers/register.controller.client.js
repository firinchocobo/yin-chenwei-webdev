(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, userService) {
        var model = this;

        model.register = register;
        model.goBack = goBack;

        model.currentName = "Register";

        function register() {
            if (model.user.username === null || typeof model.user.username === 'undefined'
                || model.user.username.trim() === "") {
                model.message = "username is required";
                return;
            }
            if (model.user.password === null || typeof model.user.password === 'undefined'
                || model.user.password.trim() === ""
                || model.user.password !== model.user.reEnterPassword) {
                model.message = "passwords must match";
                return;
            }

            var found = userService.findUserByUsername(model.user.username);

            if (found !== null) {
                model.message = 'sorry, username "' + model.user.username + '" is taken';
            } else {
                userService.createUser(model.user);
                $location.url('/user/' + model.user._id);
            }
        }

        function goBack() {
            $location.path("/");
        }
    }
})();
