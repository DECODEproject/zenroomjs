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

import C from './lib/zenroom';

const zenroom_exec = (zencode, conf=null, keys=null, data=null, verbosity=1) => {
    return C.ccall('zenroom_exec', 'number',
                   ['string', 'string', 'string', 'string', 'number'],
                   [ zencode,  conf,     keys,     data,     verbosity])
}

module.exports = {
    zenroom_exec
}