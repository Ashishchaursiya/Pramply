import { useEffect, useState } from "react";
import { getUserEducation } from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import AddEducation from "./addEducationModal";
import EditEducation from "./editEducationModal";
import { formatDateRange } from "@/utils/commonHelperFn";
const UserEducation = () => {
  const [educationData, setEducationData] = useState(null);
  const [addEducationModal, setAddEducationModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editEducationModal, setEditEducationModal] = useState(false);
  const [isEducationUpdated, setIIsEducationUpdated] = useState(0);
  useEffect(() => {
    async function fetchEducation() {
      let education = await getUserEducation();
         
      setEducationData(education);
    }
    fetchEducation();
  }, [isEducationUpdated]);
  return (
    <>
        <AddEducation  {...{addEducationModal, setAddEducationModal,setIIsEducationUpdated}}/>
   {editData && editEducationModal &&  <EditEducation {...{ editEducationModal, setEditEducationModal,setIIsEducationUpdated,editData}} />}  
      <div className="container educations shadow my-3 p-3">
      <div className="d-flex py-2">
              <div className="me-auto">
                <h5>Education</h5>
              </div>
              {educationData?.length > 0 &&   <div className="text-primary fw-bold addHover" onClick={ () => setAddEducationModal(true)}>Add Education</div>}
             
            </div>
        {educationData?.length > 0 && (
          <>
            

            {educationData?.map((education, idx) => (
              <div key={idx} className="employmentSection">
                <h6 className="fw-bold">
                  {education.institution_name} <i className="bi bi-pencil mx-2"  onClick={ () => { 
                    setEditData(education)
                    setEditEducationModal(true)}}></i>
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
          <div  className={`p-2 text-center text-primary fw-bold addHover ${educationData?.length == 0 ? 'py-5':''}`} onClick={ () => setAddEducationModal(true)}>
            Add Education
          </div>
        )}
        {educationData == null && <Skeleton count={5} />}
      </div>
    </>
  );
};
export default UserEducation;
