import React from 'react'
import { Formik, Field, Form } from "formik";
import axios from 'axios'; 
import * as Yup from 'yup';
 
const languages =[{title:"Hindi",value:"Hindi"},{title:"English",value:"English"}]
export default function SubjectForm() {
  
const ValidationSchema = Yup.object().shape({
  class: Yup.string().required('Required'),
subject_Name: Yup.string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
});

  return (
    <div>
    <h3>Add New Subject</h3>
    
    <Formik
        initialValues={{ subject_Name: "", class: "",language:[] }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm }) => {
          await new Promise((resolve) => setTimeout(resolve, 500));
         
// return;
let sendData = {...values,language:values.language.length > 0 ? values.language.toString():""};
console.log(sendData);
          axios.post('http://localhost:5246/api/Subjects/InsertSubject',sendData)
        .then((result) => {
            //console.log(result);
            resetForm();
            alert(result.data)
        })
        .catch((error) => {
            console.log(error);
        })
        }}
    >
     {({ errors, touched }) => (
        <Form>
        <div className='form-field'>
            <label>Name</label>
          <Field name="subject_Name" type="text" />
          {errors.subject_Name && touched.subject_Name ? (
             <div className='error'>{errors.subject_Name}</div>
           ) : null}
        </div>
        <div className='form-field'>
            <label>Class</label>
          <Field name="class" type="text" />
          {errors.class && touched.class ? (
             <div className='error'>{errors.class}</div>
           ) : null}
        </div>
        <div className='form-field'>
           <div id="checkbox-group">Language</div>
          <div role="group" aria-labelledby="checkbox-group" style={{padding:"8px 0"}}>
            {languages.map((l,i)=>{
              return (<label key={i} style={{display:"flex"}}>
              <Field type="checkbox" name="language" value={l.value} style={{width:20,height:20}}/>
              {l.title}
            </label>)})}
          </div>
        </div>
          <button type="submit">Submit</button>
        </Form>
     )}
      </Formik>
      </div>
  )
}
