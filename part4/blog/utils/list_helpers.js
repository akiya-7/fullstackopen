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

module.exports = {dummy, totalLikes}