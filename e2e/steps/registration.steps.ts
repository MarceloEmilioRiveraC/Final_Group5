import { Given, When, Then } from '@cucumber/cucumber'
import { TestWorld } from '../support/world'
import assert from 'assert'

Given('I am a new user', function (this: TestWorld) {
  // No setup needed
})

When(
  'I register with email {string}, password {string}, and name {string}',
  async function (this: TestWorld, email: string, password: string, name: string) {
    this.response = await this.api.post('/users/register', {
      email,
      password,
      name,
    })
  }
)

Then('the response status should be {int}', function (this: TestWorld, statusCode: number) {
  assert.strictEqual(this.response.status, statusCode)
})

Then('the response should contain a success message', function (this: TestWorld) {
  assert.ok(this.response.data.message)
})

Then('the response should contain error {string}', function (this: TestWorld, errorMsg: string) {
  assert.strictEqual(this.response.data.message, errorMsg)
})
