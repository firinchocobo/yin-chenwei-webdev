(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, userService) {

        var model = this;

        model.deleteProfile = deleteProfile;
        model.updateProfile = updateProfile;
        model.goBack = goBack;
        model.funcButton = funcButton;

        model.userId = $routeParams.uid;

        function init() {
            model.user = userService.findUserById(model.userId);
            model.currentName = "Profile";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function deleteProfile() {
            userService.deleteUser(model.userId);
            $location.path('/');
        }

        function updateProfile() {
            userService.updateUser(model.userId, model.user);
            model.message = "Update successful.";
        }

        function goBack() {
            $location.path("/");
        }

        function funcButton() {
            updateProfile();
        }
    }
})();
