import ContentLoader from "react-content-loader";
// import { Col } from "react-bootstrap";
const TableSkeleton = () => (
  <ContentLoader
    speed={2}
    width={340}
    height={84}
    viewBox="0 0 340 84"
    backgroundColor="#e6e6e6"
    foregroundColor="#c0c0c0"
  >
    <rect x="3" y="26" rx="3" ry="3" width="100" height="11" />
    <rect x="148" y="27" rx="3" ry="3" width="173" height="11" />
    <rect x="4" y="44" rx="3" ry="3" width="100" height="11" />
    <rect x="4" y="62" rx="3" ry="3" width="100" height="11" />
    <rect x="148" y="45" rx="3" ry="3" width="173" height="11" />
    <rect x="148" y="63" rx="3" ry="3" width="173" height="11" />
    <rect x="344" y="27" rx="3" ry="3" width="173" height="11" />
    <rect x="340" y="47" rx="3" ry="3" width="173" height="11" />
    <rect x="340" y="63" rx="3" ry="3" width="173" height="11" />
  </ContentLoader>
);
export default TableSkeleton;
