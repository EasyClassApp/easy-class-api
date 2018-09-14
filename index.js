import express from 'express';
import passport from 'passport';
import configuration from './infrastructure/configuration';

import * as authController from './controllers/auth/authController';
import * as authValidation from './controllers/auth/authValidation';

import * as userController from './controllers/user/userController';
import * as alunoController from './controllers/user/alunoController';
import * as professorController from './controllers/user/professorController';

import * as classController from './controllers/class/classController';

// create and configure Express server
const app = express();
configuration(app);

// authorization
const authorize = passport.authenticate('jwt', { session: false });

// set routes
const router = express.Router();

router.post('/signup', authValidation.signupValidation, authController.signup);
router.post('/signin', authController.signin);

router.get('/user', userController.getUsers);
router.get('/user/:userId', userController.getUserById);
router.put('/user/:userId', userController.updateUser);
router.delete('/user/:userId', userController.deleteUser);

//ALUNO
router.get('/aluno', alunoController.getAlunos);
router.post('/aluno', alunoController.createAluno);

//PROFESSOR
router.get('/aluno', professorController.getProfessores);
router.post('/aluno', professorController.createProfessor);

router.get('/class', classController.getClasses);
router.get('/class/:classId', authorize, classController.getClassById);

app.use('/api', router);

// initialize server
const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
export default app.listen(port, () => {
  console.info(`server started on port ${port} (${app.get('env')})`); // eslint-disable-line
});
