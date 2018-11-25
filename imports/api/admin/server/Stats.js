import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';
import {Search} from "../../search/server/Search";

Meteor.methods(
    {
        /**
         * we need to agregate data by streets and process them in such way that we can notificate NFZ that in some place
         * they should build new hospital (or clinic)
         * @param userId
         * @returns {*|Object}
         */
        'stats.userId'(userId) {
            return Search.find({userId: userId}).fetch();

        },
        'stats.sortByDiseaseType'(diseaseType) {
            return Search.find({diseaseType: diseaseType}).fetch();

        },
        'stats.generateMap'() {
            let response = [];
            Search.rawCollection().aggregate([
                {$group: {_id: '$location', count: {$sum: 1}}}
            ], function (error, result) {
                result.forEach(function (record) {
                    console.log([record._id.coordinates, record.count]);
                    response.push([record._id.coordinates, record.count]);
                })
            });

        },
    });