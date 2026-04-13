import { When, Then } from '@cucumber/cucumber'
import { TestWorld } from '../support/world'
import assert from 'assert'

When(
  'I login with email {string} and password {string}',
  async function (this: TestWorld, email: string, password: string) {
    this.response = await this.api.post('/users/login', { email, password })
    if (this.response.data.accessToken) {
      this.accessToken = this.response.data.accessToken
      this.refreshToken = this.response.data.refreshToken
    }
  }
)

Then('the response should contain an access token', function (this: TestWorld) {
  assert.ok(this.response.data.accessToken)
  assert.strictEqual(typeof this.response.data.accessToken, 'string')
})

Then('the response should contain a refresh token', function (this: TestWorld) {
  assert.ok(this.response.data.refreshToken)
  assert.strictEqual(typeof this.response.data.refreshToken, 'string')
})

Then('the response should contain user information', function (this: TestWorld) {
  assert.ok(this.response.data.user)
  assert.ok(this.response.data.user.email)
  assert.ok(this.response.data.user.name)
  assert.ok(this.response.data.user.role)
})
