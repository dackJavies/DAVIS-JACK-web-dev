(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    function PageService() {

        var pages = [
            { _id: "321", name: "Post 1", websiteId: "456" },
            { _id: "432", name: "Post 2", websiteId: "456" },
            { _id: "543", name: "Post 3", websiteId: "456" }
        ];

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

            page._id = pages.length;
            page.websiteId = websiteId;
            pages.push(page);

        }

        /**
         * Find a page by the website ID
         *
         * @param websiteId The website ID to search for
         * @returns {*} The correct pages if found, or an empty array if not
         */
        function findPagesByWebsiteId(websiteId) {

            var result = [];

            for (var i in pages) {

                if (pages[i].websiteId == websiteId) {
                    result.push(pages[i]);
                }

            }

            return result;

        }

        /**
         * Find a page by its id number
         *
         * @param pageId The id number to search for
         * @returns {*} The correct page if found, or null if it is not found
         */
        function findPageById(pageId) {

            for (var i in pages) {

                if (pages[i]._id == pageId) {
                    return pages[i];
                }

            }

            return null;

        }

        /**
         * Update a page
         *
         * @param pageId The desired page to change
         * @param page The data the page should be changed to
         * @returns {boolean} Whether the update was successful
         */
        function updatePage(pageId, page) {

            for (var i in pages) {

                if (pages[i]._id == pageId) {
                    pages[i] = page;
                    return true;
                }

            }

            return false;

        }

        /**
         * Delete a page (delet this)
         *
         * @param pageId The id of the page to be deleted
         * @returns {boolean} Whether the deletion was successful
         */
        function deletePage(pageId) {

            for (var i in pages) {

                if (pages[i]._id == pageId) {
                    pages.splice(i, 1);
                    return true;
                }

            }

            return false;

        }

    }

})();