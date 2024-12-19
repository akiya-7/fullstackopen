import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const All_AUTHOR_NAMES = gql`
  query {
    allAuthors {
      name
    }
  }
`;

// obsolete
export const ALL_BOOKS = gql`
  query {
    allBooks {
      author {
        name
      }
      genres
      published
      title
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      title
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const BOOK_GENRES = gql`
  query {
    allBooks {
      genres
    }
  }
`;

export const SEARCH_BY_GENRE = gql`
  query searchByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    me {
      username
      favouriteGenre
    }
  }
`;
