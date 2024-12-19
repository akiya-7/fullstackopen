import { useQuery } from "@apollo/client";
import { GET_USER, SEARCH_BY_GENRE } from "../queries.js";

const Recommended = ({ show }) => {
  const user = useQuery(GET_USER);
  const favouriteBooks = useQuery(SEARCH_BY_GENRE, {
    variables: { genre: user.loading ? null : user.data.me.favouriteGenre },
  });

  console.log(favouriteBooks);

  if (!show || user.loading) return null;

  return (
    <div id={"recommended"}>
      <h1>recommendations</h1>
      <p>
        books in your favourite genre{" "}
        <strong>{user.data.me.favouriteGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {favouriteBooks.loading
            ? null
            : favouriteBooks.data.allBooks.map((a) => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;
