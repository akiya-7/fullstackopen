import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";
import { useMutation } from "@apollo/client";

const UpdateAuthor = () => {
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

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
        name <input type={"text"} name={"name"} />
        <br />
        born <input type={"number"} name={"born"} />
        <br />
        <button type={"submit"}>update author</button>
      </form>
    </div>
  );
};

export default UpdateAuthor;
