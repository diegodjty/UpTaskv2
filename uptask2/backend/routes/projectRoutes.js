import express from 'express';
import {
  getProjects,
  newProject,
  getProject,
  editProject,
  deleteProject,
  addCollaborator,
  deleteCollaborator,
  getTasks,
} from '../controllers/projectsController.js';
import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', checkAuth, getProjects);
router.post('/', checkAuth, newProject);

router.get('/:id', checkAuth, getProject);
router.put('/:id', checkAuth, editProject);
router.delete('/:id', checkAuth, deleteProject);

router.get('/task/:id', checkAuth, getTasks);
router.post('/add-collaborator/:id', checkAuth, addCollaborator);
router.delete('/delete-collaborator/:id', checkAuth, deleteCollaborator);

export default router;
