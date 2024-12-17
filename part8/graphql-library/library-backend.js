const { GraphQLError } = require("graphql");

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/Author");
const Book = require("./models/Book");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;

console.log("connecting to", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  },
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!, 
      genres: [String!]!
      ): Book!
    editAuthor(
      name: String!,
      setBornTo: Int
      ): Author!
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
  },
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      authors = await Author.find({});
      return authors.length;
    },
    allBooks: async (root, args) => {
      let filter = {};

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author;
        } else {
          throw new GraphQLError(
            `Author "${args.author}" does not exist in the library`,
            {
              extensions: { code: "NO_AUTHOR", invalidArgs: args.author },
            },
          );
        }
      }

      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }

      return Book.find(filter).populate("author");
    },
    allAuthors: async () => {
      return Author.find({});
    },
    me: async (root, args, contextValue) => {
      return contextValue.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, contextValue) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError(
          "You do not have permission to add book. Please log in.",
          { extensions: { code: "UNAUTHORIZED_ACCESS" } },
        );
      }

      let existingAuthor = await Author.findOne({ name: args.author });

      if (!existingAuthor) {
        existingAuthor = new Author({
          name: args.author,
          born: null,
        });
        try {
          await existingAuthor.save();
        } catch (error) {
          throw new GraphQLError("Failed to save new author", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.author,
              error,
            },
          });
        }
      }

      const newBook = new Book({
        title: args.title,
        author: existingAuthor,
        published: args.published,
        genres: args.genres,
      });

      try {
        await newBook.save();
      } catch (error) {
        throw new GraphQLError("Failed to save new book", {
          extensions: { code: "BAD_USER_INPUT", error },
        });
      }
      return newBook;
    },
    editAuthor: async (root, args) => {
      if (!contextValue.currentUser) {
        throw new GraphQLError(
          "You do not have permission to edit author information. Please log in.",
          { extensions: { code: "UNAUTHORIZED_ACCESS" } },
        );
      }

      const authorToEdit = await Author.findOne({ name: args.name });

      if (!authorToEdit) {
        throw new GraphQLError(`The author ${args.name} does not exist`, {
          extensions: { code: "BAD_USER_INPUT", invalidArgs: args.name },
        });
      }

      if (args.setBornTo) {
        await Author.findByIdAndUpdate(authorToEdit._id, {
          born: args.setBornTo,
        });
      }

      return Author.findById(authorToEdit._id);
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre ? args.favouriteGenre : null,
      });

      return user.save().catch((err) => {
        throw new GraphQLError("Failed to create a user", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            err,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new GraphQLError("Failed to login", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }

      const tokenContents = { username: user.username, id: user._id };

      return { value: jwt.sign(tokenContents, process.env.JWT_SECRET) };
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name });
      const books = await Book.find({ author: author });
      return books.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7).trim(),
        process.env.JWT_SECRET,
      );
      return { currentUser: await User.findById(decodedToken.id) };
    }
  },
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
