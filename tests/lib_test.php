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
 * Tests for the OU Music Atto plugin.
 *
 * @package atto_oumusic
 * @copyright 2019 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

global $CFG;
require_once($CFG->dirroot . '/lib/editor/atto/plugins/oumusic/lib.php');

/**
 * Tests for the OU Music Atto plugin.
 *
 * @copyright 2019 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class atto_oumusic_lib_testcase extends advanced_testcase {
    /**
     * Test the array returned by the atto_oumusic_get_character_map() function changes according to the character ranges admin
     * setting
     */
    public function test_atto_oumusic_get_character_map() {
        $this->resetAfterTest();

        set_config('characterranges', 'articulation', 'atto_oumusic');
        $result = atto_oumusic_get_character_map();
        $this->assertEquals(['articulation'], array_keys($result));

        set_config('characterranges', 'clefs', 'atto_oumusic');
        $result = atto_oumusic_get_character_map();
        $this->assertEquals(['clefs'], array_keys($result));
    }

    /**
     * Test the logic in the atto_oumusic_build_character_map() function
     */
    public function test_atto_oumusic_build_character_map() {
        $allowedranges = array('persianAccidentals', 'metallicStruckPercussionPictograms',
                'magratheanSagittalExtensionInsanePrecisionAccidentalDiacritics');
        // magratheanSagittalExtensionInsanePrecisionAccidentalDiacritics is empty so it should be skipped when creating the array
        $expected = array(
                                'persianAccidentals' => array('Persian accidentals',
                                                              array(['&#xE460;', 'Koron (quarter tone flat)'],
                                                                    ['&#xE461;', 'Sori (quarter tone sharp)'])),
                'metallicStruckPercussionPictograms' => array('Metallic struck percussion pictograms',
                                                              array(['&#xE700;', 'Triangle'],
                                                                    ['&#xE701;', 'Anvil']))
        );
        $result = atto_oumusic_build_character_map($allowedranges);

        $this->assertEquals($expected, $result);
    }

    /**
     * Test the logic in the atto_oumusic_find_lang_string() function
     */
    public function test_atto_oumusic_find_lang_string() {
        // test with an existing string
        $result = atto_oumusic_find_lang_string('pluginname', 'Definitely not the right string');
        $this->assertEquals(get_string('pluginname', 'atto_oumusic'), $result);

        // Test with a non-existent string
        $default = 'Definitelynotalangstring';
        $result = atto_oumusic_find_lang_string('Clearly a fake identifier', $default);
        $this->assertEquals($default, $result);
    }
}
