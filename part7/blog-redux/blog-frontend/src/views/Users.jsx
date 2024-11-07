import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { initialiseUsers } from "../reducers/userReducer.js";

const Users = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initialiseUsers());
  }, []);

  if (!users) return <div>Loading...</div>;

  return (
    <div id={"users"}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {[...users].map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{[...user.blogs].length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
