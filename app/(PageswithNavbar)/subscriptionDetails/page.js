"use client";
import Footer from '@/components/footer';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

const SubscriptionDetails = () => {
  
    const subscriptionData  = useSelector((state) => state.subscriptionInStore.subscriptionData);
  return <>
     <div className="d-flex justify-content-center pt-3">
        <div>
        <img src="/img/navlogo.png"  className='despLogo'/> 
        </div>
        <div>
        <h1 className="paymentIntro"></h1>
      
        </div>
    </div>
    <div className="container subscriptionShadow text-center my-3 p-4 subscription">
       
       {
           subscriptionData ? <>
            <h4 className="fw-bold">Subscription Details</h4>
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
           </>:
           <>
           
           <Skeleton count={5} />
           </>
       }
     
   </div>
   <Footer   />
    </>
  
  ;
};

export default SubscriptionDetails;
