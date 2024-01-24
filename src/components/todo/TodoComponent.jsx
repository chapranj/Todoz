import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {retrieveTodoApi, updateTodoApi} from "./api/TodoApiService";
import {useAuth} from "./security/AuthContext";
import {ErrorMessage, Field, Form, Formik} from "formik";

export default function TodoComponent(){

    const {id}= useParams()

    const{username} = useAuth();

    const navigate = useNavigate();

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    useEffect(() => {
        retrieveTodo()
    }, [id, username]);

    function retrieveTodo(){
        retrieveTodoApi(username,id)
            .then(
                (response)=>{
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                }
            )
            .catch(
                (error)=>{
                    console.log("error: "+error)
                }
            )
    }

    function submitForm(values){
        console.log(values)

        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done:false
        }

        updateTodoApi(id, username, todo)
            .then(
                (response)=>{
                    setDescription(response.data.description)
                    setTargetDate(response.data.targetDate)
                }
            )
            .catch(
                (error)=>{
                    console.log(error )
                }
            )
        navigate(`/todos`)
    }

    function validate(values){
        let errors = {

        }
        if (values.description.length<5){
            errors.description = "Enter at least 5 characters!"
        }
        if(values.targetDate == null){
            errors.targetDate = "Enter a Target Date!"
        }
        console.log(values)
        //the validate function in react expects the return to be an object w key and value pairs
        //of which the key represents the field names and the values are the errors associated
        //with those fields if there are any
        return errors
    }

    return(
        <div className="container">
            <h1>Enter Todo Details</h1>
            <Formik
                initialValues={{description,targetDate}}
                onSubmit={submitForm}
                enableReinitialize={true}
                validate={validate}
                validateOnBlur={false}
                validateOnChange={false}
            >
                {
                    (props)=>(
                        <Form>
                            <ErrorMessage
                                name="description"
                                component = "div"
                                className="alert alert-warning"
                            >
                            </ErrorMessage>
                            <ErrorMessage
                                name="targetDate"
                                component="div"
                                className="alert alert-warning"
                            >

                            </ErrorMessage>
                            <fieldset className="form-group">
                                <label>Description</label>
                                <Field className="form-control" type="text" name="description"></Field>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"></Field>
                            </fieldset>
                            <div>
                                <button className="btn btn-success m-4" type="submit">Submit</button>
                            </div>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )

}