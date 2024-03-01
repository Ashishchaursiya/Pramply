import { logoutUser } from '@/utils/authAction';
import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Cookies from "js-cookie";
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '@/redux/reducers/tokenSlice';
import { useRouter } from 'next/navigation';
import { getUserDetails, getUserProfilePic } from '@/utils/userProfileAction';
import Skeleton from 'react-loading-skeleton';
 
function UserAvatar() {
  const [profilePic,setProfilePic] = useState('')
    const router = useRouter()
    const storeToken = useSelector((state) => state.tokenInStore.authToken) ||  Cookies.get("token");
    const dispatch = useDispatch();
    const logoutHandle = (e) => {
      e.preventDefault();
        dispatch(setToken(''));
        Cookies.remove("token");
        router.push('/login', { scroll: false })
       // location.reload();
        
         

    }
    const profileHandle = (e,path) => {
      e.preventDefault();
      router.push(`/${path}`, { scroll: false })
    }
    const ImgObj = {"male":"/img/maleAvatar.png","female":"/img/femaleAvatar.png","other":"/img/maleAvatar.png"}
   
    useEffect(  () => {
        async function fetUserData() {
            let userData =  await getUserDetails(storeToken)
            if(userData){
                 
               let profilePic =  await getUserProfilePic(userData?.user_name)
               let finalProfile = profilePic=='' ? ImgObj[userData.gender?.toLowerCase()]:profilePic
               setProfilePic(finalProfile)
              
            }else{
              router.push('/login', { scroll: false })
            }
            
        }
        fetUserData()
   
    },[storeToken])
  return (<div>
 <Dropdown>
      <Dropdown.Toggle variant="default" id="dropdown-basic" className='userAvatarBtn'>
        {profilePic=='' ? <Skeleton count={1} width="38px" height="40px" circle={true}/>:
         <img
          src={profilePic}
          alt="User Avatar"
          width="38"
          height="38"
          className='ProfileImg'
          style={{ borderRadius: '50%' }}
        />
        }
        
        <span className='ProfileText'>Profile</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-end">
        <Dropdown.Item as="button"   onClick={ (e) => profileHandle(e,'profile')}>Profile</Dropdown.Item>
        <Dropdown.Item as="button"   onClick={ (e) => profileHandle(e,'previousPractices') }>Previous Practice</Dropdown.Item>
        <Dropdown.Item as="button"   onClick={ (e) => profileHandle(e,'settings') }>Change Email/Password</Dropdown.Item>
        {/* <Dropdown.Item as="button"   onClick={  (e) => profileHandle(e,'ChangePassword')}>Change Password</Dropdown.Item> */}
        <Dropdown.Item as="button"   onClick={logoutHandle}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div>
    
  );
}

export default UserAvatar;
