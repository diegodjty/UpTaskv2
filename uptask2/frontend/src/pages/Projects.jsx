import React from 'react';
import useProjects from '../hooks/useProjects';

const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);
  return (
    <>
      <h1 className="text-4xl font-black">Projects</h1>
      <div></div>
    </>
  );
};

export default Projects;