(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService($http) {

        var api = {

            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage

        };

        return api;


        /**
         * Create a new page
         *
         * @param websiteId The id of the website this page belongs to
         * @param page The page data
         */
        function createPage(websiteId, page) {

            page._website = websiteId;
            var url = "/api/website/" + websiteId + "/page";
            return $http.post(url, page);

        }

        /**
         * Find a page by the website ID
         *
         * @param websiteId The website ID to search for
         * @returns {*} The correct pages if found, or an empty array if not
         */
        function findPagesByWebsiteId(websiteId) {

            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);

        }

        /**
         * Find a page by its id number
         *
         * @param pageId The id number to search for
         * @returns {*} The correct page if found, or null if it is not found
         */
        function findPageById(pageId) {

            var url = "/api/page/" + pageId;
            return $http.get(url);

        }

        /**
         * Update a page
         *
         * @param pageId The desired page to change
         * @param page The data the page should be changed to
         * @returns {boolean} Whether the update was successful
         */
        function updatePage(pageId, page) {

            var url = "/api/page/" + pageId;
            return $http.put(page, url);

        }

        /**
         * Delete a page (delet this)
         *
         * @param pageId The id of the page to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deletePage(pageId) {

            var url = "/api/page/" + pageId;
            return $http.delete(url);

        }

    }

})();