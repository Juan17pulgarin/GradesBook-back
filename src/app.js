import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import subjectRoutes from './routes/subject.routes.js';
import periodRoutes from './routes/period.routes.js'; 
import enrollmentRoutes from './routes/enrollment.routes.js';
import academicLoadRoutes from './routes/load.routes.js';
import activityRoutes from './routes/activity.routes.js';
import gradeRoutes from './routes/grade.routes.js';
import institucionRoutes from './routes/institution.routes.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/subjects', subjectRoutes);
app.use('/api/v1/periods', periodRoutes);
app.use('/api/v1/enrollments', enrollmentRoutes);
app.use('/api/v1/academic-loads', academicLoadRoutes);
app.use('/api/v1/activities', activityRoutes);
app.use('/api/v1/grades', gradeRoutes);
app.use('/api/v1/institutions', institucionRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ 
    message: '¡Bienvenido a GradesBook API versión 1.0! 🚀' 
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: '¡Bienvenido a GradesBook API versión 1.0! Sin embargo, la ruta que intentas consultar no existe.'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`GradesBook API running on port ${PORT}`);
});