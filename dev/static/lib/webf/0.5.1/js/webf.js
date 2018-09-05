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

/*
 * Main file.
 */

'use strict';

/**
 * Web Framework JS (WebF).
 * 
 * @namespace
 */
var WebF = {};
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

WebF.base = {};

/**
 * @type {string}
 */
WebF.base.version = '0.5.1';

/**
 * Returns true if the specified value is a string.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a string.
 */
WebF.base.isString = function (value) {
    return typeof value == 'string';
};

/**
 * Returns true if the specified value is a number.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a number.
 */
WebF.base.isNumber = function (value) {
    return typeof value == 'number';
};

/**
 * Returns true if the specified value is a boolean.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a boolean.
 */
WebF.base.isBoolean = function (value) {
    return typeof value == 'boolean';
};

/**
 * Returns true if the specified value is a function.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a function.
 */
WebF.base.isFunction = function (value) {
    return typeof value == 'function';
};

/**
 * Returns true if the specified value is an object.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is an object.
 */
WebF.base.isObject = function (value) {
    return (value != null) && (typeof value == 'object');
};

/**
 * Returns true if the specified value is a date.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is a date.
 */
WebF.base.isDate = function (value) {
    return (Object.prototype.toString.call(value) === '[object Date]') && !isNaN(value.valueOf());
};

/**
 * Returns true if the specified value is null.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is null.
 */
WebF.base.isNull = function (value) {
    return value === null;
};

/**
 * Returns true if the specified value is undefined.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is undefined.
 */
WebF.base.isUndefined = function (value) {
    return value === undefined;
};

/**
 * Returns true if the specified value is null or undefined.
 * 
 * @param {?} value Variable to test.
 * @returns {boolean} Whether variable is null or undefined.
 */
WebF.base.isNullOrUndefined = function (value) {
    return value == null;
};

/**
 * @throws {Error}
 */
WebF.base.notImplementedMethod = function () {
    throw new Error('Not implemented.');
};

/**
 * @throws {Error} when invoked to indicate the method should be overridden.
 */
WebF.base.abstractMethod = function () {
    throw new Error('Unimplemented abstract method.');
};

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

WebF.array = {};

/**
 * Copies a range of elements from an Array starting at the specified source index and pastes them to another Array starting at the specified destination index.
 * 
 * @param {Array<*>} sourceArray The Array that contains the data to copy.
 * @param {number} sourceIndex An integer that represents the index in the sourceArray at which copying begins.
 * @param {Array<*>} destinationArray The Array that receives the data.
 * @param {number} destinationIndex An integer that represents the index in the destinationArray at which storing begins.
 * @param {number} length An integer that represents the number of elements to copy.
 */
WebF.array.copy = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
    for (var x = 0; x < length; x++) {
        destinationArray[destinationIndex++] = sourceArray[sourceIndex++];
    }
};

/**
* @param {Array<Object>} array
* @param {number|string} id
* @returns {Object}
*/
WebF.array.findById = function (array, id) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item.id === id) {
            return item;
        }
    }

    return null;
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {Object}
*/
WebF.array.findByPropertyValue = function (array, propertyName, value) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] === value) {
            return item;
        }
    }

    return null;
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {Array<Object>}
*/
WebF.array.findAllByPropertyValue = function (array, propertyName, value) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] !== value) {
            continue;
        }

        items.push(item);
    }

    return items;
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {Object}
*/
WebF.array.removeByPropertyValue = function (array, propertyName, value) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] === value) {
            return WebF.array.removeAt(array, x);
        }
    }

    return null;
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {Array<Object>}
*/
WebF.array.removeAllByPropertyValue = function (array, propertyName, value) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] !== value) {
            continue;
        }

        var item2 = null;

        if ((item2 = WebF.array.removeAt(array, x)) == null) {
            continue;
        }

        items.push(item2);
        x--;
    }

    return items;
};

/**
* @param {Array<*>} array
* @param {*} item
* @returns {*}
*/
WebF.array.remove = function (array, item) {
    var index = array.indexOf(item);

    if (index < 0) {
        return null;
    }

    return WebF.array.removeAt(array, index);
};

/**
* @param {Array<Object>} array
* @param {number|string} id
* @returns {Object}
*/
WebF.array.removeById = function (array, id) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item.id === id) {
            return WebF.array.removeAt(array, x);
        }
    }

    return null;
};

/**
* @param {Array<*>} array
* @param {number} index
* @returns {*}
*/
WebF.array.removeAt = function (array, index) {
    var removed = array.splice(index, 1);

    return ((removed.length > 0) ? removed[0] : null);
};

/**
 * Adds the elements to the end of the Array.
 * 
 * @param {Array<*>} array The array to which elements are added.
 * @param {Array<*>} items Elements to add to the end of the array.
 */
WebF.array.addRange = function (array, items) {
    if ((items == null) || (items.length < 1)) {
        return;
    }

    var itemCount = 32768;

    var length = items.length;

    if (length <= itemCount) {
        array.push.apply(array, items);
    }
    else {
        /*
        * Chrome faster when lots of data
        for (var x = 0; x < length; x++) {
            array.push(items[x]);
        }
        */

        var itemsArray = [];
        var startIndex = 0;
        var endIndex = itemCount;
        var items2;

        do {
            var items2 = items.slice(startIndex, endIndex);
            itemsArray.push(items2);

            startIndex += items2.length;
            var num = startIndex + itemCount;
            endIndex = (num < length) ? num : length;
        }
        while (startIndex < length);

        var x = 0;

        do {
            array.push.apply(array, itemsArray[x++]);
        }
        while (x < itemsArray.length);
    }
};

/**
 * Inserts an element into the Array at the specified index.
 * 
 * @param {Array<*>} array The array into which the element is inserted.
 * @param {number} index The zero-based index at which item should be inserted.
 * @param {*} item The element to insert into the array.
 */
WebF.array.insert = function (array, index, item) {
    array.splice(index, 0, item);
};

/**
 * Inserts the elements into the Array at the specified index.
 * 
 * @param {Array<*>} array The array into which elements are inserted.
 * @param {number} index The zero-based index at which the new elements should be inserted.
 * @param {Array<*>} items Elements to insert into the array.
 */
WebF.array.insertRange = function (array, index, items) {
    if ((items == null) || (items.length < 1)) {
        return;
    }

    var itemCount = 32768;

    var length = items.length;
    var args;

    if (length <= itemCount) {
        // In Chrome '.slice(0, items.length)' faster than '.slice()'.
        args = items.slice(0, items.length);
        args.unshift(index, 0);

        array.splice.apply(array, args);
    }
    else {
        var itemsArray = [];
        var startIndex = 0;
        var endIndex = itemCount;
        var items2;

        do {
            var items2 = items.slice(startIndex, endIndex);
            itemsArray.push(items2);

            startIndex += items2.length;
            var num = startIndex + itemCount;
            endIndex = (num < length) ? num : length;
        }
        while (startIndex < length);

        var x = 0;

        do {
            args = itemsArray[x++];
            var length2 = args.length;

            args.unshift(index, 0);
            index += length2;

            array.splice.apply(array, args);
        }
        while (x < itemsArray.length);
    }
};

/**
 * 
 * @param {Array<*>} array
 */
WebF.array.clear = function (array) {
    //array.length = 0;
    array.splice(0, array.length);
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {boolean}
*/
WebF.array.containsByPropertyValue = function (array, propertyName, value) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] === value) {
            return true;
        }
    }

    return false;
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {*}
 */
WebF.array.find = function (array, predicate) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (predicate(item) === true) {
            return item;
        }
    }

    return null;
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {Array<*>}
 */
WebF.array.findAll = function (array, predicate) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (predicate(item) === true) {
            items.push(item);
        }
    }

    return items;
};

/**
* @param {Array<*>} array
* @param {*} item
* @returns {boolean}
*/
WebF.array.contains = function (array, item) {
    return (array.indexOf(item) >= 0);
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {boolean}
 */
WebF.array.exists = function (array, predicate) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (predicate(item) === true) {
            return true;
        }
    }

    return false;
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {Array<*>}
 */
WebF.array.removeAllIf = function (array, predicate) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (predicate(item) !== true) {
            continue;
        }

        var item2 = null;

        if ((item2 = WebF.array.removeAt(array, x)) == null) {
            continue;
        }

        items.push(item2);
        x--;
    }

    return items;
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {number}
 */
