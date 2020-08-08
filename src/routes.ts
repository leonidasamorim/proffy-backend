import express from 'express';
import db from './database/connection';
import convertHourToMinutes from './utils/convertHourToMinutes';



const routes = express.Router();


interface ScheduleItem {
    week_day: number;
    from: string;
    to: string;
}
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

    const trx = await db.transaction();

    try {

        const insertedUsersIds = await trx('users').insert({
            name,
            avatar,
            whastapp,
            bio,
        });
    
        const user_id = insertedUsersIds[0];
    
        const insertedClassesIds = await trx('classes').insert({
            subject,
            cost,
            user_id
        });
    
        const class_id = insertedClassesIds[0];
        
        const classSchedule = schedule.map((ScheduleItem: ScheduleItem) => {
           return {
               class_id,
               week_day :  ScheduleItem.week_day,
               from:  convertHourToMinutes(ScheduleItem.from),
               to:  convertHourToMinutes(ScheduleItem.to),
           };
        }); 
     
        await trx('class_schedule').insert(classSchedule); 
    
        await trx.commit();

        return response.status(201).send(); 

    } catch (err) {
        await trx.rollback();
        return response.status(400).json({
            error: 'Unexpected error while creating new class'
        })
    }
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



