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
 * @extends {WebF.ui.Control}
 * @param {WebF.dom.DOMHelper} domHelper
 */
PW.ui.PageFooter = function (domHelper) {
    WebF.ui.Control.call(this, domHelper);
};

PW.ui.PageFooter.prototype = Object.create(WebF.ui.Control.prototype);
PW.ui.PageFooter.prototype.constructor = PW.ui.PageFooter;

/**
 * @protected
 * @override
 */
PW.ui.PageFooter.prototype.onApply = function () {
    WebF.ui.Control.prototype.onApply.call(this);
};

/**
 * @override
 * @param {Element} element
 * @returns {boolean}
 */
PW.ui.PageFooter.prototype.canApply = function (element) {
    var dom = this.getDOMHelper();

    if (!dom.isElement(element) || !WebF.dom.classList.contains(element, PW.ui.PageFooterCSSClassName.PAGE_FOOTER)) {
        return false;
    }

    return true;
};

/**
 * @override
 */
PW.ui.PageFooter.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    WebF.ui.Control.prototype.dispose.call(this);
};