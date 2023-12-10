//validate password & retype-password are similar or not
function checkPass() {
   var password = document.getElementById('password').value;
   var retype = document.getElementById('retype').value;
   var error = document.getElementById('retype_error');
   if (retype != password) {
      error.innerHTML = "Retype password does not match. Check again !";
      return false; //prevent form submission
   }
   else {
      error.innerHTML = ""; //clear previous error
      return true; //allow form submission
   }
}

