import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
// import { TProduct } from "@/interfaces/interfaces";
import { useParams } from "react-router-dom";
import {
  actGetProductsByCategoryPrefix,
  productsCleanUp,
} from "@/store/productsSlice/productsSlice";
const useProducts = () => {
  const params = useParams();
  const prefix = params.prefix;
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector((state) => state.products);
  const { items } = useAppSelector((state) => state.cart);
  const { itemsId } = useAppSelector((state) => state.wishlist);
  const { accessToken } = useAppSelector((state) => state.auth);
  const productFullInfo = records.map((record) => {
    return {
      ...record,
      quantity: items[record.id] || 0,
      isLiked: itemsId.includes(record.id),
      isAuthenticated: accessToken ? true : false,
    };
  });

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCategoryPrefix(params.prefix as string)
    );
    return () => {
      promise.abort();
      dispatch(productsCleanUp());
    };
  }, [dispatch, params]);

  // const renderProducts =
  //   records.length > 0
  //     ? records.map((product: TProduct) => {
  //         return (
  //           <Col
  //             xs={6}
  //             md={3}
  //             className="d-flex justify-content-center mb-5 mt-2"
  //             key={product.id}
  //           >
  //             <Product
  //               price={product.price}
  //               img={product.img}
  //               title={product.title}
  //               cat_prefix=""
  //             />
  //           </Col>
  //         );
  //       })
  //     : "There are no categories";
  return { error, loading, productFullInfo, prefix };
};

export default useProducts;
