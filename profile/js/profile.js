// all global variable declaration
let userInfo;
let user;
let allBData = [];
let allInHData = [];
let allArchData = [];
let allCashData = [];
let allCashArchData = [];
// let UniqueId = generateUniqueId();
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-form");
let allBInput = bookingForm.querySelectorAll("input");
let bTextarea = bookingForm.querySelector("textarea");
let inHouseForm = document.querySelector(".inhouse-form");
let allInHInput = inHouseForm.querySelectorAll("input");
let inHTextarea = inHouseForm.querySelector("textarea");
let modalCBtn = document.querySelectorAll(".btn-close");
let bListTBody = document.querySelector(".booking-list");
let inHListTBody = document.querySelector(".inhouse-list");
let archListTBody = document.querySelector(".archive-list");
let bRegBtn = document.querySelector(".b-register-btn");
let inHRegBtn = document.querySelector(".in-house-reg-btn");
let allTabBtn = document.querySelectorAll(".tab-btn");
let searchEl = document.querySelector(".search-input");
let cashierBtn = document.querySelector(".cashier-tab");
let cashierTab = document.querySelector("#cashier");
let bookingTab = document.querySelector("#booking");
let cashierForm = document.querySelector(".cashier-form");
let allCInput = cashierForm.querySelectorAll("input");
let cashBtn = document.querySelector(".cash-btn");
let cashierTbody = document.querySelector(".cashier-list");
let cashTotal = document.querySelector(".total");
let closeCashierBtn = document.querySelector(".close-cashier-btn");
let cashierArchTbody = document.querySelector(".cashier-arch-list");
let archTotal = document.querySelector(".arch-total");
let allPrintBtn = document.querySelectorAll(".print-btn");
// let billBtn = document.querySelectorAll(".bill-btn");
let archPrintBtn = document.querySelector(".arch-print-btn");
let cashierTabPane = document.querySelector(".cashier-tab-pane");
let allTotalBtn = document.querySelectorAll(".total-btn");
let showBRoomsEl = document.querySelector(".show-booking-rooms");
let showHRoomsEl = document.querySelector(".show-inhouse-rooms");
// console.log(bTextarea);

// check User is login or not
if (sessionStorage.getItem("__au__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
// console.log(userInfo);
navBrand.innerHTML = userInfo.hotelName;
user = userInfo.email.split("@")[0];
// console.log(user);

// Bill Coding
// billBtn.onclick = () => {
//   window.location = "bill/bill.html";
// };

// Generate UniqueId
// function generateUniqueId() {
//   return (
//     "id-" +
//     Date.now().toString(36) +
//     "-" +
//     Math.random().toString(36).substring(2, 15)
//   );
// }

// Print Coding
for (let btn of allPrintBtn) {
  btn.onclick = () => {
    window.print();
  };
}
archPrintBtn.onclick = () => {
  cashierTabPane.classList.add("d-none");
  window.print();
  // window.location = "bill/bill.html";
};
modalCBtn[3].onclick = () => {
  cashierTabPane.classList.remove("d-none");
};

// check hotels rooms

const checkRooms = (element) => {
  if (Number(userInfo.totalRoom) < Number(element.value)) {
    swal(
      "Warning",
      `Total ${userInfo.totalRoom} rooms is available in the hotel`,
      "warning"
    );
    element.value = userInfo.totalRoom;
  }
};

allBInput[3].oninput = (e) => {
  checkRooms(e.target);
};
allInHInput[3].oninput = (e) => {
  checkRooms(e.target);
};

// getting data from storage
const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};

// Fetching Data from Storage
allBData = fetchData(user + "_allBData");
allInHData = fetchData(user + "_allInHData");
allArchData = fetchData(user + "_allArchData");
allCashData = fetchData(user + "_allCashData");
allCashArchData = fetchData(user + "_allCashArchData");

// format date function
const formatDate = (data, isTime) => {
  // console.log(isTime);
  const date = new Date(data);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let time = date.toLocaleTimeString();
  dd = dd < 10 ? "0" + dd : dd;
  mm = mm < 10 ? "0" + mm : mm;
  return `${dd}-${mm}-${yy} ${isTime ? time : ""}`;
};

// registration coding
const registrationFunc = (textarea = null, inputs, array, key) => {
  let data = {
    notice: textarea && textarea.value,
    inHouse: false,
    createdAt: new Date(),
  };
  for (let el of inputs) {
    let key = el.name;
    let value = el.value;
    // console.log(key, value);
    data[key] = value;
  }
  // console.log(data);
  array.unshift(data);
  localStorage.setItem(key, JSON.stringify(array));
  swal("Good Job !", "Booking Success", "success");
};

// Show data
const ShowData = (element, array, key) => {
  let tmp = key.split("_")[1];
  element.innerHTML = "";
  array.forEach((item, index) => {
    // console.log(item, index);
    // <td class="text-nowrap">${item.roomType}</td>
    element.innerHTML += `<tr>
    <td class="no-print text-nowrap">${index + 1}</td>
    <td class="text-nowrap">${item.location}</td>
    <td class="text-nowrap">${item.roomNo}</td>
    <td class="text-nowrap">${item.fullName}</td>
    <td class="text-nowrap">${item.email}</td>
    <td class="text-nowrap">${formatDate(item.checkInDate)}</td>
    <td class="text-nowrap">${formatDate(item.checkOutDate)}</td>
    <td class="text-nowrap">${item.totalPeople}</td>
    <td class="text-nowrap">${item.mobile}</td>
    <td class="text-nowrap">${item.price}</td>
    <td class="text-nowrap">${item.notice}</td>
    <td class="no-print text-nowrap">${formatDate(item.createdAt, true)}</td>
    <td class="text-nowrap no-print">
      <button class="${
        tmp == "allArchData" && "d-none"
      } btn edit-btn p-1 px-2 btn-primary">
        <i class="fa fa-edit"></i>
      </button>
      <button class="${
        tmp == "allArchData" && "d-none"
      } btn checkin-btn p-1 px-2 text-white btn-info">
        <i class="fa fa-check"></i>
      </button>
      <button class="btn del-btn p-1 px-2 btn-danger">
        <i class="fa fa-trash"></i>
      </button>
    </td>
  </tr>`;
  });
  deleteDataFunc(element, array, key);
  updateDataFunc(element, array, key);
  checkInAndCheckOut(element, array, key);
};

// Delete Coding
const deleteDataFunc = (element, array, key) => {
  let allDelBtn = element.querySelectorAll(".del-btn");
  allDelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          array.splice(index, 1);
          localStorage.setItem(key, JSON.stringify(array));
          ShowData(element, array, key);
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    };
  });
};

