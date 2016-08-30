'use strict';

var _ = require('underscore');

var vcenters = [{
    "id": 1,
    "name": "dev2 vCenter",
    "hostname": "10.7.102.11"
}, {
    "id": 2,
    "name": "vCenter2",
    "hostname": "10.7.102.11"
}];

module.exports = {
    getAll: function () {
        return _.sortBy(vcenters, function (c) {
            return c.name;
        });
    },
    get: function (id) {
        id = +id;
        return _.find(vcenters, function (p) {
            return p.id === id;
        });
    }
};
