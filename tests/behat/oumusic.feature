@ou @ouvle @editor @editor_atto @atto @atto_oumusic @javascript
Feature: Atto oumusic button
  As a music student/tutor, I want a Music button in Atto so that I can easily add specific music notation content

  Background:
    Given I log in as "admin"
    And I follow "Preferences" in the user menu
    And I follow "Editor preferences"
    And I set the field "Text editor" to "Atto HTML editor"
    And I press "Save changes"
    And I set the following administration settings values:
      | Toolbar config | insert = oumusic |
    And I am on site homepage

  Scenario: Loading editor plugin
    Given I follow "Preferences" in the user menu
    And I follow "Edit profile"
    Then ".atto_oumusic_button" "css_element" should exist
    And "//button[@class='atto_oumusic_button']/img[contains(@src, 'music')]" "xpath_element" should exist
    And I click on "button.atto_oumusic_button" "css_element"
    Then I should see "Insert music character"

  Scenario: Insert music character
    Given I open my profile in edit mode
    When I click on "button.atto_oumusic_button" "css_element"
    And I click on "Dynamics" "link"
    And I click on "Forte" "button"
    Then I should see ""

    When I click on "button.atto_oumusic_button" "css_element"
    And I wait until ".atto_oumusic_library" "css_element" exists
    # Recent 'link' seems to get confused with Emoji Recent.
    And "//div[contains(@class, 'atto_oumusic_library')]//a[text()='Recent']" "xpath_element" should exist
    Then "Forte" "button" should exist

    Given I click on "Clefs" "link"
    And I click on "G clef" "button"
    When I click on "button.atto_oumusic_button" "css_element"
    Then "G clef" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And "Forte" "button" should exist in the "#atto_oumusic_group_recent" "css_element"

    Given I click on "Octaves" "link"
    Then I click on "Ottava" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Forte" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Beamed groups of notes" "link"
    And I click on "Black note, long stem" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Bar repeats" "link"
    And I click on "Repeat last four bars" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Octaves supplement" "link"
    And I click on "Loco" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Standard accidentals" "link"
    And I click on "Sharp sharp" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Standard accidentals" "link"
    And I click on "Triple flat" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Holds and pauses" "link"
    And I click on "Fermata below" "button"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Bar repeats" "link"
    And I click on "Repeat last four bars" "button" in the "#id_description_editor_atto_oumusic_group_barRepeats" "css_element"

    And I click on "button.atto_oumusic_button" "css_element"
    And I click on "Time signatures" "link"
    And I click on "Time signature 4" "button"

    When I click on "button.atto_oumusic_button" "css_element"
    Then "//div[contains(@class, 'atto_oumusic_library')]//a[text()='Recent']" "xpath_element" should exist
    And  "Time signature 4" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Repeat last four bars" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Fermata below" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Triple flat" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Sharp sharp" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Loco" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Black note, long stem" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Forte" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Ottava" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "G clef" "button" should exist in the "#atto_oumusic_group_recent" "css_element"

    When I click on "Keyboard techniques" "link"
    And I click on "Pedal mark" "button"
    And I click on "button.atto_oumusic_button" "css_element"
    Then "//div[contains(@class, 'atto_oumusic_library')]//a[text()='Recent']" "xpath_element" should exist
    And   "Pedal mark" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Time signature 4" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Repeat last four bars" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Fermata below" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Triple flat" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Sharp sharp" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Loco" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Black note, long stem" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Forte" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Ottava" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And "G clef" "button" should not exist in the "#atto_oumusic_group_recent" "css_element"

    When I click on "Forte" "button"
    Then I should see ""
    When I click on "button.atto_oumusic_button" "css_element"
    Then  "Forte" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And "Ottava" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Black note, long stem" "button" should exist in the "#atto_oumusic_group_recent" "css_element"

    Given I click on "Clefs" "link"
    And I click on "Combining C clef" "button"
    When I click on "button.atto_oumusic_button" "css_element"
    Then "Combining C clef" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And "Forte" "button" should exist in the "#atto_oumusic_group_recent" "css_element"
    And "Ottava" "button" should not exist in the "#atto_oumusic_group_recent" "css_element"
    And  "Black note, long stem" "button" should exist in the "#atto_oumusic_group_recent" "css_element"

  Scenario: Loading oumusic button with capability
    Given the following "roles" exist:
      | name        | shortname | description     | archetype |
      | Music Exile | nomusic   | Can't see music |           |
    And the following "users" exist:
      | username | firstname | lastname | email              |
      | exile1   | exile     | 1        | exile1@example.com |
    And the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | 0        |
    And the following "course enrolments" exist:
      | user   | course | role    |
      | exile1 | C1     | nomusic |
    And I follow "Preferences" in the user menu
    And I follow "Edit profile"
    Then ".atto_oumusic_button" "css_element" should exist
    And I click on ".atto_oumusic_button" "css_element"
    And I should see "Insert music character"
    And I am on homepage
    And I log out
    When I log in as "exile1"
    And I follow "Preferences" in the user menu
    And I follow "Edit profile"
    Then ".atto_oumusic_button" "css_element" should not exist

  Scenario: Changing selected ranges
    Given I set the following administration settings values:
      | characterranges | articulation |
    And I am on site homepage
    And I open my profile in edit mode
    When I click on "button.atto_oumusic_button" "css_element"
    Then I should see "Articulation"
    And I should not see "Dynamics"

  Scenario: Check edit page
    Given the following "courses" exist:
      | fullname | shortname | category |
      | Course 1 | C1        | 0        |
    And I am on "Course 1" course homepage
    And I turn editing mode on
    And I add a "page" to section "1"
    Then ".atto_oumusic_button" "css_element" should exist
    And I click on ".atto_oumusic_button" "css_element"
    And I should see "Insert music character"
