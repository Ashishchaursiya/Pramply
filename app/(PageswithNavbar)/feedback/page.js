"use client";
import Footer from "@/components/footer";
import MessageModal from "@/components/messageModal";
import Spinner from "@/components/spinner";
import { addPreviousPractice, addRating, reportPeerUser } from "@/utils/otherUserAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Feedback = () => {
  
  const isMobile = useMediaQuery({ maxWidth: 767 });
   const router = useRouter()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [loading,setLoading] = useState(false)
  const [title, setTitle] = useState('')
  var topicObj =
    typeof window !== "undefined" && sessionStorage.getItem("topic");
  topicObj = topicObj ? JSON.parse(topicObj) : {};
  const reportUserHandle = async () => {
    setLoading(true)
    await reportPeerUser(topicObj?.peer);
    setLoading(false)
    setShow(true)
    setTitle("Message")
    setMessage("User Reported Successfully")
    setTimeout( () => {
      setShow(false)
    },3000)
    router.push(`/`, { scroll: false })
   
  };
  const addRatingHandle = async (rating) => {
    setLoading(true)
    const payload = {
      rating,
      level: topicObj?.level,
      topic_name: topicObj?.topic,
    };
    await addRating(payload, topicObj?.peer);
    setLoading(false)
    setShow(true)
    setTitle("Message")
    setMessage("Rating Added Successfully")
    setTimeout( () => {
      setShow(false)
    },3000)
    router.push(`/`, { scroll: false })
    
  };
  const actionHandle = () => {
      router.push(`/`, { scroll: false })
  }
  useEffect( () => {
    const storedPractice = sessionStorage.getItem('practice');
const isAlreadyAdded = storedPractice ? JSON.parse(storedPractice) : null;
    const storageData = JSON.parse(sessionStorage.getItem('questionObj') || '')
async function addPreviousPracticeToPeer() {
  const {peer,questionName,questionUrl,questionTime} = storageData
  const payload = {
    question_name: questionName || 'Communication',
    is_solve: true,
    question_url:questionUrl || 'NA',
    time_limit: questionTime || 'NA',
    peer_user_name: peer
  }
  const previousRes = await addPreviousPractice(payload)
  sessionStorage.setItem('practice','true')

}
if(!isAlreadyAdded && storageData){
  addPreviousPracticeToPeer()
}
return () => {
  sessionStorage.removeItem('practice')
}
 
  },[])
  return (
    <>
     {loading && <Spinner />}
    <MessageModal  {...{message, title, show, setShow,actionHandle}}/>
    <div style={{"minHeight": "calc(65vh - 100px)"}}>
      <div className="container text-center mb-2">
        <div className="feedback feedbackMain mx-auto shadow">
          <div className="bg-primary text-white py-3">
            Give a feedbak to your peer
          </div>
          <h6 className="my-3"> {topicObj?.topic}</h6>
          <div className=" mainNumber flex-row text-center">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map((number, index) => {
              return (
                <div
                  key={index}
                  style={{width: "inherit"}}
                  className="p-2 bd-highlight border number addHover"
                  onClick={() => addRatingHandle(number)}
                >
                  {" "}
                  {number}
                </div>
              );
            })}
          </div>
          <div className=" badExcellent mx-3 bd-highlight mb-3">
            <div className="p-2 bd-highlight text-danger">very Bad</div>

            <div className="ms-auto p-2 bd-highlight text-primary">
              excellent
            </div>
          </div>
          <button className="btn btn-outline-danger mt-2" onClick={reportUserHandle}>
            Report User
          </button>
        </div>
      </div>
      </div>
      <Footer  bottom={isMobile ? false:true} />
    </>
  );
};
export default Feedback;
