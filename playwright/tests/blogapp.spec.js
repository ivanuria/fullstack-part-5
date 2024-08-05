const { test, describe, beforeEach, expect } = require('@playwright/test')
const helper = require('./helper')

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
      await helper.login(page, 'root', 'iamroot')

      expect(page.getByText('I AM ROOT logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await helper.login(page, 'groot', 'iamgroot')

      const notification = page.getByText('Invalid username and password')
      await notification.waitFor()
      expect(notification).toBeVisible()
      expect(notification).toHaveCSS('color', 'rgb(255, 0, 0)')
      expect(notification).toHaveCSS('border', '1px solid rgb(255, 0, 0)')
      await expect(page.getByText('I AM GROOT logged in')).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await helper.login(page, 'root', 'iamroot')
    })

    test('form is visible', async ({ page }) => {
      await page.getByText(/add new blog/i).click()
      await page.getByTestId('new-blog-form').waitFor()
      const form = page.getByTestId('new-blog-form')
      expect(form).toBeVisible()
      const title = form.getByTestId('new-blog-title')
      expect(title).toBeVisible()
      const author = form.getByTestId('new-blog-author')
      expect(author).toBeVisible()
      const url = form.getByTestId('new-blog-url')
      expect(url).toBeVisible()
      const submit = form.getByRole('button')
      expect(submit).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await helper.createBlog(
        page,
        'Always Remember Us this Way - Acoustic cover',
        'Plamina',
        'https://open.spotify.com/intl-es/track/4f9jwV8OMDxsLZWF1j7doA?si=435665b41b2b42eb'
      )

      const notification = page.locator('.notification').filter({ hasText: /Always Remember Us this Way - Acoustic cover/ })
      const blogListed = page.getByTestId('blog-item').filter({ hasText: /Always Remember Us this Way - Acoustic cover/ })
      await expect(notification).toBeVisible()
      await expect(blogListed).toBeVisible()
    })

    describe('When some Blogs exist', () => {
      beforeEach(async ({ page }) => {
        await helper.createBlog(
          page,
          'Always Remember Us this Way - Acoustic cover',
          'Plamina',
          'https://open.spotify.com/intl-es/track/4f9jwV8OMDxsLZWF1j7doA?si=435665b41b2b42eb'
        )
        await helper.createBlog(
          page,
          'Take on Me, Acoustic Lounge',
          'White Noon',
          'https://open.spotify.com/intl-es/track/5IBIYCwF7zbMifK7yJzJbw?si=705fed26988847d0'
        )
        await helper.createBlog(
          page,
          'Dreams - Acoustic',
          'Lusaint',
          'https://open.spotify.com/intl-es/track/5h4yGrTsP8frtJ080nxN5s?si=f68cc7e43e434a20'
        )
      })

      test('like is summing up', async ({ page }) => {
        const takeOnMe = page.getByTestId('blog-item').filter({ hasText: /Take on Me, Acoustic Lounge/ })
        await takeOnMe.getByRole('button').filter({ hasText: /view/i }).click()

        await expect(takeOnMe.getByText('Likes: 0')).toBeVisible()

        const likeButton = takeOnMe.getByRole('button').filter({ hasText: 'Like' })
        await likeButton.click()

        await expect(takeOnMe.getByText('Likes: 1')).toBeVisible()
      })

      test('deleting is possible', async ({ page }) => {
        const takeOnMe = page.getByTestId('blog-item').filter({ hasText: /Take on Me, Acoustic Lounge/ })
        await takeOnMe.getByRole('button').filter({ hasText: /view/i }).click()

        const deleteButton = takeOnMe.getByRole('button').filter({ hasText: /delete blog/i })

        page.on('dialog', dialog => dialog.accept())

        await deleteButton.click()

        await expect(takeOnMe).not.toBeVisible()
      })

      test('deleting is impossible for another user', async ({ page, request }) => {
        await page.getByRole('button').filter({ hasText: /logout/i }).click()

        await request.post('/api/users', {
          data: {
            username: 'jam',
            password: 'jamgoesinfridge',
            name: 'Jam Goes in Fridge'
          }
        })

        await helper.login(page, 'jam', 'jamgoesinfridge')
        await page.getByText(/logout/i).waitFor()
        await helper.createBlog(page, 'Right Here Waiting - Acoustic', 'Hailey Gardiner', 'https://open.spotify.com/intl-es/track/00exKzX8rf94Iekihx50ua?si=e5c19e76f72f4677')

        const blogs = page.getByTestId('blog-item').filter({ hasNotText: /Right Here Waiting - Acoustic/ })
        for (const item of await blogs.all()) {
          await item.getByText(/view/i).click()
          await expect(item.getByRole('button').filter({ hasText: /delete blog/i })).not.toBeVisible()
        }

        const newBlog = page.getByTestId('blog-item').filter({ hasText: /Right Here Waiting - Acoustic/ })
        await newBlog.getByText(/view/i).click()
        const deleteButton = newBlog.getByRole('button').filter({ hasText: /delete blog/i })
        await expect(deleteButton).toBeVisible()

        page.on('dialog', dialog => dialog.accept())
        await deleteButton.click()
        await expect(newBlog).not.toBeVisible()
      })

      test('arranged posts by likes', async ({ page }) => {
        const blogs = page.getByTestId('blog-item')
        let count = 1
        for (const item of await blogs.all()) {
          await item.getByText(/view/i).click()
          for (let i = 0; i < count; i++) {
            await item.getByRole('button').filter({ hasText: /like/i }).click()
          }
          count++
        }

        await page.getByRole('button').filter({ hasText: /sort blogs from highest to lowest/i }).click()
        let last
        for (const item of await blogs.all()) {
          const data = Number((await item.getByText(/^Likes:/).textContent()).replace('Likes: ', ''))
          if (last) {
            expect(data <= last).toBeTruthy()
          }
          last = data
        }

        await page.getByRole('button').filter({ hasText: /sort blogs from lowest to highest/i }).click()
        last = null
        for (const item of await blogs.all()) {
          const data = Number((await item.getByText(/^Likes:/).textContent()).replace('Likes: ', ''))
          if (last) {
            expect(data >= last).toBeTruthy()
          }
          last = data
        }
      })
    })
  })
})