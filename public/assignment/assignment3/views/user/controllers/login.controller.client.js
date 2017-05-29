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
            var found = userService.findUserByCredentials(model.user.username, model.user.password);
            if (found !== null) {
                if (typeof found !== 'string') {
                    $location.url("/user/" + found._id);
                } else if (found === 'incorrect password') {
                    model.message = "incorrect password, please try again!";
                } else if (found === 'incorrect username') {
                    model.message = "incorrect username, please try again!";
                }
            } else {
                model.message = "sorry, " + model.user.username + " doesn't exist. please register!";
            }
        }

        function goBack() {
            $location.path("/");
        }
    }
})();
