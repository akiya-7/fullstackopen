import {useState} from 'react';

const Blog = ({ blog }) => {
  const [detailVisibility, setDetailVisibility] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5}

  const fullDetails = {display: detailVisibility ? "block" : "none"}
  const noDetails = {display: detailVisibility ? "none" : "block"}

  const toggleDetailVisibility = () => {
    setDetailVisibility(!detailVisibility)
  }


  const likeBlog = () => {
  }

  return (
        <div style={blogStyle}>
          <div style={noDetails}>
            {blog.title} {blog.author}
            <button onClick={toggleDetailVisibility}>view</button>
          </div>

          <div style={fullDetails}>
            {blog.title} {blog.author}
            <button onClick={toggleDetailVisibility}>hide</button>
            <br/>
            {blog.url}
            <br/>
            Likes: {blog.likes}
            <button onClick={likeBlog}>like</button>
            <br/>
            User: {blog.user.name}
            <br/>
          </div>
        </div>
    )
}

export default Blog