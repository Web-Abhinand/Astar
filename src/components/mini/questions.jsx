import React from 'react';

export default function Questions(props) {

    const Questions = props.question

    const [selected, setSelected] = React.useState(null)

    const onselect = (e) => {

        e.target.value === Questions.answer ? console.log('correct') : console.log('wrong')

        setSelected({
            value: e.target.value,
        })
    }


    return (
        <div className="form-control mb-4 ">
            <label className="block font-medium font-sans mb-5">{Questions.question}</label>
            <div className="flex flex-row flex-wrap gap-5 justify-self-stretch">
                {
                    Questions.options.map((option, index) => {
                        return (
                            <div className='flex flex-row' key={index}>
                                <input type="radio" onChange={onselect} name={props.id + 'r'} value={option.value} className="radio radio-primary inline-block" />
                                <span className='font-light'> {option.option} </span>
                            </div>
                        )
                    }
                    )
                }
                <span className={`text-success ${Questions.answer === selected?.value ? 'block' : 'hidden'}`}>Correct</span>
                <span className={`text-error ${selected ? Questions.answer !== selected?.value ? 'block' : 'hidden' : 'hidden'
                    }`}>The answer is option : {Questions.answer}</span>
            </div>
            <hr className='m-4' />
        </div>
    );
}