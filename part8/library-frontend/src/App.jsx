import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recommended from "./components/Recommended";
import { useApolloClient } from "@apollo/client";

const App = () => {
  const token = localStorage.getItem("user-token")
    ? localStorage.getItem("user-token")
    : null;

  const [page, setPage] = useState("authors");
  const [user, setUser] = useState(token);
  const client = useApolloClient();

  const handleLogin = (token) => {
    setUser(token);
    setPage("authors");
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {user && <button onClick={() => setPage("add")}>add book</button>}
        {user && (
          <button onClick={() => setPage("recommended")}>recommended</button>
        )}
        {!user && <button onClick={() => setPage("login")}>login</button>}
        {user && <button onClick={() => handleLogout()}>logout</button>}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommended show={page === "recommended"} />

      <Login show={page === "login"} onLogin={handleLogin} />
    </div>
  );
};

export default App;
