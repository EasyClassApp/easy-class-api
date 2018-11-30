import express from 'express';
import passport from 'passport';
import swaggerUi from 'swagger-ui-express';
import configuration from './infrastructure/configuration';
import * as authController from './controllers/auth/authController';
import * as authValidation from './controllers/auth/authValidation';
import * as userController from './controllers/user/userController';
import * as alunoController from './controllers/user/alunoController';
import * as professorController from './controllers/user/professorController';
import * as classController from './controllers/class/classController';
import getMaterias from './controllers/materia/materiaController';
import swaggerDocument from './doc/swagger.json';

// create and configure Express server
const app = express();
configuration(app);

// Use the 'authorize' object to protect requests using the JWT token
const authorize = passport.authenticate('jwt', { session: false });

const router = express.Router();
router.get('', (req, res) => res.send(`Easy Class API (${process.env.NODE_ENV}) 1`));
router.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
router.get('/swagger', router);

// admin users
router.post('/signup', authValidation.signupValidation, authController.signup);
router.post('/signin', authValidation.signinValidation, authController.signin);
router.get('/user', userController.getUsers);
router.get('/user/:userId', userController.getUserById);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

// ALUNO
router.get('/aluno', alunoController.getAlunos);
router.post('/aluno', alunoController.createAluno);

// ALUNO MARCAR AULA
router.post('/aluno/marcaraula', classController.createAula);

// PROFESSOR
router.post('/professor/signup', authValidation.signupProfessorValidation, authController.signupProfessor);
router.post('/professor/signin', authValidation.signinProfessorValidation, authController.signinProfessor);
router.get('/professor', professorController.getProfessores);
router.get('/professor/:id', professorController.getProfessor);
router.get('/professor/:materia', professorController.getProfessoresByMateria);
router.get('/professor/agenda/:id', professorController.getAgendaProfessor);
router.put('/professor/agenda/:id', professorController.putHorariosProfessor);
router.get('/professor', professorController.getProfessores);
router.post('/professor', professorController.createProfessor);
router.put('/professor/validate', professorController.validateProfessor);

// aluno
router.post('/aluno/signup', authValidation.signupAlunoValidation, authController.signupAluno);
router.post('/aluno/signin', authValidation.signinAlunoValidation, authController.signinAluno);
router.get('/aluno', alunoController.getAlunos);
router.post('/aluno', alunoController.createAluno);

// class
router.get('/class', classController.getClasses);
router.get('/class/:classId', authorize, classController.getClassById);
router.put('/class/:id', classController.updateClass);
router.delete('/class/:id', classController.removeClass);

// materias
router.get('/materias', getMaterias);

app.use('/api', router);
export default app;
