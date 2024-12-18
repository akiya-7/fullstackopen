import {useQuery} from '@apollo/client';
import {ALL_BOOKS} from '../queries.js';

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)

  if (!props.show || result.loading) {
    return null
  }

  console.log(result)

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books