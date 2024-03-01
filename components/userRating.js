import React, { useEffect, useState } from "react";
import Styles from "../app/(PageswithNavbar)/profile/page.module.css";
import Skeleton from "react-loading-skeleton";
import { getUseRating } from "@/utils/userProfileAction";
const UserRatings = () => {
    const [userRating,setUserRating] = useState(null)
   const getWidthLabel = (rating) => {
    const convertedRating = rating?.toFixed(2)
    if(convertedRating>0 && convertedRating<=3.33){
      return {label:"Beginner",width:`${rating*10}%`}

    } else  if(convertedRating>3.33 && convertedRating<=6.66){
      return {label:"Intermediate",width:`${rating*10}%`}

    } else  if(convertedRating>6.66 && convertedRating<=10){
      return {label:"Expert",width:`${rating*10}%`}

    }

   }
    useEffect(  () => {
      async function fetUserRatings() {
          let ratingRes =  await getUseRating()
       
          setUserRating(ratingRes)
        
          
      }
      fetUserRatings()
 
  },[])
    return <>
   
     <div className={`container rating shadow my-3 p-3`}>
     <h5> Rating</h5>
     {
        userRating?.length>0 &&  <>
 
          {userRating?.map((rating, idx) => (
  <div key={idx} className= {` py-3`}>
    <div className="skillHeading fw-bold py-1">{rating?.topic_name}</div>
    {/* <div className={`${Styles.headKillBar} d-flex justify-content-between`} style={{ width:'90%' }}>
      <p>Beginner</p>
      <p>Intermidiate</p>
      <p>Expert</p>
    </div> */}
    <div className="d-flex">
    <div  className={`${Styles.skillBarParent}`}>
    <div className={`${Styles.skillbar}`} style={{ width:getWidthLabel(rating?.rating).width }}>

    </div>
   <p className={`${Styles.labelBetween}`}> {getWidthLabel(rating?.rating).label}</p>
    </div>
    {/* <div className={`${Styles.ratingLabel}`}>
    {getWidthLabel(rating?.rating).label}
    </div> */}
    </div>
   
     
  </div>
))}


        </>
      
    }
    {userRating?.length==0 && <div className={`${userRating?.length == 0 ? 'py-5':''}`}>
      <h6 className="text-center">No Rating Found</h6> </div>}
    {userRating==null &&   <Skeleton count={5}  />}
       
      </div>
    </>

}
export default UserRatings;