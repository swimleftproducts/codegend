import axios from 'axios';
import React, { useState, useContext } from 'react';
import { DisplayContext } from './DisplayContext';

export default function LoginCard(props) {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState();

  const { setAuth } = props;
  const { setShowLogin, setShowReset } = useContext(DisplayContext);
 
 

  const onSubmit = async (event) => {
    let formData = { password, email };
    axios
      .post('/api/auth/login', formData, { withCredentials: true })
      .then((response) => {
        setAuth(response.data);
        setMessage('Successful login');
        setTimeout(() => {
          setShowLogin(false);
        }, 500);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        return;
      })
  };
  const onResetSubmit = async (event) => {
      setShowReset(true);
      setShowLogin(false);
    };

  return (
    <div className=" login card shadow-2-strong">
      <div className="card-body p-4 text-center">
        <div className="register-heading">
          <h4 className="mb-1">Sign in</h4>
        </div>

        <div className="form-outline mb-2">
          <label className="form-label p-0 m-0" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control form-control-lg"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label p-0 m-0" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control form-control-lg"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button
          className="mt-0 btn register-form-btn btn-med btn-block"
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          Login
        </button>
        {(message && message!=="Successful login" ) ? (
          <button
            className="btn btn-med register-form-btn register-btn-reset"
            onClick={(e) => {
              e.preventDefault();
              onResetSubmit();
            }}
          >
            Reset
          </button>
        ) : null}
        {message ? <p>{message} </p> : null}
      </div>
    </div>
  );
}
