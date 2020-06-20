$(document).ready(readyNow);
let employees = [];
let monthlyCost = 0;

function readyNow(){
    //when submit button is clicked, run function submitEmployee
    $('#submit-btn').on('click', submitEmployee);
}//end readyNow

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
    //clear all input fields
    $('#firstNameIn').val('');
    $('#lastNameIn').val('');
    $('#idIn').val('');
    $('#titleIn').val('');
    $('#annualSalaryIn').val('');
    displayEmployees();
    appendCost();
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
        el.append(`<tr id ="employee${employees[i].employeeId}"><td>${employees[i].firstName}</td>
        <td>${employees[i].lastName}</td>
        <td>${employees[i].employeeId}</td>
        <td>${employees[i].title}</td>
        <td>$${parseFloat( employees[i].annualSalary).toFixed(2)}</td>
        <td> <button class="remove-btn" id="${employees[i].employeeId}">remove</button></td></tr>`) ;
 //       $('#employeeListOut').on('click', `.remove${employees[i].id}`, removeEmployee(employees[i].id));
    }//end for loop
    //add a remove button
    //when button is clicked, removeEmployee
  $('#employeeListOut').on('click', '.remove-btn', removeEmployee);
}//end displayEmployees

function calculateMonthly(){
    //clear monthlyCost
    monthlyCost = 0;
    //loop through array of employees
    for (let i=0;i<employees.length; i++){
        //add employee's monthly earnings (salary/12) to monthly total
        let monthlyEarnings = employees[i].annualSalary/12;
        monthlyCost += monthlyEarnings;
    }//end for loop
    console.log('monthly cost:', monthlyCost);
    return monthlyCost;
}//

function removeEmployee(){
  // console.log('employee removed! ID: ', $(this).attr('id'));
   //remove parent row
   $(this).parent().parent().remove();
   //remove the whole dang employee object from employees
   //loop through employees
   //check for match id to id
   //splice employee
   for (let i=0; i<employees.length; i++){
       if( $( this ).attr( 'id' ) === employees[i].employeeId ){
           console.log(' removed employee: ', $( this ).attr( 'id' ) ); 
           let removed = employees.splice(i,1);
           console.log(employees);
       }
   }//end for loop
   appendCost();
}//end removeEmployee

function appendCost(){
    calculateMonthly();
    let h3 = $('#monthlyCostOut')//
    // clear h3
    h3.empty();
    //append the total monthly cost to h3
    h3.append(`Total Monthly Cost: $${parseFloat( monthlyCost ).toFixed( 2 )}`);
    //make it have a red background if over $20,000/mo
    if (monthlyCost > 20000){
        h3.addClass( 'redBackground' );
    } else {
        h3.removeClass( 'redBackground' );
    }
}