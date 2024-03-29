import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import axiosClient from '../config/axiosClient';
import useAuth from '../hooks/useAuth';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({});
  const { setAuth } = useAuth();

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlert({
        msg: 'All fields are required',
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post('/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      setAlert({});
      setAuth(data);
      setEmail('');
      setPassword('');
      navigate('/projects')

    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">
        Login and manage your <span className="text-slate-700">projects</span>
      </h1>
      {msg && <Alert alert={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value={'Login'}
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase cursor-pointer font-bold rounded hover:bg-sky-800 transition-colors "
        />
      </form>
      <nav className="lg:flex lg:justify-between ">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="register"
        >
          No account? Create One!
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="forgot-password"
        >
          Forgot Paswword
        </Link>
      </nav>
    </>
  );
};

export default Login;
