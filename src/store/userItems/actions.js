"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteData = exports.updateData = exports.loadData = void 0;
var actionTypes_1 = require("./actionTypes");
var loadData = function (data) { return ({
    type: actionTypes_1.LOAD_DATA,
    payload: data,
}); };
exports.loadData = loadData;
var updateData = function (data) { return ({
    type: actionTypes_1.UPDATE_DATA,
    payload: data,
}); };
exports.updateData = updateData;
var deleteData = function () { return ({
    type: actionTypes_1.DELETE_DATA,
}); };
exports.deleteData = deleteData;
