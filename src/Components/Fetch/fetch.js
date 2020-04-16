import React, {useState,useEffect} from 'react';
import PropTypes from 'prop-types';



function Fetch(props) {

    const [person, setPerson] = useState(null);


    useEffect( async() => {
        const response  = await fetch('http://35.179.64.176/');
        const data = await response.json();
        const [item] = data.results;
        setPerson(item);
        console.log(data);
    },[]);
    return (
        <div>
            {/* <div>{person}</div> */}
        {person&&<div>{person.data}</div>}
        </div>
    );
};


export default Fetch;

