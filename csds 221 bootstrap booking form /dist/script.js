$(document).ready(function() {
  
  // Validate Check-In Date
  function validateCheckInDate() {
    let checkInDate = $('#check-in-date').val();
    if (checkInDate && !isValidFormat(checkInDate)) {
      toastr.error('Invalid format');
      $('#check-in-date').val(''); 
    }
  }

  // Validate Check-Out Date
  function validateCheckOutDate() {
    let checkOutDate = $('#check-out-date').val();
    if (checkOutDate && !isValidFormat(checkOutDate)) {
      toastr.error('Invalid format.');
      $('#check-out-date').val('');
    } 
    else if (checkOutDate && $('#check-in-date').val()) {
      daysCalculation($('#check-in-date').val(), checkOutDate);
    }
  }

  // Check date format helper
  function isValidFormat(date) {
    let momentDate = moment(date, "YYYY-MM-DD", true);
    return momentDate.isValid(); 
  }
  
  $('#check-in-date').blur(validateCheckInDate); 
  $('#check-out-date').blur(validateCheckOutDate);

  // Days calculation
  function daysCalculation(checkInDate, checkOutDate) {
    let inDate = moment(checkInDate, "YYYY-MM-DD");
    let outDate = moment(checkOutDate, "YYYY-MM-DD");
    
    // Calculate the difference in days if the indate is inputted first
    let duration = outDate.diff(inDate, "days");
    
    $('#displaydays').val(duration); 
    costCalculation(duration);
  } 
  
  // Cost calculation 
  function costCalculation(duration){
    let numberOfAdults = parseInt($('#adults').val()); 
    let costs = 150 * numberOfAdults * duration; 
    
    $("#displaycosts").val(costs);
  
  }
  
  // If adults number change 
  $('#adults').change(function() {
    if ($('#displaydays').val()) {
      costCalculation($('#displaydays').val()); 
    }
  });
  
  // Reset Button
  $('#resetButton').click(function() {
    $('#bookingForm').get(0).reset();

    // Display a blue info toastr notification
    toastr.info('All fields have been successfully cleared');

   // Clear any additional fields manually if needed
    $('#displaydays').val('');
    $('#displaycosts').val('');
  });
  
  // Submit button
  $('#submitButton').click(function(event) {
    
    event.preventDefault()

    let hasErrors = false;
    let errorMessage = '';
    let missingFields = [];

    // Check if required fields are empty
    let required = [
      { id: '#username', name: 'Username' },
      { id: '#first-name', name: 'First Name' },
      { id: '#last-name', name: 'Last Name' },
      { id: '#phone', name: 'Phone' },
      { id: '#fax-number', name: 'Fax' },
      { id: '#email', name: 'Email' }
    ];

    // Check if any field is missing
    required.forEach(function(field) {
      let value = $(field.id).val();
      // If empty
      if (value === '') {
        $(field.id).closest('.form-group').addClass('has-error');
        missingFields.push(field.name)
        hasErrors = true;
      } else {
        $(field.id).closest('.form-group').removeClass('has-error');
      }
    });
    
    if (missingFields.length > 0) {
      errorMessage = 'The following fields are missing: ' +       missingFields.join(', ') + '. ';
    }

    // Check if cost positive
    let cost = $('#displaycosts').val();
    if (cost < 0) {
        errorMessage += 'Cost cannot be negative.';
        hasErrors = true;
    }
    
    // Check if cost calculated
    if(cost == 0){
      errorMessage += 'No cost is calculated.';
      hasErrors = true;
    }

    // Display error message if there are errors
    if (hasErrors) {
      toastr.error(errorMessage);
    } else {
      toastr.success('The form was successfully submitted');
    }
  });

});