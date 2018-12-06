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

import '@babel/polyfill';
import C from '../dist/lib/zenroom';

/* istanbul ignore next */
const __zenroom_exec = (zencode, conf=null, keys=null, data=null, verbosity=1) => {
    return C.ccall('zenroom_exec', 'number',
                   ['string', 'string', 'string', 'string', 'number'],
                   [ zencode,  conf,     keys,     data,     verbosity])
}


const zenroom = (function() {
  var self = {}
  self.options = {}

  const __debug = function() {
    return self
  }

  const zencode = function(zencode) {
    self.zencode = zencode
    return this
  }

  const keys = function(keys) {
    self.keys = keys ? JSON.stringify(keys) : null
    return this
  }

  const conf = function(conf) {
    self.conf = conf
    return this
  }

  const data = function(data) {
    self.data = data
    return this
  }

  const print = function(printFunction) {
    self.print = printFunction
    C.print = text => { self.print(text) }
    return this
  }

  const success = function(callback) {
    C.exec_ok = callback
    return this
  }

  const verbosity = function(verbosity) {
    self.verbosity = verbosity
    return this
  }

  const exec = function() {
    __zenroom_exec(self.zencode, self.conf, self.keys, self.data, self.verbosity)
    return this
  }

  const init = function(options) {
    /* istanbul ignore next */
    self.options = Object.assign(self.options, options) || {}
    
    zencode(self.options.zencode || '')
    keys(self.options.keys || null)
    conf(self.options.conf || null)
    data(self.options.data || null)
    print(self.options.print || (text => console.log(text)))
    success(self.options.success || (() => {}))
    verbosity(self.options.verbosity || 1)

    return this
  }

  const __setup = function() {
    print(self.print || (text => console.log(text)))    
    success(self.success || (() => {}))
  }

  const reset = function() {
    self = {}
    self.options = {}
    __setup()
    return this
  }

  __setup()

  return {
    zencode,
    keys,
    conf,
    data,
    print,
    success,
    verbosity,
    exec,
    init,
    reset,
    __debug
  }
})()

export default zenroom