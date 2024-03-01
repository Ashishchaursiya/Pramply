import Skeleton from "react-loading-skeleton";
import Styles from "../app/(PageswithNavbar)/profile/page.module.css";
import { useEffect, useState } from "react";
import ProfileDetailsModal from "./profileDetailsModal";
import { useRouter } from 'next/navigation'
import { getUserDetails, getUserProfilePic } from "@/utils/userProfileAction";
import { useSelector } from "react-redux";
const UserProfile = () => {
  const socialAccounts  = useSelector((state) => state.socialAccounts.socialAccounts);
    const [userDetails,setUserDetails] = useState(null)
    const [isProfileUpdated,setIsProfileUpdated] = useState(0)
    const [profilePic,setProfilePic] = useState('')
    const [showProfileDetails,setShowProfileDetails] = useState(false)
    const router = useRouter()
    const ImgObj = {"male":"/img/maleAvatar.png","female":"/img/femaleAvatar.png","other":"/img/maleAvatar.png"}
   
    useEffect(  () => {
        async function fetUserData() {
            let userData =  await getUserDetails()
            if(userData){
                 
               let profilePic =  await getUserProfilePic(userData?.user_name)
               let finalProfile = profilePic=='' ? ImgObj[userData.gender?.toLowerCase()]:profilePic
               setProfilePic(finalProfile)
               setUserDetails(userData)
            }else{
              router.push('/login', { scroll: false })
            }
            
        }
        fetUserData()
   
    },[isProfileUpdated])
return <>
 <div className="container userProfile shadow my-3 p-3">
    {
        userDetails ?  <>
        {userDetails && <ProfileDetailsModal  {...{showProfileDetails,setShowProfileDetails,userDetails,setIsProfileUpdated}}/>}
         <div className="d-flex flex-wrap">
          <div className="p-3">
            <div className={` rounded-image`}>
              <input
                type="file"
                id={`${Styles.fileInput}`}
                // onchange={(e) => fileChangehandler(e)}
              />
              <i className={`${Styles.editIcon} bi bi-pencil`}></i>
              <img
                src={profilePic}
                alt="Rounded Image"
                width="100%"
                height="100%"
                // onClick={openImgHandler}
              />
            </div>
          </div>
          <div className="p-3">
            <h5>
              {userDetails?.first_name+" "+userDetails?.last_name}<i className="bi bi-pencil mx-2" onClick={ () => setShowProfileDetails(true)}></i>
            </h5>
            <p>Username: {userDetails?.user_name}</p>
            {socialAccounts?.url &&   <p>
              {" "}
              <img
                src={socialAccounts?.imgPath}
                width="30px"
                height="30px"
                className=""
              />{" "}
             {socialAccounts?.url}
            </p>}
           
           
            <p><i class="bi bi-envelope"></i> {userDetails?.email}</p>
           
            {/* <p>
              {" "}
              <img
                src="/img/seLogo2.png"
                width="30px"
                height="30px"
                className=""
              />{" "}
              Softwere Engineers
            </p> */}

            <h6>Exeperience: {userDetails?.total_experience}</h6>
          </div>
        </div>
        </>: <>
        <Skeleton count={5}  />
        </>
    }
  
        
      </div>
</>
}
export default UserProfile;