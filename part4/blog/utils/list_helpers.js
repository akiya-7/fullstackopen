const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  let totalLikes = 0;

  if (blogs){
    const likes = blogs.map(blog => blog.likes)
    totalLikes = likes.reduce((total, like) => total + like, 0)
  }

  return totalLikes

}

const favouriteBlog = (blogs) => {
  if(blogs.length === 0)
    return {};

  let favouriteIndex = 0;
  const blogsLikes = blogs.map(blog => blog.likes)

  for (let i = 0; i < blogsLikes.length; i++) {
    if (blogsLikes[i] > blogsLikes[favouriteIndex])
      favouriteIndex = i
    }

  return {
    title: blogs[favouriteIndex].title,
    author: blogs[favouriteIndex].author,
    likes: blogs[favouriteIndex].likes,
  }
}

module.exports = {dummy, totalLikes, favouriteBlog}