import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Wreaking Ball',
  author: 'Miley Cyrus + Dolly Parton',
  url: 'https://open.spotify.com/intl-es/track/1Fl4vSE3PegDGtkNL7JXNl?si=f33c8fd1b1ca47a4',
  likes: 69,
  user: {
    id: 'impossibleID',
    name: 'Impossible',
    username: 'impossible69'
  }
}

describe('<Blog />', () => {
  test('first only renders title and author', () => {

    render(<Blog username='root' blog={ blog } updateBlog={ () => null } deleteBlog={ () => null } data-testid='blog' />)

    const element = screen.getByTestId('blog')
    expect(element).toBeDefined()

    const title = element.querySelector('.blog__title-author')
    expect(title).toBeDefined()

    const titleText = screen.getByText('Wreaking Ball', { exact: false })
    expect(titleText).toBeDefined()

    const authorText = screen.getByText('Miley Cyrus + Dolly Parton', { exact: false })
    expect(authorText).toBeDefined()

    const url = element.querySelector('.blog__url')
    expect(url).toBe(null)

    const likes = element.querySelector('.blog__likes')
    expect(likes).toBe(null)

    const likesButton = element.querySelector('.blog__likes-button')
    expect(likesButton).toBe(null)

    const deleteButton = element.querySelector('.blog__delete')
    expect(deleteButton).toBe(null)

    const openButton = element.querySelector('.togglable__open-button')
    expect(openButton).toBeDefined()

    const closeButton = element.querySelector('.togglable__close-button')
    expect(closeButton).toBe(null)
  })

  test('when click on show button shows url and likes', async () => {
    const user = userEvent.setup()

    render(<Blog username='root' blog={ blog } updateBlog={ () => null } deleteBlog={ () => null } data-testid='blog' />)

    const element = screen.getByTestId('blog')

    const openButton = element.querySelector('.togglable__open-button')
    expect(openButton).toBeDefined()

    await user.click(openButton)

    expect(element).toBeDefined()

    const title = element.querySelector('.blog__title-author')
    expect(title).toBeDefined()

    const url = element.querySelector('.blog__url')
    expect(url).toBeDefined()

    const urlText = screen.getByText('https://open.spotify.com/intl-es/track/1Fl4vSE3PegDGtkNL7JXNl?si=f33c8fd1b1ca47a4')
    expect(urlText).toBeDefined()

    const likes = element.querySelector('.blog__likes')
    expect(likes).toBeDefined()

    const likesText = screen.getByText('69', { exact: false })
    expect(likesText).toBeDefined()

    const likesButton = element.querySelector('.blog__likes-button')
    expect(likesButton).toBeDefined()

    const deleteButton = element.querySelector('.blog__delete')
    expect(deleteButton).toBeDefined()

    const closeButton = element.querySelector('.togglable__close-button')
    expect(closeButton).toBeDefined()

  })
  test('when click on likes twice 2 clicks are received', async () => {
    const user = userEvent.setup()

    const updateBlog = vi.fn()

    render(<Blog username='root' blog={ blog } updateBlog={ updateBlog } deleteBlog={ () => null } data-testid='blog' />)

    const element = screen.getByTestId('blog')

    const openButton = element.querySelector('.togglable__open-button')
    expect(openButton).toBeDefined()

    await user.click(openButton)

    const likesButton = element.querySelector('.blog__likes-button')
    expect(likesButton).toBeDefined()

    await user.click(likesButton)
    await user.click(likesButton)

    expect(updateBlog.mock.calls).toHaveLength(2)
  })

})