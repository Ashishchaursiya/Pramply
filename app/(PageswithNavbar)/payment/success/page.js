"use client";
import Cookies from "js-cookie";
import { getPaymentDetails } from "@/utils/paymentAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import Footer from "@/components/footer";
import { useMediaQuery } from "react-responsive";

const PaymentSuccess = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const storeToken = useSelector((state) => state.tokenInStore.authToken);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const router = useRouter();
  let userToken = Cookies.get("token");
  const finalToken = storeToken || userToken;
  useEffect(() => {
    async function fetchSubscriptionDetails() {
      let subData = await getPaymentDetails(finalToken);
      setSubscriptionData(subData);
    }

    if (finalToken) {
      fetchSubscriptionDetails();
    }
  }, []);
  return (
    <>
     <div className="d-flex justify-content-center pt-3">
        <div>
        <img src="/img/navlogo.png" width="55px" height="55px"/> 
        </div>
        <div>
        <h1 className="paymentIntro"></h1>
        <p className="fw-bold">Thank you for subscription</p>
        </div>
    </div>
      <div className="container shadow text-center my-3 p-4 successWidth">
      <svg
          width="96"
          height="60"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.3731 7.16L13.4664 6.10667C13.2931 5.90667 13.1531 5.53333 13.1531 5.26667V4.13333C13.1531 3.42667 12.5731 2.84666 11.8664 2.84666H10.7331C10.4731 2.84666 10.0931 2.70667 9.89309 2.53333L8.83976 1.62667C8.37976 1.23333 7.62643 1.23333 7.15976 1.62667L6.11309 2.54C5.91309 2.70667 5.53309 2.84666 5.27309 2.84666H4.11976C3.41309 2.84666 2.83309 3.42667 2.83309 4.13333V5.27333C2.83309 5.53333 2.69309 5.90667 2.52643 6.10667L1.62643 7.16667C1.23976 7.62667 1.23976 8.37333 1.62643 8.83333L2.52643 9.89333C2.69309 10.0933 2.83309 10.4667 2.83309 10.7267V11.8667C2.83309 12.5733 3.41309 13.1533 4.11976 13.1533H5.27309C5.53309 13.1533 5.91309 13.2933 6.11309 13.4667L7.16643 14.3733C7.62643 14.7667 8.37976 14.7667 8.84643 14.3733L9.89976 13.4667C10.0998 13.2933 10.4731 13.1533 10.7398 13.1533H11.8731C12.5798 13.1533 13.1598 12.5733 13.1598 11.8667V10.7333C13.1598 10.4733 13.2998 10.0933 13.4731 9.89333L14.3798 8.84C14.7664 8.38 14.7664 7.62 14.3731 7.16ZM10.7731 6.74L7.55309 9.96C7.45976 10.0533 7.33309 10.1067 7.19976 10.1067C7.06643 10.1067 6.93976 10.0533 6.84643 9.96L5.23309 8.34667C5.03976 8.15333 5.03976 7.83333 5.23309 7.64C5.42643 7.44666 5.74643 7.44666 5.93976 7.64L7.19976 8.9L10.0664 6.03333C10.2598 5.84 10.5798 5.84 10.7731 6.03333C10.9664 6.22667 10.9664 6.54666 10.7731 6.74Z"
            fill="#44AB42"
          />
        </svg>
        <h3 className="fw-bold">Payment Successful</h3>
       
        {subscriptionData ? (
          <>
            {/* <h4 className="fw-bold">Subscription Details</h4> */}
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                Subscribed
                <span className=" badge-primary badge-pill">
                  {subscriptionData?.is_premium == 1 ? "Yes" : "No"}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
               Amount
               <span className=" badge-primary badge-pill">
                 {subscriptionData?.amount}
               </span>
             </li>
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                Days Left
                <span className=" badge-primary badge-pill">
                  {subscriptionData?.days_left}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                Expiry Date
                <span className=" badge-primary badge-pill">
                  {subscriptionData?.expiry_date}
                </span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                Purchase Date
                <span className=" badge-primary badge-pill">
                  {subscriptionData?.purchase_date}
                </span>
              </li>
            </ul>
            <Link href="/" className="btn btn-primary my-2">
              Go To Home
            </Link>
          </>
        ) : (
          <>
            <Skeleton count={5} />
          </>
        )}
      </div>
      <Footer    />
    </>
  );
};
export default PaymentSuccess;
