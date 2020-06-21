$( document ).ready( readyNow );
let employees = [];
let monthlyCost = 0;
const monthlyBudget = 20000;

function readyNow(){
    //when submit button is clicked, run function submitEmployee (click handler)
    $( '#submit-btn' ).on( 'click', submitEmployee );
    console.log( 'in readyNow' );
    //click handler for new remove button(s)
    $( '#employeeListOut' ).on( 'click', '.remove-btn', removeEmployee ) ;
}//end readyNow

function submitEmployee(){
    console.log( 'in submitEmployee' );
    //don't let the form refresh the page
    event.preventDefault();
    //don't allow submit if no Salary!
    if ( $( '#annualSalaryIn' ).val() === '' ){
        alert( 'error: Please enter a valid salary' );
        return false;
    } 
    //require an emplyee ID
    if ( $( '#idIn' ).val() === '' ){
        alert( 'error: please enter an ID' );
        return false;
    } 
    //Require a first name
    if ( $( '#firstNameIn' ).val() === '' ){
        alert( 'error: Please enter a valid first name' );
        return false;
    } 
    //require a last name
    if ( $( '#lastNameIn' ).val() === '' ){
        alert( 'error: Please enter a valid last name' );
        return false;
    } 
    //require a title
    if ( $( '#titleIn' ).val() === '' ){
        alert( 'error: please enter a title' );
        return false;
    } 
    //set variables for inputs from Dom
    let firstNameIn = $( '#firstNameIn' ).val();
    let lastNameIn = $( '#lastNameIn' ).val();
    let idIn = $( '#idIn' ).val();
    let titleIn = $( '#titleIn' ).val();
    let annualSalaryIn = $( '#annualSalaryIn' ).val();
    //Don't allow a duplicate employeeID
    //loop through existing employee IDs and check for match with idIN
    for ( let i=0; i<employees.length; i++ ){
        if ( employees[i].employeeId === idIn ){
            alert('Error: please enter a unique ID!');
            return false;
        }
    }//end for loop
    //make a new Object with these variables
    let newObject = {
        firstName: firstNameIn,
        lastName: lastNameIn,
        employeeId: idIn,
        title: titleIn,
        annualSalary: annualSalaryIn
    }; //end newObject
    //push object of new inputs to employees array
    employees.push( newObject );
    console.log( 'stored employees:', employees );
    //clear all input fields
    $( '#firstNameIn' ).val( '' );
    $( '#lastNameIn' ).val( '' );
    $( '#idIn' ).val( '' );
    $( '#titleIn' ).val( '' );
    $( '#annualSalaryIn' ).val( '' );
    //run the functions to display the employees and cost
    displayEmployees();
    appendCost();
}//end submitEmployees

function displayEmployees(){
    console.log( 'in displayEmployees' );
    //variable for display target (table body)
    let el = $( '#employeeListOut' );
    //clear display target
    el.empty();
    //loop to apend employees to display target
    //add a remove button
    for ( let i=0; i<employees.length; i++ ) {
        el.append( `<tr id ="employee${ employees[i].employeeId }"><td>${ employees[i].firstName }</td>
        <td>${ employees[i].lastName }</td>
        <td>${ employees[i].employeeId }</td>
        <td>${ employees[i].title }</td>
        <td>$${ parseFloat( employees[i].annualSalary ).toFixed( 2 ) }</td>
        <td> <button class="remove-btn" id="${ employees[i].employeeId }">remove</button></td>
        </tr>` );
    }//end for loop
}//end displayEmployees

function calculateMonthly(){
    console.log('in calculateMonthly');
    //clear monthlyCost
    monthlyCost = 0;
    //loop through array of employees
    for ( let i=0; i<employees.length; i++) {
        //add employee's monthly earnings (salary/12) to monthly total
        let monthlyEarnings = employees[i].annualSalary/12;
        monthlyCost += monthlyEarnings;
    }//end for loop
    console.log('monthly cost:', monthlyCost);
    return monthlyCost;
}// end calculate Monthly

function removeEmployee( event ){
   console.log( 'in remove Employee' );
   //remove parent row
   $( this ).parent().parent().remove();
   //remove the whole dang employee object from employees
   //loop through employees
   //check for match employeeID to buttonID
   //splice employee
   for ( let i=0; i<employees.length; i++ ) {
       if( $( this ).attr( 'id' ) === employees[i].employeeId ){
           console.log(' removed employee: ', $( this ).attr( 'id' ) ); 
           let removed = employees.splice( i, 1 );
           console.log( employees );
       }
   }//end for loop
   appendCost();
}//end removeEmployee

function appendCost(){
    console.log( 'in appendCost' );
    //run the calculatemonnthly function to determine the cost
    calculateMonthly();
    //set variable equal to the budget space on the DOM
    let h3 = $( '#monthlyCostOut' )
    // clear h3
    h3.empty();
    //append the total monthly cost to h3
    h3.append( `Total Monthly Cost: $${ monthlyCost .toLocaleString( undefined, { maximumFractionDigits: 2 } ) }` );
    //make it have a red background if over $20,000/mo
    if ( monthlyCost > monthlyBudget){
        h3.addClass( 'redBackground' );
    } else {
        h3.removeClass( 'redBackground' );
    }
}//end appendCost