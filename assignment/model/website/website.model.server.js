module.exports = function() {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);
    
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

        // website._user = userId;
        // Website.create(website)
        //     .then(
        //         function(wholeThing) {
        //             var id = wholeThing._id;
        //             User.addOneWebsite(userId, id.valueOf())
        //                 .then(
        //                     function(good) {
        //                         return wholeThing;
        //                     },
        //                     function(bad) {
        //                         return bad;
        //                     }
        //                 );
        //         },
        //         function(errorbad) {
        //             return errorbad;
        //         }
        //     );
        return Website.create(website);

    }

    /**
     * Retrieves all website instances for user whose  _id is userId
     *
     * @param userId The id the of the user whose websites are to be found
     */
    function findAllWebsitesForUser(userId) {

        return Website.find({_user: userId});

    }

    /**
     * Retrieves single website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be found
     */
    function findWebsiteById(websiteId) {

        return Website.findById(websiteId);

    }

    /**
     * Updates website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be updated
     * @param website The info to update the old website to
     */
    function updateWebsite(websiteId, website) {

        return Website.update(
            {_id: websiteId},
            {
                _user: website._user,
                name: website.name,
                description: website.description,
                pages: website.pages
            }
        )

    }

    /**
     * Removes website instance whose _id is websiteId
     *
     * @param websiteId The id of the website to be deleted
     */
    function deleteWebsite(websiteId) {

        return Website.remove({_id: websiteId});

    }
    
};