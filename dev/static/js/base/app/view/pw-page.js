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
 * @extends {WebF.app.view.Page}
 * @param {WebF.app.window.WFWindow} wfWindow
 * @param {boolean} [isLazyInit] A value indicating whether this page should be lazily initialized. The default is false.
 */
PW.app.view.PWPage = function (wfWindow, isLazyInit) {
    WebF.app.view.Page.call(this, wfWindow, isLazyInit);

    /**
     * @private
     * @type {PW.ui.PageContent}
     */
    this._content = new PW.ui.PageContent(this.domHelper);

    Object.defineProperty(this, 'content', {
        /**
         * @returns {PW.ui.PageContent}
         */
        get: function () {
            return this._content;
        },
        /**
         * @param {PW.ui.PageContent} value
         */
        set: function (value) {
            if (this._content === value) {
                return;
            }

            if (this._content) {
                this._content.dispose();
            }

            this._content = value;
        },
        enumerable: true
    });

};

PW.app.view.PWPage.prototype = Object.create(WebF.app.view.Page.prototype);
PW.app.view.PWPage.prototype.constructor = PW.app.view.PWPage;

/**
 * @override
 */
PW.app.view.PWPage.prototype.initializeContent = function () {
    if (this.isContentInitialized()) {
        return;
    }

    var dom = this.domHelper;
    var elem = dom.getElementByClassName(dom.getDocument().body, PW.ui.PageContentCSSClassName.PAGE_CONTENT, 0);

    if (!elem) {
        throw new Error('Element "PageContent" not found.');
    }

    this.setContentElement(elem);
    this.content.apply(elem);

    WebF.app.view.Page.prototype.initializeContent.call(this);
};

/**
 * @override
 */
PW.app.view.PWPage.prototype.dispose = function () {
    if (this.isDisposed()) {
        return;
    }

    this._content.dispose();

    WebF.app.view.Page.prototype.dispose.call(this);
};