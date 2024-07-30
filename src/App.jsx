import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()

  useEffect(() => {
    if (!user) return
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    getBlogs()
  }, [user])

  const checkLogin = () => {
    if (user) {
      return (
        <>
        <p><b>{user.name}</b> logged in</p>
        { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />) }
        </>
      )
    }
    return <Login setUser={setUser} />
  }

  return (
    <div>
      <h2>Blogs app</h2>
      { checkLogin() }
    </div>
  )
}

export default App