WebF.array.findIndex = function (array, predicate) {
    for (var x = 0; x < array.length; x++) {
        if (predicate(array[x]) === true) {
            return x;
        }
    }

    return -1;
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {*}
 */
WebF.array.removeIf = function (array, predicate) {
    var index = WebF.array.findIndex(array, predicate);

    if (index < 0) {
        return null;
    }

    return WebF.array.removeAt(array, index);
};
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

WebF.char = {};

/**
 * @const
 */
WebF.char.MAX_VALUE = '\uffff';

/**
 * @const
 */
WebF.char.MIN_VALUE = '\u0000';

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isLatin1 = function (c) {
    return (c <= '\u00ff');
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isAscii = function (c) {
    return (c <= '\u007f');
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isWhitespace = function (c) {
    if (WebF.char.isLatin1(c)) {
        return WebF.char.isWhitespaceLatin1(c);
    }

    return /^\s/.test(c);
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isWhitespaceLatin1 = function (c) {
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
WebF.char.wsChars = [' ', '\n', '\r', '\t'];

/**
* @param {string} c Character
* @returns {boolean}
*/
WebF.char.isWS = function (c) {
    return ((c === ' ') || (c === '\n') || (c === '\r') || (c === '\t'));
};

/**
 * Is character a linear white space?
 * 
 * @param {string} c Character
 * @returns {boolean}
 */
WebF.char.isLWS = function (c) {
    return ((c <= ' ') && ((c === ' ') || (c === '\n') || (c === '\r') || (c === '\t')));
};

/**
 * Only consider ASCII characters.
 * 
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isAsciiLetter = function (c) {
    return (((c >= 'a') && (c <= 'z')) || ((c >= 'A') && (c <= 'Z')));
};

/**
 * @param {string} c Character.
 * @returns {boolean}
 */
WebF.char.isAsciiLetterOrDigit = function (c) {
    return (WebF.char.isAsciiLetter(c) || ((c >= '0') && (c <= '9')));
};
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

WebF.object = {};

/**
 * 
 * @param {Object} obj Object on which modify the property.
 * @param {string} propertyName The property name.
 * @param {*} [value] The value associated with the property.
 */
WebF.object.defineReadOnly = function (obj, propertyName, value) {
    var d = {
        enumerable: true,
        writable: false
    };

    if (arguments.length === 3) {
        d.value = value;
    }

    Object.defineProperty(obj, propertyName, d);
};

/**
 * 
 * @param {Object} obj Object on which to add or modify the property.
 * @param {string} propertyName The property name.
 * @param {Function} getter 
 */
WebF.object.defineGetter = function (obj, propertyName, getter) {
    Object.defineProperty(obj, propertyName, {
        get: getter,
        enumerable: true
    });
};


/**
 * Returns the base prototype of the object.
 * 
 * @param {any} obj The object that references the prototype.
 * @returns {*}
 */
WebF.object.getBasePrototype = function (obj) {
    return Object.getPrototypeOf(Object.getPrototypeOf(obj));
};


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

WebF.string = new function () {
    /**
     * Start.
     * 
     * @const
     */
    var TRIM_HEAD = 0;
    /**
     * End.
     * 
     * @const
     */
    var TRIM_TAIL = 1;
    /**
     * @const
     */
    var TRIM_BOTH = 2;

    /**
     * Removes all leading and trailing occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the start and end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    this.trim = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_BOTH);
    };

    /**
     * Removes all leading occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of characters in the trimChars parameter are removed from the start of the specified string. If trimChars is null or an empty array, white-space characters are removed instead.
     */
    this.trimStart = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_HEAD);
    };

    /**
     * Removes all trailing occurrences of a set of characters specified in an array from the specified 'string' object.
     * 
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    this.trimEnd = function (value, trimChars) {
        return trimHelper(value, trimChars, TRIM_TAIL);
    };

    /**
     * @param {string} value
     * @param {Array<string>} [trimChars] An array of Unicode characters to remove, or null.
     * @param {number} trimType TrimType: trimHead (start), trimTail (end), trimBoth.
     * @returns {string} The string that remains after all occurrences of the characters in the trimChars parameter are removed from the start and end of the specified string. If trimChars is null or an empty array, white-space characters are removed instead. If no characters can be trimmed from the specified instance, the method returns the specified instance unchanged.
     */
    function trimHelper(value, trimChars, trimType) {
        var start = 0;
        var end = value.length - 1;
        var x;

        if ((trimChars == null) || (trimChars.length < 1)) {
            if (trimType !== TRIM_TAIL) {
                for (; start < value.length; start++) {
                    if (!WebF.char.isWhitespace(value[start])) {
                        break;
                    }
                }
            }

            if (trimType !== TRIM_HEAD) {
                for (; end >= start; end--) {
                    if (!WebF.char.isWhitespace(value[end])) {
                        break;
                    }
                }
            }
        }
        else {
            if (trimType !== TRIM_TAIL) {
                for (; start < value.length; start++) {
                    var charValue = value[start];
                    x = 0;

                    for (; x < trimChars.length; x++) {
                        if (trimChars[x] === charValue) {
                            break;
                        }
                    }

                    if (x === trimChars.length) {
                        break;
                    }
                }
            }

            if (trimType !== TRIM_HEAD) {
                for (; end >= start; end--) {
                    var charValue = value[end];
                    x = 0;

                    for (; x < trimChars.length; x++) {
                        if (trimChars[x] === charValue) {
                            break;
                        }
                    }

                    if (x === trimChars.length) {
                        break;
                    }
                }
            }
        }

        var length = end - start + 1;

        if (length === value.length) {
            return value;
        }

        if (length === 0) {
            return '';
        }

        return value.substr(start, length);
    }

    /**
     * @param {string} value
     * @returns {boolean}
     */
    this.isNullOrEmpty = function (value) {
        return ((value == null) || (value.length === 0));
    };

    /**
     * @param {string} value
     * @returns {boolean}
     */
    this.isNullOrWhitespace = function (value) {
        if ((value == null) || (value.length === 0)) {
            return true;
        }

        // /^[\s\xa0]*$/.test(value)
        return /^[\s\u0085]+$/.test(value);
    };
};
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

/**
 * @interface
 */
WebF.IDisposable = function () { };

WebF.IDisposable.prototype.dispose = WebF.base.notImplementedMethod;
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

WebF.utils = {};
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

WebF.userAgent = {};

/**
 * Returns the userAgent string for the current browser.
 * 
 * @returns {string}
 */
WebF.userAgent.getUserAgentString = function () {
    return (navigator && navigator.userAgent) ? navigator.userAgent : '';
};

/**
 * Determines whether the user agent contains the given string.
 * 
 * @param {string} value The string to search.
 * @param {boolean} [ignoreCase] The default is false.
 * @returns {boolean}
 */
WebF.userAgent.contains = function (value, ignoreCase) {
    var ua = WebF.userAgent.getUserAgentString();

    if (ignoreCase === true) {
        ua = ua.toLowerCase();
        value = value.toLowerCase();
    }

    return (ua.indexOf(value) > -1);
};
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

WebF.userAgent.browser = {};

/**
 * Determines whether the user's browser is Opera.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isOpera = function () {
    return WebF.userAgent.contains('Opera');
};

/**
 * Determines whether the user's browser is IE.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isIE = function () {
    return (WebF.userAgent.contains('Trident') || WebF.userAgent.contains('MSIE'));
};

/**
 * Determines whether the user's browser is Edge.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isEdge = function () {
    return WebF.userAgent.contains('Edge');
};

/**
 * Determines whether the user's browser is Firefox.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isFirefox = function () {
    return WebF.userAgent.contains('Firefox');
};

/**
 * Determines whether the user's browser is Safari.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isSafari = function () {
    return (WebF.userAgent.contains('Safari') &&
        !(WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isOpera() || WebF.userAgent.browser.isEdge() || WebF.userAgent.browser.isCoast() || WebF.userAgent.browser.isSilk() || WebF.userAgent.contains('Android')));
};

/**
 * Determines whether the user's browser is Coast (Opera's Webkit-based iOS browser).
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isCoast = function () {
    return WebF.userAgent.contains('Coast');
};

/**
 * Determines whether the user's browser is iOS Webview.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isIOSWebview = function () {
    return ((WebF.userAgent.contains('iPad') || WebF.userAgent.contains('iPhone')) &&
        WebF.userAgent.contains('AppleWebKit') &&
        !(WebF.userAgent.browser.isSafari() || WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isCoast()));
};

/**
 * Determines whether the user's browser is Chrome.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isChrome = function () {
    return ((WebF.userAgent.contains('Chrome') || WebF.userAgent.contains('CriOS')) && !WebF.userAgent.browser.isEdge());
};

/**
 * Determines whether the user's browser is the Android browser.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isAndroidBrowser = function () {
    return (WebF.userAgent.contains('Android') && !(WebF.userAgent.browser.isChrome() || WebF.userAgent.browser.isFirefox() || WebF.userAgent.browser.isOpera() || WebF.userAgent.browser.isSilk()));
};

/**
 * Determines whether the user's browser is Silk.
 * 
 * @returns {boolean}
 */
WebF.userAgent.browser.isSilk = function () {
    return WebF.userAgent.contains('Silk');
};

/**
 * @returns {string}
 */
WebF.userAgent.browser.getVersion = function () {
    return '';
};

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

/**
 * Browser capabilities.
 */
WebF.userAgent.capabilities = {};

/**
 * @param {Document} [doc]
 * @returns {{hiddenPropertyName: string, visibilityStatePropertyName: string, visibilityChangeEventType: string, isSupported: boolean}}
 */
WebF.userAgent.capabilities.getPageVisibilityInfo = function (doc) {
    if (!doc) {
        doc = document;
    }

    var hiddenPropertyName = null;
    var visibilityStatePropertyName = null;
    var visibilityChangeEventType = null;

    if (typeof doc.hidden !== 'undefined') {
        hiddenPropertyName = 'hidden';
        visibilityStatePropertyName = 'visibilityState';
        visibilityChangeEventType = 'visibilitychange';
    }
    else if (typeof doc.webkitHidden !== 'undefined') {
        hiddenPropertyName = 'webkitHidden';
        visibilityStatePropertyName = 'webkitVisibilityState';
        visibilityChangeEventType = 'webkitvisibilitychange';
    }
    else if (typeof doc.mozHidden !== 'undefined') {
        hiddenPropertyName = 'mozHidden';
        visibilityStatePropertyName = 'mozVisibilityState';
        visibilityChangeEventType = 'mozvisibilitychange';
    }
    else if (typeof doc.msHidden !== 'undefined') {
        hiddenPropertyName = 'msHidden';
        visibilityStatePropertyName = 'msVisibilityState';
        visibilityChangeEventType = 'msvisibilitychange';
    }
    else if (typeof doc.oHidden !== 'undefined') {
        hiddenPropertyName = 'oHidden';
        visibilityStatePropertyName = 'oVisibilityState';
        visibilityChangeEventType = 'ovisibilitychange';
    }

    var isSupported = !!hiddenPropertyName;

    return {
        hiddenPropertyName: hiddenPropertyName,
        visibilityStatePropertyName: visibilityStatePropertyName,
        visibilityChangeEventType: visibilityChangeEventType,
        isSupported: isSupported
    };
};

/**
 * @param {Document} [doc]
 * @returns {{fullscreenEnabledPropertyName: string, fullscreenElementPropertyName: string, requestFullscreenPropertyName: string, exitFullscreenPropertyName: string, fullscreenChangeEventType: string, fullscreenErrorEventType: string}}
 */
WebF.userAgent.capabilities.getFullscreenInfo = function (doc) {
    if (!doc) {
        doc = document;
    }

    var standard = [
        'fullscreenEnabled',
        'fullscreenElement',
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenchange',
        'fullscreenerror',
    ];

    var webkit = [
        'webkitFullscreenEnabled',
        'webkitFullscreenElement',
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',
    ];

    var moz = [
        'mozFullScreenEnabled',
        'mozFullScreenElement',
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozfullscreenchange',
        'mozfullscreenerror',
    ];

    var ms = [
        'msFullscreenEnabled',
        'msFullscreenElement',
        'msRequestFullscreen',
        'msExitFullscreen',
        'MSFullscreenChange',
        'MSFullscreenError',
    ];

    var array = [null, null, null, null, null, null];

    if (typeof doc.fullscreenEnabled !== 'undefined') {
        array = standard;
    }
    else if (typeof doc.webkitFullscreenEnabled !== 'undefined') {
        array = webkit;
    }
    else if (typeof doc.mozFullScreenEnabled !== 'undefined') {
        array = moz;
    }
    else if (typeof doc.msFullscreenEnabled !== 'undefined') {
        array = ms;
    }
    
    return {
        fullscreenEnabledPropertyName: array[0],
        fullscreenElementPropertyName: array[1],
        requestFullscreenPropertyName: array[2],
        exitFullscreenPropertyName: array[3],
        fullscreenChangeEventType: array[4],
        fullscreenErrorEventType: array[5]
    };
};


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

WebF.userAgent.device = {};

/**
 * Determines whether the user is using a mobile device.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isMobile = function () {
    return (!this.isTablet() &&
        (WebF.userAgent.contains('iPod') || WebF.userAgent.contains('iPhone') ||
            WebF.userAgent.contains('Android') || WebF.userAgent.contains('IEMobile')));
};

/**
 * Determines whether the user is using a tablet.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isTablet = function () {
    return (WebF.userAgent.contains('iPad') ||
        (WebF.userAgent.contains('Android') && !WebF.userAgent.contains('Mobile')) ||
        WebF.userAgent.contains('Silk'));
};

/**
 * Determines whether the user is using a desktop computer.
 * 
 * @returns {boolean}
 */
WebF.userAgent.device.isDesktop = function () {
    return (!this.isMobile() && !this.isTablet());
};
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

WebF.userAgent.engine = {};

/**
 * @returns {boolean} Whether the rendering engine is Trident.
 */
WebF.userAgent.engine.isTrident = function () {
    return (WebF.userAgent.contains('Trident') || WebF.userAgent.contains('MSIE'));
};

/**
 * @returns {boolean} Whether the rendering engine is Edge.
 */
WebF.userAgent.engine.isEdge = function () {
    return WebF.userAgent.contains('Edge');
};

/**
 * @returns {boolean} Whether the rendering engine is WebKit.
 */
WebF.userAgent.engine.isWebKit = function () {
    return (WebF.userAgent.contains('WebKit', true) && !WebF.userAgent.engine.isEdge());
};

/**
 * @returns {boolean} Whether the rendering engine is Gecko.
 */
WebF.userAgent.engine.isGecko = function () {
    return (WebF.userAgent.contains('Gecko') && !(WebF.userAgent.engine.isWebKit() || WebF.userAgent.engine.isTrident() || WebF.userAgent.engine.isEdge()));
};

/**
 * @returns {boolean} Whether the rendering engine is Presto.
 */
WebF.userAgent.engine.isPresto = function () {
    return WebF.userAgent.contains('Presto');
};

/**
 * @returns {string}
 */
WebF.userAgent.engine.getVersion = function () {
    return '';
};
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

WebF.userAgent.flash = {};

/**
 * @returns {{hasFlash: boolean, version: string}}
 */
WebF.userAgent.flash.getFlashInfo = function () {

    if (navigator && navigator.plugins && navigator.plugins.length) {
        var plugin = navigator.plugins['Shockwave Flash'];

        if (plugin) {

        }
    }
};




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

WebF.userAgent.jscript = {};

/**
 * @returns {boolean}
 */
WebF.userAgent.jscript.hasJScript = function () {
    return (window.ScriptEngine && window.ScriptEngine() == 'JScript');
};

/**
 * @returns {{majorVersion: number, minorVersion: number, buildVersion: number, fullVersion: string}}
 */
WebF.userAgent.jscript.getVersion = function () {
    if (!this.hasJScript()) {
        return null;
    }

    var majorVersion = window.ScriptEngineMajorVersion;
    var minorVersion = window.ScriptEngineMinorVersion;
    var buildVersion = window.ScriptEngineBuildVersion;
    var fullVersion = majorVersion + '.' + minorVersion + '.' + buildVersion;

    return {
        majorVersion: majorVersion,
        minorVersion: minorVersion,
        buildVersion: buildVersion,
        fullVersion: fullVersion
    };
};
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

WebF.userAgent.keyboard = {};

/**
 * Determines whether Mac-based keyboard shortcuts should be used.
 * 
 * @returns {boolean}
 */
WebF.userAgent.keyboard.isMacKeyboard = function () {
    return (WebF.userAgent.platform.isMacintosh() || WebF.userAgent.platform.isIOS());
};

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

WebF.userAgent.platform = {};

/**
 * Determines whether the platform is Android.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isAndroid = function () {
    return WebF.userAgent.contains('Android');
};

/**
 * Determines whether the platform is iPad.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPad = function () {
    return WebF.userAgent.contains('iPad');
};

/**
 * Determines whether the platform is iPod.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPod = function () {
    return WebF.userAgent.contains('iPhone');
};

/**
 * Determines whether the platform is iPod.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIPhone = function () {
    return (WebF.userAgent.contains('iPhone') && !WebF.userAgent.platform.isIPad() && !WebF.userAgent.platform.isIPod());
};

/**
 * Determines whether the platform is iOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isIOS = function () {
    return (WebF.userAgent.platform.isIPhone() || WebF.userAgent.platform.isIPad() || WebF.userAgent.platform.isIPod());
};

/**
 * Determines whether the platform is Macintosh.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isMacintosh = function () {
    return WebF.userAgent.contains('Macintosh');
};

/**
 * Determines whether the platform is Windows.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isWindows = function () {
    return WebF.userAgent.contains('Windows');
};

/**
 * Determines whether the platform is Linux.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isLinux = function () {
    return WebF.userAgent.contains('Linux');
};

/**
 * Determines whether the platform is ChromeOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isChromeOS = function () {
    return WebF.userAgent.contains('CrOS');
};

/**
 * Determines whether the platform is Chromecast.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isChromecast = function () {
    return WebF.userAgent.contains('CrKey');
};

/**
 * Determines whether the platform is KaiOS.
 * 
 * @returns {boolean}
 */
WebF.userAgent.platform.isKaiOS = function () {
    return WebF.userAgent.contains('KaiOS');
};

/**
 * @returns {string}
 */
WebF.userAgent.platform.getVersion = function () {
    return '';
};



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

/**
 * @namespase
 */
WebF.events = {};
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

/**
 * The base class for all event classes.
 * 
 * @constructor
 * @param {string} type
 * @param {Object} source
 */
WebF.events.WFEvent = function (type, source) {
    this.type = type;
    this.source = source;
};
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

/**
 * @constructor
 * @param {string} type
 * @param {Object} source
 * @param {Event} nativeEvent
 */
WebF.events.WFNativeEvent = function (type, source, nativeEvent) {
    WebF.events.WFEvent.call(this, type, source);

    this.nativeEvent = nativeEvent;
};

WebF.events.WFNativeEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.events.WFNativeEvent.prototype.constructor = WebF.events.WFNativeEvent;
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

/**
 * EventDispatcherActionEvent (EDActionEvent).
 * 
 * @constructor
 * @param {Object} source
 * @param {WebF.events.EDAction} action
 * @param {Array<WebF.events.EventHandlers>} handlers
 */
WebF.events.EDActionEvent = function (source, action, handlers) {
    WebF.events.WFEvent.call(this, 'edaction', source);

    /**
     * Gets the EDAction.
     * 
     * @readonly
     */
    this.action = action;

    /**
     * @readonly
     */
    this.handlers = handlers;
};

WebF.events.EDActionEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.events.EDActionEvent.prototype.constructor = WebF.events.EDActionEvent;
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

/**
 * EventDispatcherAction (EDAction).
 * 
 * @const
 * @enum {number}
 */
WebF.events.EDAction = {
    ADDED_EVENT_HANDLER: 0,
    REMOVED_EVENT_HANDLER: 1,
    REMOVED_ALL_EVENT_HANDLERS: 2
};
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

/**
 * @package
 * @constructor
 */
WebF.events.EventDispatcherHandlers = function () {
    /**
     * @package
     * @type {Object<string, Array<function>>}
     */
    this.handlers = Object.create(null);

    /**
     * @private
     * @type {number}
     */
    this._typeCount = 0;

    /**
     * @private
     * @type {number}
     */
    this._handlerCount = 0;
};

/**
 * @param {string} type
 * @param {function} handler
 * @returns {WebF.events.EventHandlers}
 */
WebF.events.EventDispatcherHandlers.prototype.add = function (type, handler) {
    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid parameter "type".');
    }

    var handlerArray = this.handlers[type];

    if (!handlerArray) {
        this.handlers[type] = handlerArray = [];
        this._typeCount++;
    }

    var index = handlerArray.indexOf(handler);

    if (index >= 0) {
        return null;
    }

    handlerArray.push(handler);
    this._handlerCount++;

    return new WebF.events.EventHandlers(type, [handler]);
};

/**
 * @param {string} type
 * @param {function} handler
 * @returns {WebF.events.EventHandlers}
 */
WebF.events.EventDispatcherHandlers.prototype.remove = function (type, handler) {
    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid parameter "type".');
    }

    var handlerArray = this.handlers[type];

    if (!handlerArray) {
        return null;
    }

    var index = handlerArray.lastIndexOf(handler);

    if (index < 0) {
        return null;
    }

    var handlers = handlerArray.splice(index, 1);
    this._handlerCount -= handlers.length;

    if (handlerArray.length < 1) {
        delete this.handlers[type];
        this._typeCount--;
    }

    return new WebF.events.EventHandlers(type, handlers);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcherHandlers.prototype.removeAll = function (type) {
    var handlerArray;
    var eventHandlersArray = [];

    if (type !== undefined) {
        if (!WebF.base.isString(type) || (type.length < 1)) {
            throw new Error('Invalid parameter "type".');
        }

        handlerArray = this.handlers[type];

        if (!handlerArray) {
            return null;
        }

        delete this.handlers[type];
        this._typeCount--;
        this._handlerCount -= handlerArray.length;

        eventHandlersArray.push(new WebF.events.EventHandlers(type, handlerArray));
    }
    else {
        for (var key in this.handlers) {
            handlerArray = this.handlers[key];

            delete this.handlers[key];

            eventHandlersArray.push(new WebF.events.EventHandlers(key, handlerArray));
        }

        this._typeCount = 0;
        this._handlerCount = 0;
    }

    return eventHandlersArray;
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.events.EventDispatcherHandlers.prototype.getHandlerCount = function (type) {
    if (type === undefined) {
        return this._handlerCount;
    }

    var handlerArray = this.handlers[type];

    return (handlerArray ? handlerArray.length : 0);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcherHandlers.prototype.getHandlers = function (type) {
    var handlerArray;
    var eventHandlersArray = [];

    if (type !== undefined) {
        if (!WebF.base.isString(type) || (type.length < 1)) {
            return eventHandlersArray;
        }

        handlerArray = this.handlers[type];

        if (!handlerArray) {
            return eventHandlersArray;
        }

        eventHandlersArray.push(new WebF.events.EventHandlers(type, handlerArray.slice(0, handlerArray.length)));
    }
    else {
        for (var key in this.handlers) {
            handlerArray = this.handlers[key];

            eventHandlersArray.push(new WebF.events.EventHandlers(key, handlerArray.slice(0, handlerArray.length)));
        }
    }

    return eventHandlersArray;
};

/**
 * @returns {number}
 */
WebF.events.EventDispatcherHandlers.prototype.getTypeCount = function () {
    return this._typeCount;
};
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

/**
 * @constructor
 * @param {function} [actionHandler]
 */
WebF.events.EventDispatcher = function (actionHandler) {
    /**
     * @private
     */
    this._edActionEventHandler = WebF.base.isFunction(actionHandler) ? actionHandler : null;

    /**
     * @private
     * @type {WebF.events.EventDispatcherHandlers}
     */
    this._eventDispatcherHandlers = new WebF.events.EventDispatcherHandlers();
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.events.EventDispatcher.prototype.addEventHandler = function (type, handler) {
    var eventHandlers = this._eventDispatcherHandlers.add(type, handler);

    if (!eventHandlers) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.ADDED_EVENT_HANDLER, [eventHandlers]);
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.events.EventDispatcher.prototype.removeEventHandler = function (type, handler) {
    var eventHandlers = this._eventDispatcherHandlers.remove(type, handler);

    if (!eventHandlers) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.REMOVED_EVENT_HANDLER, [eventHandlers]);
};

/**
 * @param {string} [type]
 */
WebF.events.EventDispatcher.prototype.removeAllEventHandlers = function (type) {
    var eventHandlersArray = this._eventDispatcherHandlers.removeAll(type);

    if (!eventHandlersArray) {
        return;
    }

    this._onEventDispatcherAction(WebF.events.EDAction.REMOVED_ALL_EVENT_HANDLERS, eventHandlersArray);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.events.EventDispatcher.prototype.dispatchEvent = function (e) {
    var type = e.type;

    if (!WebF.base.isString(type) || (type.length < 1)) {
        throw new Error('Invalid event.');
    }

    var handlerArray = this._eventDispatcherHandlers.handlers[type];

    if (!handlerArray || (handlerArray.length < 1)) {
        return;
    }

    var x = 0;

    do {
        handlerArray[x++](e);
    }
    while (x < handlerArray.length);
};

/**
 * @returns {number}
 */
WebF.events.EventDispatcher.prototype.getEventTypeCount = function () {
    return this._eventDispatcherHandlers.getTypeCount();
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.events.EventDispatcher.prototype.getEventHandlerCount = function (type) {
    return this._eventDispatcherHandlers.getHandlerCount(type);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.events.EventDispatcher.prototype.getEventHandlers = function (type) {
    return this._eventDispatcherHandlers.getHandlers(type);
};

/**
 * @private
 * @param {WebF.events.MEHAction} action
 * @param {Array<function>} handlers
 */
WebF.events.EventDispatcher.prototype._onEventDispatcherAction = function (action, handlers) {
    if (!this._edActionEventHandler) {
        return;
    }

    var e = new WebF.events.EDActionEvent(this, action, handlers);

    this._edActionEventHandler(e);
};
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

/**
 * @constructor
 * @param {Object|EventTarget} source
 * @param {string} eventType
 * @param {function} handler
 */
WebF.events.EventHandler = function (source, eventType, handler) {
    this.source = source;
    this.eventType = eventType;
    this.handler = handler;
};
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

/**
 * @constructor
 * @param {string} eventType
 * @param {Array<function>} handlers
 */
WebF.events.EventHandlers = function (eventType, handlers) {
    this.eventType = eventType;
    this.handlers = handlers;
};
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

/**
 * MultipleEventHandlerActionEvent (MEHActionEvent).
 * 
 * @constructor
 * @param {Object} source
 * @param {WebF.events.MEHAction} action
 * @param {Array<function>} handlers
 */
WebF.events.MEHActionEvent = function (source, action, handlers) {
    WebF.events.WFEvent.call(this, 'mehaction', source);

    /**
     * Gets the MEHAction.
     * 
     * @readonly
     */
    this.action = action;

    /**
     * @readonly
     */
    this.handlers = handlers;
};

WebF.events.MEHActionEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.events.MEHActionEvent.prototype.constructor = WebF.events.MEHActionEvent;
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

/**
 * MultipleEventHandlerAction (MEHAction).
 * 
 * @const
 * @enum {number}
 */
WebF.events.MEHAction = {
    ADDED_HANDLER: 0,
    REMOVED_HANDLER: 1,
    REMOVED_ALL_HANDLERS: 2
};
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

/**
 * @constructor
 * @param {function} [actionHandler]
 */
WebF.events.MultipleEventHandler = function (actionHandler) {
    /**
     * @private
     */
    this._actionHandler = WebF.base.isFunction(actionHandler) ? actionHandler : null;
    /**
     * @private
     * @type {Array<function>}
     */
    this._handlers = [];
};

/**
 * @param {function} handler
 */
WebF.events.MultipleEventHandler.prototype.addHandler = function (handler) {
    var index = this._handlers.indexOf(handler);

    if (index >= 0) {
        return;
    }

    this._handlers.push(handler);

    this._onAction(WebF.events.MEHAction.ADDED_HANDLER, [handler]);
};

/**
 * @param {function} handler
 */
WebF.events.MultipleEventHandler.prototype.removeHandler = function (handler) {
    var index = this._handlers.lastIndexOf(handler);

    if (index < 0) {
        return;
    }

    var handlers = this._handlers.splice(index, 1);

    this._onAction(WebF.events.MEHAction.REMOVED_HANDLER, handlers);
};

WebF.events.MultipleEventHandler.prototype.removeAllHandlers = function () {
    var handlers = this._handlers.splice(0, this._handlers.length);

    this._onAction(WebF.events.MEHAction.REMOVED_ALL_HANDLERS, handlers);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.events.MultipleEventHandler.prototype.invoke = function (e) {
    if (this._handlers.length < 1) {
        return;
    }

    var x = 0;

    do {
        this._handlers[x++](e);
    }
    while (x < this._handlers.length);
};

/**
 * @returns {number}
 */
WebF.events.MultipleEventHandler.prototype.getHandlerCount = function () {
    return this._handlers.length;
};

/**
 * @returns {Array<function>}
 */
WebF.events.MultipleEventHandler.prototype.getHandlers = function () {
    return this._handlers.slice(0, this._handlers.length);
};

/**
 * @private
 * @param {WebF.events.MEHAction} action
 * @param {Array<function>} handlers
 */
WebF.events.MultipleEventHandler.prototype._onAction = function (action, handlers) {
    if (!this._actionHandler) {
        return;
    }

    var e = new WebF.events.MEHActionEvent(this, action, handlers);

    this._actionHandler(e);
};
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

/**
 * @const
 * @enum {string}
 */
WebF.events.NativeEventType = {
    // <UI Events>
    /**
     * Trusted Targets: Window, Document, Element.
     */
    LOAD: 'load',
    /**
     * Trusted Targets: Window, Document, Element.
     */
    UNLOAD: 'unload',
    /**
     * Trusted Targets: Window, Element.
     */
    ABORT: 'abort',
    /**
     * Trusted Targets: Window, Element.
     */
    ERROR: 'error',
    /**
     * Trusted Targets: Element.
     */
    SELECT: 'select',

    /**
     * Legacy Event.
     * Trusted Targets: Element.
     */
    DOMACTIVATE: 'DOMActivate',
    // </UI Events>

    // <Focus Events>
    /**
     * Trusted Targets: Window, Element.
     */
    BLUR: 'blur',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUS: 'focus',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUSIN: 'focusin',
    /**
     * Trusted Targets: Window, Element.
     */
    FOCUSOUT: 'focusout',

    /**
     * Legacy Event.
     * Trusted Targets: Window, Element.
     */
    DOMFOCUSIN: 'DOMFocusIn',
    /**
     * Legacy Event.
     * Trusted Targets: Window, Element.
     */
    DOMFOCUSOUT: 'DOMFocusOut',
    // </Focus Events>

    // <Mouse Events>
    /**
     * Trusted Targets: Element.
     */
    CLICK: 'click',
    /**
     * Trusted Targets: Element.
     */
    DBCLICK: 'dbclick',
    /**
     * Trusted Targets: Element.
     */
    MOUSEDOWN: 'mousedown',
    /**
     * Trusted Targets: Element.
     */
    MOUSEENTER: 'mouseenter',
    /**
     * Trusted Targets: Element.
     */
    MOUSELEAVE: 'mouseleave',
    /**
     * Trusted Targets: Element.
     */
    MOUSEMOVE: 'mousemove',
    /**
     * Trusted Targets: Element.
     */
    MOUSEOUT: 'mouseout',
    /**
     * Trusted Targets: Element.
     */
    MOUSEOVER: 'mouseover',
    /**
     * Trusted Targets: Element.
     */
    MOUSEUP: 'mouseup',
    // </Mouse Events>

    // <Wheel Events>
    /**
     * Trusted Targets: Element.
     */
    WHEEL: 'wheel',
    // </Wheel Events>

    // <Input Events>
    /**
     * Trusted Targets: Element (specifically: control types such as HTMLInputElement, etc.) or any Element with contenteditable attribute enabled.
     */
    BEFOREINPUT: 'beforeinput',
    /**
     * Trusted Targets: Element (specifically: control types such as HTMLInputElement, etc.) or any Element with contenteditable attribute enabled.
     */
    INPUT: 'input',
    // </Input Events>

    // <Keyboard Events>
    /**
     * Trusted Targets: Element.
     */
    KEYDOWN: 'keydown',
    /**
     * Trusted Targets: Element.
     */
    KEYUP: 'keyup',

    /**
     * Legacy Event.
     * Trusted Targets: Element.
     */
    KEYPRESS: 'keypress',

    // </Keyboard Events>

    // <Composition Events>
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONSTART: 'compositionstart',
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONUPDATE: 'compositionupdate',
    /**
     * Trusted Targets: Element.
     */
    COMPOSITIONEND: 'compositionend',

    // <Composition Events>

    // <Mutation Events> (Legacy Events)
    /**
     * Trusted Targets: Element.
     */
    DOMATTRMODIFIED: 'DOMAttrModified',
    /**
     * Trusted Targets: Text, Comment, ProcessingInstruction.
     */
    DOMCHARACTERDATAMODIFIED: 'DOMCharacterDataModified',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEINSERTED: 'DOMNodeInserted',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEINSERTEDINTODOCUMENT: 'DOMNodeInsertedIntoDocument',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEREMOVED: 'DOMNodeRemoved',
    /**
     * Trusted Targets: Element, Attr, Text, Comment, DocumentType, ProcessingInstruction.
     */
    DOMNODEREMOVEDFROMDOCUMENT: 'DOMNodeRemovedFromDocument',
    /**
     * Trusted Targets: Window, Document, DocumentFragment, Element, Attr.
     */
    DOMSUBTREEMODIFIED: 'DOMSubtreeModified',
    // </Mutation Events>

    // <Drag and Drop Events>
    DRAGSTART: 'dragstart',
    DRAG: 'drag',
    DRAGENTER: 'dragenter',
    DRAGEXIT: 'dragexit',
    DRAGLEAVE: 'dragleave',
    DRAGOVER: 'dragover',
    DRAGEND: 'dragend',
    DROP: 'drop',
    // </Drag and Drop Events>

    // <Network Events>
    ONLINE: 'online',
    OFFLINE: 'offline',
    // </Network Events>

    // <Forms>
    CHANGE: 'change',
    RESET: 'reset',
    SUBMIT: 'submit',
    // </Forms>

    // <Touch Events>
    TOUCHSTART: 'touchstart',
    TOUCHEND: 'touchend',
    TOUCHMOVE: 'touchmove',
    TOUCHENTER: 'touchenter',
    TOUCHLEAVE: 'touchleave',
    TOUCHCANCEL: 'touchcancel',
    // </Touch Events>

    // <View Events>
    FULLSCREENCHANGE: 'fullscreenchange',
    FULLSCREENERROR: 'fullscreenerror',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    // </View Events>

    // <Clipboard Events>
    /**
     * Trusted Targets: Element.
     */
    CUT: 'cut',
    /**
     * Trusted Targets: Element.
     */
    COPY: 'copy',
    /**
     * Trusted Targets: Element.
     */
    PASTE: 'paste',
    BEFORECUT: 'beforecut',
    BEFORECOPY: 'beforecopy',
    BEFOREPASTE: 'beforepaste',
    // </Clipboard Events>

    // <Progress Events>
    LOADSTART: 'loadstart',
    PROGRESS: 'progress',
    TIMEOUT: 'timeout',
    LOADEND: 'loadend',
    // </Progress Events>

    // <Frame Events>
    DOMFRAMECONTENTLOADED: 'DOMFrameContentLoaded',
    // <Frame Events>

    // <Pointer Events>
    POINTEROVER: 'pointerover',
    POINTERENTER: 'pointerenter',
    POINTERDOWN: 'pointerdown',
    POINTERMOVE: 'pointermove',
    POINTERUP: 'pointerup',
    POINTERCANCEL: 'pointercancel',
    POINTEROUT: 'pointerout',
    POINTERLEAVE: 'pointerleave',
    GOTPOINTERCAPTURE: 'gotpointercapture',
    LOSTPOINTERCAPTURE: 'lostpointercapture',
    // </Pointer Events>

    // <Media Capture and Streams>
    // <Media Capture and Streams, MediaStream>
    ADDTRACK: 'addtrack',
    REMOVETRACK: 'removetrack',
    // </Media Capture and Streams, MediaStream>

    // <Media Capture and Streams, MediaStreamTrack>
    MUTE: 'mute',
    UNMUTE: 'unmute',
    OVERCONSTRAINED: 'overconstrained',
    ENDED: 'ended',
    // </Media Capture and Streams, MediaStreamTrack>

    // <Media Capture and Streams, MediaDevices>
    DEVICECHANGE: 'devicechange',
    // </Media Capture and Streams, MediaDevices>
    // </Media Capture and Streams>

    // <Orientation>
    ORIENTATIONCHANGE: 'orientationchange',
    // </Orientation>

    // <DeviceOrientation>
    DEVICEMOTION: 'devicemotion',
    DEVICEORIENTATION: 'deviceorientation',
    // </DeviceOrientation>

    // <Battery Events>
    CHARGINGCHANGE: 'chargingchange',
    CHARGINGTIMECHANGE: 'chargingtimechange',
    DISCHARGINGTIMECHANGE: 'dischargingtimechange',
    LEVELCHANGE: 'levelchange',
    // <Battery Events>

    // <PageVisibility>
    VISIBILITYCHANGE: 'visibilitychange',
    // </PageVisibility>

    // <Print Events>
    /**
     * Trusted Targets: Window.
     */
    AFTERPRINT: 'afterprint',
    /**
     * Trusted Targets: Window.
     */
    BEFOREPRINT: 'beforeprint',
    // </Print Events>

    // <History Events>
    /**
     * Trusted Targets: Window.
     */
    HASHCHANGE: 'hashchange',
    /**
     * Trusted Targets: Window.
     */
    PAGEHIDE: 'pagehide',
    /**
     * Trusted Targets: Window.
     */
    PAGESHOW: 'pageshow',
    /**
     * Trusted Targets: Window.
     */
    POPSTATE: 'popstate',
    // </History Events>

    // <Storage Events>
    /**
     * Trusted Targets: Window.
     */
    STORAGE: 'storage',
    // </Storage Events>

    // <Media Events>
    CANPLAY: 'canplay',
    CANPLAYTHROUGH: 'canplaythrough',
    DURATIONCHANGE: 'durationchange',
    EMPTIED: 'emptied',
    LOADEDDATA: 'loadeddata',
    LOADEDMETADATA: 'loadedmetadata',
    PAUSE: 'pause',
    PLAY: 'play',
    PLAYING: 'playing',
    RATECHANGE: 'ratechange',
    SEEKED: 'seeked',
    SEEKING: 'seeking',
    STALLED: 'stalled',
    SUSPEND: 'suspend',
    TIMEUPDATE: 'timeupdate',
    VOLUMECHANGE: 'volumechange',
    WAITING: 'waiting',

    // <Media Events, TextTrack>
    CUECHANGE: 'cuechange',
    // </Media Events, TextTrack>

    // <Media Events, TextTrackCue>
    ENTER: 'enter',
    EXIT: 'exit',
    // </Media Events, TextTrackCue>
    // </Media Events>

    // Misc
    CONTEXTMENU: 'contextmenu',
    /**
     * Trusted Targets: Document.
     */
    DOMCONTENTLOADED: 'DOMContentLoaded',
    /**
     * Trusted Targets: Window.
     */
    BEFOREUNLOAD: 'beforeunload',
    /**
     * Trusted Targets: Document.
     */
    READYSTATECHANGE: 'readystatechange',
    /**
     * Trusted Targets: EventSource, WebSocket.
     */
    OPEN: 'open',
    /**
     * Trusted Targets: Window, EventSource, WebSocket, MessagePort, BroadcastChannel, DedicatedWorkerGlobalScope, Worker.
     */
    MESSAGE: 'message'
};
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

/**
 * @namespase
 */
WebF.net = {};
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

/**
 * @namespase
 */
WebF.net.mime = {};
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

/**
 * @namespase
 */
WebF.net.mime.mediaTypeNames = {};
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

/**
 * @enum {string}
 */
WebF.net.mime.mediaTypeNames.Application = {
    OCTET_STREAM: 'application/octet-stream',
    PDF: 'application/pdf',
    ZIP: 'application/zip',
    FORM_URLENCODED: 'application/x-www-form-urlencoded',
    JSON: 'application/json',
    JAVASCRIPT: 'application/javascript'
};
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

/**
 * @enum {string}
 */
WebF.net.mime.mediaTypeNames.Image = {
    GIF: 'image/gif',
    TIFF: 'image/tiff',
    JPEG: 'image/jpef',
    PNG: 'image/png'
};
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

/**
 * @enum {string}
 */
WebF.net.mime.mediaTypeNames.Multipart = {
    FORM_DATA: 'multipart/form-data'
};
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

/**
 * @enum {string}
 */
WebF.net.mime.mediaTypeNames.Text = {
    PLAIN: 'text/plain',
    HTML: 'text/html',
    XML: 'text/xml',
    JAVASCRIPT: 'javascript'
};
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

/**
 * @namespase
 */
WebF.net.http = {};
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

/**
 * @namespase
 */
WebF.net.http.headers = {};
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

/**
 * A base class representing an HTTP entity body and content headers.
 * 
 * @abstract
 * @constructor
 */
WebF.net.http.HttpContent = function () {
    /**
     * Gets the content headers.
     * 
     * @readonly
     */
    this.headers = new WebF.net.http.headers.HttpHeaders();
};

/**
 * @virtual
 * @returns {Object}
 */
WebF.net.http.HttpContent.prototype.getBody = function () {
    return null;
};
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

/**
 * Represents a web request.
 * 
 * @abstract
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {XMLHttpRequest|XDomainRequest} nativeRequest
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.WebRequest = function (nativeRequest, method, requestUrl, content) {
    /**
     * @protected
     */
    this.disposed = false;

    /**
     * Gets the native request (XMLHttpRequest or XDomainRequest).
     * 
     * @readonly
     * @type {XMLHttpRequest|XDomainRequest}
     */
    this.nativeRequest = nativeRequest;

    /**
     * Gets or sets the contents of the request.
     * 
     * @readonly
     * @type {WebF.net.http.HttpContent}
     */
    this.content = (content != undefined) ? content : null;

    /**
     * Gets the collection of request headers.
     * 
     * @readonly
     */
    this.headers = new WebF.net.http.headers.HttpHeaders();

    /**
     * Gets or sets the HTTP method used by the web request.
     * 
     * @readonly
     */
    this.method = method;

    /**
     * Gets or sets the URL used for the request.
     * 
     * @readonly
     */
    this.requestUrl = requestUrl;

    this.requestState = WebF.net.WebRequestState.UNINITIALIZED;
};

/**
 * @virtual
 */
WebF.net.WebRequest.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    this.disposed = true;

    this.nativeRequest = null;
};
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

/**
 * Represents a web request message.
 * 
 * @constructor
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.WebRequestMessage = function (method, requestUrl, content) {
    /**
     * Gets or sets the contents of the request.
     * 
     * @type {WebF.net.http.HttpContent}
     */
    this.content = (content != undefined) ? content : null;

    /**
     * Gets the collection of request headers.
     * 
     * @readonly
     */
    this.headers = new WebF.net.http.headers.HttpHeaders();

    /**
     * Gets or sets the HTTP method used by the web request.
     */
    this.method = method;

    /**
     * Gets or sets the URL used for the request.
     */
    this.requestUrl = requestUrl;
};


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

/**
 * Represents a web response.
 * 
 * @abstract
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {XMLHttpRequest} xhr
 * @param {WebF.net.WebRequest} request
 */
WebF.net.WebResponse = function (request) {
    /**
     * @protected
     */
    this.disposed = false;

    /**
     * Gets the WebRequest.
     * 
     * @readonly
     */
    this.request = request;

    /**
     * Gets the content of the response.
     */
    this.content = null;
};

/**
 * Returns the collection of response headers.
 * 
 * @virtual
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.WebResponse.prototype.getHeaders = function () {
    return new WebF.net.http.headers.HttpHeaders();
};

/**
 * @virtual
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.WebResponse.prototype.getHeader = function (name) {
    return null;
};

/**
 * @virtual
 */
WebF.net.WebResponse.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    this.disposed = true;

    this.request.dispose();
};
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

/**
 * @namespase
 */
WebF.net.xhr = {};
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

/**
 * @namespase
 */
WebF.net.xdr = {};
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

/**
 * @const
 * @enum {string}
 */
WebF.net.http.headers.HttpHeaderName = {
    CACHE_CONTROL: 'Cache-Control',
    CONTENT_ENCODING: 'Content-Encoding',
    CONTENT_TYPE: 'Content-Type'
};
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

/**
 * Header.
 * 
 * @constructor
 * @param {string} name The name of the header.
 * @param {string} value The content of the header.
 */
WebF.net.http.headers.HttpHeader = function (name, value) {
    this.name = name;
    this.value = value;
};
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

/**
 * A collection of headers and their values.
 * 
 * @constructor
 */
WebF.net.http.headers.HttpHeaders = function () {
    /**
     * @private
     * @type {Array<WebF.net.http.headers.HttpHeader>}
     */
    this._items = [];
};

/**
 * Adds the specified header and its value into the collection.
 * 
 * @param {string} name The header to add to the collection.
 * @param {string} value The content of the header.
 */
WebF.net.http.headers.HttpHeaders.prototype.add = function (name, value) {
    this._items.push(new WebF.net.http.headers.HttpHeader(name, value));
};

/**
 * Removes all headers from collection.
 */
WebF.net.http.headers.HttpHeaders.prototype.clear = function () {
    this._items = [];
};

/**
 * @param {string} name The name of the header.
 * @returns {Array<WebF.net.http.headers.HttpHeader>}
 */
WebF.net.http.headers.HttpHeaders.prototype.get = function (name) {
    return WebF.array.findAllByPropertyValue(this._items, 'name', name);
};

/**
 * @returns {Array<WebF.net.http.headers.HttpHeader>}
 */
WebF.net.http.headers.HttpHeaders.prototype.getAllHeaders = function () {
    return this._items.slice(0, this._items.length);
};

/**
 * @param {number} index
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.http.headers.HttpHeaders.prototype.getByIndex = function (index) {
    if ((index < 0) || (index >= this._items.length)) {
        return null;
    }

    return this._items[index];
};

/**
 * 
 * @param {string} name The name of the header.
 * @returns {boolean}
 */
WebF.net.http.headers.HttpHeaders.prototype.contains = function (name) {
    return WebF.array.containsByPropertyValue(this._items, 'name', name);
};

/**
 * @param {string} name The name of the header.
 * @returns {boolean}
 */
WebF.net.http.headers.HttpHeaders.prototype.remove = function (name) {
    return (WebF.array.removeAllByPropertyValue(this._items, 'name', name).length > 0);
};

/**
 * @returns {number}
 */
WebF.net.http.headers.HttpHeaders.prototype.getCount = function () {
    return this._items.length;
};
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

/**
 * @interface
 * @implements {WebF.IDisposable}
 */
WebF.net.IWebClient = function () { };

/**
 * Gets or sets the base URL used when sending requests.
 * 
 * @type {string}
 */
WebF.net.IWebClient.prototype.baseAddress;

/**
 * Gets or sets the timespan to wait before the request times out.
 * 
 * @type {number}
 */
WebF.net.IWebClient.prototype.timeout;

/**
 * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestProcessEvent>}
 */
WebF.net.IWebClient.prototype.requestProcess;

/**
 * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestEvent>}
 */
WebF.net.IWebClient.prototype.requestCompleted;

/**
 * @param {WebF.net.WebRequestMessage} requestMessage
 * @returns {WebF.net.WebRequest}
 */
WebF.net.IWebClient.prototype.send = function (requestMessage) {
    throw new Error('Not implemented.');
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.IWebClient.prototype.cancelPendingRequests = WebF.base.notImplementedMethod;
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

/**
 * A collection of requests.
 * 
 * @constructor
 * @implements {WebF.IDisposable}
 */
WebF.net.WebRequestCollection = function () {
    /**
     * @private
     * @type {Array<WebF.net.WebRequest>}
     */
    this._items = [];

    /**
     * @private
     */
    this._disposed = false;
};

/**
 * Adds request into the collection.
 * 
 * @param {WebF.net.WebRequest} task
 */
WebF.net.WebRequestCollection.prototype.add = function (task) {
    this._items.push(task);
};

/**
 * Removes all requests from collection.
 */
WebF.net.WebRequestCollection.prototype.clear = function () {
    this._items = [];
};

/**
 * @param {XMLHttpRequest|XDomainRequest} nativeRequest
 * @returns {WebF.net.WebRequest}
 */
WebF.net.WebRequestCollection.prototype.getByNativeRequest = function (nativeRequest) {
    return WebF.array.findByPropertyValue(this._items, 'nativeRequest', nativeRequest);
};

/**
 * 
 * @param {WebF.net.WebRequest} request
 * @returns {boolean}
 */
WebF.net.WebRequestCollection.prototype.remove = function (request) {
    return (WebF.array.remove(this._items, request) != null);
};

WebF.net.WebRequestCollection.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this._items.length < 1) {
        return;
    }

    var x = 0;

    do {
        this._items[x++].dispose();
    }
    while (x < this._items.length);

    this.clear();
};
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

/**
 * @const
 * @enum {string}
 */
WebF.net.WebRequestEventType = {
    REQUEST_COMPLETED: 'requestcompleted'
};
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

/**
 * @constructor
 * @param {string} type
 * @param {Object} source
 * @param {WebF.net.WebRequest} request
 * @param {WebF.net.WebResponse} response
 */
WebF.net.WebRequestEvent = function (type, source, request, response) {
    WebF.events.WFEvent.call(this, type, source);

    /**
     * Gets the WebRequest.
     * 
     * @readonly
     */
    this.request = request;

    /**
     * Gets the WebRequestState.
     * 
     * @readonly
     */
    this.requestState = request.requestState;

    /**
     * Gets the WebResponse.
     * 
     * @readonly
     */
    this.response = response;
};

WebF.net.WebRequestEvent.prototype = Object.create(WebF.events.WFEvent.prototype);
WebF.net.WebRequestEvent.prototype.constructor = WebF.net.WebRequestEvent;
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

/**
 * @constructor
 * @param {string} type
 * @param {Object} source
 * @param {WebF.net.WebRequest} request
 */
WebF.net.WebRequestProcessEvent = function (type, source, request) {
    WebF.events.WFNativeEvent.call(this, type, source, null);

    /**
     * Gets the WebRequest.
     * 
     * @readonly
     */
    this.request = request;

    this.requestState = request.requestState;
};

WebF.net.WebRequestProcessEvent.prototype = Object.create(WebF.events.WFNativeEvent.prototype);
WebF.net.WebRequestProcessEvent.prototype.constructor = WebF.net.WebRequestProcessEvent;
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

/**
 * @const
 * @enum {number}
 */
WebF.net.WebRequestState = {
    UNINITIALIZED: 0,
    INITIALIZED: 1,
    WORKING: 2,
    COMPLETED: 3,
    ABORTED: 4,
    TIMEOUT_EXPIRED: 5,
    ERROR: 6
};
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

/**
 * A collection of cookies.
 * 
 * @constructor
 * @param {boolean} [isStrict] If isStrict == false, assumes that incoming cookie is unique. If isStrict == true, replace the cookie if found with the same name, domain, and path. The default is false.
 */
WebF.net.http.CookieCollection = function (isStrict) {
    /**
     * @private
     * @type {Array<WebF.net.http.Cookie>}
     */
    this._items = [];

    this.isStrict = (isStrict != undefined) ? isStrict : false;
};

/**
 * Adds cookie into the collection.
 * 
 * @param {WebF.net.http.Cookie} cookie
 */
WebF.net.http.CookieCollection.prototype.add = function (cookie) {
    if (this.isStrict) {
        for (var x = 0; x < this._items.length; x++) {
            var item = this._items[x];

            if (item.name !== cookie.name) {
                continue;
            }

            if ((item.domain == cookie.domain) && (item.path == cookie.path)) {
                this._items[x] = cookie;

                return;
            }
        }
    }

    this._items.push(cookie);
};

/**
 * Removes all cookies from collection.
 */
WebF.net.http.CookieCollection.prototype.clear = function () {
    this._items = [];
};

/**
 * 
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {Array<WebF.net.http.Cookie>}
 * 
 * @example
 * cookieCollection.get(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.get = function (predicate) {
    return WebF.array.findAll(this._items, predicate);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {Array<WebF.net.http.Cookie>}
 */
WebF.net.http.CookieCollection.prototype.getName = function (name) {
    return WebF.array.findAllByPropertyValue(this._items, 'name', name);
};

/**
 * 
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {boolean}
 * 
 * @example
 * cookieCollection.contains(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.contains = function (predicate) {
    return WebF.array.exists(this._items, predicate);
};

/**
 * 
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.CookieCollection.prototype.containsByName = function (name) {
    return WebF.array.containsByPropertyValue(this._items, 'name', name);
};

/**
 * @param {function(WebF.net.http.Cookie): boolean} predicate
 * @returns {boolean}
 * 
 * @example
 * cookieCollection.remove(function (x) {
 *     return ((x.name === 'cookieName') && (x.domain === 'cookieDomain') && (x.path === 'cookiePath'));
 * });
 */
WebF.net.http.CookieCollection.prototype.remove = function (predicate) {
    return (WebF.array.removeAllIf(this._items, predicate).length > 0);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.CookieCollection.prototype.removeByName = function (name) {
    return (WebF.array.removeAllByPropertyValue(this._items, 'name', name).length > 0);
};

/**
 * @returns {number}
 */
WebF.net.http.CookieCollection.prototype.getCount = function () {
    return this._items.length;
};


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

/**
 * @const
 * @enum {string}
 */
WebF.net.http.CookieSameSiteMode = {
    LAX: 'Lax',
    STRICT: 'Strict'
};
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

/**
 * @constructor
 * @param {string} name The name of the cookie.
 * @param {string} value The value of the cookie.
 */
WebF.net.http.Cookie = function (name, value) {
    /**
     * @type {string}
     */
    var _domain = '';

    /**
     * @type {string}
     */
    var _path = '/';

    /**
     * @type {string}
     */
    this.name = name;

    /**
     * @type {string}
     */
    this.value = value;

    Object.defineProperty(this, 'domain', {
        get: function () {
            return _domain;
        },
        set: function (val) {
            _domain = (val != null) ? val.toLowerCase() : '';
        },
        enumerable: true
    });

    /**
     * @type {Date?}
     */
    this.expires = null;

    Object.defineProperty(this, 'path', {
        get: function () {
            return _path;
        },
        set: function (val) {
            _path = (val != null) ? val : '';
        },
        enumerable: true
    });

    /**
     * @type {boolean}
     */
    this.secure = false;

    /**
     * @type {boolean}
     */
    this.httpOnly = false;

    /**
     * @type {WebF.net.http.CookieSameSiteMode?}
     */
    this.sameSite = null;
};

WebF.net.http.Cookie.prototype.toString = function () {
    var W_string = WebF.string;

    if (W_string.isNullOrEmpty(this.name) || !WebF.net.http.Cookie.isNameValid(this.name)) {
        throw new Error('Invalid cookie name "' + this.name + '"');
    }

    if (!WebF.net.http.Cookie.isValueValid(this.value)) {
        throw new Error('Invalid cookie value "' + this.value + '"');
    }

    var cookieStr = this.name + '=';

    if (this.value != null) {
        cookieStr += this.value;
    }

    if (!W_string.isNullOrEmpty(this.domain)) {
        cookieStr += '; domain=' + this.domain;
    }

    if (this.expires != null) {
        cookieStr += '; expires=' + this.expires.toUTCString();
    }

    if (!W_string.isNullOrEmpty(this.path)) {
        cookieStr += '; path=' + this.path;
    }

    if (this.secure === true) {
        cookieStr += '; secure';
    }

    if (this.httpOnly === true) {
        cookieStr += '; HttpOnly';
    }

    if (this.sameSite != null) {
        cookieStr += '; SameSite=' + this.sameSite;
    }

    return cookieStr;
};

/**
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookie.isNameValid = function (name) {
    return !(/[;=\s]/.test(name));
};

/**
 * @param {string} value The value of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookie.isValueValid = function (value) {
    return !(/[;\r\n]/.test(value));
};

WebF.net.http.Cookie.prototype.clone = function () {
    var cookie = new WebF.net.http.Cookie(this.name, this.value);
    cookie.domain = this.domain;
    cookie.expires = this.expires;
    cookie.path = this.path;
    cookie.secure = this.secure;
    cookie.httpOnly = this.httpOnly;
    cookie.sameSite = this.sameSite;

    return cookie;
};
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

/**
 * A class for handling browser cookies.
 * 
 * @constructor
 * @param {Document} doc
 */
WebF.net.http.Cookies = function (doc) {
    /**
     * @private
     */
    this._document = doc;

    this.cache = new WebF.net.http.CookieCollection();
};

/**
 * Returns true if cookies are enabled.
 * 
 * @returns {boolean} True if cookies are enabled.
 */
WebF.net.http.Cookies.prototype.isEnabled = function () {
    return navigator.cookieEnabled;
}

/**
 * @returns {WebF.net.http.CookieCollection}
 */
WebF.net.http.Cookies.prototype.getAll = function () {
    var cc = new WebF.net.http.CookieCollection();
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return cc;
    }

    var parts = nativeCookie.split(';');

    for (var x = 0; x < parts.length; x++) {
        var part = WebF.string.trim(parts[x]);
        var kvp = this._parseCookiePart(part);

        cc.add(new WebF.net.http.Cookie(kvp.key, kvp.value));
    }

    return cc;
};

/**
 * @private
 * @param {string} part
 * @returns {WebF.collections.KeyValuePair}
 */
WebF.net.http.Cookies.prototype._parseCookiePart = function (part) {
    var name;
    var value;

    if (part.length > 0) {
        var index = part.indexOf('=');

        if (index > 0) {
            name = part.substring(0, index);
            value = (index < (part.length - 1)) ? part.substring(index + 1) : '';
        }
        else {
            name = '';
            value = part;
        }
    }
    else {
        name = '';
        value = '';
    }

    return new WebF.collections.KeyValuePair(name, value);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {Array<WebF.net.http.Cookie>}
 */
WebF.net.http.Cookies.prototype.get = function (name) {
    return this.getAll().getName(name);
};

/**
 * @param {string} name The name of the cookie.
 * @returns {WebF.net.http.Cookie}
 */
WebF.net.http.Cookies.prototype.getFirst = function (name) {
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return null;
    }

    var parts = nativeCookie.split(';');

    for (var x = 0; x < parts.length; x++) {
        var part = WebF.string.trim(parts[x]);
        var kvp = this._parseCookiePart(part);

        if (kvp.key === name) {
            return new WebF.net.http.Cookie(kvp.key, kvp.value);
        }
    }

    return null;
};

/**
 * @param {WebF.net.http.Cookie} cookie
 */
WebF.net.http.Cookies.prototype.set = function (cookie) {
    this._document.cookie = cookie.toString();
};


WebF.net.http.Cookies.prototype.updateCache = function () {
    this.cache = this.getAll();
};

/**
 * @returns {boolean}
 */
WebF.net.http.Cookies.prototype.isEmpty = function () {
    return !this.getNativeCookie();
};

/**
 * Returns the 'document.cookie'.
 * 
 * @returns {string}
 */
WebF.net.http.Cookies.prototype.getNativeCookie = function () {
    return this._document.cookie;
};

/**
 * @returns {number}
 */
WebF.net.http.Cookies.prototype.getCount = function () {
    var nativeCookie = this.getNativeCookie();

    if (!nativeCookie) {
        return 0;
    }

    return nativeCookie.split(';').length;
};

/**
 * Returns whether there is a cookie with the given name.
 * 
 * @param {string} name The name of the cookie.
 * @returns {boolean}
 */
WebF.net.http.Cookies.prototype.contains = function (name) {
    return (this.getFirst(name) != null);
};

/**
 * Removes and expires a cookie.
 * 
 * @param {string} name The name of the cookie.
 * @param {string} [path] The path of the cookie. If not provided, the default is null (i.e. the current path to the current location of the document is used).
 * @param {string} [domain] The domain of the cookie. If not provided, the default is null (i.e. cookie at full request host name).
 * @returns {boolean} Whether the cookie existed before it was removed.
 */
WebF.net.http.Cookies.prototype.remove = function (name, path, domain) {
    var has = this.contains(name);

    var cookie = new WebF.net.http.Cookie(name, '');
    cookie.domain = domain;
    cookie.expires = new Date(1970, 1, 1);
    cookie.path = path;

    this.set(cookie);
};
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

/**
 * A container for name/value tuples encoded using application/x-www-form-urlencoded MIME type.
 * 
 * @extends {WebF.net.http.HttpContent}
 * @constructor
 * @param {Array<WebF.collections.KeyValuePair<string, string>>} nameValueCollection A array of name/value pairs.
 */
WebF.net.http.FormUrlEncodedContent = function (nameValueArray) {
    WebF.net.http.HttpContent.call(this);

    /**
     * @private
     */
    this._params = nameValueArray.slice(0, nameValueArray.length);


    this.headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, WebF.net.http.FormUrlEncodedContent.CONTENT_TYPE);
};

WebF.net.http.FormUrlEncodedContent.prototype = Object.create(WebF.net.http.HttpContent.prototype);
WebF.net.http.FormUrlEncodedContent.prototype.constructor = WebF.net.http.FormUrlEncodedContent;

/**
 * @override
 * @returns {string}
 */
WebF.net.http.FormUrlEncodedContent.prototype.getBody = function () {
    if (this._params.length < 1) {
        return null;
    }

    var p = this._params[0];
    var body = p.key + '=' + encodeURIComponent(p.value);

    if (this._params.length === 1) {
        return body;
    }

    var x = 1;

    do {
        p = this._params[x++];
        body += '&' + p.key + '=' + encodeURIComponent(p.value);
    }
    while (x < this._params.length);

    return body;
};

/**
 * @const
 */
WebF.net.http.FormUrlEncodedContent.CONTENT_TYPE = WebF.net.mime.mediaTypeNames.Application.FORM_URLENCODED;
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

/**
 * @const
 * @enum {string}
 */
WebF.net.http.HttpMethod = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    PATCH: 'PATCH',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT'
};
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

/**
 * @const
 * @enum {number}
 */
WebF.net.http.HttpStatusCode = {
    /**
     * Informational 1xx
     */
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,
    /**
     * Successful 2xx
     */
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
    /**
     * Redirection 3xx
     */
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    MOVED_TEMPORARILY: 302,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    UNUSED: 306,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    /**
     * Client Error 4xx
     */
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    REQUESTED_RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    UPGRADE_REQUIRED: 426,
    /**
     * Server Error 5xx
     */
    INTERNAL_SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505
};
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

/**
 * MIME Media type: application/json.
 * 
 * @extends {WebF.net.http.HttpContent}
 * @constructor
 * @param {string} content
 */
WebF.net.http.JsonContent = function (content) {
    WebF.net.http.HttpContent.call(this);

    /**
     * @private
     */
    this._content = content;


    this.headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, WebF.net.http.JsonContent.CONTENT_TYPE);
};

