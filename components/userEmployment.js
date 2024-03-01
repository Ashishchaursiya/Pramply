import { useEffect, useState } from "react";
import { deleteEmployment, getUserEmployment } from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import AddEmployment from "./addEmploymentModal";
import EditEmployment from "./editEmploymentModal";
import { formatDateRange } from "@/utils/commonHelperFn";
import DeleteModal from "./deleteModal";
import Spinner from "./spinner";
const UserEmployment = () => {
  const [employmentData, setEmploymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [addEmploymentModal, setAddEmploymentModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editEmploymentModal, setEditEmploymentModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isEmploymentUpdated, setIsEmploymentUpdated] = useState(0);
  useEffect(() => {
    async function fetEmployment() {
      let employment = await getUserEmployment();

      setEmploymentData(employment);
    }
    fetEmployment();
  }, [isEmploymentUpdated]);
  const deleteHandler = async () => {
    setShowDeleteModal(false)
    setEditEmploymentModal(false)
   
   
   
    let deleteRes = await deleteEmployment(editData?.company_id, setLoading);
    if (deleteRes) {
     // toast.success("SuccessFully Deleted");
      setIsEmploymentUpdated((prev) => prev + 1);
    }
   

   
  };
  return (
    <>
     {loading && <Spinner />}
    <AddEmployment  {...{addEmploymentModal, setAddEmploymentModal,setIsEmploymentUpdated}}/>
    <DeleteModal
        {...{ showDeleteModal, setShowDeleteModal, deleteHandler,setEditEmploymentModal }}
        message="Are you sure want to delete?"
        title="Warning"
      />
   {editData && editEmploymentModal &&  <EditEmployment {...{ editEmploymentModal, setEditEmploymentModal,setIsEmploymentUpdated,editData,setShowDeleteModal}} />}  
      <div className="container employment shadow my-3 p-3">
      <div className="d-flex py-2">
              <div className="me-auto">
              <h5>Employment</h5>
              </div>
              {employmentData?.length > 0 &&   <div className="text-primary fw-bold addHover" onClick={ () => setAddEmploymentModal(true)}>Add Employment</div>}
             
            </div>
      
      
        {employmentData?.length > 0 && (
          <>
           

            {employmentData?.map((employment, idx) => (
              <div key={idx} className="employmentSection">
                <h6 className="fw-bold">
                  {employment?.role} <i className="bi bi-pencil mx-2"
                   onClick={ () => { 
                    setEditData(employment)
                    setEditEmploymentModal(true)}}
                    ></i>
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
          <div className={`p-2 text-center text-primary fw-bold addHover ${employmentData?.length == 0 ? 'py-5':''}`} onClick={ () => setAddEmploymentModal(true)}>
            Add Employment
          </div>
        )}
        {employmentData == null && <Skeleton count={5} />}
      </div>
    </>
  );
};
export default UserEmployment;
