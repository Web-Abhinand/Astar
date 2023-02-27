import { useEffect } from "react";
import useFeedback from "../hooks/useFeedback";
import { Accordion } from "./mini/accordion";
import { useState } from "react";
import { useRef } from "react";
export default function FeedbackComponent() {
    const [feedback, setFeedback] = useState(false);
    const feedbackDetails = useFeedback();
    const divRef = useRef(null);
    // useEffect(() => {
    //     divRef.current.scrollTop = divRef.current.scrollHeight;
    // }, [feedbackDetails]);

    return (
        <div className="p-5 bg-base-100 m-4 shadow-sm shadow-gray-700 tracking-widest" style={{ overflowY: 'scroll', height: '300px' }} ref={divRef}>
            {/* <h1 style={{fontSize:'1.8rem'}}>Feedback</h1> */}
            <Accordion title="Random Search Iterations">
                {feedbackDetails.map((feedback, index) => {
                    return (
                        <div key={index}>
                            <div style={{ padding: '1rem', fontSize: '1.2rem' }} dangerouslySetInnerHTML={{ __html: feedback }} ></div>
                        </div>
                    )
                }
                )}
            </Accordion>
        </div >
       
    );
} 