import { Heading } from "@/components/common";
import ProductInfo from "@/components/eCommerce/ProductInfo/ProductInfo";
import { Loading } from "@/components/feedback";
import useOrders from "@/hooks/useOrders";
import { Table, Modal } from "react-bootstrap";
const Orders = () => {
  const {
    error,
    loading,
    ordersList,
    selectedProduct,
    showModal,
    handleClose,
    viewDetailsHandler,
  } = useOrders();
  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((product) => (
            <ProductInfo
              img={product.img}
              price={product.price}
              title={product.title}
              quantity={product.quantity}
              key={product.id}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>
      <Heading title="My Orders" />
      <Loading error={error} status={loading} type="table">
        <Table striped bordered hover>
          <thead>
            <tr>
              <td>Order number</td>
              <td>Items</td>
              <td>Total price</td>
            </tr>
          </thead>
          <tbody>
            {ordersList.map((order) => {
              return (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>
                    {order.items.length} item(s)
                    {" / "}
                    <span
                      onClick={() => viewDetailsHandler(order.id)}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Product Details
                    </span>
                  </td>
                  <td>{order.subtotal.toFixed(2)}$</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Loading>
    </>
  );
};
export default Orders;