WebF.net.http.JsonContent.prototype = Object.create(WebF.net.http.HttpContent.prototype);
WebF.net.http.JsonContent.prototype.constructor = WebF.net.http.JsonContent;

/**
 * @override
 * @returns {string}
 */
WebF.net.http.JsonContent.prototype.getBody = function () {
    return this._content;
};

/**
 * @const
 */
WebF.net.http.JsonContent.CONTENT_TYPE = WebF.net.mime.mediaTypeNames.Application.JSON;
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

/**
 * @const
 * @enum {string}
 */
WebF.net.xdr.WFXdrProcessEventType = {
    ERROR: 'error',
    LOAD: 'load',
    PROGRESS: 'progress',
    TIMEOUT: 'timeout'
};
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

/**
 * @constructor
 * @extends {WebF.net.WebRequest}
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.xdr.WFXdr = function (method, requestUrl, content) {
    WebF.net.WebRequest.call(this, new XDomainRequest(), method, requestUrl, content);
};

WebF.net.xdr.WFXdr.prototype = Object.create(WebF.net.WebRequest.prototype);
WebF.net.xdr.WFXdr.prototype.constructor = WebF.net.xdr.WFXdr;

/**
 * @override
 */
WebF.net.xdr.WFXdr.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    var xdr = this.nativeRequest;

    if (this.requestState === WebF.net.WebRequestState.WORKING) {
        try {
            xdr.abort();
        }
        catch (e) {

        }
    }

    xdr.onerror = null;
    xdr.onload = null;
    xdr.onprogress = null;
    xdr.ontimeout = null;

    WebF.net.WebRequest.prototype.dispose.call(this);
    //WebF.object.getBasePrototype(this).dispose.call(this);
};
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

