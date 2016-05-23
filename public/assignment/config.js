/**
 * Created by JackDavis on 5/23/16.
 */

(function() {
    angular
        .module("WebAppMaker")
        .config(Config);
    function Config($routeProvider) {
        $routeProvider
            // User Pages
            .when("/login", {
                templateUrl: "/views/user-pages/login.view.client.html"
            })
            .when("/register", {
                templateUrl: "/views/user-pages/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "/views/user-pages/profile.view.client.html"
            })
            // Page Pages
            // Website Pages
            // Widget Pages
    }
})();