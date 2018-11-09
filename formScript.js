//Functions
//
//Function to test if email submitted is a valid address.
//
function emailTest(email) {
  var eParam = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,6})+$/;
  var isGood = eParam.test(email); 
  if (!isGood) {
    noErrors = false;
    $('#emailFError').css("display","block");
  }
  else {
    $('#emailFError').css("display","none");
  }
}
//
//Function to test if Password meets criteria
//
function passTest(pass) {
  var pParam = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/;
  var isGood = pParam.test(pass);
  if (!isGood) {
    $('#pWordError').css("display","block");
    noErrors = false;
  }
  else {
    $('#pWordError').css("display","none");
  }
}
//
//Function to check if two fields are the same (Password & Password Confirm or Email & Email confirm)
//
function isSame(string1, string2, ref) {
  //Will end run if No Errors flag is False
  if (noErrors) {
    //if Strings are Email Addresses
    if(ref === 1) {
      //Convert Case to Lowercase (as case does not matter for email addresses)
      var email1 = string1.toLowerCase();
      var email2 = string2.toLowerCase();
      //if Email addresses match
      if (email1 === email2) {
        $('#emailFCError').css("display" , "none");
      }
      //if Email addresses don't match
      else {
        noErrors = false;
        $('#emailFCError').css("display" , "block");
      }
    }
    //if Strings are Passwords
    else {
      //if Passwords match
      if (string1 === string2) {
        $('#pWordCError').css("display", "none");
      }
      //if Passwords don't match
      else {
        noErrors = false;
        $('#pWordCError').css("display", "block");
      }
    }
  }
}
function fieldFilled(input, ref) {
  var invalid = /(^[A-Z]{1}$)|(^[A-Z] $)/g;
  //If Required Fields are Blank
  if ((input === "")||invalid.test(input)) {
    noErrors = false;
    if (ref === 1) {
      $('#fNameError').css("display", "block");
    }
    else if (ref === 2) {
      $('#lNameError').css("display", "block");
    }
    else if (ref === 3) {
      $('#securityAnsError').css("display", "block");
    }
  }
  //If Required Fields are Completed
  else {
    if (ref === 1) {
      $('#fNameError').css("display", "none");
      $('#first_name').val($.trim(input));
    }
    else if (ref === 2) {
      $('#lNameError').css("display", "none");
      $('#last_name').val($.trim(input));
    }
    else if (ref === 3) {
      $('#securityAnsError').css("display", "none");
      $('#security_Ans').val($.trim(input));
    }
  }
}
//
//Function dobChecker is intended to ensure that the Month and Year are selected for the date of birth.
//
function dobChecker(val, index) {
  if (val === null) {
    noErrors = false;
    //Unpopulated Month Field
    if (index === 1) {
      $('#monthError').css("display", "block");
    }
    //Unpopulated Year Field
    else {
      $('#yearError').css("display", "block");
    }
  }
  else {
    //Populated Month Field
    if (index === 1) {
      $('#monthError').css("display", "none");
    }
    //Populated Year Field
    else {
      $('#yearError').css("display", "none");
    }
  }
}
function termAndCondChecker(arg) {
  //If Not Checked
  if (!arg) {
    noErrors = false;
    $('#tandcValid').css("display", "block"); 
  }
  else {
    $('#tandcValid').css("display", "none"); 
  }
}

//Global Variables 
var noErrors;
var leapYear;

//
//Event Listeners
//
//First Name Text Field Input Listener
$('#first_name').on('input', function(){
  var alpha = /([^a-zA-Z- ])|( {2,})/g;
  var current = $(this).val();
  var capitalize = /[^A-Z]/g;
  //Checking to make sure all characters are Alphabetic will delete any invalid characters. Hyphens and one space is allowed in between letters.
  if (alpha.test(current)) {
    current = current.replace(alpha, "");
    $(this).val(current);
  }
  //Capitalize the first letter of the string
  else if (capitalize.test(current[0])) {
    current = current.replace(current[0], current[0].toUpperCase());
    $(this).val(current);
  }
});

