import { app } from './app';
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
