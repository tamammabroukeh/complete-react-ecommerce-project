import { LottieHandler } from "@/components/feedback";
import { IGridList, IHasId } from "@/interfaces/interfaces";
import { Col, Row } from "react-bootstrap";
const GridList = <T extends IHasId>({
  records,
  renderItem,
  emptyMessage,
}: IGridList<T>) => {
  console.log(records);
  const renderCategories =
    records.length > 0 ? (
      records.map((category: T) => {
        return (
          <Col
            key={category.id}
            xs={6}
            md={3}
            className="d-flex justify-content-center mb-5 mt-2"
          >
            {renderItem(category)}
          </Col>
        );
      })
    ) : (
      <Col>
        <LottieHandler message={emptyMessage} type="empty" />
      </Col>
    );
  return <Row>{renderCategories}</Row>;
};

export default GridList;
