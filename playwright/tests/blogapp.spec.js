const { test, describe, beforeEach, expect } = require('@playwright/test')

describe('BlogApp', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        username: 'root',
        password: 'iamroot',
        name: 'I AM ROOT'
      }
    })
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

    const button = form.getByRole('button')
    expect(button).toBeDefined()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      const form = page.getByTestId('loginform')
      const username = form.getByTestId('username')
      const pwd = form.getByTestId('password')
      const button = form.getByRole('button')

      await username.fill('root')
      await pwd.fill('iamroot')
      await button.click()

      expect(page.getByText('I AM ROOT logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      const form = page.getByTestId('loginform')
      const username = form.getByTestId('username')
      const pwd = form.getByTestId('password')
      const button = form.getByRole('button')

      await username.fill('groot')
      await pwd.fill('iamgroot')
      await button.click()

      const notification = page.getByText('Invalid username and password')
      await notification.waitFor()
      expect(notification).toBeVisible()
      expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
      expect(notification).toHaveCSS('border', '1px solid rgb(255, 0, 0)')
      expect(page.getByText('I AM GROOT logged in')).not.toBeVisible()
    })
  })
})