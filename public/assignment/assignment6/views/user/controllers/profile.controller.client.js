(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, currentUser, $routeParams, userService) {

        var model = this;

        model.deleteProfile = deleteProfile;
        model.updateProfile = updateProfile;
        model.goBack = goBack;
        model.funcButton = funcButton;
        model.logout = logout;

        model.userId = currentUser._id;

        function init() {
            // userService
            //     .findUserById(model.userId)
            //     .then(function (user) {
            //         model.user = user;
            //     }, function () {
            //         goBack();
            //     });
            model.user = currentUser;
            model.currentName = "Profile";
            model.funcButtonPattern = "glyphicon glyphicon-ok";
            // console.log($location.host()==='localhost' );
            console.log($location.protocol());
        }

        init();

        function logout() {
            userService
                .logout()
                .then(function () {
                  if ($location.host()!=='localhost') {
                      url = $location.protocol()+"://" + $location.host() + "/assignment/assignment6/#!/";
                      $location.path(url);
                  } else {
                      $location.path('/');
                  }
                })
        }

        function updateProfile() {
            userService
                .updateUser(model.userId, model.user)
                .then(function () {
                    model.message = "User update was successful";
                }, function () {
                    model.error = "Unable to update the profile at this moment, please try again";
                })
        }

        function deleteProfile() {
            userService
                .deleteUser(model.userId)
                .then(function () {
                    $location.path('/');
                }, function () {
                    model.error = "Unable to unregister the profile at this moment, please try again";
                });
        }

        //var promise = ...
        //typically don't store this var as a local var
        //handle the failure here or on the client service

        // function renderUser(user) {
        //     model.user = user;
        // }

        // function userError() {
        //     model.message = "User not found";
        // }

        function goBack() {
            $location.path("/");
        }

        function funcButton() {
            updateProfile();
        }
    }
})();
