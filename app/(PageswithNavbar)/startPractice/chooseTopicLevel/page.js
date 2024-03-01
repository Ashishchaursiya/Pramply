"use client";
import SelectInput from "@/components/selectInput";
import Styles from "./chooseTopic.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState, useRef } from "react";
import { getTopicsNames, getUserDetails } from "@/utils/userProfileAction";
import { createConnection } from "@/utils/videoCallAction";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import Cookies from "js-cookie";
import Spinner from "@/components/spinner";
import { useRouter } from "next/navigation";
import FullPageLoader from "@/components/fullPageLoader";
import { toast } from "react-toastify";
import QuestionModal from "@/components/questionModal";
import Footer from "@/components/footer";
import { WEB_SOCKET_URL } from "@/utils/constants";
import MessageModal from "@/components/messageModal";
import LoadingScreen from "../../loading";
const StartPractice = () => {
  const router = useRouter();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [topics, setTopics] = useState([]);
  const [show, setShow] = useState(false)
  const [selectedQuesObj, setSelectedQuestionObj] = useState({});
  // const [matchingResult, setMatchingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showQuestionModal, setShowQuestionModal] = useState(false);

  let matchingResult = useRef(null);
  let loginUser = useRef(null);

  const [username, setUsername] = useState("");

  const [userCount, setuserCount] = useState(0);
  const token = Cookies.get("token");

  const validationSchema = Yup.object().shape({
    topic: Yup.string().required("Topic is required"),
    level: Yup.string().required("Level is required"),
    question: Yup.string().required("Question is required"),
  });
  const formik = useFormik({
    initialValues: {
      topic: "",
      level: "",
      question: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const topicId = topics?.find((topc) => topc.topic_name == values.topic);
        let connRes = await createConnection(
          values.topic=='Communication' ? 'communication':topicId.topic_id,
          username,
          values.level?.toLowerCase()
        );
        if(!connRes){
          setLoading(false)
        return setShow(true)
        }
        matchingResult.current = { ...connRes, user: username };
        sessionStorage.setItem(
          "matchObj",
          JSON.stringify({ ...connRes, user: username })
        );
        sessionStorage.setItem(
          "topic",
          JSON.stringify({
            topic: formik.values.topic,
            level: values.level,
            peer: connRes.peer,
          })
        );
        sessionStorage.setItem('questionObj',JSON.stringify({...selectedQuesObj,peer:connRes.peer}))
        //dispatch(setVideoDetails(JSON.stringify({client:stompClientObj,peer:{...connRes,user:username}})))
        router.push(`/videoCall?roomId=${connRes.roomId}`, { scroll: false });
      } catch (e) {
        setLoading(false);
        //toast.error("something went wrong");
      }
    },
  });

  useEffect(() => {
    var stomp;
    var userCountSubRef;
    async function makeconnection() {
      let userData = await getUserDetails();
      setUsername(userData?.user_name);
      loginUser.current = userData?.user_name;
      let jwtToken = `${token}&username=${userData?.user_name}`;
      let url1 = `${WEB_SOCKET_URL}=${jwtToken}`;

      const connect = () => {
        const socket = new SockJS(url1);
        stomp = over(socket);

        const headers = {
          Authorization: `Bearer ${jwtToken}`,
        };

        stomp.connect(headers, (frame) => {
          userCountSubRef = stomp.subscribe("/topic/user/count", (message) => {
            setuserCount(JSON.parse(message.body)?.user_count);
          });
        });
      };

      connect();
    }
    makeconnection();
    return () => {
      if (stomp?.connected) {
        userCountSubRef.unsubscribe();
        stomp.unsubscribe();
        stomp.disconnect();
        
        
      }
    };
  }, []);
  useEffect(() => {
    async function fetchTopics() {
      let topics = await getTopicsNames();

      setTopics(topics);
    }
    fetchTopics();
  }, []);
  const ChooseQuestionHandle = () => {
    setShowQuestionModal(true);
  };
  useEffect(() => {}, [isMobile]);
  return (
    <>
      {loading && <FullPageLoader label={"Loading..."} />}
      {userCount>0 && 
      <div  className={ isMobile ? '':'expandContent'}>
      <MessageModal {...{show, setShow}} title="Message" message="User not found" />
      <QuestionModal
        {...{ showQuestionModal, setShowQuestionModal, formik,setSelectedQuestionObj }}
        topic={topics
          ?.find((topic) => topic.topic_name == formik.values.topic)
          ?.topic_id?.replace("_", "-")}
        level={formik.values.level}
      />
      <>   <div
        className={`${Styles.mainContainerChooseQues} container p-4 my-2  justify-content-center`}
      >
        <div
          className={`${(Styles.onlineDiv, Styles.mobOnline)}  fw-bold  mx-4`}
        >
          <p> Online Users: {userCount}</p>
        </div>
        <div className={`${Styles.mainDivChooseQues}  shadow`}>
          <div className={`${Styles.startPrcDiv}  text-center`}>
            <p className="fw-bold fs-4">START PRACTICE</p>
          </div>
          <div className="p-3">
            <form onSubmit={formik.handleSubmit}>
              <SelectInput
                label="Topic"
                name="topic"
                value={formik.values.topic}
                onChange={(e) => {
                  if (e.target.value == "Communication") {
                    formik.setFieldValue("level", "random");
                    formik.setFieldValue("question", "random");
                  } else {
                    if(formik.values.level=='random'){
                      formik.setFieldValue("level", "");
                    }
                    if(formik.values.question=='random'){
                      formik.setFieldValue("question", "");
                    }
 
                  }
                  formik.handleChange(e);
                }}
                // onBlur={formik.handleBlur}
                error={formik.touched.topic && formik.errors.topic}
                options={
                  isMobile
                    ? ["Communication"]
                    : topics?.map((top) => top?.topic_name)
                }
              />
              <div class="communicationMobView">
                {formik.values.topic != "Communication" && (
                  <SelectInput
                    label="Level"
                    name="level"
                    value={formik.values.level}
                    onChange={ (e) => {
                      formik.handleChange(e)
                      formik.setFieldValue("question", "");
                    } }
                    // onBlur={formik.handleBlur}
                    error={formik.touched.level && formik.errors.level}
                    options={["Easy", "Medium", "Hard"]}
                  />
                )}
              </div>

              {/* <SelectInput
                label="Question"
                name="question"
                value={formik.values.question}
                onChange={formik.handleChange}
                // onBlur={formik.handleBlur}
                error={formik.touched.question && formik.errors.question}
                options={["question A", "question B", "question C"]}
              /> */}
              {formik.values.question && formik.values.question != "random" && (
                <>
                  <label className="my-1">
                    Selected Question <b className="text-danger">*</b>
                  </label>
                  <p>{formik.values.question}</p>
                </>
              )}
              {formik.values.topic != "Communication" && (
                <div className="text-center py-2 my-2 communicationMobView">
                  <button
                    type="button"
                    disabled={
                      formik.values.topic == "" || formik.values.level == ""
                        ? true
                        : false
                    }
                    className="btn  btn-outline-dark"
                    onClick={ChooseQuestionHandle}
                  >
                    Choose Question
                  </button>
                  {formik.touched.question && (
                    <p className="text-danger">{formik.errors.question}</p>
                  )}
                </div>
              )}

              <div className="text-center py-4">
                <button className="btn btn-primary">START</button>
              </div>
            </form>
          </div>
        </div>
        <div
          className={`${(Styles.onlineDiv, Styles.webOnline)}  fw-bold  mx-4`}
        >
          <p> Online Users: {userCount}</p>
        </div>
      </div>
      
     
      
       </>
      </div>
}
       {!loading && userCount>0 && <Footer />}
      {
        userCount==0 && <LoadingScreen />
      }
    
    </>
  );
};
export default StartPractice;
