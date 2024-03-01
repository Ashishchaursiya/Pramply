"use client"
import { useEffect, useState } from "react";
 
import Skeleton from "react-loading-skeleton";
 
import { PaymentSuccess, initiatePayment } from "@/utils/paymentAction";
import { useRouter } from "next/navigation";
import Spinner from "@/components/spinner";
import { useDispatch, useSelector } from "react-redux";
import { setPaymentfailedStatus } from "@/redux/reducers/paymentFailedSlice";
import Footer from "@/components/footer";
const PaymentInfo = ({ params }) => {
  const router = useRouter();
  let countryLoc = params.countryName
  const country = useSelector((state) => state.location.country) || countryLoc
  const storeToken = useSelector((state) => state.tokenInStore.authToken);
 
   
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false)
   
 
  let totalPlans = [[{amount:'12',duation:'30',month:"1 Month",currency:"$"},{amount:'30',duation:'90',month:"3 Months",currency:"$",bestDeal:true}
,{amount:'50',duation:'180',month:"6 Months",currency:"$"}],
[{amount:'199',duation:'30',month:"1 Month",currency:"Rs"},{amount:'499',duation:'90',month:"3 Months",currency:"Rs",bestDeal:true}
,{amount:'899',duation:'180',month:"6 Months",currency:"Rs"}]
]
const plans = (country=='Other' || country!='India') ? totalPlans[0]:totalPlans[1]
  const startPayment = async (selectedPlan) => {
        let payload = {amount:selectedPlan.amount,duration:selectedPlan.duation,country:country}
    const  resData =  await initiatePayment( payload,setLoading,storeToken)
    payload.order_id = resData.data.orderId
   
     
  initiateClientModule(resData,payload);
 
     
    };
    const initiateClientModule = (data,customPayload) => {
      const script = document.createElement("script");
      script.src = `https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/RHLB07039627707073.js`;
      script.crossOrigin = `anonymous`;
      script.onload = () => {
       
        var config = {
          "root": "",
          "flow": "DEFAULT",
          "data": {
            "orderId": data.data.orderId,
            "token": data.data.body.txnToken,
            "tokenType": "TXN_TOKEN",
            "amount": data.data.amount
          },
          "merchant": {
            mid: "pZJnaO45036198539031",
            redirect: false
          },
          "handler": {
            "notifyMerchant":  function (eventName, data) {
             
              
            },
            "transactionStatus": async  function (data) {
              
              
              if (data.RESPMSG?.includes('Success')) {
                
                 
                const payload = {
                  payment_gateway:"PAYTM",
                  status: "TXN_SUCCESS",
                  ...customPayload
                  
              }
              
                await PaymentSuccess(payload,setLoading)
                router.push('/payment/success', { scroll: false })
           
                
              } else   {
                const payload = {
                  payment_gateway:"PAYTM",
                  status: "FAILED",
                  ...customPayload
                  
              }
                await PaymentSuccess(payload,setLoading)
                dispatch(setPaymentfailedStatus(data.RESPMSG))
                     router.push('/payment/fail', { scroll: false })
               
              }  
              window.Paytm.CheckoutJS.close();
            }
          }
        };

        if (window.Paytm && window.Paytm.CheckoutJS) {
          window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
            window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
              window.Paytm.CheckoutJS.invoke();
              setLoading(false)
            }).catch(function onError(error) {
              setLoading(false)
              
            });
          });
        }
      };

      document.body.appendChild(script);
     
    };
    return <>
 {loading && <Spinner />}
    <div className="container-fluid py-2">
    <div className="d-flex justify-content-center">
        <div>
        <img src="/img/navlogo.png" width="55px" height="55px"/> 
        </div>
        <div>
        <h1 className="paymentIntro"></h1>
        </div>
    </div>
    <h4 className="text-center paymentH2 fw-bold">Premium</h4>
    <h6 className="text-center fw-bold">Get started with a Pramply Subscription that works for you</h6>
    <div className="container webSubscription mx-auto w-50 py-5 position-relative">
    <div className="row py-4">
      {
        plans  ? <>
        {plans?.map( plan => {
          return <>
           <div className="col-lg">
          <div   className= {`${plan.bestDeal ? 'paymentinfoBestDealContainer text-center position-absolute':'paymentinfoContainer text-center'}`}>
           <p   className= {`${plan.bestDeal ? 'text-white':'text-muted'}`}> {plan.month}</p>
           <p   className= {`${plan.bestDeal ? 'text-white my-5 fw-bold currencySize':'text-muted my-5 fw-bold currencySize'}`}> <span className="">{plan.currency}</span>   {plan.amount}</p>
           <button  onClick={ () => startPayment(plan)} className={`${plan.bestDeal ? 'btn btn-dark fw-bold':'btn btn-dark fw-bold mb-2'}`}>SUBSCRIBE</button>
          </div>
        </div>
          </>
        })}
  
        
        </>:
        <>
        <Skeleton count={10}   />
        </>
      }
       
      
        
    </div>
   
    </div>

    <div className="row mobileSubscription py-4">
      <div className="d-block">

      <div>
      {
        plans  ? <>
        {plans?.map( plan => {
          return <>
          {plan.bestDeal &&
           <div className="col-lg paymentinfoBestDealContainerMain">
          <div   className= {`${plan.bestDeal ? 'paymentinfoBestDealContainer text-center ':'paymentinfoContainer text-center'}`}>
           <p   className= {`${plan.bestDeal ? 'text-white':'text-muted'}`}> {plan.month}</p>
           <p   className= {`${plan.bestDeal ? 'text-white my-5 fw-bold currencySize':'text-muted my-5 fw-bold currencySize'}`}> <span className="">{plan.currency}</span>   {plan.amount}</p>
           <button  onClick={ () => startPayment(plan)} className={`${plan.bestDeal ? 'btn btn-dark fw-bold':'btn btn-dark fw-bold mb-2'}`}>SUBSCRIBE</button>
          </div>
        </div>
          }
          </>
        })}
  
        
        </>:
        <>
        <Skeleton count={10}   />
        </>
      }
      </div>
          <div className="d-flex justify-content-center">
      {
        plans  ? <>
        {plans?.map( plan => {
          return <>

          {!plan.bestDeal &&
           <div className="col-lg notBestMain">
          <div   className= {`${plan.bestDeal ? 'paymentinfoBestDealContainer text-center position-absolute':'paymentinfoContainer text-center'}`}>
           <p   className= {`${plan.bestDeal ? 'text-white':'text-muted'}`}> {plan.month}</p>
           <p   className= {`${plan.bestDeal ? 'text-white my-5 fw-bold currencySize':'text-muted my-5 fw-bold currencySize'}`}> <span className="">{plan.currency}</span>   {plan.amount}</p>
           <button  onClick={ () => startPayment(plan)} className={`${plan.bestDeal ? 'btn btn-dark fw-bold':'btn btn-dark fw-bold mb-2'}`}>SUBSCRIBE</button>
          </div>
        </div>
          }
          </>
        })}
  
        
        </>:
        <>
        <Skeleton count={10}   />
        </>
      }
      </div>
     
       
      
        
    </div>
    </div>
    
    {
      !(country=='India') &&  <p className="text-muted text-end priceMark fw-bold mx-5">Price Marked In USD</p>
    }
  
    
   
    </div>
    <Footer />
    </>

}
export default PaymentInfo;