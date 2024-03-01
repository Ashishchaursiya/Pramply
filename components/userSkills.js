import { useEffect, useState } from "react";
import Styles from "../app/(PageswithNavbar)/profile/page.module.css";
import { getUseSkills } from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import SkillAddModal from "./skillAddModal";
const UserSkills = () => {
  const [userSkill, setUserSkill] = useState(null);
  const [duplicateUserSkill, setDuplicateUserSkill] = useState([]);
  const [showSkill, setShowSkill] = useState(false);

  const [IsSkillsUpdated, setIsSkillsUpdated] = useState(0);
  useEffect(() => {
    async function fetSkills() {
      let skills = await getUseSkills();

      setUserSkill(skills);
      setDuplicateUserSkill(skills)
    }
    fetSkills();
  }, [IsSkillsUpdated]);
  return (
    <>
      <SkillAddModal
        {...{ showSkill, setShowSkill, duplicateUserSkill, setDuplicateUserSkill, setIsSkillsUpdated }}
      />
      <div className={`container skill shadow my-3 p-3`}>
      <h5>
              Skills {userSkill?.length>0 && <i className="bi bi-pencil mx-2" onClick={() =>setShowSkill(true) }></i> } 
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
             <h6 className="text-center text-primary addHover fw-bold"  onClick={() =>setShowSkill(true) }>Add Skill</h6>
            </div>
          
        )}
        {userSkill == null && <Skeleton count={5} />}
      </div>
    </>
  );
};
export default UserSkills;