// Update booking function
const updateDataFunc = (element, array, key) => {
  let allEditBtn = element.querySelectorAll(".edit-btn");
  allEditBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      tmp == "allBData" ? bRegBtn.click() : inHRegBtn.click();

      let allBtn =
        tmp == "allBData"
          ? bookingForm.querySelectorAll("button")
          : inHouseForm.querySelectorAll("button");

      let allInput =
        tmp == "allBData"
          ? bookingForm.querySelectorAll("input")
          : inHouseForm.querySelectorAll("input");

      let textarea =
        tmp == "allBData"
          ? bookingForm.querySelector("textarea")
          : inHouseForm.querySelector("textarea");

      allBtn[0].classList.add("d-none");
      allBtn[1].classList.remove("d-none");
      let obj = array[index];
      allInput[0].value = obj.fullName;
      allInput[1].value = obj.location;
      allInput[2].value = obj.email;
      // allInput[3].value = obj.roomType;
      allInput[3].value = obj.roomNo;
      allInput[4].value = obj.totalPeople;
      allInput[5].value = obj.checkInDate;
      allInput[6].value = obj.checkOutDate;
      allInput[7].value = obj.price;
      allInput[8].value = obj.mobile;
      textarea.value = obj.notice;
      allBtn[1].onclick = () => {
        let formData = {
          notice: textarea.value,
          createdAt: new Date(),
        };
        for (let el of allInput) {
          let key = el.name;
          let value = el.value;
          formData[key] = value;
        }
        array[index] = formData;
        allBtn[0].classList.remove("d-none");
        allBtn[1].classList.add("d-none");
        tmp == "allBData" ? bookingForm.reset("") : inHouseForm.reset("");

        tmp == "allBData" ? modalCBtn[0].click() : modalCBtn[1].click();

        localStorage.setItem(key, JSON.stringify(array));
        ShowData(element, array, key);
      };
    };
  });
};

// checkin and checkout coding
const checkInAndCheckOut = (element, array, key) => {
  let allCheckBtn = element.querySelectorAll(".checkin-btn");
  allCheckBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let tmp = key.split("_")[1];
      let data = array[index];
      array.splice(index, 1);
      localStorage.setItem(key, JSON.stringify(array));
      if (tmp == "allBData") {
        allInHData.unshift(data);
        localStorage.setItem(user + "_allInHData", JSON.stringify(allInHData));
        ShowData(element, array, key);
        showBookingRooms();
        showInhouseRooms();
      } else if (tmp == "allArchData") {
        allBData.unshift(data);
        localStorage.setItem(user + "_allBData", JSON.stringify(allBData));
        ShowData(element, array, key);
        showBookingRooms();
        showInhouseRooms();
      } else {
        allArchData.unshift(data);
        localStorage.setItem(
          user + "_allArchData",
          JSON.stringify(allArchData)
        );
        ShowData(element, array, key);
        // showBookingRooms();
        showInhouseRooms();
      }
    };
  });
};