/**
 * @constructor
 * @implements {WebF.net.IWebClient}
 */
WebF.net.xdr.XdrClient = function () {
    /**
     * @private
     * @readonly
     * @type {WebF.net.WebRequestCollection<WebF.net.xdr.WFXdr>}
     */
    this._requests = new WebF.net.WebRequestCollection();

    /**
     * @private
     */
    this._disposed = false;

    /**
     * Gets or sets the base URL used when sending requests.
     * 
     * @type {string}
     */
    this.baseAddress = null;

    /**
     * Gets or sets the timespan to wait before the request times out.
     * 
     * @type {number}
     */
    this.timeout = 0;

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestProcessEvent>}
     */
    this.requestProcess = new WebF.events.MultipleEventHandler();

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestEvent>}
     */
    this.requestCompleted = new WebF.events.MultipleEventHandler();
};

/**
 * @param {WebF.net.WebRequestMessage} requestMessage
 * @returns {WebF.net.xdr.WFXdr}
 */
WebF.net.xdr.XdrClient.prototype.send = function (requestMessage) {
    var method = requestMessage.method;
    var url = null;

    if (!WebF.string.isNullOrWhitespace(requestMessage.requestUrl)) {
        url = requestMessage.requestUrl;
    }
    else if (!WebF.string.isNullOrWhitespace(this.baseAddress)) {
        url = this.baseAddress;
    }
    else {
        throw new Error('Invalid requestUrl.');
    }

    var content = requestMessage.content;
    var body = (content != null) ? content.getBody() : null;
    var data = null;

    if (((method === WebF.net.http.HttpMethod.GET) || (method === WebF.net.http.HttpMethod.HEAD)) && (typeof body === 'string')) {
        var index = url.indexOf('?');

        if (index < 0) {
            url += '?';
        }
        else if (index < (url.length - 1)) {
            var c = url[url.length - 1];

            if ((c !== '?' && (c !== '&'))) {
                url += '&';
            }
        }

        url += body;
    }
    else {
        data = body;
    }

    var request = new WebF.net.xdr.WFXdr(method, url, content);

    this._requests.add(request);

    var xdr = request.nativeRequest;

    xdr.onerror = this._onError.bind(this);
    xdr.onload = this._onLoad.bind(this);
    xdr.onprogress = this._onProgress.bind(this);
    xdr.ontimeout = this._onTimeout.bind(this);

    try {
        xdr.open(method, url);

        xdr.timeout = this.timeout;

        request.requestState = WebF.net.WebRequestState.WORKING;

        if (data != null) {
            xdr.send(data);
        }
        else {
            xdr.send();
        }
    }
    catch (e) {
        request.requestState = WebF.net.WebRequestState.ERROR;
        this._requests.remove(request);
        request.dispose();

        throw e;
    }

    return request;
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onError = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onError');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ERROR;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.ERROR, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onLoad = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onLoad');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    if (request.requestState === WebF.net.WebRequestState.WORKING) {
        request.requestState = WebF.net.WebRequestState.COMPLETED;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.LOAD, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onProgress = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onProgress');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.PROGRESS, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xdr.XdrClient.prototype._onTimeout = function (e) {
    //console.log('WebF.net.xdr.XdrClient: onTimeout');

    var xdr = e.target;

    if (xdr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xdr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.TIMEOUT_EXPIRED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xdr.WFXdrProcessEventType.TIMEOUT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {WebF.net.xdr.WFXdr} request
 */
WebF.net.xdr.XdrClient.prototype._requestEnd = function (request) {
    this._requests.remove(request);

    if (this.requestCompleted.getHandlerCount() < 1) {
        return;
    }

    var response = new WebF.net.xdr.XdrResponse(request);

    var e = new WebF.net.WebRequestEvent(WebF.net.WebRequestEventType.REQUEST_COMPLETED, this, request, response);

    this._onRequestCompleted(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestProcessEvent} e
 */
WebF.net.xdr.XdrClient.prototype._onRequestProcess = function (e) {
    this.requestProcess.invoke(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
WebF.net.xdr.XdrClient.prototype._onRequestCompleted = function (e) {
    this.requestCompleted.invoke(e);
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.xdr.XdrClient.prototype.cancelPendingRequests = function () {

};

WebF.net.xdr.XdrClient.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this.requestProcess.removeAllHandlers();
    this.requestCompleted.removeAllHandlers();

    this._requests.dispose();
};
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

/**
 * @constructor
 * @param {XDomainRequest} xdr
 */
WebF.net.xdr.XdrResponseContent = function (xdr) {
    /**
     * @private
     */
    this._xdr = xdr;
};

WebF.net.xdr.XdrResponseContent.prototype.getText = function () {
    return this._xdr.responseText;
};

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

/**
 * @constructor
 * @extends {WebF.net.WebResponse}
 * @param {WebF.net.xdr.WFXdr} request
 */
WebF.net.xdr.XdrResponse = function (request) {
    WebF.net.WebResponse.call(this, request);

    /**
     * Gets the content of the response.
     */
    this.content = new WebF.net.xdr.XdrResponseContent(request.nativeRequest);

    /**
     * @private
     * @type {WebF.net.http.headers.HttpHeaders}
     */
    this._headers = null;
};

WebF.net.xdr.XdrResponse.prototype = Object.create(WebF.net.WebResponse.prototype);
WebF.net.xdr.XdrResponse.prototype.constructor = WebF.net.xdr.XdrResponse;

/**
 * Returns the collection of response headers.
 * 
 * @override
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xdr.XdrResponse.prototype.getHeaders = function () {
    if (this._headers == null) {
        var headers = new WebF.net.http.headers.HttpHeaders();
        var contentType = this.request.nativeRequest.contentType;

        if (contentType != null) {
            headers.add(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, contentType);
        }

        this._headers = headers;
    }

    return this._headers;
};

/**
 * @override
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.xdr.XdrResponse.prototype.getHeader = function (name) {
    var contentType = null;

    if ((name.toLowerCase() == WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE.toLowerCase()) && ((contentType = this.request.nativeRequest.contentType) != null)) {
        return new WebF.net.http.headers.HttpHeader(WebF.net.http.headers.HttpHeaderName.CONTENT_TYPE, contentType);
    }

    return null;
};
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

/**
 * @constructor
 * @extends {WebF.net.WebRequestMessage}
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.xhr.WFXhrMessage = function (method, requestUrl, content) {
    WebF.net.WebRequestMessage.call(this, method, requestUrl, content);

    /**
     * @type {WebF.net.xhr.XhrResponseType}
     */
    this.responseType = WebF.net.xhr.XhrResponseType.DEFAULT;

    /**
     * @type {boolean}
     */
    this.withCredentials = false;
};

WebF.net.xhr.WFXhrMessage.prototype = Object.create(WebF.net.WebRequest.prototype);
WebF.net.xhr.WFXhrMessage.prototype.constructor = WebF.net.xhr.WFXhrMessage;
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

/**
 * @const
 * @enum {string}
 */
WebF.net.xhr.WFXhrProcessEventType = {
    ABORT: 'abort',
    ERROR: 'error',
    LOAD: 'load',
    LOADEND: 'loadend',
    LOADSTART: 'loadstart',
    PROGRESS: 'progress',
    READYSTATECHANGE: 'readystatechange',
    TIMEOUT: 'timeout'
};
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

/**
 * @constructor
 * @extends {WebF.net.WebRequest}
 * @param {string} method The HTTP method.
 * @param {string} requestUrl A string that represents the request URL.
 * @param {WebF.net.http.HttpContent} content The contents of the request.
 */
WebF.net.xhr.WFXhr = function (method, requestUrl, content) {
    WebF.net.WebRequest.call(this, new XMLHttpRequest(), method, requestUrl, content);

    /**
     * @readonly
     * @type {WebF.net.xhr.XhrResponseType}
     */
    this.responseType = WebF.net.xhr.XhrResponseType.DEFAULT;

    /**
     * @readonly
     * @type {boolean}
     */
    this.withCredentials = false;
};

WebF.net.xhr.WFXhr.prototype = Object.create(WebF.net.WebRequest.prototype);
WebF.net.xhr.WFXhr.prototype.constructor = WebF.net.xhr.WFXhr;

/**
 * @override
 */
WebF.net.xhr.WFXhr.prototype.dispose = function () {
    if (this.disposed === true) {
        return;
    }

    var xhr = this.nativeRequest;

    if (this.requestState === WebF.net.WebRequestState.WORKING) {
        try {
            xhr.abort();
        }
        catch (e) {

        }
    }

    xhr.onabort = null;
    xhr.onerror = null;
    xhr.onload = null;
    xhr.onloadend = null;
    xhr.onloadstart = null;
    xhr.onprogress = null;
    xhr.onreadystatechange = null;
    xhr.ontimeout = null;

    WebF.net.WebRequest.prototype.dispose.call(this);
    //WebF.object.getBasePrototype(this).dispose.call(this);
};
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

/**
 * @constructor
 * @implements {WebF.IDisposable}
 */
WebF.net.xhr.XhrClient = function () {

    /**
     * @private
     * @readonly
     * @type {WebF.net.WebRequestCollection<WebF.net.xhr.WFXhr>}
     */
    this._requests = new WebF.net.WebRequestCollection();

    /**
     * @private
     */
    this._disposed = false;

    /**
     * Gets the headers which should be sent with each request.
     * 
     * @readonly
     */
    this.defaultRequestHeaders = new WebF.net.http.headers.HttpHeaders();

    /**
     * Gets or sets the base URL used when sending requests.
     * 
     * @type {string}
     */
    this.baseAddress = null;

    /**
     * Gets or sets the timespan to wait before the request times out. Time in milliseconds.
     * 
     * @type {number}
     */
    this.timeout = 0;

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestProcessEvent>}
     */
    this.requestProcess = new WebF.events.MultipleEventHandler();

    /**
     * @type {WebF.events.MultipleEventHandler<WebF.net.WebRequestEvent>}
     */
    this.requestCompleted = new WebF.events.MultipleEventHandler();

    /**
     * @private
     */
    this._hasResponse = ('response' in XMLHttpRequest.prototype);

    /**
     * @private
     */
    this._hasResponseBody = ('responseBody' in XMLHttpRequest.prototype);

    /**
     * @private
     */
    this._hasOnLoadEnd = ('onloadend' in XMLHttpRequest.prototype);
};

/**
 * @param {WebF.net.xhr.WFXhrMessage} requestMessage
 * @returns {WebF.net.xhr.WFXhr}
 */
WebF.net.xhr.XhrClient.prototype.send = function (requestMessage) {
    var method = requestMessage.method;
    var url = null;

    if (!WebF.string.isNullOrWhitespace(requestMessage.requestUrl)) {
        url = requestMessage.requestUrl;
    }
    else if (!WebF.string.isNullOrWhitespace(this.baseAddress)) {
        url = this.baseAddress;
    }
    else {
        throw new Error('Invalid requestUrl.');
    }

    var content = requestMessage.content;
    var body = (content != null) ? content.getBody() : null;
    var data = null;

    if (((method === WebF.net.http.HttpMethod.GET) || (method === WebF.net.http.HttpMethod.HEAD)) && (typeof body === 'string')) {
        var index = url.indexOf('?');

        if (index < 0) {
            url += '?';
        }
        else if (index < (url.length - 1)) {
            var c = url[url.length - 1];

            if ((c !== '?' && (c !== '&'))) {
                url += '&';
            }
        }

        url += body;
    }
    else {
        data = body;
    }

    var request = new WebF.net.xhr.WFXhr(method, url, content);

    this._requests.add(request);

    var xhr = request.nativeRequest;

    xhr.onabort = this._onAbort.bind(this);
    xhr.onerror = this._onError.bind(this);
    xhr.onload = this._onLoad.bind(this);
    xhr.onloadend = this._onLoadEnd.bind(this);
    xhr.onloadstart = this._onLoadStart.bind(this);
    xhr.onprogress = this._onProgress.bind(this);
    xhr.onreadystatechange = this._onReadyStateChange.bind(this);
    xhr.ontimeout = this._onTimeout.bind(this);

    try {
        xhr.open(method, url, true);

        xhr.timeout = this.timeout;

        /**
         * @type {WebF.net.http.headers.HttpHeader}
         */
        var header = null;
        var x;
        var count;

        if ((count = this.defaultRequestHeaders.getCount()) > 0) {
            x = 0;

            do {
                header = this.defaultRequestHeaders.getByIndex(x++);

                request.headers.add(header.name, header.value);
                xhr.setRequestHeader(header.name, header.value);
            }
            while (x < count);
        }

        /**
         * @type {Array<WebF.net.http.headers.HttpHeader>}
         */
        var headers = requestMessage.headers;

        if ((count = headers.getCount()) > 0) {
            x = 0;

            do {
                header = headers.getByIndex(x++);

                request.headers.add(header.name, header.value);
                xhr.setRequestHeader(header.name, header.value);
            }
            while (x < count);
        }

        if (content != null) {
            headers = content.headers;

            if ((count = headers.getCount()) > 0) {
                x = 0;

                do {
                    header = headers.getByIndex(x++);

                    if (header == null) {
                        continue;
                    }

                    request.headers.add(header.name, header.value);
                    xhr.setRequestHeader(header.name, header.value);
                }
                while (x < count);
            }
        }

        if (requestMessage.responseType) {
            request.responseType = requestMessage.responseType;
            xhr.responseType = requestMessage.responseType;
        }

        if ('withCredentials' in xhr) {
            request.withCredentials = requestMessage.withCredentials;

            // https://bugzilla.mozilla.org/show_bug.cgi?id=736340
            if (xhr.withCredentials !== requestMessage.withCredentials) {
                xhr.withCredentials = requestMessage.withCredentials;
            }
        }

        request.requestState = WebF.net.WebRequestState.WORKING;

        if (data != null) {
            xhr.send(data);
        }
        else {
            xhr.send();
        }
    }
    catch (e) {
        request.requestState = WebF.net.WebRequestState.ERROR;
        this._requests.remove(request);
        request.dispose();

        throw e;
    }

    return request;
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onAbort = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onAbort');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ABORTED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.ABORT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onError = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onError');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.ERROR;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.ERROR, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoad = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoad');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    if (request.requestState === WebF.net.WebRequestState.WORKING) {
        request.requestState = WebF.net.WebRequestState.COMPLETED;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOAD, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoadEnd = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoadEnd');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }
    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOADEND, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    this._requestEnd(request);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onLoadStart = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onLoadStart');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.LOADSTART, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onProgress = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onProgress');

    if (this.requestProcess.getHandlerCount() < 1) {
        return;
    }

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.PROGRESS, this, request);
    e2.nativeEvent = e;

    this._onRequestProcess(e2);
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onReadyStateChange = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onReadyStateChange');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.READYSTATECHANGE, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    // IE < 10
    if ((xhr.readyState === XMLHttpRequest.DONE) && (typeof xhr.responseText === 'undefined') && (typeof xhr.status === 'undefined') && this._hasResponseBody && !this._hasResponse) {
        request.requestState = WebF.net.WebRequestState.ABORTED;

        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {Event} e
 */
WebF.net.xhr.XhrClient.prototype._onTimeout = function (e) {
    //console.log('WebF.net.xhr.XhrClient: onTimeout');

    var xhr = e.target;

    if (xhr == null) {
        return;
    }

    var request = this._requests.getByNativeRequest(xhr);

    if (request == null) {
        return;
    }

    request.requestState = WebF.net.WebRequestState.TIMEOUT_EXPIRED;

    if (this.requestProcess.getHandlerCount() > 0) {
        var e2 = new WebF.net.WebRequestProcessEvent(WebF.net.xhr.WFXhrProcessEventType.TIMEOUT, this, request);
        e2.nativeEvent = e;

        this._onRequestProcess(e2);
    }

    if (this._hasOnLoadEnd !== true) {
        this._requestEnd(request);
    }
};

/**
 * @private
 * @param {WebF.net.xhr.WFXhr} request
 */
WebF.net.xhr.XhrClient.prototype._requestEnd = function (request) {
    this._requests.remove(request);

    if (this.requestCompleted.getHandlerCount() < 1) {
        return;
    }

    var response = new WebF.net.xhr.XhrResponse(request);

    var e = new WebF.net.WebRequestEvent(WebF.net.WebRequestEventType.REQUEST_COMPLETED, this, request, response);

    this._onRequestCompleted(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestProcessEvent} e
 */
WebF.net.xhr.XhrClient.prototype._onRequestProcess = function (e) {
    this.requestProcess.invoke(e);
};

/**
 * @private
 * @param {WebF.net.WebRequestEvent} e
 */
WebF.net.xhr.XhrClient.prototype._onRequestCompleted = function (e) {
    this.requestCompleted.invoke(e);
};

/**
 * Cancel all pending requests on this instance.
 */
WebF.net.xhr.XhrClient.prototype.cancelPendingRequests = function () {

};

WebF.net.xhr.XhrClient.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this.requestProcess.removeAllHandlers();
    this.requestCompleted.removeAllHandlers();

    this._requests.dispose();
};
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

/**
 * @constructor
 * @param {XMLHttpRequest} xhr
 */
WebF.net.xhr.XhrResponseContent = function (xhr) {
    /**
     * @private
     */
    this._xhr = xhr;
};

/**
 * Returns the response body (XMLHttpRequest.response).
 * 
 * @returns {string|ArrayBuffer|Blob|Document|Object}
 */
WebF.net.xhr.XhrResponseContent.prototype.getBody = function () {
    return this._xhr.response;
};

/**
 * Returns the response text (XMLHttpRequest.responseText).
 * 
 * @returns {string}
 */
WebF.net.xhr.XhrResponseContent.prototype.getText = function () {
    return this._xhr.responseText;
};

/**
 * Returns the response document (XMLHttpRequest.responseXML).
 * 
 * @returns {Document?}
 */
WebF.net.xhr.XhrResponseContent.prototype.getXml = function () {
    return this._xhr.responseXML;
};
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

/**
 * @const
 * @enum {string}
 */
WebF.net.xhr.XhrResponseType = {
    DEFAULT: '',
    ARRAY_BUFFER: 'arraybuffer',
    BLOB: 'blob',
    DOCUMENT: 'document',
    JSON: 'json',
    TEXT: 'text'
};
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

/**
 * @constructor
 * @extends {WebF.net.WebResponse}
 * @param {WebF.net.xhr.WFXhr} request
 */
WebF.net.xhr.XhrResponse = function (request) {
    WebF.net.WebResponse.call(this, request);

    /**
     * @private
     */
    this._xhr = request.nativeRequest;

    /**
     * Gets the content of the response.
     */
    this.content = new WebF.net.xhr.XhrResponseContent(this._xhr);

    /**
     * @private
     * @type {WebF.net.http.headers.HttpHeaders}
     */
    this._headers = null;
};

WebF.net.xhr.XhrResponse.prototype = Object.create(WebF.net.WebResponse.prototype);
WebF.net.xhr.XhrResponse.prototype.constructor = WebF.net.xhr.XhrResponse;

/**
 * Returns the collection of response headers.
 * 
 * @override
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xhr.XhrResponse.prototype.getHeaders = function () {
    if (this._headers == null) {
        this._headers = WebF.net.xhr.XhrResponse.parseHeaders(this._xhr.getAllResponseHeaders());
    }

    return this._headers;
};

/**
 * @override
 * @param {string} name The name of the header.
 * @returns {WebF.net.http.headers.HttpHeader}
 */
WebF.net.xhr.XhrResponse.prototype.getHeader = function (name) {
    var value = this._xhr.getResponseHeader(name);

    if (value != null) {
        return new WebF.net.http.headers.HttpHeader(name, value);
    }

    return null;
};

/**
 * @returns {WebF.net.xhr.XhrResponseType}
 */
WebF.net.xhr.XhrResponse.prototype.getType = function () {
    return this._xhr.responseType;
};

/**
 * @returns {number}
 */
WebF.net.xhr.XhrResponse.prototype.getStatusCode = function () {
    return this._xhr.status;
};

/**
 * @returns {string}
 */
WebF.net.xhr.XhrResponse.prototype.getStatusText = function () {
    return this._xhr.statusText;
};

/**
 * @static
 * @param {string} headersStr The response headers as a string (XMLHttpRequest.getAllResponseHeaders()).
 * @returns {WebF.net.http.headers.HttpHeaders}
 */
WebF.net.xhr.XhrResponse.parseHeaders = function (headersStr) {
    var headers = new WebF.net.http.headers.HttpHeaders();
    var parts = headersStr.split('\r\n');

    for (var x = 0; x < parts.length; x++) {
        var part = parts[x];

        if (WebF.string.isNullOrWhitespace(part)) {
            continue;
        }

        var index = part.indexOf(': ');

        if (index < 1) {
            continue;
        }

        var name = part.substring(0, index);
        var value = (index < (part.length - 2)) ? part.substring(index + 2) : '';

        headers.add(name, value);
    }

    return headers;
};
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

/**
 * @namespase
 */
WebF.collections = {};
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

/**
 * Defines a key/value pair that can be set or retrieved.
 * 
 * @constructor
 * @template TKey, TValue
 * @param {TKey} key
 * @param {TValue} value
 */
WebF.collections.KeyValuePair = function (key, value) {
    /**
     * Gets or sets the key in the key/value pair.
     */
    this.key = key;

    /**
     * Gets or sets the value in the key/value pair.
     */
    this.value = value;
};
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

/**
 * @namespase
 */
WebF.graphics = {};
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

/**
 * @constructor
 * @param {number} x
 * @param {number} y
 */
WebF.graphics.Point = function (x, y) {
    this.x = x;
    this.y = y;
};

/**
 * Update the location by adding offsetX to X and offsetY to Y.
 *
 * @param {number} offsetX The offset in the x dimension.
 * @param {number} offsetY The offset in the y dimension.
 */
WebF.graphics.Point.prototype.offset = function (offsetX, offsetY) {
    this.x += offsetX;
    this.y += offsetY;
};

/**
 * Compares this Point with the passed in Point.
 *
 * @param {WebF.graphics.Point} point The point to compare to "this".
 * @returns {boolean}
 */
WebF.graphics.Point.prototype.equals = function (point) {
    return point && (this.x === point.x) && (this.y === point.y);
};

/**
 * Compares two Point instances for exact equality.
 *
 * @param {WebF.graphics.Point} point1 The first Point to compare.
 * @param {WebF.graphics.Point} point2 The second Point to compare.
 * @returns {boolean}
 */
WebF.graphics.Point.equals = function (point1, point2) {
    return point1 && point2 && (point1.x === point2.x) && (point1.y === point2.y);
};
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

/**
 * A value type which defined a size in terms of non-negative width and height.
 * 
 * @constructor
 * @param {number} width The initial width.
 * @param {number} height The initial height.
 */
WebF.graphics.Size = function (width, height) {
    if ((width < 0) || (height < 0)) {
        throw new Error('Width and height cannot be negative.');
    }

    this.width = width;
    this.height = height;
};

/**
 * Tests to see whether the specified Size with the same dimensions as "this" Size.
 *
 * @param {WebF.graphics.Size} size The size to compare to "this".
 * @returns {boolean}
 */
WebF.graphics.Size.prototype.equals = function (size) {
    return size && (this.width === size.width) && (this.height === size.height);
};

/**
 * Compares two Size instances for exact equality.
 *
 * @param {WebF.graphics.Size} size1 The first Size to compare.
 * @param {WebF.graphics.Size} size2 The second Size to compare.
 * @returns {boolean}
 */
WebF.graphics.Size.equals = function (size1, size2) {
    return size1 && size2 && (size1.width === size2.width) && (size1.height === size2.height);
};
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

/*
 * Dependencies: {
 *     webf-core.js,
 * }
 */

/**
 * @namespase
 */
WebF.dom = {};
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

WebF.dom.utils = {};
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

/**
 * @namespase
 */
WebF.dom.style = {};
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

/**
 * @constructor
 * @param {HTMLElement|SVGElement} element
 */
WebF.dom.style.StyleHelper = function (element) {
    /**
     * @private
     * @readonly
     */
    this._element = element;
};

/**
 * @static
 * @param {Element} element
 * @returns {CSSStyleDeclaration}
 */
WebF.dom.style.StyleHelper.getComputedStyle = function (element) {
    var doc = element.ownerDocument;
    var win;

    if (!doc || !(win = WebF.dom.DOMHelper.getWindow(doc)) || !win.getComputedStyle) {
        return null;
    }

    return win.getComputedStyle(element);
};

/**
 * Converts from "style-property" to "styleProperty".
 * 
 * @param {string} propertyName Style property name.
 * @returns {string}
 */
WebF.dom.style.StyleHelper.toCamelCase = function (propertyName) {
    throw new Error('Not implemented.');
};

// camelCase, PascalCase, snake_case, kebab-case



/**
 * Returns the element object.
 * 
 * @returns {Element}
 */
WebF.dom.style.StyleHelper.prototype.getElement = function () {
    return this._element;
};

/**
 * @param {HTMLElement|SVGElement} element
 */
WebF.dom.style.StyleHelper.prototype.setElement = function (element) {
    this._element = element;
};

/**
 * @returns {CSSStyleDeclaration}
 */
WebF.dom.style.StyleHelper.prototype.getComputedStyle = function () {
    return WebF.dom.style.StyleHelper.getComputedStyle(this._element);
};


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

WebF.dom.classList = {};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.set = function (element, className) {
    element.className = className;
};

/**
 * 
 * @param {Element} element
 * @returns {Array<string>}
 */
WebF.dom.classList.get = function (element) {
    var items;
    var elemClassList;

    if ((elemClassList = element.classList)) {
        var items = new Array(elemClassList.length);

        for (var x = 0; x < elemClassList.length; x++) {
            items[x] = elemClassList[x];
        }
    }
    else {
        var nativeClassName = element.className;

        items = WebF.base.isString(nativeClassName) && nativeClassName.match(/\S+/g) || [];
    }

    return items;
};

/**
 * @param {Element} element
 * @returns {string}
 */
WebF.dom.classList.getValue = function (element) {
    return element.className;
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.add = function (element, className) {
    if (element.classList) {
        element.classList.add(className);
    }
    else if (!WebF.dom.classList.contains(element, className)) {
        element.className += ((element.className.length > 0) ? ' ' : '') + className;
    }
};

/**
 * 
 * @param {Element} element
 * @param {Array<string>} classNames
 */
WebF.dom.classList.addAll = function (element, classNames) {
    var x = 0;

    if (element.classList) {
        for (; x < classNames.length; x++) {
            element.classList.add(classNames[x]);
        }
    }
    else {
        var classDictionary = {};

        for (; x < classNames.length; x++) {
            var className = classNames[x];

            if (!(className in classDictionary) && !WebF.dom.classList.contains(element, className)) {
                classDictionary[className] = true;

                element.className += ((element.className.length > 0) ? ' ' : '') + className;
            }
        }
    }
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.remove = function (element, className) {
    if (element.classList) {
        element.classList.remove(className);
    }
    else {
        var nativeClassName = element.className;
        var nativeClassNameLength;
        var classNameLength;

        if (!WebF.base.isString(nativeClassName) || ((nativeClassNameLength = nativeClassName.length) < 1) || ((classNameLength = className.length) < 1)) {
            return;
        }

        var removed = false;
        var result = '';
        var startIndex = 0;
        var endIndex = 0;
        var copyStartIndex = 0;

        while (true) {
            var index = nativeClassName.indexOf(className, startIndex);
            endIndex = index + classNameLength;

            if (index >= 0) {
                if (((index === 0) || WebF.char.isWhitespace(nativeClassName.charAt(index - 1))) && ((endIndex === nativeClassNameLength) || WebF.char.isWhitespace(nativeClassName.charAt(endIndex)))) {
                    if ((index - copyStartIndex) > 1) {
                        result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, index - 1);
                        removed = true;
                    }

                    copyStartIndex = endIndex + 1;
                }
            }
            else {
                if (copyStartIndex === 0) {
                    return;
                }

                result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, nativeClassNameLength);
                break;
            }

            startIndex = endIndex + 1;

            if (startIndex >= nativeClassNameLength) {
                if (copyStartIndex === 0) {
                    return;
                }

                if (copyStartIndex < nativeClassNameLength) {
                    result += (removed ? ' ' : '') + nativeClassName.substring(copyStartIndex, nativeClassNameLength);
                }

                break;
            }
        }

        /*
        var newNativeClassName = ' ' + nativeClassName + ' ';
        var newClassName = ' ' + className + ' ';

        var index = newNativeClassName.indexOf(newClassName);

        if (index < 0) {
            return;
        }

        var result = (index > 0) ? newNativeClassName.substring(0, index) : '';
        var startIndex = index + newClassName.length;

        while (startIndex < newNativeClassName.length) {
            index = newNativeClassName.indexOf(newClassName, --startIndex);

            if (index >= 0) {
                result += newNativeClassName.substring(startIndex, index);
                startIndex = index + newClassName.length;
            }
            else {
                result += newNativeClassName.substring(startIndex, newNativeClassName.length - 1);
                break;
            }
        }

        if (result.length > 0) {
            if (result[0] === ' ') {
                result = result.substring(1);
            }

            if (result[result.length - 1] === ' ') {
                result = result.substring(0, result.length - 1);
            }
        }
        */

        element.className = result;
    }
};

/**
 * 
 * @param {Element} element
 * @param {Array<string>} classNames
 */
WebF.dom.classList.removeAll = function (element, classNames) {
    var x = 0;

    if (element.classList) {
        for (; x < classNames.length; x++) {
            element.classList.remove(classNames[x]);
        }
    }
    else {
        var classDictionary = {};

        for (; x < classNames.length; x++) {
            var className = classNames[x];

            if (!(className in classDictionary)) {
                classDictionary[className] = true;

                WebF.dom.classList.remove(element, className);
            }
        }
    }
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 * @returns {boolean}
 */
WebF.dom.classList.contains = function (element, className) {
    if (element.classList) {
        return element.classList.contains(className);
    }

    var nativeClassName = element.className;
    var nativeClassNameLength;
    var classNameLength;

    if (!WebF.base.isString(nativeClassName) || ((nativeClassNameLength = nativeClassName.length) < 1) || ((classNameLength = className.length) < 1)) {
        return false;
    }

    var startIndex = 0;
    var endIndex = 0;

    while (startIndex < nativeClassNameLength) {
        var index = nativeClassName.indexOf(className, startIndex);
        endIndex = index + classNameLength;

        if (index >= 0) {
            if (((index === 0) || WebF.char.isWhitespace(nativeClassName.charAt(index - 1))) && ((endIndex === nativeClassNameLength) || WebF.char.isWhitespace(nativeClassName.charAt(endIndex)))) {
                return true;
            }
        }
        else {
            return false;
        }

        startIndex = endIndex + 1;
    }

    return false;

    //var nativeClassName = element.className;

    //return element && WebF.base.isString(nativeClassName) && ((' ' + nativeClassName + ' ').indexOf(' ' + className + ' ') !== -1);
};

/**
 * 
 * @param {Element} element
 * @param {string} className
 */
WebF.dom.classList.toggle = function (element, className) {
    if (element.classList) {
        return element.classList.toggle(className);
    }
    else {
        return WebF.dom.classList.contains(element, className) ? (WebF.dom.classList.remove(element, className), false) : (WebF.dom.classList.add(element, className), true);
    }
};
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

/**
 * @constructor
 * @param {Document} [doc]
 */
WebF.dom.DOMHelper = function (doc) {
    /**
     * @private
     * @readonly
     */
    this._document = doc || document;
};

/**
 * @private
 * @static
 * @type {WebF.dom.DOMHelper}
 */
WebF.dom.DOMHelper._current = null;

/**
 * @static
 * @param {Document} [doc]
 * @returns {WebF.dom.DOMHelper}
 */
WebF.dom.DOMHelper.getDOMHelper = function (doc) {
    return doc ? new WebF.dom.DOMHelper(doc) : (WebF.dom.DOMHelper._current || (WebF.dom.DOMHelper._current = new WebF.dom.DOMHelper()));
};

/**
 * Returns the document object.
 * 
 * @static
 * @returns {Document}
 */
WebF.dom.DOMHelper.getDocument = function () {
    return document;
};

/**
 * Returns the window object associated with the specified or current document.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Window}
 */
WebF.dom.DOMHelper.getWindow = function (doc) {
    return doc ? (doc.parentWindow || doc.defaultView) : window;
};

/**
 * Returns the owner document for a node.
 * 
 * @static
 * @param {Node} node
 * @returns {Document}
 */
WebF.dom.DOMHelper.getOwnerDocument = function (node) {
    return (node.nodeType === Node.DOCUMENT_NODE) ? node : node.ownerDocument;
};

/**
 * @static
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isCSS1CompatMode = function (doc) {
    if (!doc) {
        doc = document;
    }

    return doc.compatMode == 'CSS1Compat';
};

/**
 * Returns the dimensions of the viewport.
 * 
 * @static
 * @param {Window} [win]
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.getViewportSize = function (win) {
    if (!win) {
        win = window;
    }

    var winInnerWidth = win.innerWidth || 0;
    var winInnerHeight = win.innerHeight || 0;

    var doc = win.document;

    var elem = WebF.dom.DOMHelper.isCSS1CompatMode(doc) ? doc.documentElement : doc.body;

    return new WebF.graphics.Size(Math.max(winInnerWidth, elem.clientWidth), Math.max(winInnerHeight, elem.clientHeight));
};

/**
 * Calculates the width and height of the document.
 * 
 * @static
 * @param {Window} [win]
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.getDocumentSize = function (win) {
    if (!win) {
        win = window;
    }

    var doc = win.document;
    var width = 0;
    var height = 0;

    label_GDS_1: {
        var docElem;
        var body;

        if (!(doc && (docElem = doc.documentElement) && (body = doc.body))) {
            break label_GDS_1;
        }

        var viewportSize = WebF.dom.DOMHelper.getViewportSize(win);

        if (WebF.dom.DOMHelper.isCSS1CompatMode(doc) && docElem.scrollWidth && docElem.scrollHeight) {
            width = (docElem.scrollWidth !== viewportSize.width) ? docElem.scrollWidth : docElem.offsetWidth;
            height = (docElem.scrollHeight !== viewportSize.height) ? docElem.scrollHeight : docElem.offsetHeight;
        }
        else {
            var sw = docElem.scrollWidth;
            var ow = docElem.offsetWidth;

            if (docElem.clientWidth !== ow) {
                sw = body.scrollWidth;
                ow = body.offsetWidth;
            }

            width = (sw > viewportSize.width) ? Math.max(sw, ow) : Math.min(sw, ow);

            var sh = docElem.scrollHeight;
            var oh = docElem.offsetHeight;

            if (docElem.clientHeight !== oh) {
                sh = body.scrollHeight;
                oh = body.offsetHeight;
            }

            height = (sh > viewportSize.height) ? Math.max(sh, oh) : Math.min(sh, oh);
        }
    }

    return new WebF.graphics.Size(width, height);
};

/**
 * Returns the document scroll distance as a coordinate object.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {WebF.graphics.Point}
 */
WebF.dom.DOMHelper.getDocumentScroll = function (doc) {
    var win;

    if (!doc) {
        doc = document;
        win = window;
    }
    else {
        win = WebF.dom.DOMHelper.getWindow(doc);
    }

    var elem = WebF.dom.DOMHelper.getDocumentScrollElement(doc);

    // isVersionOrHigher('10')
    if (WebF.userAgent.browser.isIE() && win.pageYOffset !== elem.scrollTop) {
        return new WebF.graphics.Point(elem.scrollLeft, elem.scrollTop);
    }

    return new WebF.graphics.Point(win.pageXOffset || elem.scrollLeft, win.pageYOffset || elem.scrollTop);
};

/**
 * Returns the document scroll element.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.getDocumentScrollElement = function (doc) {
    if (!doc) {
        doc = document;
    }

    if (doc.scrollingElement) {
        return doc.scrollingElement;
    }

    if (!WebF.userAgent.engine.isWebKit() && WebF.dom.DOMHelper.isCSS1CompatMode(doc)) {
        return doc.documentElement;
    }

    return doc.body || doc.documentElement;
};

/**
 * Removes a node from its parent.
 * 
 * @static
 * @param {Node} child The node to remove.
 * @returns {Node}
 */
WebF.dom.DOMHelper.removeChild = function (child) {
    var parent;

    if (!child || ((parent = child.parentNode) == null)) {
        return null;
    }

    return parent.removeChild(child);
};

/**
 * Replaces a node in the DOM tree. Will do nothing if "oldNode" has no parent.
 * 
 * @static
 * @param {Node} newChild The new node to replace oldChild.
 * @param {Node} oldChild The existing child to be replaced.
 * @returns {Node} The replaced node.
 */
WebF.dom.DOMHelper.replaceChild = function (newChild, oldChild) {
    var parent;

    if (!newChild || !oldChild || ((parent = oldChild.parentNode) == null)) {
        return null;
    }

    return parent.replaceChild(newChild, oldChild);
};

/**
 * Removes all the child nodes on a DOM node.
 * 
 * @static
 * @param {Node} node
 */
WebF.dom.DOMHelper.removeChildNodes = function (node) {
    if (!WebF.dom.DOMHelper.isNode(node)) {
        throw new Error('Invalid Node.');
    }

    if (node.childNodes.length < 1) {
        return;
    }

    var range = WebF.dom.DOMHelper.getOwnerDocument(node).createRange();
    range.selectNodeContents(node);
    range.deleteContents();
};

/**
 * Determines whether the object is a DOM node.
 * 
 * @static
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isNode = function (obj) {
    if (!WebF.base.isObject(obj)) {
        return false;
    }

    var doc = obj.ownerDocument || obj;
    var win = doc.parentWindow || doc.defaultView || window;

    return (obj instanceof win.Node);
};

/**
 * Determines whether the object is an Element.
 * 
 * @static
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isElement = function (obj) {
    if (!WebF.base.isObject(obj)) {
        return false;
    }

    var doc = obj.ownerDocument;
    var win = doc ? (doc.parentWindow || doc.defaultView || window) : window;

    return obj instanceof win.Element;
};

/**
 * Returns true if the element has a tabindex that allows it to receive focus, false otherwise.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isFocusableTabIndex = function (element) {
    var tabIndexStr = element.getAttribute('tabindex');

    return (tabIndexStr != null) && !isNaN(+tabIndexStr) && WebF.base.isNumber(element.tabIndex);
};

/**
 * @static
 * @param {Element} element Element whose tabindex is to be changed.
 * @param {number?} value
 */
WebF.dom.DOMHelper.setTabIndex = function (element, value) {
    if (value != null) {
        element.tabIndex = value;
    }
    else {
        element.tabIndex = -1;
        element.removeAttribute('tabindex');
    }
};

/**
 * Determines whether the element has a specified tabindex.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isFocusable = function (element) {
    return WebF.dom.DOMHelper.nativelySupportsFocus(element) ? !element.disable : WebF.dom.DOMHelper.isFocusableTabIndex(element);
};

/**
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isSequentialFocusNavigation = function (element) {
    var tabIndex = element.tabIndex;

    return (WebF.base.isNumber(tabIndex) && (tabIndex >= 0));
};

/**
 * Determines whether the element is focusable even when tabindex is not set.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.nativelySupportsFocus = function (element) {
    return ((element.tagName === 'A') ||
        (element.tagName === 'BUTTON') ||
        (element.tagName == 'INPUT') ||
        (element.tagName == 'TEXTAREA') ||
        (element.tagName == 'SELECT') ||
        (element.tagName == 'DETAILS'));
};

/**
 * Determines whether the element has focus.
 * 
 * @static
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.isElementFocused = function (element) {
    var doc = element.ownerDocument || document;
    var activeElement;

    return doc.hasFocus() && (activeElement = WebF.dom.DOMHelper.getActiveElement(doc)) && (activeElement === element);
};

/**
 * Returns the active element in the specified or current document.
 * 
 * @static
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.getActiveElement = function (doc) {
    if (!doc) {
        doc = document;
    }

    try {
        var elem = doc.activeElement;

        return (elem && elem.nodeName) ? elem : null;
    }
    catch (e) {
        return null;
    }
};

/**
 * Returns an array-like list of child elements (only a length property and numerical indices are guaranteed to exist).
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [maxLevels] Maximum number of levels to search down the dom.
 * @returns {IArrayLike<Element>}
 */
WebF.dom.DOMHelper.getElementsByClassName = function (element, className, maxLevels) {
    if (maxLevels == null) {
        return element.getElementsByClassName(className);
    }

    var items = [];
    var x;

    if (maxLevels === 0) {
        for (x = 0; x < element.childNodes.length; x++) {
            var node = element.childNodes[x];

            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (WebF.dom.classList.contains(node, className)) {
                items.push(node);
            }
        }
    }
    else {
        for (x = 0; x <= maxLevels; x++) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var node = element.childNodes[i];

                if (node.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                if (WebF.dom.classList.contains(node, className)) {
                    items.push(node);
                }

                if (x < maxLevels) {
                    var items2 = WebF.dom.DOMHelper.getElementsByClassName(element, className, maxLevels - 1);

                    if (items2.length > 0) {
                        WebF.array.addRange(items, items2);
                    }
                }
            }
        }
    }

    return items;
};

/**
 * Returns a child element.
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [maxLevels] Maximum number of levels to search down the dom.
 * @returns {Element}
 */
WebF.dom.DOMHelper.getElementByClassName = function (element, className, maxLevels) {
    if (maxLevels == null) {
        return element.querySelector('.' + className);
    }

    var x;

    if (maxLevels === 0) {
        for (x = 0; x < element.childNodes.length; x++) {
            var node = element.childNodes[x];

            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }

            if (WebF.dom.classList.contains(node, className)) {
                return node;
            }
        }
    }
    else {
        for (x = 0; x <= maxLevels; x++) {
            for (var i = 0; i < element.childNodes.length; i++) {
                var node = element.childNodes[i];

                if (node.nodeType !== Node.ELEMENT_NODE) {
                    continue;
                }

                if (WebF.dom.classList.contains(node, className)) {
                    return node;
                }

                if (x < maxLevels) {
                    var elem = WebF.dom.DOMHelper.getElementByClassName(element, className, maxLevels - 1);

                    if (elem) {
                        return elem;
                    }
                }
            }
        }
    }

    return null;
};

/**
 * Determines whether a document contains another node.
 * 
 * @static
 * @param {Document|null} doc The document that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.documentContains = function (doc, other) {
    if (!other) {
        return false;
    }

    if (!doc) {
        doc = document;
    }

    if (doc === other) {
        return true;
    }

    if ('contains' in doc) {
        return doc.contains(other);
    }

    if ('compareDocumentPosition' in doc) {
        return Boolean(doc.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }

    if (doc.documentElement) {
        return doc.documentElement.contains(other);
    }

    return ((doc.body && doc.body.contains(other)) || doc.head.contains(other));
};

/**
 * Determines whether a node contains another node.
 * 
 * @static
 * @param {Node} node The node that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.contains = function (node, other) {
    if (!node || !other) {
        return false;
    }

    if (node === other) {
        return true;
    }

    if ('contains' in node) {
        return node.contains(other);
    }

    if ('compareDocumentPosition' in node) {
        return Boolean(node.compareDocumentPosition(other) & Node.DOCUMENT_POSITION_CONTAINED_BY);
    }


    other = other.parentNode;

    while (other != null) {
        if (node === other) {
            return true;
        }

        other = other.parentNode;
    }

    return false;
};

/**
 * Returns the document object.
 * 
 * @returns {Document}
 */
WebF.dom.DOMHelper.prototype.getDocument = function () {
    return this._document;
};

/**
 * Returns the window object associated with the document.
 * 
 * @returns {Window}
 */
WebF.dom.DOMHelper.prototype.getWindow = function () {
    return WebF.dom.DOMHelper.getWindow(this._document);
};

/**
 * Returns the dimensions of the viewport.
 * 
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.prototype.getViewportSize = function () {
    return WebF.dom.DOMHelper.getViewportSize(this.getWindow(this._document));
};

/**
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isCSS1CompatMode = function () {
    return WebF.dom.DOMHelper.isCSS1CompatMode(this._document);
};

/**
 * Calculates the width and height of the document.
 * 
 * @returns {WebF.graphics.Size}
 */
WebF.dom.DOMHelper.prototype.getDocumentSize = function () {
    return WebF.dom.DOMHelper.getDocumentSize(this.getWindow(this._document));
};

/**
 * Returns the document scroll distance as a coordinate object.
 * 
 * @returns {WebF.graphics.Point}
 */
WebF.dom.DOMHelper.prototype.getDocumentScroll = function () {
    return WebF.dom.DOMHelper.getDocumentScroll(this._document);
};

/**
 * Returns the document scroll element.
 * 
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getDocumentScrollElement = function () {
    return WebF.dom.DOMHelper.getDocumentScrollElement(this._document);
};

/**
 * Returns the active element in the document.
 * 
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getActiveElement = function () {
    return WebF.dom.DOMHelper.getActiveElement(this._document);
};

/**
 * Removes a node from its parent.
 * 
 * @param {Node} child The node to remove.
 * @returns {Node}
 */
WebF.dom.DOMHelper.prototype.removeChild = WebF.dom.DOMHelper.removeChild;

/**
 * Replaces a node in the DOM tree. Will do nothing if "oldNode" has no parent.
 * 
 * @param {Node} newChild The new node to replace oldChild.
 * @param {Node} oldChild The existing child to be replaced.
 * @returns {Node} The replaced node.
 */
WebF.dom.DOMHelper.prototype.replaceChild = WebF.dom.DOMHelper.replaceChild;

/**
 * Removes all the child nodes on a DOM node.
 * 
 * @param {Node} node
 */
WebF.dom.DOMHelper.prototype.removeChildNodes = WebF.dom.DOMHelper.removeChildNodes;

/**
 * Determines whether the object is a DOM node.
 * 
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isNode = WebF.dom.DOMHelper.isNode;

/**
 * Determines whether the object is an Element.
 * 
 * @param {?} obj
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isElement = WebF.dom.DOMHelper.isElement;

/**
 * Returns true if the element has a tabindex that allows it to receive focus, false otherwise.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isFocusableTabIndex = WebF.dom.DOMHelper.isFocusableTabIndex;

/**
 * @param {Element} element Element whose tabindex is to be changed.
 * @param {number?} value
 */
WebF.dom.DOMHelper.prototype.setTabIndex = WebF.dom.DOMHelper.setTabIndex;

/**
 * Determines whether the element has a specified tabindex.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isFocusable = WebF.dom.DOMHelper.isFocusable;

/**
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isSequentialFocusNavigation = WebF.dom.DOMHelper.isSequentialFocusNavigation;

/**
 * Determines whether the element is focusable even when tabindex is not set.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.nativelySupportsFocus = WebF.dom.DOMHelper.nativelySupportsFocus;

/**
 * Determines whether the element has focus.
 * 
 * @param {Element} element Element to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.isElementFocused = WebF.dom.DOMHelper.isElementFocused;

/**
 * Returns an array-like list of child elements (only a length property and numerical indices are guaranteed to exist).
 * 
 * @param {Element} element
 * @param {string} className
 * @param {number} [level] Maximum number of levels to search down the dom.
 * @returns {IArrayLike<Element>}
 */
WebF.dom.DOMHelper.prototype.getElementsByClassName = WebF.dom.DOMHelper.getElementsByClassName;

/**
 * Returns a child element.
 * 
 * @static
 * @param {Element} element
 * @param {string} className
 * @param {number} [level] Maximum number of levels to search down the dom.
 * @returns {Element}
 */
WebF.dom.DOMHelper.prototype.getElementByClassName = WebF.dom.DOMHelper.getElementByClassName;

/**
 * Determines whether a document contains another node.
 * 
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.documentContains = function (other) {
    return WebF.dom.DOMHelper.documentContains(this._document, other);
};

/**
 * Determines whether a node contains another node.
 * 
 * @param {Node} node The node that should contain the other node.
 * @param {Node} other The node to check.
 * @returns {boolean}
 */
WebF.dom.DOMHelper.prototype.contains = WebF.dom.DOMHelper.contains;


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

WebF.dom.fullscreen = new function () {
    var fullscreenInfo = WebF.userAgent.capabilities.getFullscreenInfo();

    if (fullscreenInfo.fullscreenEnabledPropertyName != null) {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._propertyNames = {
            fullscreenEnabled: fullscreenInfo.fullscreenEnabledPropertyName,
            fullscreenElement: fullscreenInfo.fullscreenElementPropertyName,
            requestFullscreen: fullscreenInfo.requestFullscreenPropertyName,
            exitFullscreen: fullscreenInfo.exitFullscreenPropertyName,
        };

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_CHANGE_EVENT_TYPE = fullscreenInfo.fullscreenChangeEventType;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_ERROR_EVENT_TYPE = fullscreenInfo.fullscreenErrorEventType;
    }
    else {
        /**
         * @private
         * @readonly
         * @type {Object}
         */
        this._propertyNames = null;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_CHANGE_EVENT_TYPE = WebF.events.NativeEventType.FULLSCREENCHANGE;

        /**
         * @const
         * @type {string}
         */
        this.FULLSCREEN_ERROR_EVENT_TYPE = WebF.events.NativeEventType.FULLSCREENERROR;
    }
};

/**
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.fullscreen.isSupported = function (doc) {
    if (!doc) {
        doc = document;
    }

    var elem = doc.body || doc.documentElement;

    return !!(WebF.dom.fullscreen._propertyNames && elem[WebF.dom.fullscreen._propertyNames.requestFullscreen] && doc[WebF.dom.fullscreen._propertyNames.fullscreenEnabled]);
};

/**
 * @param {Element} element
 */
WebF.dom.fullscreen.requestFullscreen = function (element) {
    if (!WebF.dom.fullscreen._propertyNames || !element[WebF.dom.fullscreen._propertyNames.requestFullscreen]) {
        return;
    }

    element[WebF.dom.fullscreen._propertyNames.requestFullscreen]();
};

/**
 * @param {Document} [doc]
 */
WebF.dom.fullscreen.exitFullscreen = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return;
    }

    if (!doc) {
        doc = document;
    }

    if (!doc[WebF.dom.fullscreen._propertyNames.exitFullscreen]) {
        return;
    }

    doc[WebF.dom.fullscreen._propertyNames.exitFullscreen]();
};

