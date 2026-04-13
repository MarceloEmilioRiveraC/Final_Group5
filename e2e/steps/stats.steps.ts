import { When, Then } from '@cucumber/cucumber'
import { TestWorld } from '../support/world'
import assert from 'assert'

When('I request the platform statistics', async function (this: TestWorld) {
  this.response = await this.api.get('/stats')
})

Then('the stats should contain total posts count', function (this: TestWorld) {
  assert.strictEqual(typeof this.response.data.totalPosts, 'number')
})

Then('the stats should contain total users count', function (this: TestWorld) {
  assert.strictEqual(typeof this.response.data.totalUsers, 'number')
})

Then('the stats should contain total likes count', function (this: TestWorld) {
  assert.strictEqual(typeof this.response.data.totalLikes, 'number')
})

Then('the stats should contain posts per month data', function (this: TestWorld) {
  assert.ok(Array.isArray(this.response.data.postsPerMonth))
})
