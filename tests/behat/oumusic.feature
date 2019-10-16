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
