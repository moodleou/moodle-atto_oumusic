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
 * Administration settings lib - lazy loading of option values.
 * @package atto_oumusic
 * @copyright 2019 The Open University
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

class oumusic_admin_setting_configmultiselect_ranges extends admin_setting_configmultiselect {
    public function load_choices() {
        $rangesdata = file_get_contents(__DIR__ . '/ranges.json');
        $rangesdata = json_decode($rangesdata, true);
        $ranges = array();

        foreach ($rangesdata as $key => $value) {
            $ranges[$key] = $value['description'];
        }

        $this->choices = $ranges;
        return true;
    }
}
