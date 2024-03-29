import useProjects from '../hooks/useProjects';

const Collaborators = ({ collaborator }) => {
  const { name, email } = collaborator;
  const { deleteCollaboratorModal, handleDeleteCollaborator } = useProjects();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="">{name}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>
      <div>
        <button
          type="button"
          className="bg-red-600 px-4 py-3 text-white font-bold text-sm rounded-lg"
          onClick={()=>handleDeleteCollaborator(collaborator)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Collaborators;
