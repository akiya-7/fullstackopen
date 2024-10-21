import {useState} from 'react';

const AddBlog = ({onNewBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
        e.preventDefault()
        onNewBlog( {title: title, author: author, url: url} )
    }

  return(
      <form onSubmit={handleSubmit}>
        <p>
          Title: <input id="title" value={title} onChange={(e) => setTitle(e.target.value)}/> <br/>
          Author: <input id="author" value={author} onChange={(e) => setAuthor(e.target.value)}/> <br/>
          URL: <input id="url" value={url} onChange={(e) => setUrl(e.target.value)}/> <br/>
          <button type='submit'>Create</button>
        </p>
      </form>

  )
}

export default AddBlog