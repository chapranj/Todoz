import {ErrorMessage, Field, Form, Formik} from "formik";
import {useState} from "react";
import {useAuth} from "./security/AuthContext";
import {addTodoApi} from "./api/TodoApiService";
import {useNavigate} from "react-router-dom";

const AddTodoComponent = ()=> {

    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')

    const {username} = useAuth();

    const navigate = useNavigate();

    function formSubmit(values){
        const newTodo = {
            username :username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        addTodoApi(username, newTodo)
            .then(
                (response)=>
                {
                    console.log(response.data)

                    setDescription(values.description)
                    setTargetDate(values.targetDate)
                    navigate('/todos')

                }
            )
            .catch(
                (error)=>{
                    console.log("error: "+error);
                }
            )


    }

    function validate(values){
        let errors={

        }
        if (values.description.length<5){
            errors.description="Enter at least 5 characters!"
        }
        if (values.targetDate == null || values.targetDate == ''){
            errors.targetDate = "Enter a target date!";
        }
        return errors;
    }


    return (
        <div className="container">
            <h1>Enter Todo Details</h1>

            <Formik
                initialValues={{description,targetDate}}
                onSubmit={formSubmit}
                validate={validate}
                enableReinitialize={false}
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage
                                name="description"
                                component="div"
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

export default AddTodoComponent;