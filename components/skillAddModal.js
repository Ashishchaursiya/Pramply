import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Styles from "../app/(PageswithNavbar)/profile/page.module.css";
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import Spinner from './spinner';
import { updateSkills } from '@/utils/userProfileAction';

function SkillAddModal({showSkill,setShowSkill,duplicateUserSkill, setDuplicateUserSkill,setIsSkillsUpdated}) {
  const [loading,setLoading] = useState(false)
  const [skillText,setSkillText] = useState('')
    
   const submitHandle = async () => {
    setShowSkill(false)
    let updateRes = await updateSkills(duplicateUserSkill,setLoading)
    if(updateRes){
        setIsSkillsUpdated( prev => prev +1)
       // toast.success("Successfully Updated")
    }


   }   
  const addHandle = () => {
    setDuplicateUserSkill(prev => [...prev,skillText])
    setSkillText('')
  }
  const deleteHandle = (idx) => {
    setDuplicateUserSkill(prev => prev.filter( (item,index) => index!==idx))
  }

  return (
    <>
       {loading && <Spinner />}

      <Modal show={showSkill} onHide={ () => setShowSkill(false)} scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Skills</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {duplicateUserSkill?.length > 0 && (
          <>
            
            <div className="d-flex flex-wrap py-3">
              {duplicateUserSkill?.map((skill, idx) => (
                <div className={`${Styles.skillContainer} rounded-pill mx-2`} key={idx}>
                  {skill}    <i className="bi bi-x-lg" onClick={ () => deleteHandle(idx)}></i>
                </div>
              ))}
            </div>
          </>
        )}
        <div className='d-flex'>
            <div className='flex-grow-1'>
            <input type="text" placeholder="Add Skill" className='form-control' value={skillText} onChange={ (e) => setSkillText(e.target.value)}/>
            </div>
            <div>
            <button className='btn btn-primary ms-4' disabled={skillText?.trim()?.length>0 ? false:true} onClick={addHandle}>Add</button>
                </div>
        </div>
       
        
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSkill(false)}>
            Cancel
          </Button>
          <Button variant="primary"  onClick={submitHandle}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SkillAddModal;