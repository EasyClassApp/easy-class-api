import app from './index';

const port = process.env.NODE_ENV === 'test' ? process.env.PORT_TEST : process.env.PORT;
export default app.listen(port, () => {
  console.info(`server started on port ${port} (${app.get('env')})`); // eslint-disable-line
});
