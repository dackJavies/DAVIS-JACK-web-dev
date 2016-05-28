(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { _id: "123", name: "Facebook",    developerId: "456" },
        { _id: "234", name: "Tweeter",     developerId: "456" },
        { _id: "456", name: "Gizmodo",     developerId: "456" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123" },
        { _id: "678", name: "Checkers",    developerId: "123" },
        { _id: "789", name: "Chess",       developerId: "234" }
    ];

    function WebsiteService() {

        var vm = this;
        
        // API
        var api = {
          
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteByID: findWebsiteByID,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
            
        };

        /**
         * Add a new website to the list
         *
         * @param userId The user ID of whoever created this website
         * @param website The new website's object
         * @returns {*} The new website
         */
        function createWebsite(userId, website) {

            website._id = websites.length;
            website.developerId = userId;
            websites.push(website);
            return website;

        }

        /**
         * Find all websites from a developer
         *
         * @param userId The developer's user ID
         * @returns {*} The websites in question, or an empty array if there are none
         */
        function findWebsitesByUser(userId) {

            var result = [];

            for(var i in websites) {

                if (websites[i].developerId === userId) {
                    result.push(websites[i]);
                }

            }

            return result;

        }

        /**
         * Find a website from its website ID
         *
         * @param websiteId The ID of the desired website
         * @returns {*} The website in question, or null if it does not exist
         */
        function findWebsiteByID(websiteId) {

            for (var i in websites) {

                if (websites[i]._id === websiteId) {
                    return websites[i];
                }

            }

            return null;

        }

        /**
         * Update a website to the desired object based on its website ID
         *
         * @param websiteId The website ID of the website to be updated
         * @param website The new information
         * @returns {boolean} Whether the update was successful
         */
        function updateWebsite(websiteId, website) {

            for (var i in websites) {

                if (websites[i]._id === websiteId) {
                    websites[i] = website;
                    return true;
                }

            }

            return false;

        }

        /**
         * Delete a website from its ID
         *
         * @param websiteId The ID of the website to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deleteWebsite(websiteId) {

            var delIndex = -1;

            for(var i in websites) {

                if (websites[i]._id === websiteId) {
                    delIndex = i;
                }

            }

            if (delIndex == -1) {
                return false;
            } else {
                websites.splice(delIndex, 1);
                return true;
            }

        }

    }

})();