/**
 * @param {Document} [doc]
 * @returns {boolean}
 */
WebF.dom.fullscreen.isFullscreen = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return false;
    }

    if (!doc) {
        doc = document;
    }

    return (doc[WebF.dom.fullscreen._propertyNames.fullscreenElement] != null);
};

/**
 * @param {Document} [doc]
 * @returns {Element}
 */
WebF.dom.fullscreen.getFullscreenElement = function (doc) {
    if (!WebF.dom.fullscreen._propertyNames) {
        return null;
    }

    if (!doc) {
        doc = document;
    }

    return doc[WebF.dom.fullscreen._propertyNames.fullscreenElement];
};
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

/**
 * @constructor
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.dom.PageVisibility = function (domHelper) {
    /**
     * @private
     * @readonly
     */
    this._dom = domHelper;

    /**
     * @private
     * @readonly
     */
    this._document = this._dom.getDocument();

    var pvInfo = WebF.userAgent.capabilities.getPageVisibilityInfo(this._document);

    this._hiddenPropertyName = pvInfo.hiddenPropertyName;
    this._visibilityStatePropertyName = pvInfo.visibilityStatePropertyName;
    this._visibilityChangeEventType = pvInfo.visibilityChangeEventType;
    this.isSupported = pvInfo.isSupported;
};

