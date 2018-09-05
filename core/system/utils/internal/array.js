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

const arrayUtils = {};

/**
 * Copies a range of elements from an Array starting at the specified source index and pastes them to another Array starting at the specified destination index.
 * 
 * @param {Array<*>} sourceArray The Array that contains the data to copy.
 * @param {number} sourceIndex An integer that represents the index in the sourceArray at which copying begins.
 * @param {Array<*>} destinationArray The Array that receives the data.
 * @param {number} destinationIndex An integer that represents the index in the destinationArray at which storing begins.
 * @param {number} length An integer that represents the number of elements to copy.
 */
arrayUtils.copy = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
    for (var x = 0; x < length; x++) {
        destinationArray[destinationIndex++] = sourceArray[sourceIndex++];
    }
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {Object}
*/
arrayUtils.findByPropertyValue = function (array, propertyName, value) {
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
arrayUtils.findAllByPropertyValue = function (array, propertyName, value) {
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
arrayUtils.removeByPropertyValue = function (array, propertyName, value) {
    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] === value) {
            return this.removeAt(array, x);
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
arrayUtils.removeAllByPropertyValue = function (array, propertyName, value) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (item[propertyName] !== value) {
            continue;
        }

        var item2 = null;

        if ((item2 = this.removeAt(array, x)) == null) {
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
arrayUtils.remove = function (array, item) {
    var index = array.indexOf(item);

    if (index < 0) {
        return null;
    }

    return this.removeAt(array, index);
};

/**
* @param {Array<*>} array
* @param {number} index
* @returns {*}
*/
arrayUtils.removeAt = function (array, index) {
    var removed = array.splice(index, 1);

    return ((removed.length > 0) ? removed[0] : null);
};

/**
 * Adds the elements to the end of the Array.
 * 
 * @param {Array<*>} array The array to which elements are added.
 * @param {Array<*>} items Elements to add to the end of the array.
 */
arrayUtils.addRange = function (array, items) {
    if ((items == null) || (items.length < 1)) {
        return;
    }

    var itemCount = 32768;

    var length = items.length;

    if (length <= itemCount) {
        array.push.apply(array, items);
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
arrayUtils.insert = function (array, index, item) {
    array.splice(index, 0, item);
};

/**
 * Inserts the elements into the Array at the specified index.
 * 
 * @param {Array<*>} array The array into which elements are inserted.
 * @param {number} index The zero-based index at which the new elements should be inserted.
 * @param {Array<*>} items Elements to insert into the array.
 */
arrayUtils.insertRange = function (array, index, items) {
    if ((items == null) || (items.length < 1)) {
        return;
    }

    var itemCount = 32768;

    var length = items.length;

    var args;

    if (length <= itemCount) {
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
arrayUtils.clear = function (array) {
    //array.length = 0;
    array.splice(0, array.length);
};

/**
* @param {Array<Object>} array
* @param {string} propertyName
* @param {*} value
* @returns {boolean}
*/
arrayUtils.containsByPropertyValue = function (array, propertyName, value) {
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
arrayUtils.find = function (array, predicate) {
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
arrayUtils.findAll = function (array, predicate) {
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
arrayUtils.contains = function (array, item) {
    return (array.indexOf(item) >= 0);
};

/**
 * @param {Array<*>} array
 * @param {function(*): boolean} predicate
 * @returns {boolean}
 */
arrayUtils.exists = function (array, predicate) {
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
arrayUtils.removeAllIf = function (array, predicate) {
    var items = [];

    for (var x = 0; x < array.length; x++) {
        var item = array[x];

        if (predicate(item) !== true) {
            continue;
        }

        var item2 = null;

        if ((item2 = this.removeAt(array, x)) == null) {
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
arrayUtils.findIndex = function (array, predicate) {
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
arrayUtils.removeIf = function (array, predicate) {
    var index = this.findIndex(array, predicate);

    if (index < 0) {
        return null;
    }

    return this.removeAt(array, index);
};

module.exports = arrayUtils;