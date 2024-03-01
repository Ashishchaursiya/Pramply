import { useRouter } from "next/navigation";
const Practice = () => {
  const router = useRouter()
  const selectedTopicHandle = (topic) => {
     
      router.push(`/topic/${topic}`)
  }
return <>
 <div className="container-fluid practiceSection py-2">
 <h5 className="text-center fw-bold my-2">Topics</h5>
 <div className="d-flex row  mainContainer py-5">
 <div class="col-lg-4 col-md-6 col-sm-6 mb-3 practiceImagesBox">
<div className="imgContainer" onClick={ () => selectedTopicHandle('system-design')}>
<img src="/img/sys_design.png" className="img-fluid" />
<h5 className="my-2">System Design</h5>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-3 practiceImagesBox">

<div  className="imgContainer" onClick={ () => selectedTopicHandle('ds-algo')}>
<img src="/img/coding.png" className="img-fluid" />
<h5 className="my-2">Ds & Algo</h5>
</div>
</div>
<div class="col-lg-4 col-md-6 col-sm-12 mb-3 practiceImagesBox">

<div  className="imgContainer" onClick={ () => selectedTopicHandle('machine-learning')}>
<img src="/img/machine-learning.png" className="img-fluid" />
<h5 className="my-2">Machine Learning</h5>
</div>
</div>

{/* </div>
<div className="d-flex justify-content-evenly py-5"> */}
  <div class="col-lg-4 col-md-6 col-sm-12 mb-3 practiceImagesBox">

 <div className="imgContainer" onClick={ () => selectedTopicHandle('frontend')}>
 <img src="/img/Frontend.png" className="img-fluid" />
 <h5 className="my-2">Frontend</h5>
 </div>
 </div>
 <div class="col-lg-4 col-md-6 col-sm-12 mb-3 practiceImagesBox">

 <div  className="imgContainer" onClick={ () => selectedTopicHandle('data-science')}>
 <img src="/img/data-science.png" className="img-fluid" />
 <h5 className="my-2">Data Science</h5>
 </div>
 </div>
 <div class="col-lg-4 col-md-6 col-sm-12 mb-3 practiceImagesBox">

 <div  className="imgContainer"  onClick={ () =>  {
      router.push(`/communication`)
 }}>
 <img src="/img/EnglishCommunication.png" className="img-fluid" />
 <h5 className="my-2">Communication</h5>
 </div>
 </div>
 
 </div>
 </div>
 
 
</>
}
export default Practice;