WebF.dom.PageVisibility.prototype.isVisible = function () {
    return (!this.isSupported || !this._document[this._hiddenPropertyName]);
};

WebF.dom.PageVisibility.prototype.getVisibilityState = function () {
    if (!this.isSupported) {
        return null;
    }

    return this._document[this._visibilityStatePropertyName];
};
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

/*
 * Dependencies: {
 *     webf-core.js,
 *     webf-dom.js,
 * }
 */

/**
 * @namespase
 */
WebF.ui = {};
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

/**
 * @interface
 * @implements {WebF.IDisposable}
 */
WebF.ui.IComponent = function () { };

/**
 * @type {Element}
 */
WebF.ui.IComponent.prototype.element;

/**
 * @type {number}
 */
WebF.ui.IComponent.prototype.id;

/**
 * @type {string}
 */
WebF.ui.IComponent.prototype.name;

/**
 * @type {Object}
 */
WebF.ui.IComponent.prototype.tag;

/**
 * @returns {string}
 */
WebF.ui.IComponent.prototype.getType = WebF.base.notImplementedMethod;

/*
 * Adds a event handler to listen to the Disposed event on the component.
 * 
 * @type {WebF.events.MultipleEventHandler<WebF.events.WFEvent>}
 */
//WebF.ui.IComponent.prototype.disposed;
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

/**
 * @abstract
 * @constructor
 * @implements {WebF.ui.IComponent}
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.ui.Component = function (domHelper) {
    /**
     * @private
     * @readonly
     */
    this._dom = domHelper;

    /**
     * The root DOM element of this component.
     * 
     * @private
     * @type {Element}
     */
    this._element = null;

    /**
     * @readonly
     * @type {number}
     */
    this.id = WebF.ui.IdGenerator.current.getUniqueId();

    /**
     * @private
     * @type {WebF.ui.Component}
     */
    this._parent = null;

    /**
     * @type {string}
     */
    this.name = null;

    /**
     * @private
     * @type {Array<WebF.ui.Component>}
     */
    this._children = [];

    /**
     * @type {Object}
     */
    this.tag = null;

    /**
     * @private
     */
    this._disposed = false;

    /**
     * @private
     */
    this._eventDispatcher = new WebF.events.EventDispatcher(this.onEventDispatcherAction.bind(this));

    /*
     * @type {WebF.events.MultipleEventHandler<WebF.events.WFEvent>}
     */
    //this.disposed = new WebF.events.MultipleEventHandler();

    /**
     * @private
     */
    this._isInDocument = false;

    /**
     * @private
     */
    this._wasApplied = false;

    /**
     * @private
     * @type {Array<WebF.events.EventHandler>}
     */
    this._nativeEventHandlers = [];
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.ui.Component.prototype.addEventHandler = function (type, handler) {
    this._eventDispatcher.addEventHandler(type, handler);
};

/**
 * @param {string} type
 * @param {function} handler
 */
WebF.ui.Component.prototype.removeEventHandler = function (type, handler) {
    this._eventDispatcher.removeEventHandler(type, handler);
};

/**
 * @param {string} type
 */
WebF.ui.Component.prototype.removeAllEventHandlers = function (type) {
    this._eventDispatcher.removeAllEventHandlers(type);
};

/**
 * @param {WebF.events.WFEvent|Event|Object} e
 */
