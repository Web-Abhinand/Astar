import React, { useState } from 'react';

export function Accordion(props) {
    const [isOpen, setIsOpen] = useState(true);

    function toggleAccordion() {
        setIsOpen(!isOpen);
    }

    return (
        <div className="relative bg-white rounded-md shadow">
            <button
                className=" w-full px-4 py-3 font-medium text-left leading-5 text-gray-700 transition duration-150 ease-in-out bg-secondary rounded-t-md focus:outline-none focus:shadow-outline-blue "
                onClick={toggleAccordion}
            >
                {props.title}
                <span className='float-right inline'>
                    <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-arrow-down"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"
                        />
                    </svg>
                </span>
            </button>
            <div className={`${isOpen ? '' : 'hidden'} px-4 py-3 font-medium leading-5 text-gray-700 transition duration-150 ease-in bg-white rounded-b-md`}>
                {props.children}
            </div>
        </div>
    );
}
