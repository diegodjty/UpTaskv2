import React from 'react';

const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize ">
        Reestablish your password dont lose access to your{' '}
        <span className="text-slate-700">projects</span>
      </h1>
      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            New Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="New Password"
            className=" w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>

        <input
          type="submit"
          value={'Save New Password'}
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase cursor-pointer font-bold rounded hover:bg-sky-800 transition-colors "
        />
      </form>
    </>
  );
};

export default NewPassword;
