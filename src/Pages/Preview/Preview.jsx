import { useEffect, useState } from "react";


const Preview = ({formId}) => {
    const [formData, setFormData] = useState();
    useEffect( () => {
        formId?
        (fetch(`http://localhost:5000/eachform/${formId}`)
            .then(res => res.json())
            .then(data => setFormData(data))): ""
    }, [formId])
    return (
        <div>
            {
                formData ? <div></div> : <h1 className="text-xl font-bold my-24 text-center">Please save changes from the Editor page to see your Form</h1>
            }
        </div>
    );
};

export default Preview;