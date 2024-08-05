import { useState } from 'react'
import FormRow from './FormRow'
import PropTypes from 'prop-types'

const NewBlog = ({ addToBlogs, user, ...props }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  console.log({
    title,
    author,
    url
  })

  const addNewBlog = async (event) => {
    console.log('AddNewBlog')
    event.preventDefault()
    addToBlogs({
      title,
      author,
      url,
      user
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className='new-blog' style={ { marginBlock: '1rem' } } data-testid='new-blog' { ...props }>
      <h2>Create new Blog</h2>
      <form className='new-blog__form' id='new-blog' onSubmit={ addNewBlog } data-testid='new-blog-form'>
        <FormRow>
          <label htmlFor='title'>Title: </label>
          <input id='title' value={ title } onChange={ (e) => setTitle(e.target.value ) } data-testid='new-blog-title'/>
        </FormRow>
        <FormRow>
          <label htmlFor='author'>Author: </label>
          <input id='author' value={ author } onChange={ (e) => setAuthor(e.target.value ) } data-testid='new-blog-author'/>
        </FormRow>
        <FormRow>
          <label htmlFor='url'>Url: </label>
          <input id='url' value={ url } onChange={ (e) => setUrl(e.target.value ) } type='url' data-testid='new-blog-url'/>
        </FormRow>
        <input type='submit' value="Create new" />
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  addToBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default NewBlog