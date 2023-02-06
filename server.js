import app from './app';

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Load on: http://localhost:${PORT}`);
});
