import { useAppDispatch, useAppSelector } from "@/store/hook";
import { useEffect } from "react";
import {
  actGetCategories,
  cleanUpCategories,
} from "@/store/categoriesSlice/categoriesSlice";
const useCategories = () => {
  const dispatch = useAppDispatch();
  const { records, error, loading } = useAppSelector(
    (state) => state.categories
  );

  useEffect(() => {
    // to prevent extra getCategories actions
    // we use it when the state doesn`t change to much
    // if (!records.length) {
    const promise = dispatch(actGetCategories());
    // }
    return () => {
      promise.abort();
      dispatch(cleanUpCategories());
    };
  }, [dispatch]);

  // const renderCategories =
  //   records.length > 0
  //     ? records.map((category: TCategory) => {
  //         return (
  //           <Col
  //             xs={6}
  //             md={3}
  //             className="d-flex justify-content-center mb-5 mt-2"
  //             key={category.id}
  //           >
  //             <Category
  //               prefix={category.prefix}
  //               img={category.img}
  //               title={category.title}
  //             />
  //           </Col>
  //         );
  //       })
  //     : "There are no categories";
  // console.log(records[0]?.img);
  return { records, error, loading };
};

export default useCategories;
