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

var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./gulp/config');

var baseScriptsSrc = require('./gulp/gulp-src/base/scripts');

var baseCSSSrc = require('./gulp/gulp-src/base/css');

var baseJSFileName = 'pw-base.js';

var baseCSSFileName = 'pw-base.css';

gulp.task('base-build', function () {
    return gulp.src(baseScriptsSrc)
        .pipe(concat(baseJSFileName))
        .pipe(gulp.dest(config.base.scripts.path.build));
});

gulp.task('base-css-build', function () {
    return gulp.src(baseCSSSrc)
        .pipe(concat(baseCSSFileName))
        .pipe(gulp.dest(config.base.css.path.build));
});
