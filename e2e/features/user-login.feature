Feature: User Login
  As a registered user
  I want to log in to the platform
  So that I can access protected features

  Scenario: Successful login with valid admin credentials
    When I login with email "admin@fashion.com" and password "admin123"
    Then the response status should be 200
    And the response should contain an access token
    And the response should contain a refresh token
    And the response should contain user information

  Scenario: Login fails with wrong password
    When I login with email "admin@fashion.com" and password "wrongpassword"
    Then the response status should be 401
    And the response should contain error "Invalid email or password"

  Scenario: Login fails with non-existent email
    When I login with email "nonexistent_e2e@fashion.com" and password "anypassword"
    Then the response status should be 401
