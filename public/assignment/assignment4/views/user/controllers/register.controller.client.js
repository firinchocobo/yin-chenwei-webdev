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

           userService
               .findUserByUsername(model.user.username)
               .then(
                   function () {
                       model.message = 'sorry, username "' + model.user.username + '" is taken';
                   },
                   function () {
                       var newUser = {
                           username: model.user.username,
                           password: model.user.password
                       };
                       return userService
                           .createUser(newUser);
                   }
               )
               .then(function (user) {
                   $location.url('/user/' + user._id);
               });
        }

        function goBack() {
            $location.path("/");
        }
    }
})();
