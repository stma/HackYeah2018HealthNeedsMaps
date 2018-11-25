import {Meteor} from 'meteor/meteor';
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
            return new Promise(
                (resolve, reject) => {
                    Search.rawCollection().aggregate(
                        [
                            {$match:{diseaseType:diseaseType}},
                            {$group: {_id: '$location', count: {$sum: 1}}}
                        ],
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.map(
                                    (r) => ([r._id.coordinates, r.count])
                                ).toArray());
                            }
                        }
                    )
                }
            );

        },
        'stats.generateMap'() {
            return new Promise(
                (resolve, reject) => {
                    Search.rawCollection().aggregate(
                        [
                            {$group: {_id: '$location', count: {$sum: 1}}}
                        ],
                        (error, result) => {
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result.map(
                                    (r) => ([r._id.coordinates, r.count])
                                ).toArray());
                            }
                        }
                    )
                }
            );
        },
    });