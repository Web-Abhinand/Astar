import { Accordion } from "./mini/accordion";
import Questions from "./mini/questions";
export default function QuizPanel(props) {

    const Question = [
        {
            question: "Q1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque repellendus ea nostrum necessitatibus similique explicabo molestias sapiente rem neque! Ea.",
            options: [
                {
                    option: "Lorem ipsum dolor sit amet.",
                    value: "1"
                },
                {
                    option: "Lorem, ipsum do",
                    value: "2"
                },
                {
                    option: "sit amet.",
                    value: "3"
                }
            ],
            answer: "1"
        },
        {
            question: "Q1. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cumque repellendus ea nostrum necessitatibus similique explicabo molestias sapiente rem neque! Ea.",
            options: [
                {
                    option: "Lorem ipsum dolor sit amet.",
                    value: "1"
                },
                {
                    option: "Lorem, ipsum do",
                    value: "2"
                },
                {
                    option: "sit amet.",
                    value: "3"
                }
            ],
            answer: "3"
        }
    ]
    return (
        <>
            <div className="p-5 bg-base-100 m-4" >
                <Accordion title="Question">
                    {Question.map((question, index) => {
                        return (
                            <Questions question={question} id={index} key={index} />
                        )
                    }
                    )}
                </Accordion>
            </div >
        </>
    );
}