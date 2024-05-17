import { Category } from "@/components/eCommerce";
// import { Col, Container, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Loading } from "@/components/feedback";
// import { TCategory } from "@/interfaces/interfaces";
import { GridList, Heading } from "@components/common";
import useCategories from "@/hooks/useCategories";
const Categories = () => {
  // console.log("fire");
  const { error, loading, records } = useCategories();
  return (
    <Container>
      <Heading title="Categories" />
      <Loading error={error} status={loading} type="category">
        <GridList
          emptyMessage="There are no categories"
          records={records}
          renderItem={(record) => <Category {...record} />}
        />
        {/* <Row>{renderCategories}</Row> */}
      </Loading>
    </Container>
  );
};

export default Categories;
