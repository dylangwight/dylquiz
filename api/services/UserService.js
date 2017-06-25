/**
 * Created by DylanWight on 6/22/17.
 */
const mongoose = require("mongoose");
const CommonService = require('./CommonService');

function UserService () {
    const algoliasearch = require("algoliasearch");
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_ADMIN_KEY);
    const index = client.initIndex("users");

    const UserSchema = require("../schemas/userSchema");
    const UserModel = mongoose.model("User", UserSchema);
    const UserService = new CommonService(UserModel);
    UserService.findByFacebookId = findByFacebookId;
    UserService.sendBuddyRequest = sendBuddyRequest;
    UserService.create = create;
    UserService.update = update;

    return UserService;

    function findByFacebookId(facebookId) {
        return UserModel.findOne({'facebook.id': facebookId});
    }

    function sendBuddyRequest(userId, requesterId) {
        return UserService.add(userId, requesterId, "buddy_requests");
    }

    function create(user) {
        console.log("createUser");
        return UserModel.create(user).then((user) => {
            this.user = user;
            const algoliaUser = {
                _id: user._id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            return index.addObject(algoliaUser);
        }).then((content, err) => {
            console.log(content);
            return UserModel.findByIdAndUpdate(user._id, {algolia_id: content.objectID}, {upsert: true});
        });
    }

    function update(userId, user) {
        console.log("updateUser");
        return UserModel.findByIdAndUpdate(userId, user, {upsert: true})
            .then((user) => {
                const algoliaUser = {
                    _id: user._id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    objectID: user.algolia_id
                };
                index.saveObject(algoliaUser)
            });
    }
}

module.exports = UserService;