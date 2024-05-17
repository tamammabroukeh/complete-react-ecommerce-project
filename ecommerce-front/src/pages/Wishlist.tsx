import { Loading } from "@/components/feedback";
import { Product } from "@/components/eCommerce";
import { GridList, Heading } from "@components/common";
import useWishlist from "@/hooks/useWishlist";
const Wishlist = () => {
  // console.log("fire");
  const { error, loading, records } = useWishlist();
  return (
    <>
      <Heading title="Your Wishlist" />
      <Loading error={error} status={loading} type="product">
        <GridList
          emptyMessage="Your wishlist is empty"
          records={records}
          renderItem={(record) => <Product {...record} />}
        />
      </Loading>
    </>
  );
};

export default Wishlist;