// show booking rooms
const showBookingRooms = () => {
  showBRoomsEl.innerHTML = "";
  allBData.forEach((item, index) => {
    showBRoomsEl.innerHTML += `
      <div class="card text-center px-0 col-md-2">
                    <div class="bg-danger text-white fw-bold card-header">
                      ${item.roomNo}
                    </div>
                    <div class="bg-success text-white fw-bold  card-body">
                      <p>${formatDate(item.checkInDate, true)}</p>
                      <p>To</p>
                      <p>${formatDate(item.checkOutDate)}</p>
                    </div>
                  </div>`;
  });
};
showBookingRooms();

// show inHouse rooms
const showInhouseRooms = () => {
  showHRoomsEl.innerHTML = "";
  allInHData.forEach((item, index) => {
    showHRoomsEl.innerHTML += `
      <div class="card text-center px-0 col-md-2">
                    <div class="bg-danger text-white fw-bold card-header">
                      ${item.roomNo}
                    </div>
                    <div class="card-body">
                    <img src="${
                      item.inHouse
                        ? "../img/dummyimage.jpeg"
                        : "../img/lockimage.png"
                    }" class="w-100" alt="">
                  </div>
                  <div class="card-footer">
                    <button class="in-btn  action-btn btn text-white">In</button>
                    <button class="out-btn action-btn btn text-white">Out</button>
                  </div>         
                  </div>`;
  });
  // in coding
  let allInBtn = showHRoomsEl.querySelectorAll(".in-btn");
  allInBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let data = allInHData[index];
      data.inHouse = true;
      allInHData[index] = data;
      localStorage.setItem(user + "_allInHData", JSON.stringify(allInHData));
      showInhouseRooms();
    };
  });
  let allOutBtn = showHRoomsEl.querySelectorAll(".out-btn");
  allOutBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let data = allInHData[index];
      data.inHouse = false;
      allInHData[index] = data;
      localStorage.setItem(user + "_allInHData", JSON.stringify(allInHData));
      showInhouseRooms();
    };
  });
};
showInhouseRooms();

// Show Total Data coding
const showTotal = () => {
  allTotalBtn[0].innerText = "Total Booking = " + allBData.length;
  allTotalBtn[1].innerText = "Total Inhouse = " + allInHData.length;
  allTotalBtn[2].innerText = "Total Archive = " + allArchData.length;
};
showTotal();

// Logout coding
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Please wait...";
  setTimeout(() => {
    logoutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("__au__");
    window.location = "../index.html";
  }, 3000);
};

//start booking registration coding
bookingForm.onsubmit = (e) => {
  e.preventDefault();
  // alert("Just Code");
  registrationFunc(bTextarea, allBInput, allBData, user + "_allBData");
  bookingForm.reset("");
  modalCBtn[0].click();
  ShowData(bListTBody, allBData, user + "_allBData");
  showTotal();
  showBookingRooms();
};

//start cashier registration coding
cashierForm.onsubmit = (e) => {
  e.preventDefault();
  // alert("Just Code");
  registrationFunc(null, allCInput, allCashData, user + "_allCashData");
  cashierForm.reset("");
  modalCBtn[3].click();
  showCashierFunc();
};

//start inhouse registration coding
inHouseForm.onsubmit = (e) => {
  e.preventDefault();
  // alert("Just Code");
  registrationFunc(inHTextarea, allInHInput, allInHData, user + "_allInHData");
  inHouseForm.reset("");
  modalCBtn[1].click();
  ShowData(inHListTBody, allInHData, user + "_allInHData");
  showTotal();
  showInhouseRooms();
};

