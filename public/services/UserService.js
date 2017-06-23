/**
 * Created by DylanWight on 6/22/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .factory("UserService", function ($http, CommonService) {

            const UserService = CommonService("auth");
            UserService.findByUsername = findByUsername;
            UserService.findByCredentials = findByCredentials;
            UserService.login = login;
            UserService.logout = logout;
            UserService.register = register;
            UserService.isLoggedIn = isLoggedIn;

            return UserService;

            function findByUsername(username) {
                return UserService.find({"username": username});
            }

            function findByCredentials(username, password) {
                return UserService.find({"username": username, "password": password});
            }

            function login(user) {
                return $http.post("/api/login", user);
            }

            function logout() {
                return $http.post("/api/logout");
            }

            function register(user) {
                return $http.post("/api/register", user);
            }

            function isLoggedIn() {
                return $http.get('/api/loggedin')
            }
        });
})();