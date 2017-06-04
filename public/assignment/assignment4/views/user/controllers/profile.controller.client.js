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

        //var promise = ...
        //typically don't store this var as a local var
        //handle the failure here or on the client service

        // function renderUser(user) {
        //     model.user = user;
        // }

        // function userError() {
        //     model.message = "User not found";
        // }

        function init() {
            userService
                .findUserById(model.userId)
                .then(function (user) {
                    model.user = user;
                });
            model.currentName = "Profile";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
        }

        init();

        function updateProfile() {
            userService
                .updateUser(model.userId, model.user)
                .then(function () {
                    model.message = "User update was successful";
                })
        }

        function deleteProfile() {
            userService
                .deleteUser(model.userId)
                .then(function () {
                    $location.path('/');
                }, function () {
                    model.message = "Unable to unregister you";
                });
        }

        // function deleteProfile() {
        //     userService.deleteUser(model.userId);
        //     $location.path('/');
        // }

        // function updateProfile() {
        //     userService.updateUser(model.userId, model.user);
        //     model.message = "Update successful.";
        // }

        function goBack() {
            $location.path("/");
        }

        function funcButton() {
            updateProfile();
        }
    }
})();
