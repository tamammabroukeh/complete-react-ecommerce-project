import { Heading } from "@/components/common";
import { useAppSelector } from "@/store/hook";

const Account = () => {
  const userInfo = useAppSelector((state) => state.auth.user);
  return (
    <>
      <Heading title="Account Info" />
      <ul>
        <li>First name: {userInfo?.firstname}</li>
        <li>Last name: {userInfo?.lastname}</li>
        <li>Email: {userInfo?.email}</li>
      </ul>
    </>
  );
};

export default Account;
