import { All_AUTHOR_NAMES, ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";
import { useMutation, useQuery } from "@apollo/client";

const UpdateAuthor = () => {
  const authorNames = useQuery(All_AUTHOR_NAMES);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  console.log(authorNames);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const setBornTo = Number(e.target.born.value);
    await updateAuthor({ variables: { name, setBornTo } }).then((res) =>
      console.log(res),
    );
  };

  return (
    <div id={"update-author"}>
      <h3>update author</h3>
      <form onSubmit={handleUpdate}>
        <label>name </label>
        <select name={"name"}>
          {authorNames.data.allAuthors.map((name) => {
            return (
              <option key={name} value={name.name}>
                {name.name}
              </option>
            );
          })}
        </select>
        <br />
        born <input type={"number"} name={"born"} />
        <br />
        <button type={"submit"}>update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
