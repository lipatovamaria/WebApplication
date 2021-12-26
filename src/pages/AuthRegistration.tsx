import React from "react";
import * as yup from 'yup'
import {Form, Formik, FormikHelpers, FormikProps} from "formik";
import UserContext from "../context/UserContext";
import {Link} from "react-router-dom";
import {RegUser} from "../request/UserApi";

interface AuthForm {
    username: string,
    password: string,
}

const authInitValues: AuthForm = {
    username: "",
    password: ""
}

const InputNames = {
    usernameInputName: 'username',
    passwordInputName: 'password'
}

const authSchema = yup.object({
    username: yup.string()
        .required("Имя пользователя может быть пустым!")
        .max(15, "Имя должно занимать мение 15-ти символов!"),
    password: yup.string()
        .required("Пароль не может быть пустым!")
        .max(15, "Пароль должн занимать мение 15-ти символов!"),
});

type AuthState = {
    errorAlertMessage: string | null,
    successAlertMessage: string | null,
    currentAction: string
}

class AuthRegistration extends React.Component<any, AuthState> {
    static contextType = UserContext;

    constructor(props: any) {
        super(props);
        this.state = {
            errorAlertMessage: null,
            successAlertMessage: null,
            currentAction: "reg"
        }
    }

    render() {
        return <>
            <div className="container-fluid">
                <div className="row" style={{height: '130px'}}>
                    <h1>Авторизация</h1>
                </div>
                {this.state.errorAlertMessage != null &&
                <div className='alert alert-danger alert-dismissible fade show' role="alert">
                    {this.state.errorAlertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={this.CloseErrorAlert}
                            aria-label="Close"></button>
                </div>}
                {this.state.successAlertMessage != null &&
                <div className='alert alert-success alert-dismissible fade show' role="alert">
                    {this.state.successAlertMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" onClick={this.CloseSuccessAlert}
                            aria-label="Close"></button>
                </div>}
            </div>

            <Formik initialValues={authInitValues}
                    onSubmit={this.LoginBtnClickHandler}
                    validationSchema={authSchema}>
                {(formikProps: FormikProps<AuthForm>) => (
                    <Form>
                        <div className="container-fluid">
                            <p>
                                <label>Ваш логин:</label>
                                <input className={formikProps.errors.username && formikProps.touched.username ?
                                           "form-control is-invalid" : "form-control"}
                                       name={InputNames.usernameInputName}
                                       value={formikProps.values.username}
                                       onChange={formikProps.handleChange}
                                       onBlur={formikProps.handleBlur}
                                       placeholder="Логин"/>
                                {(formikProps.errors.username && formikProps.touched.username) &&
                                <div className="invalid-feedback">
                                    {formikProps.errors.username}
                                </div>}
                            </p>
                            <p>
                                <label>Ваш пароль:</label>
                                <input type="password"
                                       id="password"
                                       className={formikProps.errors.password && formikProps.touched.password ?
                                           "form-control is-invalid" : "form-control"}
                                       name={InputNames.passwordInputName}
                                       value={formikProps.values.password}
                                       onChange={formikProps.handleChange}
                                       onBlur={formikProps.handleBlur}
                                       placeholder="Пароль"/>
                                {(formikProps.errors.password && formikProps.touched.password) &&
                                <div className="invalid-feedback">
                                    {formikProps.errors.password}
                                </div>}
                            </p>
                            <p>
                                <button name="log_in" onClick={() => this.setState({currentAction: "auth"})}>
                                    Авторизироваться
                                </button>
                                <button name="register" onClick={() => this.setState({currentAction: "reg"})}>
                                    Зегистрироваться
                                </button>
                            </p>
                        </div>
                    </Form>)}
            </Formik>
        </>
    }

    LoginBtnClickHandler = async (values: AuthForm, {setSubmitting}: FormikHelpers<AuthForm>) => {
        let {username, password} = values
        let action = this.state.currentAction
        if(action == 'auth') {
            try {
                await this.context.loginUser(username, password)
                document.location.href = "/";
            } catch {
                this.setState({
                    errorAlertMessage: "Не удалось выполнить вход, проверте правильность введённых данных!"
                })
            } finally {
                setSubmitting(false)
            }
        } else if(action == 'reg') {
            await RegUser(username, password)
            this.setState({
                successAlertMessage: "Новый пользователь был успешно создан!"
            })
            setSubmitting(false)
        }
    }

    CloseErrorAlert = () => {
        this.setState({
            errorAlertMessage: null
        })
    }

    CloseSuccessAlert = () => {
        this.setState({
            successAlertMessage: null
        })
    }
}

export default AuthRegistration