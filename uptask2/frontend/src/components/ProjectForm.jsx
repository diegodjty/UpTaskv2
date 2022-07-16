import React from 'react';
import { useState } from 'react';
import useProjects from '../hooks/useProjects';
import Alert from '../components/Alert';

const ProjectForm = () => {
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [client, setClient] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { showAlert, alert, submitProject } = useProjects();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([name, desc, client, dueDate].includes('')) {
      showAlert({
        msg: 'All fields are required',
        erro: true,
      });
      return;
    }
    await submitProject({name,desc,dueDate,client})
    setName('')
    setDesc('')
    setClient('')
    setDueDate('')
  };

  const { msg } = alert;

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      {msg && <Alert alert={alert}/>}
      <div className="mb-5">
        <label
          htmlFor="name"
          className="text-gray-700 uppercase font-bold text-sm "
        >
          Project Name
        </label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="name"
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="desc"
          className="text-gray-700 uppercase font-bold text-sm "
        >
          Description
        </label>
        <textarea
          type=""
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="desc"
          placeholder="Project Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="due-date"
          className="text-gray-700 uppercase font-bold text-sm "
        >
          Project Due Date
        </label>
        <input
          type="date"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="due-date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="client-name"
          className="text-gray-700 uppercase font-bold text-sm "
        >
          Client Name
        </label>
        <input
          type="text"
          className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
          id="client-name"
          placeholder="Client Name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={'Create Project'}
        className="bg-sky-600 w-full p-3 uppercase font-bold text-white cursor-pointer hover:bg-sky-700 transition-colors"
      />
    </form>
  );
};

export default ProjectForm;
