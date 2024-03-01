"use client"

import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setCountry } from "@/redux/reducers/countryLocation";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer";
const ContactUs = () => {
    const token = Cookies.get("token");
    const router = useRouter()
    const subscriptionData  = useSelector((state) => state.subscriptionInStore.subscriptionData);
    const country = useSelector((state) => state.location.country) || 'Other'
    const startPracticehandle = () => {
        if(!token){
          return  router.push(`/login`, { scroll: false })
        }
      
        if(subscriptionData?.days_left > 0){
          router.push(`/startPractice/chooseTopicLevel`, { scroll: false })
        }else if(subscriptionData?.is_premium==0 || subscriptionData?.days_left <= 0){
          router.push(`/${country}/subscription`, { scroll: false })
        }
      }
    return <> 
      <header className="header">
        <h2>How Pramply Works</h2>
        <p>Unlock the Power of Meaningful Conversations</p>
    </header>

    <section className="section">
        <h4>1. Sign Up</h4>
        <p>Create your Pramply account if you haven&lsquo;t already. Customize your profile with your interests and skills.</p>

        <h4>2. Start Practice</h4>
        <p>Choose a topic, level, and a specific question to start your practice session. Click the &quot;Start Practice&quot; button to initiate the search for a practice partner.</p>

        <button className="btn btn-primary mb-3" id="startPracticeBtn" onClick={startPracticehandle}>Start Practice</button>

        <h4>3. Practice Partner Search</h4>
        <p>We will try to connect you with a user who has the same topic and level. If no match is found, we will expand the search to the next level. If still not found, we will match you with any available level (EASY, MEDIUM, HARD).</p>

        <h4>4. Interview Session</h4>
        <p>Once a match is found, the interview session will begin. The interviewer will share their screen, and the interviewee will be given the question to solve.</p>

        <h4>5. Switch Role</h4>
        <p>After the initial interview, switch roles, and the interviewee becomes the interviewer. Share your screen and ask the provided question.</p>

        <h4>6. End of Session</h4>
        <p>After the session, both participants can provide ratings to each other based on their performance and communication skills.</p>
    </section>
    <Footer   />
    </>
}
export default ContactUs;