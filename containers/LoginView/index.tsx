import React, { useState, useEffect, Fragment } from 'react';
import styles from './index.module.scss';
import BaseInput from '../../components/BaseInput';
import BaseInputPassword from '../../components/BaseInputPassword';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BaseButton from '../../components/BaseButton';
import Alert from '../../components/Alert';
import TopBar from '../../components/TopBar';
import { validate } from './validator';
import { getRequestToken, logIn } from '../../services/user';
import Router from 'next/router';
import { setUser } from '../../redux/user/userActions';
import { connect } from 'react-redux';
import Link from 'next/link';

type LoginViewProps = {
    setUser: (e) => void;
};

interface Alert {
    show: boolean;
    message?: string;
    type: 'error' | 'success' | 'info' | 'warning' | undefined;
}

interface InputPasswordProps {
    label: string;
    type: 'password' | undefined;
    name: string;
    maxlength?: number;
    id: string;
    helperText: string;
    value: string;
    error: boolean;
}

interface InputBaseProps {
    label: string;
    type: 'text' | 'password' | undefined;
    name: string;
    maxlength?: number;
    id: string;
    helperText: string;
    value: string;
    error: boolean;
}

interface BaseButtonProps {
    className: string;
    hover?: string;
    classHover: string;
    title: string;
    type: 'button' | 'submit' | undefined;
    disabled: boolean;
    loading: boolean;
}

const LoginView: React.FC<LoginViewProps> = ({ setUser }: LoginViewProps) => {
    const [buttonSubmit, setButtonSubmit] = useState<BaseButtonProps>({
        disabled: false,
        className: 'btnBlue',
        title: 'Inicia sesión',
        type: 'submit',
        classHover: 'hvr-radial-out',
        loading: false,
    });

    const [userName, setUserName] = useState<InputBaseProps>({
        label: 'User name',
        type: 'text',
        name: 'userName',
        id: 'userName',
        helperText: '',
        value: '',
        error: false,
    });

    const [password, setPassword] = useState<InputPasswordProps>({
        type: 'password',
        value: '',
        id: 'password',
        label: 'Password',
        name: 'password',
        error: false,
        helperText: '',
        maxlength: 30,
    });

    const [alert, setAlert] = useState<Alert>({
        show: false,
        type: 'error',
        message: '',
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
                if (a.name === 'userName') {
                    setUserName({ ...userName, error: true, helperText: a.message });
                } else if (a.name === 'password') {
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
                            console.log(r, 'error');
                        }
                    })
                    .catch((e) => {
                        setAlert({
                            ...alert,
                            show: true,
                            message: 'Server error',
                            type: 'error',
                        });
                        console.error(e);
                    });
                if (requestToken.status === 200) {
                    requestToken = requestToken.data;
                    await logIn({
                        username: userName.value,
                        password: password.value,
                        request_token: requestToken.request_token,
                    })
                        .then((response) => {
                            if (response.success === true) {
                                setUser(response);
                                Router.replace('/dashboard', `/dashboard`);
                            } else {
                                throw response.data.status_message;
                            }
                        })
                        .catch((e) => {
                            setAlert({
                                ...alert,
                                show: true,
                                message: e,
                                type: 'error',
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
            <header>
                <AppBar position="static">
                    <Toolbar className={styles.LoginView__topBarNav}>
                        <Link href="/dashboard" as={`/dashboard`}>
                            <div className={styles.LoginView__topBarTitle}>Moviedb</div>
                        </Link>
                    </Toolbar>
                </AppBar>
            </header>
            {/* <TopBar menuIcon={false} /> */}
            <section className={styles.LoginView}>
                <div className={styles.LoginView__wrapper}>
                    <div className={styles.LoginView__title}>MovieDB</div>
                    <form onSubmit={handleSubmit} className={styles.LoginView__container}>
                        <div className={styles.LoginView__item}>
                            <BaseInput properties={userName} onChange={handleChangeUserName}></BaseInput>
                        </div>
                        <div className={styles.LoginView__item}>
                            <BaseInputPassword
                                onChange={handleChangePassword}
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
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
    setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
