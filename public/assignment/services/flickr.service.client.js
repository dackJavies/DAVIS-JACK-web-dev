(function() {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);

    function FlickrService($http) {

        var key = "fb48d8f21e397fbe836d47a5f93fabca";
        var secret = "4d6bbb9529565a7d";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT&sort=relevance&media=photos";

        var api = {
            searchPhotos: searchPhotos
        };

        return api;

        function searchPhotos(searchTerm) {

            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchTerm);
            return $http.get(url);

        }

    }

})();