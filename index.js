import express from 'express';
import passport from 'passport';
import configuration from './infrastructure/configuration';
import * as authController from './controllers/auth/authController';
import * as authValidation from './controllers/auth/authValidation';
import * as userController from './controllers/user/userController';
import * as alunoController from './controllers/user/alunoController';
import * as professorController from './controllers/user/professorController';
import * as classController from './controllers/class/classController';
import * as materiaController from './controllers/materia/materiaController';

// create and configure Express server
const app = express();
configuration(app);

// Use the 'authorize' object to protect requests using the JWT token
const authorize = passport.authenticate('jwt', { session: false });

const router = express.Router();
router.get('', (req, res) => res.send(`Easy Class API (${process.env.NODE_ENV}) 1`));

// admin users
router.post('/signup', authValidation.signupValidation, authController.signup);
router.post('/signin', authValidation.signinValidation, authController.signin);
router.get('/user', userController.getUsers);
router.get('/user/:userId', userController.getUserById);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

// professor
router.post('/professor/signup', authValidation.signupProfessorValidation, authController.signupProfessor);
router.get('/professor', professorController.getProfessores);
router.get('/professor/:id', professorController.getProfessor);
router.get('/professor/:id/agenda', professorController.getAgendaProfessor);
router.post('/professor', professorController.createProfessor);
router.post('/professor/validate', professorController.validateProfessor);

// aluno
router.post('/aluno/signup', authValidation.signupAlunoValidation, authController.signupAluno);
router.get('/aluno', alunoController.getAlunos);
router.post('/aluno', alunoController.createAluno);

// class
router.get('/class', classController.getClasses);
router.get('/class/:classId', authorize, classController.getClassById);

// materias
router.get('/materias', materiaController.getMaterias);

app.use('/api', router);
export default app;
