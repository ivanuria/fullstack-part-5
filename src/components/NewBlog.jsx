import { useState } from 'react'
import blogService from '../services/blogs'
import FormRow from './FormRow'

const NewBlog = ({ addToBlogs, user }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  console.log({
    title,
    author,
    url
  })

  const addNewBlog = async (event) => {
    event.preventDefault()
    const savedBlog = await blogService.newBlog({
      title,
      author,
      url
    }, user)
    addToBlogs(savedBlog)
  }

  return (
    <div className='new-blog' style={ { marginBlock: '1rem' } }>
      <h2>Create new Blog</h2>
      <form className='new-blog__form' id='new-blog' onSubmit={ addNewBlog }>
        <FormRow>
          <label htmlFor='title'>Title: </label>
          <input id='title' value={ title } onChange={ (e) => setTitle(e.target.value ) } />
        </FormRow>
        <FormRow>
          <label htmlFor='author'>Author: </label>
          <input id='author' value={ author } onChange={ (e) => setAuthor(e.target.value ) } />
        </FormRow>
        <FormRow>
          <label htmlFor='url'>Url: </label>
          <input id='url' value={ url } onChange={ (e) => setUrl(e.target.value ) } type='url' />
        </FormRow>
        <input type='submit' value="Create new" />
      </form>
    </div>
  )
}

export default NewBlog