import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Search = new Mongo.Collection('search');

Meteor.methods(
    {
        'search.do'(searchText, userId, sort, location, queueLength, diseaseType) {
        check(searchText, String);
        check(userId, String);

        if (! userId) {
            throw new Meteor.Error('not-authorized');
        }

        Search.insert(
            {
                searchText: searchText,
                createdAt: new Date(),
                userId: userId,//Meteor.users.findOne(this.userId).username,
                queueLength: queueLength,
                diseaseType: diseaseType,
                location: {
                    type: "Point",
                    coordinates: [location[0].toFixed(3), location[1].toFixed(3)]
                }
            }
        );
    },
});
