import { Given, When, Then } from '@cucumber/cucumber'
import { TestWorld } from '../support/world'
import assert from 'assert'

Given(
  'I am logged in as {string} with password {string}',
  async function (this: TestWorld, email: string, password: string) {
    // Register user (might already exist, that's ok)
    await this.api.post('/users/register', {
      email,
      password,
      name: 'E2E Post Tester',
    })

    // Login
    const loginResponse = await this.api.post('/users/login', { email, password })
    this.accessToken = loginResponse.data.accessToken
    this.userId = loginResponse.data.user?._id || null

    // Set auth header for subsequent requests
    this.api.defaults.headers.common['Authorization'] = `Bearer ${this.accessToken}`
  }
)

When('I request all posts', async function (this: TestWorld) {
  this.response = await this.api.get('/posts')
})

Then('the response should be a list of posts', function (this: TestWorld) {
  assert.ok(Array.isArray(this.response.data))
})

When(
  'I create a post with title {string} and image {string}',
  async function (this: TestWorld, title: string, imageUrl: string) {
    this.response = await this.api.post('/posts', {
      _id: `e2e-post-${Date.now()}`,
      title,
      description: 'E2E test post description',
      imageUrl,
      userId: this.userId,
    })
    if (this.response.data._id) {
      this.postId = this.response.data._id
    }
  }
)

Then('the response should contain the post title {string}', function (this: TestWorld, title: string) {
  assert.strictEqual(this.response.data.title, title)
})

Given('there is an existing post', async function (this: TestWorld) {
  const postId = `e2e-interact-${Date.now()}`
  const createRes = await this.api.post('/posts', {
    _id: postId,
    title: 'E2E Interaction Post',
    description: 'Post for interaction testing',
    imageUrl: 'https://example.com/interact.jpg',
    userId: this.userId,
  })
  this.postId = createRes.data._id
  this.previousLikes = createRes.data.likes || 0
  this.previousShares = createRes.data.shared || 0
  this.previousBuys = createRes.data.bought || 0
})

When('I like the post', async function (this: TestWorld) {
  this.response = await this.api.patch(`/posts/${this.postId}/like`)
})

Then('the post likes should be incremented', function (this: TestWorld) {
  assert.strictEqual(this.response.data.likes, this.previousLikes + 1)
})

When('I share the post', async function (this: TestWorld) {
  this.response = await this.api.patch(`/posts/${this.postId}/share`)
})

Then('the post shares should be incremented', function (this: TestWorld) {
  assert.strictEqual(this.response.data.shared, this.previousShares + 1)
})

When('I buy the post', async function (this: TestWorld) {
  this.response = await this.api.patch(`/posts/${this.postId}/buy`)
})

Then('the post buys should be incremented', function (this: TestWorld) {
  assert.strictEqual(this.response.data.bought, this.previousBuys + 1)
})
