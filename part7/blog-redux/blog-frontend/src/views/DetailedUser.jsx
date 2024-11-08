import { useSelector } from "react-redux";

const DetailedUser = (id) => {
  const user = useSelector((state) =>
    state.user.userList.find((user) => user.id === id),
  );

  console.log(user);

  if (!user) return <p>There is no user :(</p>;

  return <p>User!</p>;
};

export default DetailedUser;
