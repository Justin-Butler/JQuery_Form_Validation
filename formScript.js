//Functions
//
//Function to test if email is valid
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
  var pParam = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:@])([^\s]){8,16}$/;
  var isGood = pParam.test(pass);
  if (!isGood) {
    noErrors = false;
    $('#pWordError').css("display","block");
  }
  else {
    $('#pWordError').css("display","none");
  }
}
//
//Function to check if two fields are the same (Password & Password Confirm or Email & Email confirm)
//
function isSame(string1, string2) {
  //Will end run if No Errors flag is False
  if (noErrors) {
    //if Strings are Email Addresses
    if(string1.search('@') != -1) {
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
        $('#pWordCError').css("display", "none");
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

//
//Event Listeners
//
//First Name Text Field Input Listener
$('#first_name').on('input', function(){
  var alpha = /([^a-zA-Z- ])|( {2,})/g;
  var current = $(this).val();
  var capitalize = /[^A-Z]/g;
  //Checking to make sure all characters are Alphabetic
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
  //Capitalize the Middle Initial
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
  //Checking to make sure all characters are Alphabetic
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
$('#security_Ans').on('input', function() {
  var alpha = /([^a-zA-Z- ])|( {2,})/g;
  var current = $(this).val();
  //Checking to make sure all characters are Alphabetic
  if (alpha.test(current)) {
    current = current.replace(alpha, "");
    $(this).val(current);
  }
});
//Submit Button Validation Listener
$('#submit').click(function(event){
  noErrors = true;
  //Check if Email is Valid
  emailTest($('#emailInput').val());
  //Check if Email Confirmation field matches
  isSame($('#emailInput').val(), $('#emailcInput').val());
  //Password Rule Test
  passTest($('#password').val());
  //Check if Password Confirm field matches
  isSame($('#password').val(), $('#cpassword').val());
  //Required Names field checked
  fieldFilled($('#first_name').val(), 1);
  fieldFilled($('#last_name').val(), 2);
  //Security Answer Check
  fieldFilled($('#security_Ans').val(), 3);
  //Check if Terms and Conditions are accepted
  termAndCondChecker($('#tandcBox').prop("checked"));
  //Check if noErrors is still true
  if (!noErrors) {
    event.preventDefault();
  }
});
