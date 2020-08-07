import express from 'express';
import db from './database/connection';

const routes = express.Router();

//GET
routes.post('/classes', async (request, response) => {

    const {
        name,
        avatar,
        whastapp,
        bio,
        subject,
        cost,
        schedule
    } = request.body;

    await db('users').insert({
        name,
        avatar,
        whastapp,
        bio,
    });

    return response.send(); //200
 });

 export default routes;

/*
//POST
routes.post('/users', (request, response) => {
    console.log(request.body);
});


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
*/ 



