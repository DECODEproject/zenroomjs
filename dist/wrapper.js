"use strict";

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.to-string");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/stable");

require("regenerator-runtime/runtime");

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
var MAX_BUFFER_SIZE = 1048576;

var C = require('../dist/lib/zenroom');
/* istanbul ignore next */


var zenroomExec = function zenroomExec(script) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var verbosity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  C.then(function (Module) {
    Module.ccall('zenroom_exec', 'number', ['string', 'string', 'string', 'string', 'number'], [script, conf, keys, data, verbosity]);
  });
};
/* istanbul ignore next */


var zencodeExec = function zencodeExec(script) {
  var conf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var verbosity = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
  C.then(function (Module) {
    Module.ccall('zencode_exec', 'number', ['string', 'string', 'string', 'string', 'number'], [script, conf, keys, data, verbosity]);
  });
};

var zenroom = function () {
  var self = {};
  self.options = {};

  var __debug = function __debug() {
    return self;
  };
  /**
   * Set the zenroom script to run
   *
   * The syntax of the zenroom scripts are extensively available at
   * https://zenroom.dyne.org/api/tutorials/Syntax.html
   * You may want also to look at some example in a live executable environment here https://zenroom.dyne.org/demo/
   *
   * @example <caption>Example usage of `script()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")'
   * zenroom.script(script).zenroom_exec().reset()
   *
   * @param {string} script the lua script to be set
   * @returns {zenroom} the zenroom module
   */


  var script = function script(_script) {
    self.script = _script;
    return this;
  };
  /**
   * Set the keys JSON for you zenroom execution
   *
   * the keys will be available in script as the `KEYS` variable
   *
   * @example <caption>Example usage of `keys()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = `
   *                  keys = JSON.decode(KEYS)
   *                  print(keys)
   * `
   *
   * const keys = {a: 1, b: 2}
   * zenroom.script(script).keys(keys).zenroom_exec().reset()
   *
   * @param {object} keys the keys to be set as an object
   * @returns {object} the zenroom module
   */


  var keys = function keys(_keys) {
    self.keys = _keys ? JSON.stringify(_keys) : null;
    return this;
  };
  /**
   * Set the conf before your zenroom execution
   *
   * by now the only conf available is the string `umm` that sets the minimal memory manager (64KiB max)
   *
   * @example <caption>Example usage of `conf()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")'
   * const conf = 'umm'
   * zenroom.script(script).conf(conf).zenroom_exec()
   *
   * @param {string} conf the string of configuration to be set
   * @returns {object} the zenroom module
   */


  var conf = function conf(_conf) {
    self.conf = _conf;
    return this;
  };
  /**
   * Set the data for your zenroom execution
   *
   * The data will be available in script as the `DATA` variable
   *
   * @example <caption>Example usage of `data()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = `
   *                  data = JSON.decode(DATA)
   *                  print(data)
   * `
   *
   * const data = {a: 1, b: 2}
   * zenroom.script(script).data(data).zenroom_exec()
   *
   * @param {string} data
   * @returns {object} the zenroom module
   */


  var data = function data(_data) {
    self.data = _data;
    return this;
  };
  /**
   * Set the print callback to customize
   * the behaviour of the print calls made to stdout
   * by default it prints to the console.log
   *
   * @example <caption>Example usage of `print()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const savedLines = []
   * const printFunction = (text) => { savedLines.push(text) }
   * const script = 'print("hello")'
   * zenroom.print(printFunction).script(script).zenroom_exec()
   *
   * @callback print
   * @returns {object} the zenroom module
   */


  var print = function print(printFunction) {
    self.print = printFunction;
    C.then(function (Module) {
      Module.print = function (text) {
        return self.print(text);
      };
    });
    return this;
  };
  /**
   * Set the success callback that is executed after a successful execution of zenroom
   *
   * @example <caption>Example usage of `success()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")'
   * zenroom.script(script).success(()=>{
   *    pleaseRunSomeOtherMethodAfter()
   * }).zenroom_exec()
   *
   * @callback success
   * @returns {object} the zenroom module
   */


  var success = function success(successCallback) {
    self.success = successCallback;
    C.then(function (Module) {
      Module.exec_ok = successCallback;
    });
    return this;
  };
  /**
   * Set the error callback that is executed after an unsuccessful execution of zenroom
   *
   * @example <caption>Example usage of `error()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")';
   * zenroom.script(script).error(()=>{
   *    pleaseRunSomeOtherMethodAfterError()
   * }).zenroom_exec()
   *
   * @callback error
   * @returns {object} the zenroom module
   */


  var error = function error(errorCallback) {
    self.error = errorCallback;
    C.then(function (Module) {
      Module.exec_error = errorCallback;
    });
    return this;
  };
  /**
   * Set the verbosity of the stderr messages outputted by the zenroom virtual machine
   *
   * As per now the set of accepted value:
   *
   * <ul>
   * <li>1 = INFO</li>
   * <li>2 = DEBUG</li>
   * </ul>
   *
   * @example <caption>Example usage of `success`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")'
   * zenroom.script(script).success(()=>{
   *    pleaseRunSomeOtherMethodAfter();
   * }).zenroom_exec()
   *
   * @param {number} verbosity
   * @returns {object} the zenroom module
   */


  var verbosity = function verbosity(_verbosity) {
    self.verbosity = _verbosity;
    return this;
  };
  /**
   * Execute the zenroom vm (using the previously setted options)
   *
   * It is usually the last method of the chain, but like the other methods returns
   * the zenroom module itself, so can be used for other calls if you need to make more
   * executions in a row
   *
   * @example <caption>Example usage of `zenroom_exec()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")';
   * zenroom.script(script).zenroom_exec()
   *
   * @returns {object} the zenroom module
   */


  var zenroom_exec = function zenroom_exec() {
    zenroomExec(self.script, self.conf, self.keys, self.data, self.verbosity);
    return this;
  };
  /**
   * Execute zencode contracts (using the previously setted options)
   *
   * It is usually the last method of the chain, but like the other methods returns
   * the zenroom module itself, so can be used for other calls if you need to make more
   * executions in a row
   *
   * @example <caption>Example usage of `zencode_exec()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const zencode = 'print("hello")';
   * zenroom.script(script).zencode_exec()
   *
   * @returns {object} the zenroom module
   */


  var zencode_exec = function zencode_exec() {
    zencodeExec(self.script, self.conf, self.keys, self.data, self.verbosity);
    return this;
  };
  /**
   * This method allows the configuration of your call by passing one
   * configuration option object. You can use the chain methods after this anyway.
   *
   * If some attribute is already set, those will be overwritten by the new options
   *
   * The following options are available:
   * <ul>
   *   <li><strong>script</strong></li>
   *   <li><strong>keys</strong></li>
   *   <li><strong>conf</strong></li>
   *   <li><strong>data</strong></li>
   *   <li><strong>print</strong></li>
   *   <li><strong>success</strong></li>
   *   <li><strong>error</strong></li>
   *   <li><strong>verbosity</strong></li>
   * </ul>
   *
   * @example <caption>Example usage of `init()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const encrypt_secret_to_many = {
   *  script: `keyring = ECDH.new()
   *            secret = str(DATA)
   *            keys = JSON.decode(KEYS)
   *            keyring:private( base64(keys.keyring.secret) )
   *            res = {}
   *            for name,pubkey in pairs(keys.recipients) do
   *              pub = base64(pubkey)
   *              enc = ECDH.encrypt(keyring,pub,secret,keyring:public())
   *              res[name] = str( MSG.pack( map(enc,base64) ) ):base64()
   *            end
   *            print(JSON.encode(res))`,
   *
   *  keys: {
   *      keyring : {
   *        public : "BHMjcDM/aljpi8pNxFQ436R6F3J+kaB/Xk1kAVFPmkoLVyeFltDZPgiIYRquh+m2IfvPioBfet7YCd5vVXYoRTk=",
   *        secret : "ChW5qi5y//ISDIHKx5Fvxl+XY8IyDGVBHUfELp3PqJQ="
   *      },
   *      recipients : {
   *        paulus : "BBUw6Nr3A30cN65maERvAk1cEv2Ji6Vs80kSlpodOC0SCtM8ucaS7e+s158uVMSr3BsvIXVspBeafiL8Qb3kcgc=",
   *        mayo : "BHqBoQ2WJ3/FGVNTXzdIc+K/HzNx05bWzEhn8m58FvSsaqWVdH52jI6fQWdkdjnbqVKCJGmbjA/OCJ+IKHbiySI=",
   *        mark : "BFgkjrRMvN+wkJ6qA4UvMaNlYBvl37C9cNYGkqOE4w43AUzkEzcyIIdE6BrgOEUEVefhOOnO6SCBQMgXHXJUUPY=",
   *        francesca : "BCo102mVybieKMyhex8tnVtFM5+Wo1oP02k8JVwKF9OLIjw7w0LmofItbuAcfWl9rcoe++XLI3sySZnqljIfeyU=",
   *        jim : "BEs1jeqL0nVwFi7OmG4YdtlWuKADyOvZR4XHpLAEswg8ONPXQHvwJ8+PkHkphoORfSjk2045bMdYkwboU4FdG2Y=",
   *        jaromil : "BBZYJtHvFg0vGCxPROAWrThcGZ+vFZJj86k+uncjvbm4DysIg7cWS3J6GrcJKCY55Uf40m2KfBwfaT+T7TTO1e8="
   *      }
   *  },
   *
   *  data: 'This is a secret message.'
   * }
   *
   *
   * zenroom.init(encrypt_secret_to_many).zenroom_exec()
   *
   * @returns {object} the zenroom module
   */


  var init = function init(options) {
    /* istanbul ignore next */
    self.options = Object.assign(self.options, options) || {};
    script(self.options.script || '');
    keys(self.options.keys || null);
    conf(self.options.conf || null);
    data(self.options.data || null);
    print(self.options.print || function (text) {
      return console.log(text);
    });
    success(self.options.success || new Function()); // eslint-disable-line no-new-func

    error(self.options.error || new Function()); // eslint-disable-line no-new-func

    verbosity(self.options.verbosity || 1);
    return this;
  };

  var __setup = function __setup() {
    print(self.print || function (text) {
      return console.log(text);
    });
    success(self.success || function () {});
    error(self.error || function () {});
  };
  /**
   * Reset the setted options already provided and cleans up the zenroom module
   *
   * It is usually the last method of the chain, but like the other methods returns
   * the zenroom module itself, so can be used for other calls if you need to make more
   * executions in a row
   *
   * @example <caption>Example usage of `reset()`</caption>
   * // returns zenroom
   * import zenroom from 'zenroom'
   *
   * const script = 'print("hello")';
   * zenroom.script(script)
   *        .zenroom_exec()    // This runs the script
   *        .reset()
   *        .zenroom_exec()    // This does not run the script anymore
   *
   * @returns {object} the zenroom module
   */


  var reset = function reset() {
    self = {};
    self.options = {};

    __setup();

    return this;
  };

  __setup();

  return {
    script: script,
    keys: keys,
    conf: conf,
    data: data,
    print: print,
    success: success,
    verbosity: verbosity,
    zenroom_exec: zenroom_exec,
    zencode_exec: zencode_exec,
    error: error,
    init: init,
    reset: reset,
    __debug: __debug
  };
}();

var _default = zenroom;
exports.default = _default;