const searchFunc = () => {
  let value = searchEl.value.toLowerCase();
  let tableEl = document.querySelector(".tab-content .search-pane.active");
  let tr = tableEl.querySelectorAll("tbody tr");
  for (let el of tr) {
    let srNo = el.querySelectorAll("td")[0].innerText;
    let location = el.querySelectorAll("td")[1].innerText;
    let roomNo = el.querySelectorAll("td")[2].innerText;
    let fullName = el.querySelectorAll("td")[3].innerText;
    let mobile = el.querySelectorAll("td")[7].innerText;
    let price = el.querySelectorAll("td")[8].innerText;
    if (srNo.indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (location.toLowerCase().indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (roomNo.toLowerCase().indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (fullName.toLowerCase().indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (mobile.toLowerCase().indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else if (price.toLowerCase().indexOf(value) != -1) {
      el.classList.remove("d-none");
    } else {
      el.classList.add("d-none");
    }
  }
};

// Search Coding
searchEl.oninput = () => {
  searchFunc();
};

// refrest ui data coding
for (let btn of allTabBtn) {
  btn.onclick = () => {
    ShowData(bListTBody, allBData, user + "_allBData");
    ShowData(inHListTBody, allInHData, user + "_allInHData");
    ShowData(archListTBody, allArchData, user + "_allArchData");
  };
}

// CALLING FUNCTION FOR SHOW DATA OF UI
ShowData(bListTBody, allBData, user + "_allBData");
ShowData(inHListTBody, allInHData, user + "_allInHData");
ShowData(archListTBody, allArchData, user + "_allArchData");

// CASHIER CODING
const showCashierFunc = () => {
  let totalAmount = 0;
  cashierTbody.innerHTML = "";
  allCashData.forEach((item, index) => {
    totalAmount += +item.amount;
    // <td class="no-print">${UniqueId}</td>
    // <td class="no-print">${item.roomType}</td>
    cashierTbody.innerHTML += `
     <tr>
        <td class="no-print">${index + 1}</td>
        <td class="no-print">${item.roomNo}</td>
        <td class="no-print">${item.email}</td>
        <td class="no-print">${item.cashierName}</td>
        <td class="no-print">${formatDate(item.checkOutDate)}</td>
        <td class="no-print">${formatDate(item.createdAt, true)}</td>
        <td class="no-print">${item.amount}</td>
      </tr>`;
  });
  cashTotal.innerHTML = "<i class='fa fa-rupee'></i> " + totalAmount;
};
showCashierFunc();

// All ARCHIVE CASH CODING
const showCashArchFunc = () => {
  let totalAmount = 0;
  cashierArchTbody.innerHTML = "";
  allCashArchData.forEach((item, index) => {
    totalAmount += +item.total;
    // <td>${item.email}</td>
    cashierArchTbody.innerHTML += `
     <tr>
        <td>${index + 1}</td>  
        <td>${item.cashierName}</td>
        <td>${formatDate(item.createdAt, true)}</td>
        <td>${item.total}</td>
      </tr>`;
  });
  archTotal.innerHTML = "<i class='fa fa-rupee'></i> " + totalAmount;
};
showCashArchFunc();

cashBtn.onclick = () => {
  allCInput[2].value = sessionStorage.getItem("c_name");
};
cashierBtn.onclick = () => {
  if (sessionStorage.getItem("c_name") == null) {
    let name = window.prompt("Enter you name !");
    if (name) {
      sessionStorage.setItem("c_name", name);
    } else {
      allTabBtn[0].classList.add("active");
      bookingTab.classList.add("active");
      cashierBtn.classList.remove("active");
      cashierTab.classList.remove("active");
    }
  } else {
    allCInput[2].value = sessionStorage.getItem("c_name");
  }
};

// close cashier coding
closeCashierBtn.onclick = () => {
  if (allCashData.length > 0) {
    let data = {
      cashierName: sessionStorage.getItem("c_name"),
      total: cashTotal.innerText,
      createdAt: new Date(),
    };
    allCashArchData.push(data);
    allCashData = [];
    localStorage.removeItem(user + "_allCashData");
    localStorage.setItem(
      user + "_allCashArchData",
      JSON.stringify(allCashArchData)
    );
    sessionStorage.removeItem("c_name");
    showCashierFunc();
  } else {
    swal("Warning", "There no cash to close", "warning");
  }
};

// Bill Section

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("myModal");
  const openModalBtn = document.getElementById("openModal");
  const closeModalSpan = document.getElementsByClassName("close")[0];
  const form = document.getElementById("billForm");
  const printButton = document.getElementById("printButton");

  openModalBtn.onclick = function () {
    modal.style.display = "block";
  };

  closeModalSpan.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  form.onsubmit = function (event) {
    event.preventDefault();
    const customerName = document.getElementById("customerNameInput").value;
    const address = document.getElementById("addressInput").value;
    const phoneNumber = document.getElementById("phoneNumberInput").value;
    const checkInDate = document.getElementById("checkInDateInput").value;
    const checkOutDate = document.getElementById("checkOutDateInput").value;
    const roomRate = document.getElementById("roomRateInput").value;
    const serviceCharge = document.getElementById("serviceChargeInput").value;
    const tax = document.getElementById("taxInput").value;
    const totalAmount =
      parseFloat(roomRate) + parseFloat(serviceCharge) + parseFloat(tax);

    document.getElementById("customerName").textContent = customerName;
    document.getElementById("address").textContent = address;
    document.getElementById("phoneNumber").textContent = phoneNumber;
    document.getElementById("checkInDate").textContent = checkInDate;
    document.getElementById("checkOutDate").textContent = checkOutDate;
    document.getElementById("roomRate").textContent = roomRate;
    document.getElementById("serviceCharge").textContent = serviceCharge;
    document.getElementById("tax").textContent = tax;
    document.getElementById("totalAmount").textContent = totalAmount.toFixed(2);

    modal.style.display = "none";
  };

  printButton.onclick = function () {
    window.print();
  };
});
