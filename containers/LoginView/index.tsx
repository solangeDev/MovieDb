import React, { useState, useEffect } from "react";
import styles from "./index.module.scss";
import BaseInput from "../../components/BaseInput";
import BaseInputPassword from "../../components/BaseInputPassword";
import BaseButton from "../../components/BaseButton";
import Alert from "../../components/Alert";
import TopBar from "../../components/TopBar";
import { validate } from "./validator";
import { getRequestToken, logIn } from "../../services/user";
import Router from "next/router";
import { setUser } from "../../redux/user/userActions";
import { connect } from "react-redux";

function LoginView(props) {
  const [buttonSubmit, setButtonSubmit] = useState({
    disabled: false,
    className: "btnBlue",
    title: "Inicia sesión",
    type: "submit",
    classHover: "hvr-radial-out",
    loading: false,
  });

  const [userName, setUserName] = useState({
    value: "",
    id: "userName",
    label: "User name",
    type: "test",
    name: "userName",
    path: "userName",
    error: false,
    helperText: "",
  });

  const [password, setPassword] = useState({
    value: "",
    id: "password",
    label: "Password",
    name: "password",
    path: "Password",
    error: false,
    helperText: "",
    maxlength: 30,
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "error",
    message: "",
  });

  const handleChangeUserName = (e) => {
    const { value } = e.target;
    setUserName({ ...userName, value: value, error: false });
    setAlert({
      ...alert,
      show: false,
    });
  };

  const handleChangePassword = (e) => {
    const { value } = e.target;
    setPassword({ ...password, value: value, error: false });
    setAlert({
      ...alert,
      show: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userName: userName.value,
      password: password.value,
    };
    const valid = await validate(data);
    if (valid.result) {
      valid.data.forEach((a) => {
        if (a.name === "userName") {
          setUserName({ ...userName, error: true, helperText: a.message });
        } else if (a.name === "password") {
          setPassword({ ...password, error: true, helperText: a.message });
        }
      });
    } else {
      try {
        let requestToken = await getRequestToken()
          .then((r) => {
            if (r.status == 200) {
              return r;
            } else {
             console.log(r, 'error') 
            }
          })
          .catch((e) => {
            setAlert({
              ...alert,
              show: true,
              message: "Server error",
              type: "error",
            });
            console.error(e);
          });
          if(requestToken.status === 200){
            requestToken = requestToken.data;
            await logIn({
              "username": userName.value,
              "password": password.value,
              "request_token": requestToken.request_token
            }).then((response)=>{
              if(response.success === true){
                props.setUser(response)
                Router.replace("/dashboard", `/dashboard`);
              }else{
                throw response.data.status_message
              }
            }) .catch((e) => {
            setAlert({
              ...alert,
              show: true,
              message: e,
              type: "error",
            });
          });
          }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, show: false });
  };

  return (
    <div>
      {/* <TopBar menuIcon={false} /> */}
      <section className={styles.LoginView}>
        <div className={styles.LoginView__wrapper}>
          <div className={styles.LoginView__title}>
            MovieDB
          </div>
          <form onSubmit={handleSubmit} className={styles.LoginView__container}>
            <div className={styles.LoginView__item}>
              <BaseInput
                error={userName.error}
                value={userName.value}
                onChange={handleChangeUserName}
                properties={userName}
              ></BaseInput>
            </div>
            <div className={styles.LoginView__item}>
              <BaseInputPassword
                error={password.error}
                onChange={handleChangePassword}
                value={password.value}
                properties={password}
              ></BaseInputPassword>
            </div>
            <div className={styles.LoginView__btnSubmit}>
              <BaseButton properties={buttonSubmit}></BaseButton>
            </div>
            <div className={styles.LoginView__alert}>
              <Alert onClose={handleCloseAlert} data={alert}></Alert>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  setUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
