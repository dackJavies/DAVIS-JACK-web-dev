module.exports = function() {
    
    var api = {

        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite

    };

    return api;

    /**
     * Creates a new website instance for user whose _id is userId
     *
     * @param userId The id of the user this website belongs to
     * @param website The website to be created
     */
    function createWebsiteForUser(userId, website) {



    }

    /**
     * Retrieves all website instances for user whose  _id is userId
     *
     * @param userId The id the of the user whose websites are to be found
     */
    function findAllWebsitesForUser(userId) {



    }

    /**
     * Retrieves single website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be found
     */
    function findWebsiteById(websiteId) {



    }

    /**
     * Updates website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be updated
     * @param website The info to update the old website to
     */
    function updateWebsite(websiteId, website) {



    }

    /**
     * Removes website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be deleted
     */
    function deleteWebsite(websiteId) {



    }
    
};