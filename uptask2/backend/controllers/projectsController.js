import verifyOwner from '../helpers/verifyOwner.js';
import Projects from '../models/Projects.js';
import Task from '../models/Task.js';

const getProjects = async (req, res) => {
  const projects = await Projects.find().where('creator').equals(req.user);

  res.json(projects);
};

const newProject = async (req, res) => {
  const project = new Projects(req.body);
  project.creator = req.user._id;

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const getProject = async (req, res) => {
  const { id } = req.params;

  const project = await Projects.findById(id);

  verifyOwner(project, req, res);

  res.json(project);
};

const editProject = async (req, res) => {
  const { id } = req.params;

  const project = await Projects.findById(id);

  verifyOwner(project, req, res);

  project.name = req.body.name || project.name;
  project.description = req.body.description || project.description;
  project.dueDate = req.body.dueDate || project.dueDate;
  project.client = req.body.client || project.client;

  try {
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (error) {
    console.log(error);
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const project = await Projects.findById(id);
  verifyOwner(project, req, res);

  try {
    await project.deleteOne();
    res.json({ msg: 'Project Eliminated' });
  } catch (error) {
    console.log(error);
  }
};

const addCollaborator = async (req, res) => {};

const deleteCollaborator = async (req, res) => {};

const getTasks = async (req, res) => {
  const { id } = req.params;

  const projectExist = await Projects.findById(id);
  if (!projectExist) {
    const error = new Error('Not found');
    return res.status(400).json({ msg: error.message });
  }

  const tasks = await Task.find().where('project').equals(id);

  res.json(tasks);
};

export {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks,
};
