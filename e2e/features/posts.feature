Feature: Post Management
  As an authenticated user
  I want to manage posts on the platform
  So that I can share and interact with fashion content

  Background:
    Given I am logged in as "admin@fashion.com" with password "admin123"

  Scenario: View all posts
    When I request all posts
    Then the response status should be 200
    And the response should be a list of posts

  Scenario: Create a new post
    When I create a post with title "E2E Test Post" and image "https://example.com/test.jpg"
    Then the response status should be 201
    And the response should contain the post title "E2E Test Post"

  Scenario: Like a post
    Given there is an existing post
    When I like the post
    Then the response status should be 200
    And the post likes should be incremented

  Scenario: Share a post
    Given there is an existing post
    When I share the post
    Then the response status should be 200
    And the post shares should be incremented

  Scenario: Buy a post
    Given there is an existing post
    When I buy the post
    Then the response status should be 200
    And the post buys should be incremented
