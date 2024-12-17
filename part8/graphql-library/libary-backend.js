const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");
require("dotenv").config();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/Author");
const Book = require("./models/Book");

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
  },
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
        const author = await Author.findOne({'name': args.author})
        if (author) {
          filter.author = author._id;
        }
      }

      if (args.genre) {
        filter.genres = {$in: [args.genre]};
      }

      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => {
      return await Author.find({});
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let existingAuthor = await Author.findOne({ name: args.author });

      if (!existingAuthor) {
        existingAuthor = new Author({
          name: args.author,
          born: null,
          id: uuid(),
        });
        await existingAuthor.save();
      }

      const newBook = new Book({
        title: args.title,
        author: existingAuthor,
        published: args.published,
        genres: args.genres,
      });

      await newBook.save();
      return newBook;
    },
    editAuthor: async (root, args) => {
      const authorToEdit = await Author.findOne({'name': args.name})

      if (!authorToEdit) {
        return null;
      }

      if (args.setBornTo) {
        await Author.findByIdAndUpdate(authorToEdit._id, {'born': args.setBornTo});
      }

      return Author.findById(authorToEdit._id);
    },
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({'name': root.name});
      const books = await Book.find({'author': author});
      return books.length;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
