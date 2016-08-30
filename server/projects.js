'use strict';

var _ = require('underscore');

var projects = [{
    "id": 1,
    "name": "McQueen",
    "hostId": 1
}, {
    "id": 2,
    "name": "MSM",
    "hostId": 1
}];

module.exports = {
    getAll: function () {
        return _.sortBy(projects, function (c) {
            return c.name;
        });
    },
    get: function (id) {
        id = +id;
        return _.find(projects, function (p) {
            return p.id === id;
        });
    }
};
