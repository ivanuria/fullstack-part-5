const login = async (page, username, password) => {
  const form = page.getByTestId('loginform')
  const usr = form.getByTestId('username')
  const pwd = form.getByTestId('password')
  const button = form.getByRole('button')

  await usr.fill(username)
  await pwd.fill(password)
  await button.click()
}

module.exports = {
  login
}