import { useState, useEffect } from "react";
import { feedbackDetails } from "../experiments/randomSearch";
// Custom hook
const useFeedback = () => {
    const [feedback, setFeedback] = useState([]);

    useEffect(() => {
        const handleFeedback = (e) => {
            setFeedback([...feedbackDetails]);
        };

        window.addEventListener("randomSearch", handleFeedback);

        return () => {
            window.removeEventListener("randomSearch", handleFeedback);
        };
    }, [feedback]);

    return feedback;
}

export default useFeedback;