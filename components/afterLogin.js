import { useEffect, useState } from "react";
import UserAvatar from "./userAvata";
import { getPaymentDetails } from "@/utils/paymentAction";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { setSubscription } from "@/redux/reducers/subscriptionSlice";
import { useRouter } from "next/navigation";
import Dropdown from 'react-bootstrap/Dropdown';
import { deleteNotifications, getNotifications } from "@/utils/otherUserAction";

const AfterLogin = () =>{
  const [isSubscription,setIsSubscription] = useState(null)
  const [notifications,setNotification] = useState(null)
  const [readNotification,setReadNotification] = useState([])
  const storeToken  = useSelector((state) => state.tokenInStore.authToken);
  const country = useSelector((state) => state.location.country) || 'India';
  const dispatch = useDispatch();
  const router = useRouter()
  let userToken = Cookies.get('token')
  const finalToken = storeToken || userToken
  useEffect ( () => {
    async function fetchSubscriptionDetails() {
      let subData = await getPaymentDetails(finalToken)
    
      dispatch( setSubscription(subData))
      setIsSubscription(subData)
       
     
     
     
    }

    if(finalToken){
      fetchSubscriptionDetails()
    }
   
    
      },[])
      useEffect ( () => {
        async function fetchNotifications() {
          const notification = await getNotifications()
          setNotification(notification)
        }
        fetchNotifications()
          },[])
      const subscriptionHandle = () => {
        if(isSubscription?.is_premium==1 && isSubscription?.days_left > 0){
          // sub details page
          router.push('/subscriptionDetails', { scroll: false })
        }else if(isSubscription?.is_premium==0  || isSubscription?.days_left <= 0){
          //payment page
          router.push(`/${country}/subscription`, { scroll: false })
        }
        

      }
      const notificationHandle = async (id,e) => {
        e.preventDefault();
        if(!readNotification?.includes(id)){
          await deleteNotifications(id)
          setReadNotification( prev => [...prev,id])
        }
        
      }
return <>
  {
    
   
    <>
      <div className="d-flex">
 
     {isSubscription==null ? <Skeleton width="100px" height="40px" className="block" />: <button type="button" onClick={subscriptionHandle} className={`${isSubscription?.is_premium==1 ? 'subSciptionBtn btn fw-bold':'nonSubSciptionBtn btn fw-bold'}`}>Premium</button>}
     <Dropdown >
      <Dropdown.Toggle variant="default" id="dropdown-basic" className='userAvatarBtn'>
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor"  className="bi bi-bell mx-3" viewBox="0 0 16 16">
  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
  </svg>
 {notifications?.length > 0 && notifications?.length!=readNotification?.length &&  <span style={{left : "66%"}} className="alertB position-absolute top-0 translate-middle p-2 bg-danger border border-light rounded-circle">
    <span class="visually-hidden">New alerts</span>
  </span> }     </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-end" style={{width : "20rem"}}>
      <div style={{ backgroundColor: '#2681ff', color: 'white', padding: '10px', textAlign: 'center', marginBottom: '10px', marginTop: '-10px' }}>
          Notification
        </div>
        {notifications==null && <Skeleton count={5}   className="block" />}
        {notifications?.length==0  && <div>Notification Not found!</div>}
        {
          notifications?.map( notify => {
            return    <Dropdown.Item   className = {`${readNotification?.includes(notify?.notification_id) ? '':'fw-bold'}`} style={{textWrap: 'wrap'}} 
            as="button" key={notify?.notification_id}    onClick={(e) => {
              notificationHandle(notify?.notification_id, e);
              e.stopPropagation(); // Stop the event propagation to prevent dropdown from closing
            }}>{notify?.message}</Dropdown.Item>
          })
        }
  <div style={{ position: 'absolute', top: '-10px', left: '93%', marginLeft: '-12px' }}>
          <div style={{ width: '0', height: '0', borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '15px solid #2681ff' }}></div>
        </div>
     
      </Dropdown.Menu>
    </Dropdown>
 
 
 
</div>
<UserAvatar />
    </>
    
      
    
    
 
  }
 
</>
  
 
 
}
export default AfterLogin;