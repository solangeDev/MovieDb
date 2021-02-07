import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import LoginView from '../containers/LoginView';
import Router from 'next/router';
import { selectUser } from '../redux/user/userSelectors';
import { connect } from 'react-redux';

type LoginProps = {
    session: {
        session_id: string;
    };
};

const Login: React.FC<LoginProps> = ({ session }: LoginProps) => {
    const [loginWrapper, setLoginWrapper] = useState(false);
    useEffect(() => {
        setLoginWrapper(session.session_id === '');
        if (session.session_id !== '') {
            Router.push('/dashboard', `/dashboard`);
        }
    }, [session]);

    return (
        <div>
            <Head>
                <meta httpEquiv="Content-Type" content="text / html; charset = utf-8" />
                {/* agregar metadadata descripción */}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Moviedb</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {loginWrapper && <LoginView />}
        </div>
    );
};

const mapStateToProps = (state) => ({
    session: selectUser(state),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
