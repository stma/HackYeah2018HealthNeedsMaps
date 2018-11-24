import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Search = new Mongo.Collection('search');

Meteor.methods(
    {
        'search.do'(searchText, userId, sort, location) {
        check(searchText, String);
        check(userId, String);

        if (! this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Search.insert(
            {
                text,
                createdAt: new Date(),
                owner: this.userId,
                username: Meteor.users.findOne(this.userId).username,
            }
        );
    },

    'search.groupBySearch'() {

    },
});
