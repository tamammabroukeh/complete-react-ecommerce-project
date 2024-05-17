import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, index) => {
      return (
        <Col xs={3} className="d-flex justify-content-center mb-5 mt-2">
          <ContentLoader
            key={index}
            speed={2}
            width={180}
            height={209}
            viewBox="0 0 180 209"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <circle cx="82" cy="79" r="77" />
            <rect x="9" y="171" rx="5" ry="5" width="162" height="10" />
          </ContentLoader>
        </Col>
      );
    });
  return <Row>{renderSkeletons}</Row>;
};

export default CategorySkeleton;
