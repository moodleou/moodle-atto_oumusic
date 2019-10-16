YUI.add('moodle-atto_oumusic-button', function (Y, NAME) {

// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * OU Musical Symbol editor plugin for Atto editor
 *
 * Based on atto_chemistry
 *
 * @package atto_oumusic
 * @copyright 2019 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

var COMPONENTNAME = 'atto_oumusic',
    CSS = {
        CHARACTER: COMPONENTNAME + '_character',
        LIBRARY: COMPONENTNAME + '_library',
        LIBRARY_GROUPS: COMPONENTNAME + '_groups',
        LIBRARY_GROUP_PREFIX: COMPONENTNAME + '_group',
        WRAPPER: COMPONENTNAME + '_wrapper'
    },
    SELECTORS = {
        LIBRARY: '.' + CSS.LIBRARY,
        LIBRARY_GROUP: '.' + CSS.LIBRARY_GROUPS + ' > div > div',
        LIBRARY_BUTTON: 'button'
    },
    TEMPLATES = {
        LIBRARY: '' +
            '<div class="{{CSS.LIBRARY}}">' +
                '<ul>' +
                    '{{#each library}}' +
                        '<li><a aria-label="{{this.[0]}}" ' +
                        'title="{{this.[0]}}" ' +
                        'href="#{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}">' +
                            '{{this.[0]}}' +
                        '</a></li>' +
                    '{{/each}}' +
                '</ul>' +
                '<div class="{{CSS.LIBRARY_GROUPS}}">' +
                    '{{#each library}}' +
                        '<div id="{{../elementid}}_{{../CSS.LIBRARY_GROUP_PREFIX}}_{{@key}}">' +
                            '<div role="toolbar">' +
                                '{{#each this.[1]}}' +
                                    '<button class="btn btn-secondary btn-sm {{../../CSS.CHARACTER}}"' +
                                    'tabindex="-1" ' +
                                    'aria-label="{{this.[1]}}" ' +
                                    'title="{{this.[1]}}"' +
                                    'data-character="{{this.[0]}}">' +
                                        '{{{this.[0]}}}' +
                                    '</button>' +
                                '{{/each}}' +
                            '</div>' +
                        '</div>' +
                    '{{/each}}' +
                '</div>' +
            '</div>'
    };

/**
 * OU Musical Symbol Editor
 *
 * @namespace M.atto_oumusic
 * @class Button
 * @extends M.editor_atto.EditorPlugin
 */

Y.namespace('M.atto_oumusic').Button = Y.Base.create('button', Y.M.editor_atto.EditorPlugin, [], {
    /**
     * A reference to the current selection at the time that the dialogue
     * was opened.
     *
     * @property _currentSelection
     * @type Range
     * @private
     */
    _currentSelection: null,

    /**
     * A reference to the tab focus set on each group.
     *
     * The keys are the IDs of the group, the value is the Node on which the focus is set.
     *
     * @property _groupFocus
     * @type Object
     * @private
     */
    _groupFocus: null,

    initializer: function () {
        if (!this.get('capability')) {
            return;
        }
        this.addButton({
            icon: 'icon',
            iconComponent: COMPONENTNAME,
            callback: this._displayDialogue
        });
        this._groupFocus = {};

        var host = this.get('host');

        // Highlight button.
        host.on('atto:selectionchanged', function(e) {
            Y.soon(Y.bind(function(e) {
                if (host.selectionFilterMatches('span[class*="' + CSS.WRAPPER + '"]', e.selectedNodes, false)) {
                    this.highlightButtons();
                } else {
                    this.unHighlightButtons();
                }
            }, this, e));
        }, this);
    },

    /**
     * Display the Character Map selector.
     *
     * @method _displayDialogue
     * @private
     */
    _displayDialogue: function () {
        // Store the current selection.
        this._currentSelection = this.get('host').getSelection();
        if (this._currentSelection === false) {
            return;
        }

        var dialogue = this.getDialogue({
            headerContent: M.util.get_string('insertcharacter', COMPONENTNAME),
            focusAfterHide: true,
            width: 550
        }, true);

        var content = this._getDialogueContent();
        dialogue.set('bodyContent', content);

        var tabview = new Y.TabView({
            srcNode: content
        });

        tabview.render();
        dialogue.show();
        // Trigger any JS filters to reprocess the new nodes.
        Y.fire(M.core.event.FILTER_CONTENT_UPDATED, {nodes: (new Y.NodeList(dialogue.get('boundingBox')))});
    },

    /**
     * Return the dialogue content for the tool.
     *
     * @method _getDialogueContent
     * @private
     * @return {Node} The content to place in the dialogue.
     */
    _getDialogueContent: function () {
        var template = Y.Handlebars.compile(TEMPLATES.LIBRARY);

        var content = Y.Node.create(template({
            elementid: this.get('host').get('elementid'),
            component: COMPONENTNAME,
            library: this.get('metadata'),
            CSS: CSS
        }));

        // Sets the default focus.
        content.all(SELECTORS.LIBRARY_GROUP).each(function(group) {
            // The first button gets the focus.
            this._setGroupTabFocus(group, group.one('button'));
            // Sometimes the filter adds an anchor in the button, no tabindex on that.
            group.all('button a').setAttribute('tabindex', '-1');
        }, this);

        // Keyboard navigation in groups.
        content.delegate('key', this._groupNavigation, 'down:37,39', SELECTORS.LIBRARY_BUTTON, this);

        content.delegate('click', this._insertChar, '.' + CSS.CHARACTER, this);
        return content;
    },

    /**
     * Insert the picked character into the editor.
     *
     * @method _insertChar
     * @param {EventFacade} e
     * @private
     */
    _insertChar: function (e) {
        var character = e.target.getData('character');
        var wrapper = '<span class="' + CSS.WRAPPER + '">' + character + '</span>';

        // Hide the dialogue.
        this.getDialogue({
            focusAfterHide: null
        }).hide();

        var host = this.get('host');

        // Focus on the last point.
        host.setSelection(this._currentSelection);

        // And add the character.
        host.insertContentAtFocusPoint(wrapper);

        // And mark the text area as updated.
        this.markUpdated();
    },

    /**
     * Callback handling the keyboard navigation in the groups of the library.
     *
     * @param {EventFacade} e The event.
     * @method _groupNavigation
     * @private
     */
    _groupNavigation: function(e) {
        e.preventDefault();

        var current = e.currentTarget,
            parent = current.get('parentNode'), // This must be the <div> containing all the buttons of the group.
            buttons = parent.all('button'),
            direction = e.keyCode !== 37 ? 1 : -1,
            index = buttons.indexOf(current),
            nextButton;

        if (index < 0) {
            index = 0;
        }

        index += direction;
        if (index < 0) {
            index = buttons.size() - 1;
        } else if (index >= buttons.size()) {
            index = 0;
        }
        nextButton = buttons.item(index);

        this._setGroupTabFocus(parent, nextButton);
        nextButton.focus();
    },

    /**
     * Sets tab focus for the group.
     *
     * @method _setGroupTabFocus
     * @param {Node} button The node that focus should now be set to.
     * @private
     */
    _setGroupTabFocus: function(parent, button) {
        var parentId = parent.generateID();

        // Unset the previous entry.
        if (typeof this._groupFocus[parentId] !== 'undefined') {
            this._groupFocus[parentId].setAttribute('tabindex', '-1');
        }

        // Set on the new entry.
        this._groupFocus[parentId] = button;
        button.setAttribute('tabindex', 0);
        parent.setAttribute('aria-activedescendant', button.generateID());
    },

}, {
    ATTRS: {
        capability: {
            value: false
        },
        metadata: {}
    }
});

}, '@VERSION@', {"requires": ["moodle-editor_atto-plugin", "moodle-core-event", "tabview"]});
