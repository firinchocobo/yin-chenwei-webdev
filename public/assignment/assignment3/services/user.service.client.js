(function () {
    angular
        .module("WebAppMaker")
        .service("userService", UserService);

    function UserService() {

        this.createUser = createUser;
        this.findUserById = findUserById;
        this.findUserByUsername = findUserByUsername;
        this.findUserByCredentials = findUserByCredentials;
        this.updateUser = updateUser;
        this.deleteUser = deleteUser;

        var users = [
            {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
        ];

        function createUser(user) {
            user._id = (new Date()).getTime() + "";
            users.push(user);
            // return user;
        }

        function findUserById(userId) {
            var user = users.find(function (user) {
                return user._id === userId;
            });
            if (user !== 'undefined') {
                return angular.copy(user);
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var i in users) {
                if (users[i].username === username) {
                    return angular.copy(users[i]);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var i in users) {
                var userI = users[i];
                if (userI.username === username && userI.password === password) {
                    return angular.copy(userI);
                } else if (userI.username === username && userI.password !== password) {
                    return "incorrect password";
                } else if (userI.username !== username && userI.password === password) {
                    return "incorrect username";
                }
            }
            return null;
        }

        function updateUser(userId, user) {
            for (var i in users) {
                if (users[i]._id === userId) {
                    users[i] = user;
                }
            }
        }

        function deleteUser(userId) {
            var oldUser = users.find(function (user) {
                return user._id === userId;
            });
            var index = users.indexOf(oldUser);
            users.splice(index, 1);
        }
    }
})();