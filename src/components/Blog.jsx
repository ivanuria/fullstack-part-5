import Togglable from "./Togglable"
import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [ likes, setLikes ] = useState(blog.likes)
  const [ thinking, setThinking ] = useState(false)

  const sumUpLikes = async () => {
    setThinking(true)
    await updateBlog(blog.id, {...blog, likes: likes + 1 })
    setLikes( likes + 1 )
    setThinking(false)
  }

  return (
    <div style={ { padding: '1rem', border: '1px solid gray', borderRadius: '1rem', marginBlock: '1rem' } }>
      <span style={ { marginRight: '1ch' } } ><b>{ blog.title }</b> { blog.author }</span>
      <Togglable buttonLabel='View' reverse={ true }>
        <br />
        <a href={ blog.url } target='_blank'>{ blog.url }</a>
        <br />
        <span style={ { marginRight: '1ch' } } >Likes: { likes }</span><button onClick={ sumUpLikes } disabled={ thinking }>Like</button>
        <br />
        {blog.user.name}
      </Togglable>
    </div>
  )
}

export default Blog