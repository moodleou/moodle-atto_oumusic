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
 * Initialisation functions for OUMusic Atto editor plugin
 *
 * @package atto_oumusic
 * @copyright 2015 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Get the list of strings for this plugin.
 */
function atto_oumusic_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(
            array(
                    'insertcharacter'
            ),
            'atto_oumusic'
    );
}

/**
 * Return the js params required for this module.
 *
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_oumusic_params_for_js($elementid, $options, $fpoptions) {
    global $COURSE;
    $context = $options['context'];
    if (!$context) {
        $context = context_course::instance($COURSE->id);
    }

    $params['capability'] = has_capability('atto/oumusic:visible', $context);
    $params['metadata'] = atto_oumusic_get_character_map();

    return $params;
}

/**
 * Gets the character metadata array from the cache or rebuilds it if the character ranges admin setting has changed.
 *
 * @return array of character ranges and character information
 */
function atto_oumusic_get_character_map() {
    $allowedranges = explode(',', get_config('atto_oumusic', 'characterranges'));

    $cache = cache::make('atto_oumusic', 'character_metadata');
    $cachedmetadata = $cache->get(0);

    // If there is nothing in the cache or the character ranges admin setting has changed, update the cache
    if (!$cachedmetadata || $allowedranges !== array_keys($cachedmetadata)) {
        $cachedmetadata = atto_oumusic_build_character_map($allowedranges);
        $cache->set(0, $cachedmetadata);
    }

    return $cachedmetadata;
}

/**
 * Read in the metadata files and build an array with all characters sorted into character ranges with user-friendly names and
 * the html code for each character.
 *
 * The structure of the array is: [range name => [user-friendly range name, [[html character code, user-friendly character name], ...]]]
 *
 * @param array $allowedranges
 * @return array of character ranges and character information
 */
function atto_oumusic_build_character_map($allowedranges) {
    $metadata = array();

    $ranges = file_get_contents(__DIR__ . '/ranges.json');
    $glyphnames = file_get_contents(__DIR__ . '/glyphnames.json');

    $ranges = json_decode($ranges, true);
    $glyphnames = json_decode($glyphnames, true);

    foreach ($allowedranges as $rangename) {
        $codeandname = array();
        $range = $ranges[$rangename];
        $glyphs = $range['glyphs'];

        // don't include empty ranges
        if (empty($glyphs)) {
            continue;
        }

        foreach ($glyphs as $glyph) {
            $glyphentry = $glyphnames[$glyph];
            $resolvedglyphname = atto_oumusic_find_lang_string($glyph, $glyphentry['description']);
            $codeandname[] = array(str_replace('U+', '&#x', $glyphentry['codepoint'] . ';'), $resolvedglyphname);
        }

        $resolvedrangename = atto_oumusic_find_lang_string($rangename, $range['description']);
        $metadata[$rangename] = array($resolvedrangename, $codeandname);
    }

    return $metadata;
}

/**
 * Try to find a localised string. This is so we don't have to provide localised strings for all of the thousands of characters
 * unless it becomes necessary - if no localised string exists then we can just use the one from the metadata file.
 *
 * @param string $identifier The identifier of the string to search for
 * @param string $default The default string to use if the string is not found
 * @return string Return a localized string if one exists, otherwise returns the provided default.
 */
function atto_oumusic_find_lang_string($identifier, $default) {
    $sm = get_string_manager();
    if ($sm->string_exists($identifier, 'atto_oumusic')) {
        return get_string($identifier, 'atto_oumusic');
    }
    return $default;
}