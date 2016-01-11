"use strict";

var _ = require('lodash');
var Fluxxor = require('fluxxor');
var constants = require('../libs/constants');

var state = {
  host: (location.protocol === "https:") ? null : "http://127.0.0.1:8545",
  currentAccount: null,
  privateKey: null,
  handle: null,
  keystore: null,
  debug: false,
  loaded: false,
  isHosted: false,
  percentLoaded: null
};

var ConfigStore = Fluxxor.createStore({

  initialize: function () {
    this.bindActions(
      constants.config.SET_HOST, this.handleSetHost,
      constants.config.SET_IS_HOSTED, this.handleSetIsHosted,
      constants.config.UPDATE_ACCOUNT, this.handleUpdateAccount,
      constants.config.UPDATE_PERCENT_LOADED_SUCCESS, this.handleUpdatePercentLoadedSuccess,
      constants.config.LOAD_APPLICATION_DATA_SUCCESS, this.handleLoadApplicationDataSuccess
    );
  },

  handleSetIsHosted: function (payload) {
    state.isHosted = payload.isHosted;
    this.emit(constants.CHANGE_EVENT);
  },

  handleSetHost: function (payload) {
    state.host = payload.host;
    this.emit(constants.CHANGE_EVENT);
  },

  getState: function () {
    return state;
  },

  getAccount: function () {
    if (_.isUndefined(state.currentAccount)) return null;
    return state.currentAccount;
  },

  getPrivateKey: function () {
    if (_.isUndefined(state.privateKey)) return null;
    return state.privateKey;
  },

  getHandle: function () {
    if (_.isUndefined(state.handle)) return null;
    return state.handle;
  },

  getKeystore: function () {
    if (_.isUndefined(state.keystore)) return null;
    return state.keystore;
  },

  handleUpdatePercentLoadedSuccess: function (payload) {
    state.percentLoaded = payload.percentLoaded;
    this.emit(constants.CHANGE_EVENT);
  },

  handleUpdateAccount: function (payload) {
    state.currentAccount = payload.currentAccount;
    state.privateKey = payload.privateKey;
    state.handle = payload.handle;
    state.keystore = payload.keystore;
    this.emit(constants.CHANGE_EVENT);
  },

  handleLoadApplicationDataSuccess: function (payload) {
    state.loaded = true;
    this.emit(constants.CHANGE_EVENT);
  }
});

module.exports = ConfigStore;
