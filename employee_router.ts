import { Router } from "express";

const employeeRouter = Router();
let employeeList:Employee[] =[
    {
        id:1,
        name:"Test name",
        phone:9090909099,
        mail:'testmail@gmail.com',
        createdAt:new Date(),
        updatedAt:new Date()

    }
];
function getEmployeeByID(id:number){
    let employee = employeeList.find(data=>
        data.id  == id
    );
    return employee;
}
function updateEmployeeByID(id:number,employee:Employee){
    
    for(let i=0;i<employeeList.length;i++){
        if (employeeList[i].id==id){
            employeeList[i].name= employee.name;
            employeeList[i].phone = employee.phone;
            employeeList[i].mail = employee.mail;
            employeeList[i].updatedAt = new Date();
            return employeeList[i];
        }
    }
    return null;
}
function deleteEmployeeByID(id:number){
    let employee =null;
    for(let i=0;i<employeeList.length;i++){
        if (employeeList[i].id==id){
            employee = employeeList[i];
            delete employeeList[i];
        }
    }
    return employee;
}
function patchEmployeeByID(id:number,params:any){
    let employee =null;
    for(let i=0;i<employeeList.length;i++){
        if (employeeList[i].id==id){
            
            if ("name" in params) employeeList[i].name = params.name;
            if ("phone" in params) employeeList[i].phone = params.phone;
            if ("mail" in params) employeeList[i].mail = params.mail;
            employeeList[i].updatedAt = new Date();
            employee = employeeList[i];
            
        }
    }
    return employee;
}
let current_id = 2;

employeeRouter.get('/',(req,res)=>{
    console.log("Retrieving employee list");
    res.status(200);
    res.send(employeeList);

})
employeeRouter.post('/',(req,res)=>{
    let data = req.body;
    console.log("Creating employee ");
    employeeList.push({
        id:current_id++,
        name:data.name,
        phone:data.phone,
        mail:data.mail,
        createdAt : new Date(),
        updatedAt:new Date()
    })
    res.status(201);
    let employee = getEmployeeByID(current_id-1);
    res.send(employee);
})
employeeRouter.get('/:id',(req,res)=>{
    console.log("Retrieving employee by id");
    let id = req.params.id;
    res.status(200);
    let employee = getEmployeeByID(parseInt(id));
    res.send(employee);

})
employeeRouter.put('/:id',(req,res)=>{
    console.log("Retrieving employee by id");
    let id = req.params.id;
    res.status(200);
    let updated_data = req.body;
    let employee = updateEmployeeByID(parseInt(id),updated_data);
    res.send(employee);

})
employeeRouter.delete('/:id',(req,res)=>{
    console.log("Deleting employee by id");
    let id = req.params.id;
    res.status(204);
    let employee = deleteEmployeeByID(parseInt(id));
    res.send(employee);

})
employeeRouter.patch('/:id',(req,res)=>{
    console.log("Updating employee by id");
    let id = req.params.id;
    let data = req.body;
    res.status(200);
    let employee = patchEmployeeByID(parseInt(id),data);
    res.send(employee);

})
export default employeeRouter;