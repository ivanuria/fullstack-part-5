import { screen, render } from '@testing-library/react'
import NewBlog from './NewBlog'
import userEvent from '@testing-library/user-event'

test('Form is sent with correct data', async () => {
  const blog = {
    title: 'Wreaking Ball',
    author: 'Miley Cyrus + Dolly Parton',
    url: 'https://open.spotify.com/intl-es/track/1Fl4vSE3PegDGtkNL7JXNl?si=f33c8fd1b1ca47a4',
    likes: 69
  }
  const userData = {
    id: 'impossibleID',
    name: 'Impossible',
    username: 'impossible69'
  }
  const user = userEvent.setup()

  const addToBlogs = vi.fn()

  render(<NewBlog user={ userData } addToBlogs={ addToBlogs } data-testid='newblog' />)

  const element = screen.getByTestId('newblog')
  expect(element).toBeDefined()

  const title = element.querySelector('#title')
  expect(title).toBeDefined()

  const author = element.querySelector('#author')
  expect(author).toBeDefined()

  const url = element.querySelector('#url')
  expect(url).toBeDefined()

  const submit = element.querySelector('[type=\'submit\']')
  expect(submit).toBeDefined()

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(submit)

  console.log(addToBlogs.mock.calls)

  expect(addToBlogs.mock.calls[0][0]).toStrictEqual({
    title: 'Wreaking Ball',
    author: 'Miley Cyrus + Dolly Parton',
    url: 'https://open.spotify.com/intl-es/track/1Fl4vSE3PegDGtkNL7JXNl?si=f33c8fd1b1ca47a4',
    user: userData
    }
  )
})