"use client";
import Footer from "@/components/footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";

const PaymentFail = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const failedStatus  = useSelector((state) => state.paymentFailed.failedStatus);
  const country = useSelector((state) => state?.location?.country) || 'India'
  const router = useRouter()
   useEffect( () => {
    if(!failedStatus){
      //router.push('/', { scroll: false })
    }
   },[])
    return <>
       <div style={{"minHeight": "calc(72vh - 100px)"}}>
       <div className={`container shadow text-center  my-3 p-4 ${isMobile ? 'w-100':'w-50'}`}>
    <h3 className="fw-bold">Payment Failed</h3>
      <p className="text-danger">{failedStatus}</p>
      <Link href={`/${country}/subscription`} className="btn btn-primary">Retry</Link>
    
 
    </div>
       </div>
    
    <Footer bottom={isMobile ? false:true}   />
    </>

}
export default PaymentFail;