import { Product } from "@/components/eCommerce";
// import { Col, Container, Row } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Loading } from "@/components/feedback";
import { GridList, Heading } from "@components/common";
import useProducts from "@/hooks/useProducts";
const Products = () => {
  // console.log("fire");
  const { error, loading, prefix, productFullInfo } = useProducts();
  return (
    <Container>
      <Heading title={`${prefix} Products`} />
      <Loading error={error} status={loading} type="product">
        <GridList
          emptyMessage="There are no products"
          records={productFullInfo}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </Container>
  );
};

export default Products;
