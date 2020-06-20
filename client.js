$(document).ready(readyNow);
let employees = [];
let monthlyCost = 0;
let x = 0;

function readyNow(){
    //when submit button is clicked, run function submitEmployee
    $('#submit-btn').on('click', submitEmployee);

}

function submitEmployee(){
    event.preventDefault();
    //don't submit if no Salary!
    if ($('#annualSalaryIn').val() === ''){
        alert('error: you need to enter a salary!')
        return false;
    } 
    //set variables for inputs from Dom
    let firstNameIn = $('#firstNameIn').val();
    let lastNameIn = $('#lastNameIn').val();
    let idIn = $('#idIn').val();
    let titleIn = $('#titleIn').val();
    let annualSalaryIn = $('#annualSalaryIn').val();
    //make a new Object with these variables
    let newObject = {
        firstName: firstNameIn,
        lastName: lastNameIn,
        employeeId: idIn,
        title: titleIn,
        annualSalary: annualSalaryIn
    }; //end newObject
    //push object of new inputs to employees array
    employees.push(newObject);
    console.log('stored employees:', employees );
    //add employee's monthly earnings (salary/12) to monthly total
    let monthlyEarnings = newObject.annualSalary/12;
    monthlyCost += monthlyEarnings;
    console.log(monthlyCost);
    //clear all input fields
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
    displayEmployees();
}//end submitEmployees

function displayEmployees(){
    console.log('in displayEmployees');
    //variable for display target
    let el = $('#employeeListOut');
    //clear display target
    el.empty();
    el.append(` <tr>
    <th>First Name:  </th>  
    <th>Last Name:  </th>  
    <th>ID:  </th>  
    <th>Title:  </th>  
    <th>Annual Salary:  </th> 
</tr>`)
    //loop to apend employees to display target
    for (let i=0; i<employees.length; i++){
        el.append(`<tr id ="employee${employees[i].id}"><td>${employees[i].firstName}</td>
        <td>${employees[i].lastName}</td>
        <td>${employees[i].employeeId}</td>
        <td>${employees[i].title}</td>
        <td>$${parseFloat( employees[i].annualSalary).toFixed(2)}</td>
        <td> <button class="remove-btn" id="remove${employees[i].id}">remove</button></td></tr>`) ;
    }//end for loop
    //add a remove button
    //when button is clicked, removeEmployee
    $('#employeeListOut').on('click', '.remove-btn', removeEmployee);
}//end displayEmployees

function removeEmployee(){
   console.log('employee removed!');
   $(this).parent().parent().remove();
 //   displayEmployees();
}