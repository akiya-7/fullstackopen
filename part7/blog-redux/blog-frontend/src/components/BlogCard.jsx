import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const BlogCard = ({ blog, className }) => {
  return (
    <Card as={Link} className={`${className}`} to={`/blogs/${blog.id}`}>
      <Card.Body>
        <Card.Title className={"text-center"}>{blog.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default BlogCard;
