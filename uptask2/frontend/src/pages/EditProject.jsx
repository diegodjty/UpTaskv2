import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import useProjects from '../hooks/useProjects';

const EditProject = () => {
  const { getProject, project, loading } = useProjects();
  const params = useParams();
  useEffect(() => {
    getProject(params.id);
  }, []);

  if (loading) return 'Loading...';
  return (
    <>
      <h1 className="font-black text-4xl">Edit Project: {project.name}</h1>
      <div className="mt-10 flex justify-center">
        <ProjectForm />
      </div>
    </>
  );
};

export default EditProject;
