(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    function WebsiteService($http) {

        var vm = this;
        
        // API
        var api = {
          
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteByID: findWebsiteByID,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
            
        };
        return api;

        /**
         * Add a new website to the list
         *
         * @param userId The user ID of whoever created this website
         * @param website The new website's object
         * @returns {*} The new website
         */
        function createWebsite(userId, website) {

            website.developerId = userId;
            var url = "/api/user/" + userId + "/website";
            return $http.post(website, url);

        }

        /**
         * Find all websites from a developer
         *
         * @param userId The developer's user ID
         * @returns {*} The websites in question, or an empty array if there are none
         */
        function findWebsitesByUser(userId) {

            var url = "/api/user/" + userId + "/website";
            return $http.get(url);

        }

        /**
         * Find a website from its website ID
         *
         * @param websiteId The ID of the desired website
         * @returns {*} The website in question, or null if it does not exist
         */
        function findWebsiteByID(websiteId) {

            var url = "/api/website/" + websiteId;
            return $http.get(url);

        }

        /**
         * Update a website to the desired object based on its website ID
         *
         * @param websiteId The website ID of the website to be updated
         * @param website The new information
         * @returns {boolean} Whether the update was successful
         */
        function updateWebsite(websiteId, website) {

            var url = "/api/website/" + websiteId;
            return $http.put(url, website);

        }

        /**
         * Delete a website from its ID
         *
         * @param websiteId The ID of the website to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteWebsite(websiteId) {

            var url = "/api/website/" + websiteId;
            return $http.delete(url);

        }

    }

})();