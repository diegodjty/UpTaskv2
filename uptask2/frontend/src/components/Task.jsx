import { formatDate } from '../helpers/formatDate';
import useAdmin from '../hooks/useAdmin';
import useProjects from '../hooks/useProjects';

const Task = ({ task }) => {
  const { handleEditTaskModal, handleDeleteTaskModal, changeTaskStatus } =
    useProjects();
  const { name, priority, dueDate, _id, description, status } = task;
  const admin = useAdmin();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl mb-1">{name}</p>
        <p className="text-sm text-gray-500 uppercase mb-1">{description}</p>
        <p className="text-sm mb-1">{formatDate(dueDate)}</p>
        <p className="text-xl text-gray-600 mb-1">Priority: {priority}</p>
      </div>
      <div className="flex gap-2">
        {admin && (
          <button
            className="bg-indigo-600 text-sm uppercase text-white px-4 py-3 rounded-lg"
            onClick={() => handleEditTaskModal(task)}
          >
            Edit
          </button>
        )}

        <button
          onClick={() => changeTaskStatus(_id)}
          className={`${
            status ? 'bg-sky-600' : 'bg-gray-600'
          } text-sm uppercase text-white px-4 py-3 rounded-lg`}
        >
          {status ? 'Complete' : 'Incomplete'}
        </button>

        {admin && (
          <button
            className="bg-red-600 text-sm uppercase text-white px-4 py-3 rounded-lg"
            onClick={() => handleDeleteTaskModal(task)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default Task;
