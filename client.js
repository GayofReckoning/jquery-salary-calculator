$(document).ready(readyNow);
let employees = [];
let monthlyCost = 0;

function readyNow(){
    //when submit button is clicked, run function submitEmployee
    $('#submit-btn').on('click', submitEmployee);

}

function submitEmployee(){
    console.log('you clicked submit!')
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
        ID: idIn,
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
}//end submitEmployees