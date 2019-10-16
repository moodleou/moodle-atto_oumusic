<?php
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
 * Settings that allow configuration of the list of symbols in the music editor.
 *
 * Based on atto_chemistry
 *
 * @package atto_oumusic
 * @copyright 2019 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot . '/lib/editor/atto/plugins/oumusic/settingslib.php');

$ADMIN->add('editoratto', new admin_category('atto_oumusic', new lang_string('pluginname', 'atto_oumusic')));

$settings = new admin_settingpage('atto_oumusic_settings', new lang_string('settings', 'atto_oumusic'));
if ($ADMIN->fulltree) {
    $name = new lang_string('characterranges', 'atto_oumusic');
    $desc = new lang_string('characterranges_desc', 'atto_oumusic');
    $default =
            array(
                    'articulation',
                    'barRepeats',
                    'beamedGroupsOfNotes',
                    'clefs',
                    'commonOrnaments',
                    'dynamics',
                    'holdsAndPauses',
                    'keyboardTechniques',
                    'octaves',
                    'octavesSupplement',
                    'repeats',
                    'rests',
                    'individualNotes',
                    'standardAccidentals12Edo',
                    'standardAccidentalsChordSymbols',
                    'stringTechniques',
                    'timeSignatures'
            );

    $settings->add(new oumusic_admin_setting_configmultiselect_ranges('atto_oumusic/characterranges',
            $name,
            $desc,
            $default,
            null));

}
