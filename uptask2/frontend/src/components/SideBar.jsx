import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const SideBar = () => {
  const { auth } = useAuth();
  return (
    <aside className="md:w-80 lg:w-96 px-5 py-10">
      <p className="text-xl font-bold">Hi {auth.name}</p>
      <Link
        to="create-project"
        className="bg-sky-600 w-full text-white p-3 uppercase font-bold block mt-5 text-center rounded-lg "
      >
        New Project
      </Link>
    </aside>
  );
};

export default SideBar;
