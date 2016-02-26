/**
 * Created by chenxin on 2/25/2016.
 */
Parties = new Mongo.Collection("parties");

Parties.allow({
    insert: function (userId, party) {
        return userId && party.owner === userId;
    },
    update: function (userId, party, fields, modifier) {
        return userId && party.owner === userId;
    },
    remove: function (userId, party) {
        return userId && party.owner === userId;
    }
});

Meteor.publish("parties", function () {
    return Parties.find({
        $or: [
            {
                $and: [
                    {"public": true},
                    {"public": {$exists: true}}
                ]
            },
            {
                $and: [
                    {owner: this.userId},
                    {owner: {$exists: true}}
                ]
            }
        ]
    });
});