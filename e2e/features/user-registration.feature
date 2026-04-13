Feature: User Registration
  As a new user
  I want to register for an account
  So that I can access the fashion community platform

  Scenario: Registration validates required fields
    Given I am a new user
    When I register with email "incomplete@fashion.com", password "", and name ""
    Then the response status should be 400
    And the response should contain error "Email, password, and name are required"

  Scenario: Registration rejects duplicate email
    When I register with email "admin@fashion.com", password "testpass123", and name "Duplicate"
    Then the response status should be 400
