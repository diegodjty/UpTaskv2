import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';

const ConfirmAccount = () => {
  const params = useParams();
  const { id } = params;
  const [alert, setAlert] = useState({});
  const [confirmAccount, setConfirmAccount] = useState(false);

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `http://localhost:4000/api/users/confirm/${id}`;
        const { data } = await axios.get(url);
        console.log(data);
        setAlert({
          msg: data.msg,
          error: false,
        });
        setConfirmAccount(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    console.log('d');
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">
        Confirm your account and start creating your{' '}
        <span className="text-slate-700">projects</span>
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {confirmAccount && (
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            Login
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
