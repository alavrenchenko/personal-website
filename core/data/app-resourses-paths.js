/*
 * Copyright 2018 Alexey Lavrenchenko (http://alavrenchenko.com/). All rights reserved.
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

'use strict';

class AppResoursesPaths {
    /**
     * @param {boolean} appRelease 
     */
    constructor(appRelease) {
        if (appRelease) {
            this.libWebFJS = '/static/lib/webf/0.5.1/js/webf.min.js';

            this.jsBase = '/static/js/pw-base.min.js';

            this.jsBundle = '/static/js/bundle.js';

            this.libWebFCSS = '/static/lib/webf/0.5.1/css/webf.min.css';

            this.cssBase = '/static/css/pw-base.min.css';

            this.cssBundle = '/static/css/bundle.css';
        }
        else {
            this.libWebFJS = '/dev/static/lib/webf/0.5.1/js/webf.js';

            this.jsBase = '/dist/packages/js/base/pw-base.js';

            this.jsBundle = null;

            this.libWebFCSS = '/dev/static/lib/webf/0.5.1/css/webf.css';

            this.cssBase = '/dev/static/css/base/pw-base.css';

            this.cssBundle = null;
        }
    }
}

module.exports = AppResoursesPaths;