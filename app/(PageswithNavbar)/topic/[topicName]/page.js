"use client";
 
import { getQuestions } from "@/utils/otherUserAction";
import { getTopicsNames } from "@/utils/userProfileAction";
import { usePathname } from 'next/navigation'
import { useEffect, useState } from "react";
import LoadingScreen from "../../loading";
import Footer from "@/components/footer";
import { useMediaQuery } from "react-responsive";
 
const Topic = ({ params }) => {
 
  const pathname = usePathname()
  let topic = params.topicName;
  const [questionParameter, setQuestionParameter] = useState({
    searchtext: "",
    fieldName: "id",
    orderBy: "ASC",
    offset: 0,
  });
  const [sortStatus, setSortStatus] = useState({
    id:"ASC", question_name:"ASC", question_level:"ASC", question_time:"ASC"
    
  });
  const [questionsResult, setQuestionResult] = useState({});
  const [searchInputText, setSearchInputText] = useState("");
  const [level, setLevel] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(true);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      let questionRes = await getQuestions({
        ...questionParameter,
        topic,
        level,
      });

      setLoading(false);
      setQuestionResult(questionRes);
    }
    if (topic) {
      const currentURL = window.location.search;

      // Extract parameters
      const parameters = getURLParameters(currentURL);
      
    
     if(isRefresh && Object.keys(parameters)?.length>0){
     
      setLevel(parameters?.level ?? '')
      setOffset(parameters?.offset ? Number(parameters?.offset):0)
      if(parameters.field){
        let prevSort = {
          id:"ASC", question_name:"ASC", question_level:"ASC", question_time:"ASC"
          
        }
        prevSort[parameters.field] = parameters?.sortBy
        setSortStatus(prevSort)
      }
      if(parameters.search){
        setSearchInputText(parameters.search)
      }
      setQuestionParameter( {
        searchtext: parameters?.search ?? '',
        fieldName:parameters?.field ?? '',
        orderBy: parameters?.sortBy ?? '',
        offset: parameters?.offset ? Number(parameters?.offset):0,
      })
      
     }else{
      fetchQuestions();
     }
      
      setIsRefresh(false)
     
    }
  }, [questionParameter, topic, level]);
  
 
  function getURLParameters(url) {
    const urlSearchParams = new URLSearchParams(url);
    const params = {};
  
    for (const [key, value] of urlSearchParams) {
      params[key] = value;
    }
  
    return params;
  }
  function calculatePreviousOffset(currentOffset, limit) {
    return Math.max(1, currentOffset - limit);
  }

  function calculateNextOffset(currentOffset, limit, totalItems) {
    return Math.min(currentOffset + limit, totalItems);
  }
  const changeUrl = ({
    searchtext,
    level,
    fieldName,
    orderBy,
    offset,}) => {
  
    let apiUrl = `/topic/${topic}?`;

    if (searchtext) {
      apiUrl += `search=${searchtext}&`;
    }
  
    if (level) {
      apiUrl += `level=${level}&`;
    }
  
    if (fieldName) {
      apiUrl += `field=${fieldName}&`;
    }
  
    if (orderBy) {
      apiUrl += `sortBy=${orderBy}&`;
    }
  
    apiUrl += `count=10&offset=${offset}`;
    window.history.replaceState(null, '', apiUrl)
  }
  const prevHandle = () => {
    let newOffset = calculatePreviousOffset(offset, 10);
    setOffset(newOffset);
    setQuestionParameter({ ...questionParameter, offset: newOffset });
  };
  const nextHandle = () => {
    let newOffset = calculateNextOffset(offset, 10, questionsResult.totalCount);
    setOffset(newOffset);
    setQuestionParameter({ ...questionParameter, offset: newOffset });
  };
  const sortingHandle = (fieldName,sortStatus) => {
    changeUrl({
      ...questionParameter,
      fieldName: fieldName,
      orderBy:sortStatus,
    })
    setQuestionParameter({
      ...questionParameter,
      fieldName: fieldName,
      orderBy:sortStatus,
    });
  };
  const sortChangeHandle = (fieldName,changeSortStatus) => {
    sortingHandle(fieldName,changeSortStatus)
    const newSortStatus = {}
    for (const key in sortStatus) {
      newSortStatus[key] = 'ASC';
    }
    newSortStatus[fieldName] = changeSortStatus
    setSortStatus(newSortStatus)
  }
  return (
    <>
    {
      loading ? <LoadingScreen /> :
      <div className={'expandContent'}>
  <div className="container mt-4">
      <div className="row">
        <div className="col-lg-10">
          <div class="input-group mb-3">
            <span className="mr-2" style={{alignSelf: 'center', marginRight: '1rem'
}}>Search question</span>
            <input
              type="text"
              class="form-control"
              placeholder="search question"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={searchInputText}
              onChange={(e) => setSearchInputText(e.target.value)}
            />
            <span class="input-group-text addHover" id="basic-addon2">
              <img
                src="/img/icon-search.png"
                width="20px"
                height="20px"
                onClick={() => {
                  changeUrl({
                    ...questionParameter,
                    searchtext: searchInputText,
                })
                  setQuestionParameter({
                    ...questionParameter,
                    searchtext: searchInputText,
                  });
                }}
              />
            </span>
          </div>
        </div>
        <div className="col-lg-2" style={{marginTop: '6px'}}>
          <label for="">Level</label>
          <select
            id=""
            className="mx-2"
            onChange={(e) => { setLevel(e.target.value)
              changeUrl({
                ...questionParameter,
                level: e.target.value,
              })
            }}
          >
             <option value="">Choose Level</option>
            <option value="Easy" selected={level=='Easy'}>Easy</option>
            <option value="Medium" selected={level=='Medium'}>Medium</option>
            <option value="Hard" selected={level=='Hard'}>Hard</option>
          </select>
        </div>
      </div>

      <div style={{ overflowX: 'auto', maxWidth: '100%', marginTop: '20px' }}>
      <table class="table table-hover" style={{ minWidth: '100%',width: 'max-content'
}}>
        <thead>
            <tr>
              <th scope="col" className="headMobHide">
                Index{" "}
                {sortStatus.id=='ASC' ?  <img  src="/img/icon-ASC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) => sortChangeHandle('id','DESC')}/>:
                <img  src="/img/icon-DESC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) =>  sortChangeHandle('id','ASC')}/>
                }
                
                
               
              </th>
              <th scope="col">
                Title{" "}
                {sortStatus.question_name=='ASC' ?  <img  src="/img/icon-ASC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) => sortChangeHandle('question_name','DESC')}/>:
                <img  src="/img/icon-DESC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) =>  sortChangeHandle('question_name','ASC')}/>
                }
               
              </th>
              <th scope="col" className="headMobHide">
                Level{" "}
                {sortStatus.question_level=='ASC' ?  <img  src="/img/icon-ASC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) => sortChangeHandle('question_level','DESC')}/>:
                <img  src="/img/icon-DESC.png"
                width="7px"
                height="10px" class="bi bi-arrow-down-up" onClick={ ( ) =>  sortChangeHandle('question_level','ASC')}/>
                }
               
              </th>
              <th scope="col" className="headMobHide">Link</th>
              <th scope="col" style={{ textAlign: 'center' }}>Avg Time
              {sortStatus.question_time=='ASC' ?  <img  src="/img/icon-ASC.png"
                width="7px"
                height="10px" style={{marginLeft: '4px'}} className="bi ml-1 bi-arrow-down-up" onClick={ ( ) => sortChangeHandle('question_time','DESC')}/>:
                <img  src="/img/icon-DESC.png"
                width="7px"
                height="10px" style={{marginLeft: '4px'}} className="bi ml-1 bi-arrow-down-up" onClick={ ( ) =>  sortChangeHandle('question_time','ASC')}/>
                }
              </th>
            </tr>
          </thead>

          <tbody>
            {!loading &&
              questionsResult?.data?.length > 0 &&
              questionsResult?.data?.map((ques, index) => {
                return (
                  <tr
                    key={ques?.id}
                    className="addHover"
                   onClick={ () =>  window.open(ques?.questionUrl, '_blank')}
                  >
                    <th scope="row" className="headMobHide">{ques?.id}</th>
                    <td>{ques?.questionName}</td>
                    <td className="headMobHide">{ques?.questionLevel}</td>
                    <td className="headMobHide">
                      {" "}
                      <a href={ques?.questionUrl} target="_blank">
                       view question
                      </a>{" "}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      {ques?.questionTime} {"Minutes"}
                    </td>
                  </tr>
                );
              })}
          </tbody>
      </table>
      </div>

      <div class="d-flex justify-content-center">
        {!loading && questionsResult?.data?.length == 0 && (
          <p className="text-center fw-bold">No Question Found!</p>
        )}
        {loading && <p className="text-center fw-bold">Loading...</p>}
        {!loading && questionsResult?.data?.length > 0 && (
          <>
            <div class="p-2 bd-highlight">
              <button
                className="btn btn-primary"
                disabled={questionsResult?.pageNumber == 1}
                onClick={prevHandle}
              >
                Prev
              </button>
            </div>

            <div class="p-2 bd-highlight">
              <button
                className="btn btn-primary"
                disabled={questionsResult?.lastPage}
                onClick={nextHandle}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
      </div>
       
    
    }
    {
      !loading &&  <Footer bottom={questionsResult?.data?.length<5}   />
    }
        
    </>
  );
};
export default Topic;
