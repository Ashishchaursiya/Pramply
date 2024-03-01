import { GOOGLE_AUTH_URL } from "@/utils/constants"

const SocialAuth = ({label}) => {
    return <>
    <div className="my-2">
    <div className="googleLoginSection loginsocialSection my-2" onClick={ () => {
      window.open(GOOGLE_AUTH_URL,'_parent')
    }}>
                <img
                  src="/img/google.png"
                  width="30px"
                  height="30px"
                  className="mx-3"
                />
                <span>{label} with Gmail</span>
              </div>
              {/* <div className= "loginsocialSection my-2">
                <img
                  src="/img/linkden.png"
                  width="30px"
                  height="30px"
                  className="mx-3"
                />
                <span>{label} with LinkedIn</span>
              </div> */}
              <div className="dividerLine"></div>
              <span className="orText"> OR </span>
              <div className="dividerLine"></div>

    </div>
     
    </>

}
export default SocialAuth