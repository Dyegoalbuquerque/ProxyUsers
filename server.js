const app = require('./src/app');
let port = process.env.PORT || 5000;

app.listen(5000, () => {
   console.log(`web api running http://localhost:${port}`);
});