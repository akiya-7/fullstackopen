import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import BlogCard from "./BlogCard.jsx";

const BlogPodium = () => {
  const blogs = useSelector((state) => state.blog.blogList);
  const sorted = [...blogs].sort((a, b) => b.likes - a.likes);

  return (
    <div style={{ marginBottom: 20, marginTop: 20 }}>
      <Row xs={1} sm={1} md={3} lg={3} className={"g-3"} id="blog-podium">
        {sorted[0] && (
          <Col
            xs={{ order: 1 }}
            sm={{ order: 1 }}
            md={{ order: 1 }}
            lg={{ order: 2 }}
            xl={{ order: 2 }}
          >
            <BlogCard className={"blog-podium-first"} blog={sorted[0]} />
          </Col>
        )}
        {sorted[1] && (
          <Col
            xs={{ order: 2 }}
            sm={{ order: 2 }}
            md={{ order: 1 }}
            lg={{ order: 1 }}
            xl={{ order: 1 }}
          >
            <BlogCard className={"blog-podium-second"} blog={sorted[1]} />
          </Col>
        )}
        {sorted[2] && (
          <Col
            xs={{ order: 3 }}
            sm={{ order: 3 }}
            md={{ order: 3 }}
            lg={{ order: 3 }}
            xl={{ order: 3 }}
          >
            <BlogCard className={"blog-podium-third"} blog={sorted[2]} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default BlogPodium;
