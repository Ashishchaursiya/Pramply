import { getQuestions } from "@/utils/otherUserAction";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
 

function QuestionModal({
  showQuestionModal,
  setShowQuestionModal,
  topic,
  level,
  formik,
  setSelectedQuestionObj
}) {
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
  const [loading, setLoading] = useState(false);
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
    if (topic && level && level!=='random') {
      fetchQuestions();
    }
  }, [questionParameter, topic, level]);
  function calculatePreviousOffset(currentOffset, limit) {
    return Math.max(1, currentOffset - limit);
  }

  function calculateNextOffset(currentOffset, limit, totalItems) {
    return Math.min(currentOffset + limit, totalItems);
  }
  const prevHandle = () => {
    let newOffset = calculatePreviousOffset(offset, 10);
    setOffset(newOffset);
    setQuestionParameter({...questionParameter,offset:newOffset})
    
  };
  const nextHandle = () => {
    
    let newOffset = calculateNextOffset(offset, 10, questionsResult.totalCount);
    setOffset(newOffset);
    setQuestionParameter({...questionParameter,offset:newOffset})
  };
 
const sortingHandle = (fieldName,sortStatus) => {
 
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
      <Modal
        show={showQuestionModal}
        onHide={() => setShowQuestionModal(false)}
        size="xl"
        scrollable
      >
        <Modal.Header closeButton>
          <Modal.Title>Question List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class="input-group mb-3">
            <span style={{ marginRight: "3px", marginTop: "6px"}}>Search question</span>
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
                    if(searchInputText==''){
                        setQuestionParameter( {
                            searchtext: "",
                            fieldName: "id",
                            orderBy: "ASC",
                            offset: 1,
                          })
                    }else{
                        setQuestionParameter({
                            ...questionParameter,
                            searchtext: searchInputText,
                          })
                    }
                 
                }}
              />
            </span>
          </div>
          {
            !loading &&  questionsResult?.data?.length > 0 &&  <table class="table table-hover" style={{width: "max-content"}}>
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
                      onClick={() => {
                        formik.setFieldValue("question", ques?.questionName);
                        setShowQuestionModal(false);
                        setSelectedQuestionObj(ques)
                        sessionStorage.setItem('QUESTIONTIME',JSON.stringify({question:ques?.questionName,time:ques?.questionTime}))
                      }}
                    >
                      <th className="headMobHide" scope="row">{ques?.id}</th>
                      <td>{ques?.questionName}</td>
                      <td className="headMobHide">{ques?.questionLevel}</td>
                      <td className="headMobHide">
                        {" "}
                        <a href={ques?.questionUrl} target="_blank">
                          {ques?.questionUrl}
                        </a>{" "}
                      </td>
                      <td>
                        {ques?.questionTime} {"Minutes"}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          }
         

          <div class="d-flex justify-content-center">
            {!loading && questionsResult?.data?.length == 0 && (
              <p className="text-center fw-bold">No Question Found!</p>
            )}
            {loading && <p className="text-center fw-bold">Loading...</p>}
            {!loading && questionsResult?.data?.length > 0 && (
              <>
                <div class="p-2 bd-highlight">
                  <button className="btn btn-primary" disabled={questionsResult?.pageNumber==1} onClick={prevHandle}>Prev</button>
                </div>

                <div class="p-2 bd-highlight">
                  <button className="btn btn-primary" disabled={questionsResult?.lastPage} onClick={nextHandle}>Next</button>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default QuestionModal;
