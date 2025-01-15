// All global variables declarations
let allUserInfo = [];
let regForm = document.querySelector(".reg-form");
let loginForm = document.querySelector(".login-form");
let allInput = regForm.querySelectorAll("input");
let allLoginInput = loginForm.querySelectorAll("input");
let regBtn = regForm.querySelector("button");
let loginBtn = loginForm.querySelector("button");
// let lg = document.querySelector("loginButton");
// console.log(allLoginInput);

// Getting data from localStorage
if (localStorage.getItem("allUserInfo") != null) {
  allUserInfo = JSON.parse(localStorage.getItem("allUserInfo"));
}
console.log(allUserInfo);

// Registration Coding
regForm.onsubmit = (e) => {
  e.preventDefault();
  let checkEmail = allUserInfo.find((data) => {
    return data.email == allInput[4].value;
  });
  if (checkEmail == undefined) {
    let data = {};
    for (let el of allInput) {
      let key = el.name;
      data[key] = el.value;
    }
    regBtn.innerText = "Processing...";
    setTimeout(() => {
      regBtn.innerText = "Register";
      allUserInfo.push(data);
      localStorage.setItem("allUserInfo", JSON.stringify(allUserInfo));
      swal("Good Job !", "Registration Success !", "success");
    }, 2000);
  } else {
    swal("Failed !", "Email already registered !", "warning");
  }
};

// Login Coding
loginForm.onsubmit = (e) => {
  e.preventDefault();
  if (allLoginInput[0].value != "") {
    if (allLoginInput[1].value != "") {
      // check email in your database
      let checkEmail = allUserInfo.find((data) => {
        return data.email == allLoginInput[0].value;
      });
      if (checkEmail != undefined) {
        // match password
        if (checkEmail.password == allLoginInput[1].value) {
          loginBtn.innerText = "Please wait...";
          setTimeout(() => {
            loginBtn.innerText = "Login";
            window.location = "profile/profile.html";
            checkEmail.password = null;
            sessionStorage.setItem("__au__", JSON.stringify(checkEmail));
          }, 2000);
        } else {
          swal("Warning", "Wrong Password !", "warning");
        }
      } else {
        swal("Warning", "Wrong Email !", "warning");
      }
    } else {
      swal("Warning", "Password is empty !", "warning");
    }
  } else {
    swal("Warning", "Email is Empty !", "warning");
  }
};

// GENERATE OTP
// let generatedOtp = "";

// function generateOtp() {
//   return Math.floor(100000 + Math.random() * 900000).toString();
// }

// function sendOtp() {
//   const email = document.getElementById("email").value;
//   generatedOtp = generateOtp();
//   const resultDiv = document.getElementById("result");

//   const templateParams = {
//     to_email: email,
//     otp: generatedOtp,
//   };

//   email.send("service_7zjf8li", "template_vsc4b0v", templateParams).then(
//     function (response) {
//       console.log("SUCCESS!", response.status, response.text);
//       resultDiv.textContent = "OTP sent successfully!";
//       resultDiv.style.color = "green";
//     },
//     function (error) {
//       console.error("FAILED...", error);
//       resultDiv.textContent = "Failed to send OTP. Please try again.";
//       resultDiv.style.color = "red";
//     }
//   );
// }

// function verifyOtp() {
//   const otpInput = document.getElementById("otp").value;
//   const resultDiv = document.getElementById("result");

//   if (otpInput === generatedOtp) {
//     resultDiv.textContent = "OTP Verified Successfully!";
//     resultDiv.style.color = "green";
//   } else {
//     resultDiv.textContent = "Invalid OTP. Please try again.";
//     resultDiv.style.color = "red";
//   }
// }

// lg.innerText = "User";
// window.location = "login.html";

// OTP By Alert Message

// Function to send OTP (simulate sending by email)
function sendOTP() {
  var email = document.getElementById("email").value;
  if (validateEmail(email)) {
    // Simulate sending OTP (in real world, send email with OTP)
    var otp = Math.floor(1000 + Math.random() * 9000);
    alert("OTP sent to " + email + ": " + otp);
    // Store OTP in localStorage for verification later
    localStorage.setItem("otp", otp);
    localStorage.setItem("email", email);
  } else {
    alert("Please enter a valid email address.");
  }
}

// Function to verify OTP
function verifyOTP() {
  var otp = document.getElementById("otp").value;
  var storedOTP = localStorage.getItem("otp");
  if (otp === storedOTP) {
    document.getElementById("status").innerText = "OTP verified successfully.";
  } else {
    document.getElementById("status").innerText =
      "Invalid OTP. Please try again.";
  }
}

// Function to perform login
function login() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  // Perform any client-side validation if needed

  // Example: direct login simulation
  alert("Login successful for " + email);
  loginBtn.innerText = "Login";
  window.location = "profile/profile.html";
}

// Function to validate email format
function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

// document.getElementById("loginButton").addEventListener("click", function () {
//   window.location.href = "login.html";
// });