//Middle Initial Text Field Input Listener
$('#middle_initial').on('input', function(){
  var excess = /[a-zA-Z]{2,}/g;
  var nonAlpha = /[^a-zA-Z]/g;
  var capitalize = /[^A-Z]/g;
  var current = $(this).val();
  
  //Delete extra characters if more than 1 is input
  if (excess.test(current)) {
    current = current[0];
    $(this).val(current);
  }
  //Test if input is an Alphabetic Character
  else if (nonAlpha.test(current)) {
    current = current.replace(nonAlpha, "");
    $(this).val(current);
  }
  //Auto-capitalize the Middle Initial
  else if (capitalize.test(current[0])) {
    current = current.replace(current[0], current[0].toUpperCase());
    $(this).val(current);
  }
});
//Last Name Text Field Input Listener
$('#last_name').on('input', function(){
  var alpha = /([^a-zA-Z- ])|( {2,})/g;
  var current = $(this).val();
  var capitalize = /[^A-Z]/g;
  //Checking to make sure all characters are Alphabetic will delete any invalid characters. Hyphens and one space is allowed in between letters.
  if (alpha.test(current)) {
    current = current.replace(alpha, "");
    $(this).val(current);
  }
  //Capitalize the first letter of the string
  else if (capitalize.test(current[0])) {
    current = current.replace(current[0], current[0].toUpperCase());
    $(this).val(current);
  }
});
//Security Answer Field Check. Purpose is to ensure that the field is populated with an answer.
$('#security_Ans').on('input', function() {
  var alpha = /([^a-zA-Z- ])|( {2,})/g;
  var current = $(this).val();
  //Checking to make sure all characters are Alphabetic
  if (alpha.test(current)) {
    current = current.replace(alpha, "");
    $(this).val(current);
  }
});
//Date of Birth Day changer
$('#month_Birth').on('change', function() {
  var check = Number($(this).val());
  //Check if Month has atleast 30 days
  if (check !== 2) {
    $('#day_Birth').append('<option value="29">29</option>');
    $('#day_Birth').append('<option value="30">30</option>');
    $('#day_Birth option[value="31"]').remove();
    //Check if Month has 31 days
    if (((check % 1) === 0 && check <= 7)||((check % 2) === 0 && check > 7)) {
      $('#day_Birth').append('<option value="31">31</option>');
    }
  } 
  //If month is February.
  else if (leapYear === true) {
    $('#day_Birth option[value="31"]').remove();
    $('#day_Birth option[value="30"]').remove();
    $('#day_Birth').append('<option value="29">29</option>');
  }
  else {
    $('#day_Birth option[value="31"]').remove();
    $('#day_Birth option[value="30"]').remove();
    $('#day_Birth option[value="29"]').remove();
  }
});
//Leap Year Check 
$('#year_Birth').on('change', function() {
  var check = Number($(this).val());
  if (check % 4 !== 0) {
    leapYear = false;
    if (Number($('#month_Birth').val()) === 2) {
      $('#day_Birth option[value="29"]').remove();
    }
  }
  else if (check % 100 !== 0) {
    leapYear = true;
    if (Number($('#month_Birth').val()) === 2) {
      $('#day_Birth option[value="29"]').remove();
      $('#day_Birth').append('<option value="29">29</option>');
    }
  }
  else if (check % 400 !== 0) {
    leapYear = false;
    if (Number($('#month_Birth').val()) === 2) {
      $('#day_Birth option[value="29"]').remove();
    }
  }
  else {
    leapYear = true;
    if (Number($('#month_Birth').val()) === 2) {
      $('#day_Birth option[value="29"]').remove();
      $('#day_Birth').append('<option value="29">29</option>');
    }
  }
});
//Submit Button Validation Listener
$('#submit').click(function(event){
  noErrors = true;
  //Check if Email is Valid
  emailTest($('#emailInput').val());
  //Check if Email Confirmation field matches
  isSame($('#emailInput').val(), $('#emailcInput').val(), 1);
  //Password Rule Test
  passTest($('#password').val());
  //Check if Password Confirm field matches
  isSame($('#password').val(), $('#cpassword').val(), 2);
  //Required Names field checked
  fieldFilled($('#first_name').val(), 1);
  fieldFilled($('#last_name').val(), 2);
  //Security Answer Check
  fieldFilled($('#security_Ans').val(), 3);
  //Date of Birth Check
  dobChecker($('#month_Birth').val(), 1);
  dobChecker($('#year_Birth').val(), 2);
  //Check if Terms and Conditions are accepted
  termAndCondChecker($('#tandcBox').prop("checked"));
  //Check if noErrors is still true
  if (!noErrors) {
    event.preventDefault();
  }
});
