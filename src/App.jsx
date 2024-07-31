import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import NewBlog from './components/NewBlog.jsx'
import blogService from './services/blogs'
import Notification from './components/Notification.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState()
  const [notification, setNotification] = useState({
    message: '',
    level: 'info'
  })
  const newBlogRef = useRef()

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
    newBlogRef.current.toggleVisible()
    setBlogs([...blogs, newBlog])
    setNotification({
      message: `Correctly added ${ newBlog.title }`,
      level: 'info'
    })
  }

  const checkLogin = () => {
    if (user) {
      return (
        <>
        <p><b>{user.name}</b> logged in <button style={ { marginLeft:'1ch' } } onClick={ logout }>Logout</button></p>
        <Togglable buttonLabel='Add New Blog' ref={ newBlogRef }>
          <NewBlog addToBlogs={ addToblogs } user={user}/>
        </Togglable>
        { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />) }
        </>
      )
    }
    return <Login setUser={ setUser } setNotification={ setNotification }/>
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