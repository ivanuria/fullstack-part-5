import Togglable from './Togglable'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ username, blog, updateBlog, deleteBlog, ...props }) => {
  const [ likes, setLikes ] = useState(blog.likes)
  const [ thinking, setThinking ] = useState(false)

  const sumUpLikes = async () => {
    setThinking(true)
    await updateBlog(blog.id, { ...blog, likes: likes + 1 })
    setLikes( likes + 1 )
    setThinking(false)
  }
  return (
    <div style={ { padding: '1rem', border: '1px solid gray', borderRadius: '1rem', marginBlock: '1rem' } } { ...props } >
      <span className='blog__title-author' style={ { marginRight: '1ch' } } ><b>{ blog.title }</b> { blog.author }</span>
      <Togglable buttonLabel='View' reverse={ true }>
        <br />
        <a className='blog__url' href={ blog.url } target='_blank' rel="noreferrer">{ blog.url }</a>
        <br />
        <span className='blog__likes' style={ { marginRight: '1ch' } } >Likes: { likes }</span><button onClick={ sumUpLikes } disabled={ thinking }>Like</button>
        <br />
        {blog.user.name}
        <br />
        { username === blog.user.username ? <button className='blog__delete' onClick={ (e) => deleteBlog(blog.id) } style={ { marginBlock: '1rem' } }>Delete Blog</button> : null }
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  username: PropTypes.string.isRequired,
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog