"use client";
import { useEffect, useState } from "react";
import {
  getPreviousPractices,
  getPreviousPracticesCount,
  getUserEducation,
} from "@/utils/userProfileAction";
import Skeleton from "react-loading-skeleton";
import Spinner from "@/components/spinner";
import Link from "next/link";
import Footer from "@/components/footer";
import { useMediaQuery } from "react-responsive";

const UserPractices = () => {
  const [practiceData, setPractices] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [offset, setOffset] = useState(1);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  function calculatePreviousOffset(currentOffset, limit) {
    return Math.max(1, currentOffset - limit);
  }

  function calculateNextOffset(currentOffset, limit, totalItems) {
    return Math.min(currentOffset + limit, totalItems);
  }
  const prevHandle = () => {
    let newOffset = calculatePreviousOffset(offset, count);
    setOffset(newOffset);
    setPageNumber((prev) => prev - 1);
  };
  const nextHandle = () => {
    setPageNumber((prev) => prev + 1);
    let newOffset = calculateNextOffset(offset, count, totalCount);
    setOffset(newOffset);
  };
  useEffect(() => {
    async function fetchPractices() {
      let practice = await getPreviousPractices(count, offset, setLoading);

      setPractices(practice);
    }
    fetchPractices();
  }, [count, offset]);
  useEffect(() => {
    async function fetchPracticesCount() {
      let practiceCount = await getPreviousPracticesCount();

      setTotalCount(practiceCount);
    }
    fetchPracticesCount();
  }, []);
  return (
    <>
    <div className={ isMobile ? '':'expandContent'}>
    <div className="container practice shadow my-3 p-3">
        <h5> Previous Practices</h5>
        {practiceData?.length > 0 && (
          <>
            <div className="d-flex">
              <div className="me-auto"></div>
            </div>
            <table className="table caption-top">
              <thead>
                <tr>
                  <th scope="col">Question Name</th>
                  <th scope="col">Date</th>
                  <th className="headMobHide" scope="col">Time</th>
                  <th className="text-end" scope="col">Peer Name</th>
                </tr>
              </thead>
              <tbody>
                {practiceData?.map((practice, idx) => (
                  <tr key={idx}>
                    <td>{practice.question_name}</td>
                    <td>{practice.practice_date}</td>
                    <td className="timePrevious">{practice.time_limit}</td>
                    <td className="text-end"> <Link href={`/peer/profile/${practice.peer_user_name}`}>{practice.peer_user_name}</Link></td>
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
        {loading && <Spinner />}
        {practiceData?.length > 0 && (
          <div className="d-flex justify-content-center">
            <div>
              <button
                className="btn btn-primary"
                onClick={prevHandle}
                disabled={pageNumber == 1}
              >
                Prev
              </button>
            </div>
            <div className="mx-2">
              <button
                className="btn btn-primary"
                disabled={count * pageNumber >= totalCount}
                onClick={nextHandle}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
     
      {!loading &&  <Footer bottom={isMobile ? false:true}   />}
      
    </>
  );
};
export default UserPractices;
