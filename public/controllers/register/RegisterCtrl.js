/**
 * Created by DylanWight on 5/23/17.
 */
(function () {
    angular
        .module("dylQuizApp")
        .controller("RegisterCtrl", function ($location, $rootScope, AuthService) {
            const vm = this;
            vm.register = register;

            function register(user, passwordConfirm) {
                console.log(user, passwordConfirm);
                if (!user || !user.username) {
                    vm.alert = "Username required";
                    return;
                } else if (!user.password) {
                    vm.alert = "Password required";
                    return;
                } else if (user.password !== passwordConfirm) {
                    vm.alert = "Passwords do not match";
                    return;
                } else {
                    vm.alert = "";
                }

                AuthService
                    .register(user)
                    .then(function(response) {
                        $rootScope.currentAuth = response.data;
                        $location.url("/user/" + user._id);
                    });
            }
        });
})();