WebF.ui.Component.prototype.dispatchEvent = function (e) {
    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @returns {number}
 */
WebF.ui.Component.prototype.getEventTypeCount = function () {
    return this._eventDispatcher.getEventTypeCount();
};

/**
 * @param {string} [type]
 * @returns {number}
 */
WebF.ui.Component.prototype.getEventHandlerCount = function (type) {
    return this._eventDispatcher.getEventHandlerCount(type);
};

/**
 * @param {string} [type]
 * @returns {Array<WebF.events.EventHandlers>}
 */
WebF.ui.Component.prototype.getEventHandlers = function (type) {
    return this._eventDispatcher.getEventHandlers(type);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.EDActionEvent} e
 */
WebF.ui.Component.prototype.onEventDispatcherAction = function (e) {

};

/**
 * @protected
 * @returns {Array<WebF.events.EventHandler>}
 */
WebF.ui.Component.prototype.getNativeEventHandlers = function () {
    return this._nativeEventHandlers;
};

/**
 * Returns the component's parent, if any.
 * 
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getParent = function () {
    return this._parent;
};

/**
 * 
 * @param {WebF.ui.Component} parent The parent component.
 */
WebF.ui.Component.prototype.setParent = function (parent) {
    if (parent == this) {
        throw new Error('Unable to set parent component.');
    }

    if (this._parent == parent) {
        return;
    }

    this._parent = parent;

    this.onParentChanged();
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onParentChanged = function () {

};

/**
 * Gets the root DOM element of this component.
 * 
 * @returns {Element}
 */
WebF.ui.Component.prototype.getElement = function () {
    return this._element;
};

/**
 * Sets the root DOM element of this component.
 * 
 * @protected
 * @param {Element} element
 */
WebF.ui.Component.prototype.setElement = function (element) {
    if (this._element != null) {
        return;
    }

    this._element = element;
};

/**
 * Determines whether the component has been added to the document.
 * 
 * @returns {boolean}
 */
WebF.ui.Component.prototype.isInDocument = function () {
    return this._isInDocument;
};

/**
 * Determines whether an element was applied to the component.
 * 
 * @returns {boolean}
 */
WebF.ui.Component.prototype.wasApplied = function () {
    return this._wasApplied;
};

/**
 * Returns the dom helper that is being used on this component.
 * 
 * @returns {WebF.dom.DOMHelper}
 */
WebF.ui.Component.prototype.getDOMHelper = function () {
    return this._dom;
};

/**
 * @returns {string}
 */
WebF.ui.Component.prototype.getType = function () {
    return this.constructor.name;
};

/**
 * @override
 * @returns {string}
 */
WebF.ui.Component.prototype.toString = function () {
    return this.constructor.name;
};

/**
 * Renders the component.
 * 
 * @virtual
 * @param {Element} parentElement
 * @param {Node} [beforeNode]
 */
WebF.ui.Component.prototype.render = function (parentElement, beforeNode) {
    if (!parentElement || this._isInDocument) {
        return;
    }

    if (!this._element) {
        this.onRender();

        this.registerNativeEventHandlers();
    }

    parentElement.insertBefore(this._element, beforeNode || null);

    if (this._parent) {
        if (!this._parent.isInDocument()) {
            return;
        }
    }
    else if (!parentElement.parentElement || !this._dom.documentContains(parentElement.parentElement)) {
        return;
    }

    this.enterDocument();
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onRender = function () {
    if (!this._element) {
        this._element = this._dom.getDocument().createElement('div');
    }
};

WebF.ui.Component.prototype.enterDocument = function () {
    this._isInDocument = true;

    for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (!child.isInDocument() && child.getElement()) {
            child.enterDocument();
        }
    }
};

WebF.ui.Component.prototype.exitDocument = function () {
    for (var x = 0; x < this._children.length; x++) {
        var child = this._children[x];

        if (child.isInDocument()) {
            child.exitDocument();
        }
    }

    this._isInDocument = false;
};

/**
 * @virtual
 * @param {Element} element
 */
WebF.ui.Component.prototype.apply = function (element) {
    if (this._isInDocument || !element) {
        return;
    }

    if (!this._element) {
        if (!this.canApply(element)) {
            throw new Error('Invalid element.');
        }

        this._wasApplied = true;

        this._element = element;

        this.onApply();

        this.registerNativeEventHandlers();
    }
    /*
    if (!element.parentElement || !this._dom.documentContains(element.parentElement)) {
        return;
    }
    */

    if (this._parent) {
        if (!this._parent.isInDocument()) {
            return;
        }
    }
    else if (!element.parentElement || !this._dom.documentContains(element.parentElement)) {
        return;
    }

    this.enterDocument();
};

/**
 * @virtual
 * @param {Element} element
 * @returns {boolean}
 */
WebF.ui.Component.prototype.canApply = function (element) {
    return true;
};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.onApply = function () {

};

/**
 * @protected
 * @virtual
 */
WebF.ui.Component.prototype.registerNativeEventHandlers = function () {

};

/**
 * @protected
 * @virtual
 * @param {boolean} disposeChildren
 */
WebF.ui.Component.prototype.update = function (disposeChildren) {

};

/**
 * @param {WebF.ui.Component} child
 * @param {boolean} render
 */
WebF.ui.Component.prototype.addChild = function (child, render) {
    this.insertChild(this._children.length, child, render);
};

/**
 * @param {number} index
 * @param {WebF.ui.Component} child
 * @param {boolean} render
 */
WebF.ui.Component.prototype.insertChild = function (index, child, render) {
    if ((index < 0) || (index > this._children.length)) {
        throw new Error('Parameter "index" out of range.');
    }

    var childParent = child.getParent();

    if (childParent == this) {
        WebF.array.remove(this._children, child);
    }
    else if (childParent != null) {
        childParent.removeChild(child, false);
    }

    child.setParent(this);
    WebF.array.insert(this._children, index, child);

    if (child.isInDocument() || render) {
        if (!this._element) {
            this.onRender();
        }

        var beforeNodeIndex = index + 1;
        var beforeNode = (beforeNodeIndex < this._children.length) ? this._children[beforeNodeIndex].element : null;

        if (child.isInDocument()) {
            WebF.dom.DOMHelper.removeChild(child.element);
            this._element.insertBefore(child.element, beforeNode);
        }
        else {
            child.render(this._element, beforeNode);
        }
    }
    else if (this._isInDocument && !child.isInDocument() && child.element && this._dom.documentContains(child.element)) {
        child.enterDocument();
    }
};

/**
 * Returns the number of children of this component.
 * 
 * @returns {number}
 */
WebF.ui.Component.prototype.getChildCount = function () {
    return this._children.length;
};

/**
 * @returns {boolean}
 */
WebF.ui.Component.prototype.hasChildren = function () {
    return (this._children.length > 0);
};

/**
 * 
 * @param {function(WebF.ui.Component): boolean} predicate
 * @returns {WebF.ui.Component}
 * 
 * @example
 * component.getChild(function (x) {
 *     return (x.name === 'componentName');
 * });
 */
WebF.ui.Component.prototype.getChild = function (predicate) {
    return WebF.array.find(this._children, predicate);
};

/**
 * @param {number} id
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildById = function (id) {
    return WebF.array.findById(this._children, id);
};

/**
 * 
 * @param {string} name The name of the child.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildByName = function (name) {
    return WebF.array.findByPropertyValue(this._children, 'name', name);
};

/**
 * 
 * @param {number} index The name of the cookie.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.getChildAt = function (index) {
    return this._children[index] || null;
};

/**
 * 
 * @param {WebF.ui.Component} child
 * @returns {number}
 */
WebF.ui.Component.prototype.indexOfChild = function (child) {
    return (child ? this._children.indexOf(child) : -1);
};

/**
 * 
 * @param {WebF.ui.Component} child
 * @param {boolean} [unrender] The default is true.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.removeChild = function (child, unrender) {
    /*
    if (!child || (child.getParent() != this)) {
        return null;
    }

    child = WebF.array.remove(this._children, child);

    if (!child) {
        return null;
    }

    if (unrender !== false) {
        child.exitDocument();

        if (child.element) {
            WebF.dom.DOMHelper.removeChild(child.element);
        }
    }

    child.setParent(null);

    return child;
    */

    if (!child || (child.getParent() != this)) {
        return null;
    }

    var index = this.indexOfChild(child);

    return (index > -1) ? this.removeChildAt(index, unrender) : null;
};

/**
 * 
 * @param {number} index
 * @param {boolean} [unrender] The default is true.
 * @returns {WebF.ui.Component}
 */
WebF.ui.Component.prototype.removeChildAt = function (index, unrender) {
    //return this.removeChild(this.getChildAt(index), unrender);

    var child = this._children[index];

    if (!child) {
        return null;
    }

    child = WebF.array.removeAt(this._children, index);

    if (!child) {
        return null;
    }

    if (unrender !== false) {
        child.exitDocument();

        if (child.element) {
            WebF.dom.DOMHelper.removeChild(child.element);
        }
    }

    child.setParent(null);

    return child;
};

/**
 * @param {boolean} [unrender] The default is true.
 * @returns {Array<WebF.ui.Component>}
 */
WebF.ui.Component.prototype.removeChildren = function (unrender) {
    var removedChildren = [];

    // Chrome (v: 68.0.3440.75): < 50856
    if ((this._children.length < 30000) || (!WebF.userAgent.browser.isChrome() && (this._children.length < 500000))) {
        while (this._children.length > 0) {
            var child = this.removeChildAt(0, unrender);

            if (child) {
                removedChildren.push(child);
            }
        }
    }
    else {
        while (this._children.length > 0) {
            var child = this.removeChildAt(this._children.length - 1, unrender);

            if (child) {
                removedChildren.push(child);
            }
        }

        removedChildren.reverse();
    }

    return removedChildren;
};

/**
 * @private
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Component.prototype._onDisposed = function (e) {
    this._eventDispatcher.dispatchEvent(e);
    //this.disposed.invoke(e);
};

/**
 * @returns {boolean}
 */
WebF.ui.Component.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.ui.Component.prototype.dispose = function () {
    if (this._disposed) {
        return;
    }

    this._disposed = true;

    this._isInDocument = false;

    this._eventDispatcher.removeAllEventHandlers();
    var x;

    if (this._element) {
        for (x = 0; x < this._nativeEventHandlers.length; x++) {
            var neh = this._nativeEventHandlers[x];
            neh.source.removeEventListener(neh.eventType, neh.handler);
            neh.handler = null;
        }
    }

    this._nativeEventHandlers = null;

    for (x = 0; x < this._children.length; x++) {
        this._children[x].dispose();
    }

    if (!this._wasApplied && this._element && this._element.parentElement) {
        this._element.parentElement.removeChild(this._element);
    }

    

    this._element = null;
    this._parent = null;

    WebF.array.clear(this._children);


    

    var e = new WebF.events.WFEvent(WebF.ui.ComponentEventType.DISPOSED, this);
    this._onDisposed(e);

    
    //this.disposed.removeAllHandlers();
};
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

/**
 * @const
 * @enum {string}
 */
WebF.ui.ComponentEventType = {
    DISPOSED: 'disposed'
};
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

/**
 * @enum {string}
 */
WebF.ui.ControlCSSClassName = {
    CONTROL: 'wf-control',
    DISABLED: 'wf-control_disabled',
    VISIBILITY_HIDDEN: 'wf-control_visibility_hidden',
    VISIBILITY_COLLAPSED: 'wf-control_visibility_collapsed'
};
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

/**
 * @const
 * @enum {string}
 */
WebF.ui.ControlEventType = {
    FOCUS: 'focus',
    BLUR: 'blur',
    IS_ENABLED_CHANGED: 'isenabledchanged',
    IS_VISIBLE_CHANGED: 'isvisiblechanged',
    CLICK: 'click',
    MOUSE_DOWN: 'mousedown'
};
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

/**
 * @abstract
 * @constructor
 * @extends {WebF.ui.Component}
 * @param {WebF.dom.DOMHelper} domHelper
 */
WebF.ui.Control = function (domHelper) {
    WebF.ui.Component.call(this, domHelper);

    /**
     * @private
     * @type {boolean}
     */
    this._enabled = true;

    /**
     * @private
     * @type {boolean?}
     */
    this._parentIsEnabled = null;

    /**
     * @private
     * @type {WebF.ui.Visibility}
     */
    this._visibility = WebF.ui.Visibility.VISIBLE;

    /**
     * @private
     * @type {WebF.ui.ControlCSSClassName?} Value: WebF.ui.ControlCSSClassName.VISIBILITY_HIDDEN, WebF.ui.ControlCSSClassName.VISIBILITY_COLLAPSED or null.
     */
    this._visibilityClassName = null;

    /**
     * @private
     * @type {boolean}
     */
    this._visible = true;

    /**
     * @private
     * @type {boolean?}
     */
    this._parentIsVisible = null;

    /**
     * @private
     * @type {boolean}
     */
    this._focusable = false;

    /**
     * @private
     * @type {number?}
     */
    this._tabIndex = null;

    /**
     * @private
     * @type {boolean}
     */
    this._hasFocusEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasBlurEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasClickEventHandler = false;

    /**
     * @private
     * @type {boolean}
     */
    this._hasMouseDownEventHandler = false;

    /**
     * @private
     * @type {Object<string, Array<WebF.events.EventHandler>>} Object<sourceName, Array<WebF.events.EventHandler>>
     */
    this._nativeEventHandlersCache = Object.create(null);

    /**
     * @private
     * @type {Object<string, Array<string>>} Object<sourceName, Array<nativeEventType>>
     */
    this._systemNativeEventTypes = Object.create(null);
};

WebF.ui.Control.prototype = Object.create(WebF.ui.Component.prototype);
WebF.ui.Control.prototype.constructor = WebF.ui.Control;

/**
 * @protected
 * @returns {Object<string, Array<WebF.events.EventHandler>>}
 */
WebF.ui.Control.prototype.getNativeEventHandlersCache = function () {
    return this._nativeEventHandlersCache;
};

/**
 * @protected
 * @returns {Object<string, Array<string>>} Object<sourceName, Array<nativeEventType>>
 */
WebF.ui.Control.prototype.getSystemNativeEventTypes = function () {
    return this._systemNativeEventTypes;
};

/**
 * @protected
 * @override
 * @param {WebF.events.EDActionEvent} e
 */
WebF.ui.Control.prototype.onEventDispatcherAction = function (e) {
    var elem = this.getElement();

    var controlEventTypeEnum = WebF.ui.ControlEventType;
    var nativeEventTypeEnum = WebF.events.NativeEventType;

    /**
     * @type {Array<WebF.events.EventHandlers>}
     */
    var handlers = e.handlers;
    var sourceName = 'RootElement';

    for (var x = 0; x < handlers.length; x++) {
        var eventHandlers = handlers[x];

        if (!eventHandlers) {
            continue;
        }

        var eventType = eventHandlers.eventType;
        var nativeEventType = null;
        var hasEventHandler = false;
        var hasEventHandlerPropertyName = null;
        var nativeEventHandler = null;

        switch (eventType) {
            case controlEventTypeEnum.FOCUS: {
                hasEventHandler = this._hasFocusEventHandler;
                hasEventHandlerPropertyName = '_hasFocusEventHandler';
                nativeEventType = nativeEventTypeEnum.FOCUS;
                nativeEventHandler = this.onNativeFocus.bind(this);

                break;
            }
            case controlEventTypeEnum.BLUR: {
                hasEventHandler = this._hasBlurEventHandler;
                hasEventHandlerPropertyName = '_hasBlurEventHandler';
                nativeEventType = nativeEventTypeEnum.BLUR;
                nativeEventHandler = this.onNativeBlur.bind(this);

                break;
            }
            case controlEventTypeEnum.CLICK: {
                hasEventHandler = this._hasClickEventHandler;
                hasEventHandlerPropertyName = '_hasClickEventHandler';
                nativeEventType = nativeEventTypeEnum.CLICK;
                nativeEventHandler = this.onNativeClick.bind(this);

                break;
            }
            case controlEventTypeEnum.MOUSE_DOWN: {
                hasEventHandler = this._hasMouseDownEventHandler;
                hasEventHandlerPropertyName = '_hasMouseDownEventHandler';
                nativeEventType = nativeEventTypeEnum.MOUSEDOWN;
                nativeEventHandler = this.onNativeMouseDown.bind(this);

                break;
            }
        }

        if (!nativeEventType) {
            continue;
        }

        var count = this.getEventHandlerCount(eventType);
        var neHandlers;
        var result = false;
        var neTypes = this._systemNativeEventTypes[sourceName];

        if (!hasEventHandler) {
            if (count > 0) {
                result = this.addNativeEventHandler(elem, sourceName, nativeEventType, nativeEventHandler);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = true;
                }
            }
        }
        else {
            if (count < 1) {
                result = this.removeNativeEventHandler(elem, sourceName, nativeEventType);

                if (result || (neTypes && (neTypes.indexOf(nativeEventType) >= 0))) {
                    this[hasEventHandlerPropertyName] = false;
                }
            }
        }

        eventHandlers.handlers = null;
        handlers[x] = null;
    }

    WebF.ui.Component.prototype.onEventDispatcherAction.call(this, e);
};

/**
 * @protected
 * @param {Element} source
 * @param {string} sourceName
 * @param {string} nativeEventType
 * @param {function} nativeEventHandler
 * @returns {boolean}
 */
WebF.ui.Control.prototype.addNativeEventHandler = function (source, sourceName, nativeEventType, nativeEventHandler) {
    var nativeEventHandlers = this.getNativeEventHandlers();
    var result = false;

    if (source) {
        if (!WebF.array.exists(nativeEventHandlers, function (item) {
            return (item.source === source) && (item.eventType === nativeEventType);
        })) {
            source.addEventListener(nativeEventType, nativeEventHandler);
            nativeEventHandlers.push(new WebF.events.EventHandler(source, nativeEventType, nativeEventHandler));
            result = true;
        }
    }
    else {
        var add = true;
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (neHandlers) {
            if (WebF.array.containsByPropertyValue(neHandlers, 'eventType', nativeEventType)) {
                add = false;
            }
        }
        else {
            neHandlers = [];
            this._nativeEventHandlersCache[sourceName] = neHandlers;
        }

        if (add) {
            neHandlers.push(new WebF.events.EventHandler(null, nativeEventType, nativeEventHandler));
            result = true;
        }
    }

    return result;
};

/**
 * @protected
 * @param {Element} source
 * @param {string} sourceName
 * @param {string} nativeEventType
 * @returns {boolean}
 */
