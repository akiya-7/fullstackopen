const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const importBlogList = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]
const blogToPost = {
  title: "TITLE",
  author: "AUTHOR",
  url: "URL",
  likes: 5,
}
const blogNoLikes = {
  title: "No Likes",
  author: "AUTHOR",
  url: "URL",
}
const blogNoTitle = {
  author: "AUTHOR",
  url: "URL",
  likes: 0,
}
const blogNoUrl = {
  title: "No URL",
  author: "AUTHOR",
  likes: 0,
}

const importUserList = [
  {
    "_id": "66c75937a9b68a26175f6900",
    "__v": 0,
    "blogs": ["5a422a851b54a676234d17f7", "5a422aa71b54a676234d17f8",
      "5a422b891b54a676234d17fa", "5a422ba71b54a676234d17fb"],
    "name": "Johnson",
    "passwordHash": "$2b$10$HAcGFgbz/9sVrcpO3AWWgOTur/Dt8lj5KX20R/YC0R0vYGYWGi6iG",
    "username": "johnisthebest"
  },
  {
    "_id": "66c75937a9b68a26175f6905",
    "__v": 0,
    "blogs": ["5a422b3a1b54a676234d17f9", "5a422bc61b54a676234d17fc"],
    "name": "Noah",
    "passwordHash": "$2b$10$HAcGFgbz/9sVrcpO3AWWgOTur/Dt8lj5KX20R/YC0R0vYGYW34643",
    "username": "whoISnoah"
  }
]
const importBlogList2 = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    user: "66c75937a9b68a26175f6900",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    user: "66c75937a9b68a26175f6900",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    user: "66c75937a9b68a26175f6905",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    user: "66c75937a9b68a26175f6900",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    user: "66c75937a9b68a26175f6900",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    user: "66c75937a9b68a26175f6905",
    likes: 2,
    __v: 0
  }
]

module.exports = {
  listWithOneBlog,
  importBlogList,
  blogToPost,
  blogNoLikes,
  blogNoTitle,
  blogNoUrl,
  importUserList,
  importBlogList2
}