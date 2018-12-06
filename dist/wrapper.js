"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _zenroom = _interopRequireDefault(require("../dist/lib/zenroom"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Copyright 2018 Dyne.org foundation, Amsterdam
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* istanbul ignore next */
var __zenroom_exec = function __zenroom_exec(zencode) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var verbosity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  return _zenroom.default.ccall('zenroom_exec', 'number', ['string', 'string', 'string', 'string', 'number'], [zencode, conf, keys, data, verbosity]);
};

var zenroom = function () {
  var self = {};
  self.options = {};

  var __debug = function __debug() {
    return self;
  };

  var zencode = function zencode(_zencode) {
    self.zencode = _zencode;
    return this;
  };

  var keys = function keys(_keys) {
    self.keys = _keys ? JSON.stringify(_keys) : null;
    return this;
  };

  var conf = function conf(_conf) {
    self.conf = _conf;
    return this;
  };

  var data = function data(_data) {
    self.data = _data;
    return this;
  };

  var print = function print(printFunction) {
    self.print = printFunction;

    _zenroom.default.print = function (text) {
      self.print(text);
    };

    return this;
  };

  var success = function success(callback) {
    _zenroom.default.exec_ok = callback;
    return this;
  };

  var verbosity = function verbosity(_verbosity) {
    self.verbosity = _verbosity;
    return this;
  };

  var exec = function exec() {
    __zenroom_exec(self.zencode, self.conf, self.keys, self.data, self.verbosity);

    return this;
  };

  var init = function init(options) {
    /* istanbul ignore next */
    self.options = Object.assign(self.options, options) || {};
    zencode(self.options.zencode || '');
    keys(self.options.keys || null);
    conf(self.options.conf || null);
    data(self.options.data || null);
    print(self.options.print || function (text) {
      return console.log(text);
    });
    success(self.options.success || function () {});
    verbosity(self.options.verbosity || 1);
    return this;
  };

  var __setup = function __setup() {
    print(self.print || function (text) {
      return console.log(text);
    });
    success(self.success || function () {});
  };

  var reset = function reset() {
    self = {};
    self.options = {};

    __setup();

    return this;
  };

  __setup();

  return {
    zencode: zencode,
    keys: keys,
    conf: conf,
    data: data,
    print: print,
    success: success,
    verbosity: verbosity,
    exec: exec,
    init: init,
    reset: reset,
    __debug: __debug
  };
}();

var _default = zenroom;
exports.default = _default;