import express, { response } from 'express';

const app = express();

//active express to read post json
app.use(express.json()); 

//GET
app.get('/users', (request, response) => {
   const users = [
       { name: 'davy', age: 37 },
       {name: 'brunna', age: 17},
   ];

   return response.json(users);
});

//POST
app.post('/users', (request, response) => {
    console.log(request.body);
});

//DELETE
//:id is a paramets to identify 
app.delete('/users/:id', (request,response) => {
    console.log(request.params);
});


// localhost:3333
app.listen(3333);