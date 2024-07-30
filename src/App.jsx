import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import blogService from './services/blogs'
import Notification from './components/Notification.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [notification, setNotification] = useState({
    message: '',
    level: 'info'
  })

  console.log("Notification", notification)

  useEffect(() => {
    const lsUser = window.localStorage.getItem('bau')
    if (lsUser) {
      setUser(JSON.parse(lsUser))
    }
  }, [])

  useEffect(() => {
    if (!user) return
    const getBlogs = async () => {
      let blogs = await blogService.getAll()
      setBlogs( blogs )
    }
    getBlogs()
  }, [user])


  const logout = () => {
    window.localStorage.removeItem('bau')
    setNotification({
      message: 'Correctly Logged Out',
      level: 'info'
    })
    setUser(null)
  }

  const addToblogs = (newBlog) => {
    setBlogs([...blogs, newBlog])
  }

  const checkLogin = () => {
    if (user) {
      return (
        <>
        <p><b>{user.name}</b> logged in <button style={ { marginLeft:'1ch' } } onClick={ logout }>Logout</button></p>
        <NewBlog addToBlogs={ addToblogs } user={user} setNotification={ setNotification }/>
        { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />) }
        </>
      )
    }
    return <Login setUser={setUser} setNotification={ setNotification }/>
  }

  return (
    <div>
      <h2>Blogs app</h2>
      <Notification message={ notification.message } level={ notification.level } setNotification={ setNotification }/>
      { checkLogin() }
    </div>
  )
}

export default App