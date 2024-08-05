const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('BlogApp', () => {
  beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.locator('body').waitFor()
  })

  test('Login form is shown', async ({ page }) => {
    const form = page.getByTestId('loginform')
    expect(form).toBeDefined()

    const username = form.getByTestId('username')
    expect(username).toBeDefined()

    const pwd = form.getByTestId('password')
    expect(pwd).toBeDefined()
  })
})