WebF.ui.Control.prototype.removeNativeEventHandler = function (source, sourceName, nativeEventType) {
    var neTypes = this._systemNativeEventTypes[sourceName];

    if (neTypes && neTypes.indexOf(nativeEventType) >= 0) {
        return false;
    }

    var nativeEventHandlers = this.getNativeEventHandlers();
    var result = false;
    var neh;
    var index;

    if (source) {
        index = WebF.array.findIndex(nativeEventHandlers, function (item) {
            return (item.source === source) && (item.eventType === nativeEventType);
        });

        if (index >= 0) {
            neh = nativeEventHandlers[index];
            source.removeEventListener(nativeEventType, neh.handler);

            neh.handler = null;
            WebF.array.removeAt(nativeEventHandlers, index);
            result = true;
        }
    }
    else {
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (neHandlers) {
            neh = WebF.array.removeByPropertyValue(neHandlers, 'eventType', nativeEventType);

            if (neh) {
                neh.handler = null;
                result = true;

                if (neHandlers.length < 1) {
                    delete this._nativeEventHandlersCache[sourceName];
                }
            }
        }
    }

    return result;
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.registerNativeEventHandlers = function () {
    WebF.ui.Component.prototype.registerNativeEventHandlers.call(this);

    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    var nativeEventHandlers = this.getNativeEventHandlers();
    var sourceRootElementName = 'RootElement';

    for (var sourceName in this._nativeEventHandlersCache) {
        var neHandlers = this._nativeEventHandlersCache[sourceName];

        if (!neHandlers) {
            continue;
        }

        for (var x = 0; x < neHandlers.length; x++) {
            var neh = neHandlers[x];

            if (!neh.source) {
                if (sourceName !== sourceRootElementName) {
                    continue;
                }

                neh.source = elem;
            }

            if (!WebF.array.exists(nativeEventHandlers, function (item) {
                return (item.source === neh.source) && (item.eventType === neh.eventType);
            })) {
                neh.source.addEventListener(neh.eventType, neh.handler);
                nativeEventHandlers.push(neh);
            }
        }
    }

    this._nativeEventHandlersCache = Object.create(null);
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.onParentChanged = function () {
    WebF.ui.Component.prototype.onParentChanged.call(this);

    var parent = this.getParent();

    var oldIsEnabled = this.isEnabled();

    var newParentIsEnabled = parent ? parent.isEnabled() : null;

    if (this._parentIsEnabled !== newParentIsEnabled) {
        this._parentIsEnabled = newParentIsEnabled;

        if (oldIsEnabled !== this.isEnabled()) {
            var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

            this.onIsEnabledChanged(e);
        }
    }

    var oldIsVisible = this.isVisible();

    var newParentIsVisible = parent ? parent.isVisible() : null;

    if (this._parentIsVisible !== newParentIsVisible) {
        this._parentIsVisible = newParentIsVisible;

        if (oldIsVisible !== this.isVisible()) {
            var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

            this.onIsVisibleChanged(e2);
        }
    }
};

/**
 * @virtual
 * @returns {Object} Content: @type {WebF.ui.Component|Array<WebF.ui.Component>|null}
 */
WebF.ui.Control.prototype.getContent = function () {
    var count = this.getChildCount();

    if (count < 1) {
        return null;
    }

    if (count === 1) {
        return this.getChildAt(0);
    }

    var x = 0;
    var items = new Array(count);

    do {
        items[x] = this.getChildAt(x++);
    }
    while (x < count);

    return items;
};

/**
 * @virtual
 * @param {Object} content Content: @type {WebF.ui.Component|Array<WebF.ui.Component>|null}
 */
WebF.ui.Control.prototype.setContent = function (content) {

};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
WebF.ui.Control.prototype.onNativeFocus = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.FOCUS, this, e);

    this.onFocus(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onFocus = function (e) {
    if (!this.isEnabled() || !this.isFocusable()) {
        this.getElement().blur();
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {FocusEvent} e
 */
WebF.ui.Control.prototype.onNativeBlur = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.BLUR, this, e);

    this.onBlur(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onBlur = function (e) {
    if (!this.isEnabled() || !this.isFocusable()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
WebF.ui.Control.prototype.onNativeClick = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.CLICK, this, e);

    this.onClick(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onClick = function (e) {
    if (!this.isEnabled()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @protected
 * @virtual
 * @param {MouseEvent} e
 */
WebF.ui.Control.prototype.onNativeMouseDown = function (e) {
    var e2 = new WebF.events.WFNativeEvent(WebF.ui.ControlEventType.MOUSE_DOWN, this, e);

    this.onMouseDown(e2);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFNativeEvent} e
 */
WebF.ui.Control.prototype.onMouseDown = function (e) {
    if (!this.isEnabled()) {
        return;
    }

    this._eventDispatcher.dispatchEvent(e);
};

/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isFocused = function () {
    var elem;

    return (elem = this.getElement()) && this.getDOMHelper().isElementFocused(elem);
};

/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isEnabled = function () {
    return this._enabled && (this._parentIsEnabled !== false);
};


/**
 * @virtual
 * @param {boolean} enable
 */
WebF.ui.Control.prototype.setEnabled = function (enable) {
    if (this._enabled === enable) {
        return;
    }

    var oldIsEnabled = this.isEnabled();
    this._enabled = enable;

    var elem;

    if ((elem = this.getElement())) {
        if (!enable) {
            WebF.dom.classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
        }
        else {
            WebF.dom.classList.remove(elem, WebF.ui.ControlCSSClassName.DISABLED);
        }
    }

    if (oldIsEnabled === this.isEnabled()) {
        return;
    }

    var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

    this.onIsEnabledChanged(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onIsEnabledChanged = function (e) {
    var elem = this.getElement();
    var dom = this.getDOMHelper();

    if (elem) {
        if (this.isEnabled()) {
            if (this._focusable) {
                dom.setTabIndex(elem, this._tabIndex);
            }
        }
        else if (this.isFocusable()) {
            dom.setTabIndex(elem, null);
        }
    }

    this._eventDispatcher.dispatchEvent(e);

    var count = this.getChildCount();

    for (var x = 0; x < count; x++) {
        this.getChildAt(x).onParentIsEnabledChanged(e);
    }
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onParentIsEnabledChanged = function (e) {
    this._parentIsEnabled = this.getParent().isEnabled();

    if (!this._enabled) {
        return;
    }

    var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_ENABLED_CHANGED, this);

    this.onIsEnabledChanged(e2);
};

/**
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isVisible = function () {
    return this._visible && (this._parentIsEnabled !== false);
};

/**
 * @returns {WebF.ui.Visibility}
 */
WebF.ui.Control.prototype.getVisibility = function () {
    return this._visibility;
};

/**
 * @param {WebF.ui.Visibility} value
 */
WebF.ui.Control.prototype.setVisibility = function (value) {
    if (this._visibility === value) {
        return;
    }

    this._visibility = value;

    this.onVisibilityChanged();
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onVisibilityChanged = function () {
    var elem;

    if ((elem = this.getElement())) {
        if (this._visibilityClassName != null) {
            WebF.dom.classList.remove(elem, this._visibilityClassName);
        }

        if (this._visibility === WebF.ui.Visibility.VISIBLE) {
            this._visibilityClassName = null;
        }
        else {
            this._visibilityClassName = (this._visibility === WebF.ui.Visibility.HIDDEN) ? WebF.ui.ControlCSSClassName.VISIBILITY_HIDDEN : WebF.ui.ControlCSSClassName.VISIBILITY_COLLAPSED;
            WebF.dom.classList.add(elem, this._visibilityClassName);
        }
    }

    this._updateVisible();
};

/**
 * @private
 */
WebF.ui.Control.prototype._updateVisible = function () {
    var visible = (this._visibility === WebF.ui.Visibility.VISIBLE);

    if (this._visible === visible) {
        return;
    }

    var oldIsVisible = this.isVisible();
    this._visible = visible;

    if (oldIsVisible === this.isVisible()) {
        return;
    }

    var e = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

    this.onIsVisibleChanged(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onIsVisibleChanged = function (e) {
    this._eventDispatcher.dispatchEvent(e);

    var count = this.getChildCount();

    for (var x = 0; x < count; x++) {
        this.getChildAt(x).onParentIsVisibleChanged(e);
    }
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.ui.Control.prototype.onParentIsVisibleChanged = function (e) {
    this._parentIsVisible = this.getParent().isVisible();

    if (!this._visible) {
        return;
    }

    var e2 = new WebF.events.WFEvent(WebF.ui.ControlEventType.IS_VISIBLE_CHANGED, this);

    this.onIsVisibleChanged(e2);
};


/**
 * @virtual
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isFocusable = function () {
    var elem;

    return ((elem = this.getElement()) && this.getDOMHelper().isFocusableTabIndex(elem)) || (!this.isEnabled() && this._focusable);
};

/**
 * @virtual
 * @param {boolean} focusable
 */
WebF.ui.Control.prototype.setFocusable = function (focusable) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    var dom = this.getDOMHelper();
    var set = false;

    if (focusable) {
        if (!dom.isFocusableTabIndex(elem) || (elem.tabIndex !== 0)) {
            set = true;
        }

        this._focusable = true;
        this._tabIndex = 0;
    }
    else {
        if (dom.isFocusableTabIndex(elem)) {
            set = true;
        }

        this._focusable = false;
        this._tabIndex = null;
    }

    if (!set || !this.isEnabled()) {
        return;
    }

    dom.setTabIndex(elem, this._tabIndex);
};

/**
 * @param {number?} value
 */
WebF.ui.Control.prototype.setTabIndex = function (value) {
    var elem;

    if ((this._tabIndex === value) || !(elem = this.getElement())) {
        return;
    }

    var dom = this.getDOMHelper();
    this._tabIndex = value;
    this._focusable = ((value != null) || (dom.nativelySupportsFocus(elem) && this._focusable));

    if (!this.isEnabled()) {
        return;
    }

    this.getDOMHelper().setTabIndex(elem, value);
};

/**
 * @returns {number}
 */
WebF.ui.Control.prototype.getTabIndex = function () {
    var elem;

    return (elem = this.getElement()) ? elem.tabIndex : -1;
};

/**
 * @returns {boolean}
 */
WebF.ui.Control.prototype.isSequentialFocusNavigation = function () {
    var elem;

    return (elem = this.getElement()) && this.getDOMHelper().isSequentialFocusNavigation(elem);
};

WebF.ui.Control.prototype.focus = function () {
    if (!this.isEnabled() || !this.isFocusable()) {
        return;
    }

    this.getElement().focus();
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.width : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.width = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMinWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.minWidth : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMinWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.minWidth = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMaxWidth = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.maxWidth : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMaxWidth = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.maxWidth = WebF.base.isNumber(value) ? (value + 'px') : value;
};



/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.height : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.height = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMinHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.minHeight : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMinHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.minHeight = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @virtual
 * @returns {T}
 * @template T
 */
WebF.ui.Control.prototype.getMaxHeight = function () {
    var elem;

    return (elem = this.getElement()) ? elem.style.maxHeight : '';
};

/**
 * @virtual
 * @param {string|number}
 */
WebF.ui.Control.prototype.setMaxHeight = function (value) {
    var elem;

    if (!(elem = this.getElement())) {
        return;
    }

    elem.style.maxHeight = WebF.base.isNumber(value) ? (value + 'px') : value;
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.onRender = function () {
    var dom = this.getDOMHelper();
    var doc = dom.getDocument();
    var classList = WebF.dom.classList;
    var elem = this.getElement();

    if (!elem) {
        elem = doc.createElement('div');
        this.setElement(elem);
    }

    if (!this._enabled) {
        classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
    }

    if (this._visibilityClassName != null) {
        classList.add(elem, this._visibilityClassName);
    }
};

/**
 * @protected
 * @override
 */
WebF.ui.Control.prototype.onApply = function () {
    var classList = WebF.dom.classList;
    var elem = this.getElement();

    if (!this._enabled) {
        classList.add(elem, WebF.ui.ControlCSSClassName.DISABLED);
    }

    if (this._visibilityClassName != null) {
        classList.add(elem, this._visibilityClassName);
    }
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
WebF.ui.Control.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element)) {
        return false;
    }

    return true;
};

/**
 * @override
 */
WebF.ui.Control.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Component.prototype.dispose.call(this);

    this._nativeEventHandlersCache = null;
    this._systemNativeEventTypes = null;
};
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

/**
 * @constructor
 */
WebF.ui.IdGenerator = function () {
    this._currentId = 0;
};

/**
 * @returns {number}
 */
WebF.ui.IdGenerator.prototype.getUniqueId = function () {
    return ++this._currentId;
};

Object.defineProperty(WebF.ui.IdGenerator, 'current', {
    value: new WebF.ui.IdGenerator(),
    enumerable: true,
    writable: false
});
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

/**
 * @enum {number}
 */
WebF.ui.Visibility = {
    /**
     * Normally visible.
     */
    VISIBLE: 0,

    /**
     * Occupies space in the layout, but is not visible (completely transparent).
     */
    HIDDEN: 1,

    /**
     * Not visible and does not occupy any space in layout, as if it doesn't exist.
     */
    COLLAPSED: 2
};
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

/*
 * Dependencies: {
 *     webf-core.js,
 *     webf-dom.js,
 *     webf-ui.js
 * }
 */

/**
 * @namespase
 */
WebF.app = {};
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

/**
 * @namespase
 */
WebF.app.view = {};
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

/**
 * @namespase
 */
WebF.app.window = {};
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

/**
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {Window} win
 */
WebF.app.Application = function (win) {
    /**
     * @private
     * @readonly
     * @type {WebF.window.WFWindow}
     */
    this._mainWindow = new WebF.app.window.WFWindow(win);

    Object.defineProperty(this, 'mainWindow', {
        get: function () {
            return this._mainWindow;
        },
        enumerable: true
    });

    /**
     * @private
     */
    this._disposed = false;

    this._isInitialized = false;

    /**
     * @private
     * @readonly
     */
    this._window = this._mainWindow.getWindow();

    /**
     * @private
     * @type {function(Event)}
     */
    this._onlineHandler = this.onOnline.bind(this);

    /**
     * @private
     * @type {function(Event)}
     */
    this._offlineHandler = this.onOffline.bind(this);

    this._window.addEventListener(WebF.events.NativeEventType.ONLINE, this._onlineHandler);
    this._window.addEventListener(WebF.events.NativeEventType.OFFLINE, this._offlineHandler);

    /**
     * @private
     * @type {function(Event)}
     */
    this._pageInitializedHandler = null;

    this.initialize();
};

/**
 * @protected
 * @virtual
 */
WebF.app.Application.prototype.initialize = function () {
    if (this._isInitialized) {
        return;
    }

    this.createPage();

    this._isInitialized = true;

    if (this._mainWindow.page && !this._mainWindow.page.isInitialized()) {
        this._pageInitializedHandler = this.onPageInitialized.bind(this);
        this._mainWindow.page.initialized.addHandler(this._pageInitializedHandler);
    }
    else {
        this._mainWindow.page.initializeContent();
    }
};

/**
 * @protected
 * @virtual
 */
WebF.app.Application.prototype.createPage = function () {
    if (this._mainWindow.page) {
        return;
    }

    this._mainWindow.page = new WebF.app.view.Page(this._mainWindow, true);
};

WebF.app.Application.prototype.initializePageContent = function () {

};

/**
 * @returns {boolean}
 */
WebF.app.Application.prototype.isInitialized = function () {
    return this._isInitialized;
};


/**************************************************************************************
 * <App EventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.Application.prototype.onPageInitialized = function (e) {
    this._mainWindow.page.initialized.removeHandler(this._pageInitializedHandler);
    this._pageInitializedHandler = null;


    this._mainWindow.page.initializeContent();
};

/**************************************************************************************
 * </App EventHandlers>
 *************************************************************************************/






/**************************************************************************************
 * <App NativeEventHandlers>
 *************************************************************************************/

 /**
  * @protected
  * @virtual
  * @param {Event} e
  */
WebF.app.Application.prototype.onOnline = function (e) {

};

/**
  * @protected
  * @virtual
  * @param {Event} e
  */
WebF.app.Application.prototype.onOffline = function (e) {

};

/**************************************************************************************
 * </App NativeEventHandlers>
 *************************************************************************************/

/**
* @returns {boolean}
*/
WebF.app.Application.prototype.isDisposed = function () {
    return this._disposed;
};

 /**
 * @virtual
 */
WebF.app.Application.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    this._window.removeEventListener(WebF.events.NativeEventType.ONLINE, this._onlineHandler);
    this._window.removeEventListener(WebF.events.NativeEventType.OFFLINE, this._offlineHandler);

    this._onlineHandler = null;
    this._offlineHandler = null;

    this._pageInitializedHandler = null;

    this._mainWindow.dispose();
};
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

/**
 * @constructor
 * @param {WebF.app.view.Page} page
 */
WebF.app.view.PageBody = function (page) {
    /**
     * @readonly
     */
    var _page = page;

    Object.defineProperty(this, 'page', {
        get: function () {
            return _page;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _page.domHelper;
        },
        enumerable: true
    });

    /**
     * @readonly
     */
    this._document = this.domHelper.getDocument();

    /**
     * @type {Element}
     */
    this._contentElement = null;
};

/**
 * @returns {Element}
 */
WebF.app.view.PageBody.prototype.getContentElement = function () {
    return this._contentElement;
};

/**
 * @param {Element} element
 */
WebF.app.view.PageBody.prototype.setContentElement = function (element) {
    this._contentElement = element;
};




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

/**
 * @const
 * @enum {string}
 */
WebF.app.view.PageEventType = {
    INITIALIZED: 'initialized',
    CONTENT_INITIALIZED: 'contentinitialized'
};
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

/**
 * @constructor
 * @param {WebF.app.view.Page} page
 */
WebF.app.view.PageHead = function (page) {
    /**
     * @readonly
     */
    var _page = page;

    Object.defineProperty(this, 'page', {
        get: function () {
            return _page;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _page.domHelper;
        },
        enumerable: true
    });

    /**
     * @readonly
     */
    this._document = this.domHelper.getDocument();


};








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

/**
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {WebF.app.window.WFWindow} wfWindow
 * @param {boolean} [isLazyInit] A value indicating whether this page should be lazily initialized. The default is false.
 */
WebF.app.view.Page = function (wfWindow, isLazyInit) {
    /**
     * @readonly
     */
    var _wfWindow = wfWindow;

    Object.defineProperty(this, 'wfWindow', {
        get: function () {
            return _wfWindow;
        },
        enumerable: true
    });

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _wfWindow.domHelper;
        },
        enumerable: true
    });

    /**
     * @private
     * @readonly
     */
    this._document = this.domHelper.getDocument();

    /**
     * @type {WebF.app.view.PageHead}
     */
    this.head = null;

    /**
     * @type {WebF.app.view.PageBody}
     */
    this.body = null;

    // <Events>

    this.initialized = new WebF.events.MultipleEventHandler();

    this.contentInitialized = new WebF.events.MultipleEventHandler();

    // </Events>

    /**
     * @private
     */
    this._disposed = false;

    /**
     * @private
     */
    this._isPreInitialized = false;

    /**
     * @private
     */
    this._isInitialized = false;

    /**
     * @private
     */
    this._isContentInitialized = false;

    this.visibility = new WebF.dom.PageVisibility(this.domHelper);

    /**
     * @private
     */
    this._isVisibleStart = this.visibility.isVisible();

    /**
     * @private
     */
    this._isLazyInitStarted = false;

    /**
     * @private
     * @type {function(Event)}
     */
    this._visibilityChangeHandler = null;


    this.preInitialize(isLazyInit);
};

/**
 * @protected
 * @virtual
 * @param {boolean} [isLazyInit] A value indicating whether this page should be lazily initialized. The default is false.
 */
WebF.app.view.Page.prototype.preInitialize = function (isLazyInit) {
    if (this._isPreInitialized) {
        return;
    }

    this.head = new WebF.app.view.PageHead(this);

    this.body = new WebF.app.view.PageBody(this);

    if (!isLazyInit || this._isVisibleStart) {
        this._isPreInitialized = true;
        this.initialize();
    }
    else {
        this._visibilityChangeHandler = this.onVisibilityChangeStart.bind(this);
        this._document.addEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        this._isLazyInitStarted = true;
        this._isPreInitialized = true;
    }
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.initialize = function () {
    if (this._isInitialized) {
        return;
    }

    if (this._isLazyInitStarted && this._visibilityChangeHandler) {
        this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
    }

    this._visibilityChangeHandler = this.onVisibilityChange.bind(this);
    this._document.addEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);





    this._isInitialized = true;

    this.onInitialized(new WebF.events.WFEvent(WebF.app.view.PageEventType.INITIALIZED, this));
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.initializeContent = function () {
    if (this._isContentInitialized) {
        return;
    }

    this._isContentInitialized = true;

    this.onContentInitialized(new WebF.events.WFEvent(WebF.app.view.PageEventType.CONTENT_INITIALIZED, this));
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isPreInitialized = function () {
    return this._isPreInitialized;
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isInitialized = function () {
    return this._isInitialized;
};

/**
 * @returns {boolean}
 */
WebF.app.view.Page.prototype.isContentInitialized = function () {
    return this._isContentInitialized;
};


/**
 * @returns {Element}
 */
WebF.app.view.Page.prototype.getContentElement = function () {
    return this.body.getContentElement();
};

/**
 * @param {Element} element
 */
WebF.app.view.Page.prototype.setContentElement = function (element) {
    this.body.setContentElement(element);
};

WebF.app.view.Page.prototype.isFocused = function () {
    return this._document.hasFocus();
};

WebF.app.view.Page.prototype.getTitle = function () {
    return this._document.title;
};

WebF.app.view.Page.prototype.setTitle = function (title) {
    this._document.title = title;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientWidth = function () {
    // readonly
    return this._document.clientWidth;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientHeight = function () {
    // readonly
    return this._document.clientHeight;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientLeft = function () {
    // readonly
    return this._document.clientLeft;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getClientTop = function () {
    // readonly
    return this._document.clientTop;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollWidth = function () {
    // readonly
    return this._document.scrollWidth;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollHeight = function () {
    // readonly
    return this._document.scrollHeight;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollLeft = function () {
    return this._document.scrollLeft;
};

/**
 * @param {number} value
 */
WebF.app.view.Page.prototype.setScrollLeft = function (value) {
    this._document.scrollLeft = value;
};

/**
 * @returns {number}
 */
WebF.app.view.Page.prototype.getScrollTop = function () {
    return this._document.scrollTop;
};

/**
 * @param {number} value
 */
WebF.app.view.Page.prototype.setScrollTop = function (value) {
    this._document.scrollTop = value;
};

/**
 * @returns {DOMRect|ClientRect} IE returns ClientRect.
 */
WebF.app.view.Page.prototype.getBoundingClientRect = function () {
    return this._document.documentElement.getBoundingClientRect();
};

/**
 * @returns {string} Document.domain.
 */
WebF.app.view.Page.prototype.getDomain = function () {
    return this._document.domain;
};





/**************************************************************************************
 * <Page NativeEventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 */
WebF.app.view.Page.prototype.onVisibilityChangeStart = function (e) {
    this.initialize();
};

 /**
  * @protected
  * @virtual
  */
WebF.app.view.Page.prototype.onVisibilityChange = function (e) {

};


/**************************************************************************************
 * </Page NativeEventHandlers>
 *************************************************************************************/

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.view.Page.prototype.onInitialized = function (e) {
    this.initialized.invoke(e);
};

/**
 * @protected
 * @virtual
 * @param {WebF.events.WFEvent} e
 */
WebF.app.view.Page.prototype.onContentInitialized = function (e) {
    this.contentInitialized.invoke(e);
};

/**
* @returns {boolean}
*/
WebF.app.view.Page.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.app.view.Page.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this.body) {
        this.body.setContentElement(null);
    }

    if (this._visibilityChangeHandler) {
        if (this._isInitialized) {
            this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        }
        else if (this._isLazyInitStarted) {
            this._document.removeEventListener(WebF.events.NativeEventType.VISIBILITYCHANGE, this._visibilityChangeHandler);
        }

        this._visibilityChangeHandler = null;
    }

    this.initialized.removeAllHandlers();
    this.contentInitialized.removeAllHandlers();
};
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

/**
 * @constructor
 * @implements {WebF.IDisposable}
 * @param {Window} win
 */
WebF.app.window.WFWindow = function (win) {
    /**
     * @private
     * @readonly
     */
    this._window = win || window;

    /**
     * @readonly
     */
    var _dom = new WebF.dom.DOMHelper(this._window.document);

    Object.defineProperty(this, 'domHelper', {
        get: function () {
            return _dom;
        },
        enumerable: true
    });

    /**
     * @type {WebF.app.view.Page}
     */
    this.page = null;

    /**
     * @private
     */
    this._disposed = false;
};

/**
 * @returns {Window}
 */
WebF.app.window.WFWindow.prototype.getWindow = function () {
    return this._window;
};

/**
 * @returns {Screen}
 */
WebF.app.window.WFWindow.prototype.getScreen = function () {
    return this._window.screen;
};

/**
 * @returns {number?}
 */
WebF.app.window.WFWindow.prototype.getDevicePixelRatio = function () {
    // IE >= 11
    if (typeof this._window.devicePixelRatio !== 'undefined') {
        return this._window.devicePixelRatio;
    }
    else if (typeof this._window.screen.deviceXDPI !== 'undefined') {
        // IE <= 10
        return (this._window.screen.deviceXDPI / this._window.screen.logicalXDPI);
    }

    return null;
};


/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getInnerWidth = function () {
    // readonly
    return this._window.innerWidth;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getInnerHeight = function () {
    // readonly
    return this._window.innerHeight;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getOuterWidth = function () {
    // readonly
    return this._window.outerWidth;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getOuterHeight = function () {
    // readonly
    return this._window.outerHeight;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getPageXOffset = function () {
    // readonly
    return this._window.pageXOffset;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getPageYOffset = function () {
    // readonly
    return this._window.pageYOffset;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenLeft = function () {
    // readonly
    return this._window.screenLeft;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenTop = function () {
    // readonly
    return this._window.screenTop;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenX = function () {
    // readonly
    return this._window.screenX;
};

/**
 * @returns {number}
 */
WebF.app.window.WFWindow.prototype.getScreenY = function () {
    // readonly
    return this._window.screenY;
};

/**
 * @param {number} x
 * @param {number} y
 */
WebF.app.window.WFWindow.prototype.scroll = function (x, y) {
    // scrollTo
    this._window.scroll(x, y);
};

/**
 * @param {number} value
 */
WebF.app.window.WFWindow.prototype.scrollByOnScreenPages = function (value) {
    // Firefox
    //window.scrollByPages

    this._window.scrollBy(0, this._window.innerHeight * value);
};

WebF.app.window.WFWindow.prototype.close = function () {
    this._window.close();
};

/**
 * @param {number} x
 * @param {number} y
 */
WebF.app.window.WFWindow.prototype.scrollBy = function (x, y) {
    this._window.scroll(x, y);
};



/**
* @returns {boolean}
*/
WebF.app.window.WFWindow.prototype.isDisposed = function () {
    return this._disposed;
};

/**
 * @virtual
 */
WebF.app.window.WFWindow.prototype.dispose = function () {
    if (this._disposed === true) {
        return;
    }

    this._disposed = true;

    if (this.page != null) {
        this.page.dispose();
    }
};