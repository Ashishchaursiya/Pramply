"use client";
import Skeleton from "react-loading-skeleton";
import Styles from "../../../profile/page.module.css";
import React, { useEffect, useState } from "react";
import { formatDateRange } from "@/utils/commonHelperFn";
import { getPeerDetails } from "@/utils/otherUserAction";
import Footer from "@/components/footer";
import { API_URL } from "@/utils/constants";
 
const PeerProfile = ({ params }) => {
 const username = params?.username
 
    const [userRating,setUserRating] = useState(null)
    const [userSkill, setUserSkill] = useState(null);
    const [employmentData, setEmploymentData] = useState(null);
    const [educationData, setEducationData] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [userProfilePic, setUserProfilePic] = useState(null);
     
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
      async function fetUserDetails() {
        const userDetailsUrl = `${API_URL}/peer/profile?username=${username}`;
          const userDetails = await getPeerDetails(userDetailsUrl)
          setUserProfile(userDetails?.data)
          const userEducationUrl = `${API_URL}/peer/education?username=${username}`;
          const userEducation = await getPeerDetails(userEducationUrl)
          setEducationData(userEducation)
          const userPicUrl = `${API_URL}/peer/profile-image?username=${username}`;
          const userPic = await getPeerDetails(userPicUrl)
          setUserProfilePic(userPic?.data)
          const userEmploymentUrl = `${API_URL}/peer/employment?username=${username}`;
          const userEmployment = await getPeerDetails(userEmploymentUrl)
          setEmploymentData(userEmployment)
          const userSkillUrl = `${API_URL}/peer/skills?username=${username}`;
          const userSkill = await getPeerDetails(userSkillUrl)
          setUserSkill(userSkill)
          const userRatingsUrl = `${API_URL}/peer/ratings?username=${username}`;
          const userRating = await getPeerDetails(userRatingsUrl)
          setUserRating(userRating)
           
       
        
        
          
      }
      fetUserDetails()
 
  },[])
    return <>
     <div className="container userProfile shadow my-3 p-3">
      {userProfile==null ? <Skeleton count={5}  /> :  <div className="d-flex flex-wrap">
          <div className="p-3">
            <div className={` rounded-image`}>
              <input
                type="file"
                id={`${Styles.fileInput}`}
                
              />
              <i className={`${Styles.editIcon} bi bi-pencil`}></i>
              <img
                src={userProfilePic ? userProfilePic: '/img/maleAvatar.png'}
                alt="Rounded Image"
                width="100%"
                height="100%"
               
              />
            </div>
          </div>
          <div className="p-3">
            <h5>
             { `${userProfile?.first_name} ${userProfile?.last_name}`}
            </h5>
            <p>Username: {userProfile?.user_name}</p>
            <h6>Exeperience: {userProfile?.total_experience}</h6>
          </div>
        </div>}
    
  
        
      </div>
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
      <div className={`container skill shadow my-3 p-3`}>
      <h5>
              Skills  
            </h5>
        {userSkill?.length > 0 && (
          <>
           
            <div className="d-flex flex-wrap py-3">
              {userSkill?.map((skill, idx) => (
                <div key={idx} className={`${Styles.skillContainer} rounded-pill mx-2`}>
                  {skill}
                </div>
              ))}
            </div>
          </>
        )}

        {userSkill?.length == 0 && (
          <div  className={`${userSkill?.length == 0 ? 'py-5':''}`}>
             <h6 className="text-center"   >No Skills Found</h6>
            </div>
          
        )}
        {userSkill == null && <Skeleton count={5} />}
      </div>
      <div className={`container employment shadow my-3 p-3`}>
      <h5>
      Employment  
            </h5>
        {employmentData?.length > 0 && (
          <>
           
           {employmentData?.map((employment, idx) => (
              <div className="employmentSection" key={idx}>
                <h6 className="fw-bold">
                  {employment?.role}  
                </h6>
                <p>{employment?.company_name}</p>

                <p>
                  <i className="bi bi-calendar me-2"></i>
                  { 
                    employment?.is_current_company == 1
                      ? employment?.start_date +
                        " - " +"Current"
                      :     formatDateRange(new Date(employment?.start_date),new Date(employment?.end_date))}
                    
                  
                </p>
              </div>
            ))}
          </>
        )}

        {employmentData?.length == 0 && (
          <div  className={`${employmentData?.length == 0 ? 'py-5':''}`}>
             <h6 className="text-center"   >No Employment Found</h6>
            </div>
          
        )}
        {employmentData == null && <Skeleton count={5} />}
      </div>
      <div className={`container education shadow my-3 p-3`}>
      <h5>
      Education
            </h5>
        {educationData?.length > 0 && (
          <>
           
           {educationData?.map((education, idx) => (
              <div key={idx} className="employmentSection">
                <h6 className="fw-bold">
                  {education.institution_name}
                  
                </h6>
                <p> {education.degree_name}</p>
                <p> {education.specialization}</p>

                <p>
                  <i className="bi bi-calendar me-2"></i>
                  
                      {formatDateRange(new Date(education?.start_date),new Date(education?.end_date))}
                      
                     
                </p>
                
                
              </div>
            ))}
          </>
        )}

        {educationData?.length == 0 && (
          <div  className={`${educationData?.length == 0 ? 'py-5':''}`}>
             <h6 className="text-center"   >No Education Found</h6>
            </div>
          
        )}
        {educationData == null && <Skeleton count={5} />}
      </div>
      <Footer   />
     
    </>
  }
  export default PeerProfile;