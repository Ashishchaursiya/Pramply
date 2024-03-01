"use client"

import Footer from "@/components/footer";
import Cookies from "js-cookie";
import Link from "next/link";

const AboutUs = () => {
  const finalUrl = Cookies.get("token") ? '/' : "/signup"
    return <>
    <header className="header">
        <h2>Welcome to Pramply</h2>
        <p>Where Conversations Shape Connections</p>
    </header>

    <section className="section">
        <h4>Our Mission</h4>
        <p>Pramply is on a mission to revolutionize the way people connect online. We aim to provide a platform where users can engage in purposeful conversations, share their expertise, and discover like-minded individuals who share their passions.</p>

        <h4>What Sets Us Apart</h4>
        <ul>
            <li><strong>Tailored Discussions:</strong> Pramply allows users to handpick their preferred topics, ensuring that every conversation is meaningful and aligned with their interests.</li>
            <li><strong>Dynamic Roles:</strong> Our platform offers a unique experience by allowing users to seamlessly switch between being the interviewer and the interviewee.</li>
            <li><strong>Performance Ratings:</strong> At the end of each conversation, users have the opportunity to rate each other based on their communication skills and overall performance.</li>
            <li><strong>Peer Rating and Feedback:</strong> Pramply encourages a supportive community where users can provide constructive feedback to help each other grow.</li>
        </ul>

        <h4>Join Pramply Today</h4>
        <p>Embark on a journey of meaningful connections, knowledge exchange, and personal growth with Pramply. Connect with passionate individuals, explore new topics, and elevate your communication skills in an engaging and supportive community.</p>

        <p>Ready to shape connections through conversations? <Link href={finalUrl}>Sign up for Pramply today</Link> and discover a world of meaningful interactions!</p>
    </section>
    <Footer />
    
    </>
}
export default AboutUs;