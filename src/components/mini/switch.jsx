import { useRef } from 'react';
import { useEffect,useState } from 'react';
export default function Switch(props) {
    useEffect(() => {
        setClicked2(true);
    },[])
    const [clicked, setClicked] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    // const handleChange = (e) => {
    //     props.changeGraphType(e.target.checked)
    // }
    useEffect(() => {
        setClicked2(true)
    },[])

    const onButtonClick = () => {
        props.changeGraphType(true);
       setClicked(true);
       setClicked2(false);
      };

      const onButtonClick2 = () => {
        // `current` points to the mounted text input element
        props.changeGraphType(false);
        setClicked2(true);
        setClicked(false);
      };

    return (
        <div style={{display:"flex"}} className='mb-3'>
        
            {/* <input id={props.id} onChange={handleChange} type="checkbox" className="hidden peer" /> */}
            <div className={clicked?"px-4 py-2 text-center grow rounded-l-md bg-secondary text-black ":"px-4 py-2 text-center grow rounded-l-md bg-white text-black"} onClick={onButtonClick} style={{boxShadow:clicked?'0px 0px 0px 2px #F471B5':'none',marginRight:'6px',border:'1px solid #0F1629',color:clicked2?'lightgrey':'black',borderRadius:'5px',cursor:'pointer'}}>Undirected</div>
            <div className={clicked2?"px-4 py-2 text-center grow rounded-r-md bg-secondary text-black":"px-4 py-2 text-center grow rounded-r-md bg-white text-black"} onClick={onButtonClick2} style={{boxShadow:clicked2?'0px 0px 0px 2px #F471B5':'none',border:'1px solid #0F1629',color:clicked?'lightgrey':'black',borderRadius:'5px',cursor:'pointer'}}>Directed Graph</div>
            </div>
    )
}