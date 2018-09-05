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

const charUtils = {};

/**
 * @const
 */
charUtils.MAX_VALUE = '\uffff';

/**
 * @const
 */
charUtils.MIN_VALUE = '\u0000';

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isLatin1 = function (c) {
    return (c <= '\u00ff');
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isAscii = function (c) {
    return (c <= '\u007f');
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isWhitespace = function (c) {
    if (this.isLatin1(c)) {
        return this.isWhitespaceLatin1(c);
    }

    return /^\s/.test(c);
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isWhitespaceLatin1 = function (c) {
    /*
     U+0009 = <control> HORIZONTAL TAB
     U+000a = <control> LINE FEED
     U+000b = <control> VERTICAL TAB
     U+000c = <contorl> FORM FEED
     U+000d = <control> CARRIAGE RETURN
     U+0085 = <control> NEXT LINE
     U+00a0 = NO-BREAK SPACE
     */
    if ((c === ' ') || ((c >= '\u0009') && (c <= '\u000d')) || (c === '\u00a0') || (c === '\u0085')) {
        return true;
    }

    return false;
};

/**
 * Whitespace Chars.
 * 
 * @const
 * @type {Array<string>}
 */
charUtils.wsChars = [' ', '\n', '\r', '\t'];

/**
* @param {string} c Character
* @returns {boolean}
*/
charUtils.isWS = function (c) {
    return ((c === ' ') || (c === '\n') || (c === '\r') || (c === '\t'));
};

/**
 * Is character a linear white space?
 * 
 * @param {string} c Character
 * @returns {boolean}
 */
charUtils.isLWS = function (c) {
    return ((c <= ' ') && ((c === ' ') || (c === '\n') || (c === '\r') || (c === '\t')));
};

/**
 * Only consider ASCII characters.
 * 
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isAsciiLetter = function (c) {
    return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
charUtils.isAsciiLetterOrDigit = function (c) {
    return (this.isAsciiLetter(c) || ((c >= '0') && (c <= '9')));
};

module.exports = charUtils;