Feature: Platform Statistics
  As a platform user
  I want to view platform statistics
  So that I can understand platform activity and engagement

  Scenario: View platform statistics
    When I request the platform statistics
    Then the response status should be 200
    And the stats should contain total posts count
    And the stats should contain total users count
    And the stats should contain total likes count
    And the stats should contain posts per month data
