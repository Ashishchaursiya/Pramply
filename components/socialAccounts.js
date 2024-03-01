import { useEffect, useState } from "react";
import Styles from "../app/(PageswithNavbar)/profile/page.module.css";
import { deleteSocialAccounts, getSocialAccounts, getUseSkills } from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import SkillAddModal from "./skillAddModal";
import AddSocialAccounts from "./addSocialAccountModal";
import Spinner from "./spinner";
import { useDispatch } from "react-redux";
import { setSocialAccountsInStore } from "@/redux/reducers/socialAccountsSlice";
const SocialAccounts = () => {
  const dispatch = useDispatch();
  const [socialAccounts, setSocialAccounts] = useState(null);
  const [socialAccountNames, setSocialAccountNames] = useState([]);
  const [loading,setLoading] = useState(false)
  const [addSocialAccountsModal, setAddSocialAccountsModal] = useState(false);

  const [IsSocialAccountsUpdated, setIsSocialAccountsUpdated] = useState(0);
  let imgPathObjects = {linkedin:'/img/linkden.png',github:'/img/github.png',twitter:'/img/twitter.png'}
  useEffect(() => {
    async function fetchSocialAccounts() {
      let social = await getSocialAccounts();
      let socialObjects = {imgPath:'',url:''}
        let linkdenExist = social?.find( item => item?.account_name?.toLowerCase()=='linkedin')
      if(linkdenExist){
        socialObjects.imgPath='/img/linkden.png'
        socialObjects.url=linkdenExist?.account_url
     
      }
      let githubExist = social?.find( item => item?.account_name?.toLowerCase()=='github')
      if(githubExist && socialObjects?.url==''){
        socialObjects.imgPath='/img/github.png'
        socialObjects.url=githubExist?.account_url
   
      }
      let twitterExist = social?.find( item => item?.account_name?.toLowerCase()=='twitter')
      if(twitterExist && socialObjects?.url=='' ){
        socialObjects.imgPath='/img/twitter.png'
        socialObjects.url=twitterExist?.account_url
    
      }
      
      dispatch(setSocialAccountsInStore(socialObjects));
      setSocialAccounts(social);
      let allSocialAccNames = social?.map( acc => acc?.account_name?.toLowerCase())
      setSocialAccountNames(allSocialAccNames)
    
    }
    fetchSocialAccounts();
  }, [IsSocialAccountsUpdated]);
  const deleteHandle = async (name) => {
    let confirmRes = confirm("Are you sure, Do you want to delete?")
    if(confirmRes){
      let social = await deleteSocialAccounts(name,setLoading);
      setIsSocialAccountsUpdated(prev => prev +1)
    }
  }
  return (
    <>
      {loading && <Spinner />}
      <AddSocialAccounts
        {...{  addSocialAccountsModal,
          setAddSocialAccountsModal,
          setIsSocialAccountsUpdated, socialAccountNames}}
      />
      <div className="container socialAccounts shadow my-3 p-3">
      <div className="d-flex py-2">
              <div className="me-auto">
                <h5>Social Accounts</h5>
              </div>
              {socialAccounts?.length > 0 && socialAccountNames?.length<3 &&  <div className="text-primary fw-bold addHover" onClick={ () => setAddSocialAccountsModal(true)}>Add Social Account</div>}
             
            </div>
      
        {socialAccounts?.length > 0 && (
          <>
            
            
              {socialAccounts?.map((socialAcc, idx) => (
                <>
                <p>   {socialAcc.account_name} <i className="bi bi-trash mx-2" onClick={ () => deleteHandle(socialAcc.account_name)}></i></p>
                <div className="d-flex">
                  <div className="pe-2"> 
                   
                  <img
                src={imgPathObjects[socialAcc.account_name?.toLowerCase()]}
                alt="Rounded Image"
                width="30px"
                height="30px"
                // onClick={openImgHandler}
              />
                  
               
                  </div>
                  <div>
                  <p>   {socialAcc.account_url} </p>
                  </div>
                </div>
                 
              
                </>
               
              ))}
            
          </>
        )}

        {socialAccounts?.length == 0 && (
          <h6  className={`p-2 text-center text-primary fw-bold addHover ${socialAccounts?.length == 0 ? 'py-5':''}`}   onClick={() =>setAddSocialAccountsModal(true) }>Add Social Accounts</h6>
        )}
        {socialAccounts == null && <Skeleton count={5} />}
      </div>
    </>
  );
};
export default SocialAccounts;
