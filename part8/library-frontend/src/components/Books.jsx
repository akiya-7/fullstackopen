import { useQuery } from "@apollo/client";
import { BOOK_GENRES, SEARCH_BY_GENRE } from "../queries.js";
import { useEffect, useState } from "react";

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres");
  const bookSearch = useQuery(SEARCH_BY_GENRE, {
    variables: {
      genre: genreFilter === "all genres" ? null : genreFilter,
    },
  });
  const genres = useQuery(BOOK_GENRES);

  useEffect(() => {}, [setGenreFilter]);

  if (!props.show || genres.loading) {
    return null;
  }

  const uniqueGenres = Array.from(
    new Set(genres.data.allBooks.flatMap((genre) => genre.genres)),
  ).concat("all genres");

  return (
    <div>
      <h2>books</h2>

      <label>in genre </label>
      <select
        defaultValue={"all genres"}
        name={"name"}
        onChange={(e) => {
          setGenreFilter(e.target.value);
        }}
      >
        {uniqueGenres.map((genre) => {
          return (
            <option key={genre} value={genre}>
              {genre}
            </option>
          );
        })}
      </select>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookSearch.loading
            ? null
            : bookSearch.data.allBooks.map((a) => (
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

export default Books;
