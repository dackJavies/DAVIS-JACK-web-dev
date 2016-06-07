module.exports = function() {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server.js");
    var Page = mongoose.model("Page", PageSchema);

    var api = {

        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage

    };

    return api;

    /**
     * Creates a new Page instance
     *
     * @param websiteId The id of the page to be created
     * @param page The page to be created
     */
    function createPage(websiteId, page) {



    }

    /**
     * Retrieves all page instances for website whose  _id is websiteId
     *
     * @param websiteId The id of the website in question
     */
    function findAllPagesForWebsite(websiteId) {



    }

    /**
     * Retrieves a page instance whose _id is equal to parameter pageId
     *
     * @param pageId The id of the page to be found
     */
    function findPageById(pageId) {



    }

    /**
     * Updates page instance whose _id is pageId
     *
     * @param pageId The id of the page to be updated
     * @param page The page it should be updated to
     */
    function updatePage(pageId, page) {



    }

    /**
     * Removes page instance whose _id is pageId
     *
     * @param pageId The id of the page to be deleted
     */
    function deletePage(pageId) {



    }

};