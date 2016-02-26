/**
 * Created by chenxin on 2/25/2016.
 */
Meteor.publish("users", function () {
    return Meteor.users.find({}, {fields: {emails: 1, profile: 1}});
});