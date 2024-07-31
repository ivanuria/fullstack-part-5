import Togglable from "./Togglable"

const Blog = ({ blog }) => (
  <div style={ { padding: '1rem', border: '1px solid gray', borderRadius: '1rem', marginBlock: '1rem' } }>
    <span style={ { marginRight: '1ch' } } ><b>{ blog.title }</b> { blog.author }</span>
    <Togglable buttonLabel='View' reverse={ true }>
      <br />
      <a href={ blog.url } target='_blank'>{ blog.url }</a>
      <br />
      <span style={ { marginRight: '1ch' } } >Likes: { blog.likes }</span><button>Like</button>
      <br />
      {blog.user.name}
    </Togglable>
  </div>
)

export default Blog