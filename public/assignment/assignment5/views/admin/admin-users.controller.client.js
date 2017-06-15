(function () {
    angular
        .module("WebAppMaker")
        .controller("adminUsersController", adminUsersController);

    function adminUsersController(userService) {
        var model = this;

        function init() {
            userService
                .findAllUsers()
                .then(function (users) {
                    // console.log(users);
                    model.users = users;
                })
        }
        init();
    }
})();
