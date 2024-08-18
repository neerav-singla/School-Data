import React,{useState,useEffect} from 'react'
import { Formik, Field, Form } from "formik";
import axios from 'axios'; 
import * as Yup from 'yup';
 
const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  age: Yup.string().required('Required'),
  sex: Yup.string().required('Required'),
});

export default function TeacherForm() {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [imageVal,setImageVal] = useState("");

  useEffect(()=>{
    if(selectedFile){
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("type", 'teacher');
        try {
          const response =  axios({
            method: "post",
            url: "http://localhost:5246/UploadFile",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((result) => {
            //console.log(result);
            setImageVal(result?.data || "")
        })
        } catch(error) {
          console.log(error)
        }
    }
      },[selectedFile])
    
  return (
    <div>
    <h3>Add Teacher</h3>
    
    <Formik
        initialValues={{ name: "", age:"",sex:"" }}
        validationSchema={ValidationSchema}
        onSubmit={async (values, { resetForm }) => {
            
          await new Promise((resolve) => setTimeout(resolve, 500));
          //console.log(JSON.stringify(values, null, 2));
// return;

let sendData = {...values,image:imageVal}
          axios.post('http://localhost:5246/api/Teachers/InsertTeacher',sendData)
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
          <Field name="name" type="text" />
          {errors.name && touched.name ? (
             <div className='error'>{errors.name}</div>
           ) : null}
        </div>
        <div className='form-field'>
            <label>Sex</label>
          <Field as="select" name="sex">
          <option value="">Select</option>
             <option value="Male">Male</option>
             <option value="Female">Female</option>
           </Field>
          {errors.sex && touched.sex ? (
             <div className='error'>{errors.sex}</div>
           ) : null}
        </div>
        <div className='form-field'>
        <label>Age</label>
          <Field name="age" type="text" />
          {errors.age && touched.age ? (
             <div className='error'>{errors.age}</div>
           ) : null}
          </div>
          <div className='form-field'>
            <label>Photo</label>
      <input type="file" onChange={(event)=>  setSelectedFile(event.target.files[0])}/>
          </div>
          <button type="submit">Submit</button>
        </Form>
     )}
      </Formik>
      </div>
  )
}
