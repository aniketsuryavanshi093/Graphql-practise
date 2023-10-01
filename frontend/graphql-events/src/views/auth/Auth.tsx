import NavigationBar from "../../Components/NavBar/Navbar"
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader, useNavbar } from "@nextui-org/react";
import { useState } from "react"
import { Field, Form, Formik } from 'formik';
import { loginValidation, signUpvalidation } from "../../validation/authvalidation";
import { CustomInput, CustomPswInput } from "../../utils/CustomComponents";
import { useLazyQuery, } from "@apollo/client";
import { LOGIN_QUERY } from "../../graphql/mutation";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../../Context/AuthCOntext/useAuthContext";
import { toast } from "react-toastify";

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [selected, setSelected] = useState<string>("login");
    const { setuser } = useAuthContext();
    const navigate = useNavigate()
    const [login] = useLazyQuery(LOGIN_QUERY, {
        onCompleted(data) {
            console.log(data);
            sessionStorage.setItem("authtoken", data.login.token)
            setuser(data.login)
            navigate("/booking")
            // window.location.reload()
        },
        onError(er) {
            toast.warn(er.message || "Something went wrong!")
            console.log(er.message);
        }
    })
    const logininitialvalue = {
        email: "",
        password: ""
    }
    const signupInitialValue = {
        email: "",
        password: "",
        cp: ""
    }
    const handleSubmit = (values: any, resetForm: any, type: any) => {
        login({
            variables: {
                email: values.email,
                password: values.password,
            },
        })
        console.log(values);
    }
    return (
        <>
            <div style={{ alignItems: "center" }} className="flex h-[80vh] justify-center w-full">
                <Card className="max-w-full w-[390px] ">
                    <CardBody className="overflow-hidden">
                        <Formik
                            initialValues={selected === "login" ? logininitialvalue : signupInitialValue}
                            validationSchema={selected === "login" ? loginValidation : signUpvalidation}
                            enableReinitialize
                            onSubmit={(values, { resetForm }) => {
                                handleSubmit(values, resetForm, selected);
                            }}
                        >
                            {() => (
                                <Form>
                                    <Tabs
                                        fullWidth
                                        size="md"
                                        aria-label="Tabs form"
                                        selectedKey={selected}
                                        onSelectionChange={setSelected}
                                    >
                                        <Tab key="login" title="Login">
                                            <div className="flex flex-col gap-4 h-auto">
                                                <Field component={CustomInput} isRequired label="Email" placeholder="Enter your email" type="email" name="email" />
                                                <Field
                                                    component={CustomPswInput}
                                                    isRequired
                                                    label="Password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    show={showPassword}
                                                    type={showPassword ? 'text' : 'password'}
                                                    setShow={setShowPassword}
                                                    pswClassName="signup_psw_input"
                                                />
                                                <p className="text-center text-small">
                                                    Need to create an account?{" "}
                                                    <Link size="sm" onPress={() => setSelected("sign-up")}>
                                                        Sign up
                                                    </Link>
                                                </p>
                                                <div className="flex gap-2 justify-end">
                                                    <Button type="submit" fullWidth color="primary">
                                                        Login
                                                    </Button>
                                                </div>
                                            </div>
                                        </Tab>
                                        <Tab key="sign-up" title="Sign up">
                                            <div className="flex flex-col gap-4 h-auto">
                                                <Field
                                                    component={CustomInput} name="email"
                                                    isRequired label="Email" placeholder="Enter your email" type="email" />
                                                <Field
                                                    component={CustomPswInput}
                                                    isRequired label="Password"
                                                    show={showPassword}
                                                    type={showPassword ? 'text' : 'password'}
                                                    setShow={setShowPassword}
                                                    pswClassName="signup_psw_input"
                                                    name="password" placeholder="Enter Password" />
                                                <Field
                                                    component={CustomPswInput}
                                                    isRequired
                                                    label="Confirm Password"
                                                    placeholder="Enter password"
                                                    name="cp"
                                                    show={showPassword}
                                                    type={showPassword ? 'text' : 'password'}
                                                    setShow={setShowPassword}
                                                    pswClassName="signup_psw_input"
                                                />
                                                <p className="text-center text-small">
                                                    Already have an account?{" "}
                                                    <Link size="sm" onPress={() => setSelected("login")}>
                                                        Login
                                                    </Link>
                                                </p>
                                                <div className="flex gap-2 justify-end">
                                                    <Button type="submit" fullWidth color="primary">
                                                        Sign up
                                                    </Button>
                                                </div>
                                            </div>
                                        </Tab>
                                    </Tabs>
                                </Form>
                            )}
                        </Formik>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Auth