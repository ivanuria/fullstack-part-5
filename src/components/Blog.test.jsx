import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  test('first only renders title and author', () => {
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

    render(<Blog username='root' blog={ blog } updateBlog={ () => null } deleteBlog={ () => null } data-testid='blog' />)

    screen.debug()

    const element = screen.getByTestId('blog')
    expect(element).toBeDefined()

    const title = element.querySelector('.blog__title-author')
    expect(title).toBeDefined()

    const url = element.querySelector('.blog__url')
    expect(url).toBe(null)

    const likes = element.querySelector('.blog__likes')
    expect(likes).toBe(null)

    const deleteButton = element.querySelector('.blog__delete')
    expect(deleteButton).toBe(null)

    const openButton = element.querySelector('.togglable__open-button')
    expect(openButton).toBeDefined()

    const closeButton = element.querySelector('.togglable__close-button')
    expect(closeButton).toBeDefined()
  })
})