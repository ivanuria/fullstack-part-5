const login = async (page, username, password) => {
  const form = page.getByTestId('loginform')
  const usr = form.getByTestId('username')
  const pwd = form.getByTestId('password')
  const button = form.getByRole('button')

  await usr.fill(username)
  await pwd.fill(password)
  await button.click()
}

const createBlog = async (page, title, author, url) => {
  const form = page.getByTestId('new-blog-form')
  await page.getByText(/add new blog/i).click()
  await page.getByTestId('new-blog-form').waitFor()
  const titleInput = form.getByTestId('new-blog-title')
  const authorInput = form.getByTestId('new-blog-author')
  const urlInput = form.getByTestId('new-blog-url')
  const submit = form.getByRole('button')

  await titleInput.fill(title)
  await authorInput.fill(author)
  await urlInput.fill(url)
  await submit.click()
}

module.exports = {
  login,
  createBlog
}