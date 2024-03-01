 
"use client";
import { useEffect, useState } from "react";
import { getPreviousPractices, getUserEducation } from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
const PreviousPracticeList = () => {
    const [practiceData, setPractices] = useState(null);
 
  useEffect(() => {
    async function fetchPractices() {
      let practice = await getPreviousPractices(10,1);
    
      setPractices(practice);
    }
    fetchPractices();
  }, []);
    return <>
      <div className="container practice shadow my-3 p-3">
      <div className="d-flex py-2">
              <div className="me-auto">
                <h5> Previous Practices</h5>
              </div>
             
            </div>
        {practiceData?.length > 0 && (
          <>
            
            <table className="table caption-top">
  
  <thead>
    <tr>
       
      <th scope="col">Question Name</th>
      <th scope="col">Date</th>
      <th className="headMobHide" scope="col">Time</th>
      <th scope="col" className="text-end">Peer</th>
      {/* <th scope="col">Solved</th> */}
    </tr>
  </thead>
  <tbody>
  {practiceData?.map((practice, idx) => (
                <tr key={idx}>
      
                <td>{practice.question_name}</td>
                <td>{practice.practice_date}</td>
                <td className="timePrevious">{practice.time_limit}</td>
                <td className="text-end"> <Link href={`/peer/profile/${practice.peer_user_name}`}>{practice.peer_user_name}</Link></td>
                {/* <td>{practice.is_solve ? 'YES':'NO'}</td> */}
              </tr>
              ))}
   
    
  </tbody>
</table>
            
          </>
        )}

        {practiceData?.length == 0 && (
          <div className="p-2 text-center text-primary fw-bold">
            No Practices Found!
          </div>
        )}
        {practiceData == null && <Skeleton count={5} />}
      </div>
    </>

}
export default PreviousPracticeList;