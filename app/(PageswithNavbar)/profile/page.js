"use client";

import Footer from "@/components/footer";
import PreviousPracticeList from "@/components/previousPracticesList";
import SocialAccounts from "@/components/socialAccounts";
import UserEducation from "@/components/userEducation";
import UserEmployment from "@/components/userEmployment";
import UserProfile from "@/components/userProfile";
import UserRatings from "@/components/userRating";
import UserSkills from "@/components/userSkills";

 
const Profile = () => {
  
  return (
    <>
      <UserProfile />
      <UserRatings />
      <UserSkills />
      <UserEmployment />
    <UserEducation />
    <SocialAccounts />
    <PreviousPracticeList />
    <Footer   />
    
    </>
  );
};
export default Profile;
