// login
const loginModal = document.getElementById("loginModal");
const loginButton = document.getElementById("LoginBtn");
const loginCloseButton = document.querySelector('[data-close="loginModal"]');

// open login
loginButton.addEventListener("click", function () {
  loginModal.style.display = "flex";
  loginModal.setAttribute("aria-hidden", "false");
});

// close login
loginCloseButton.addEventListener("click", function () {
  loginModal.style.display = "none";
  loginModal.setAttribute("aria-hidden", "true");
});

// close login (grey area)
window.addEventListener("click", function (event) {
  if (event.target === loginModal) {
    loginModal.style.display = "none";
    loginModal.setAttribute("aria-hidden", "true");
  }
});

const loginForm = document.getElementById("loginForm");
const signupModal = document.getElementById("signupModal");
const signupForm = document.getElementById("signupForm");

const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
// signup
showSignup.addEventListener("click", function (event) {
  event.preventDefault();

  loginModal.style.display = "none";
  loginModal.setAttribute("aria-hidden", "true");

  signupModal.style.display = "flex";
  signupModal.setAttribute("aria-hidden", "false");
});

showLogin.addEventListener("click", function (event) {
  event.preventDefault();

  signupModal.style.display = "none";
  signupModal.setAttribute("aria-hidden", "true");

  loginModal.style.display = "flex";
  loginModal.setAttribute("aria-hidden", "false");
});
// signup confirm btn
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document
    .getElementById("signupEmail")
    .value.trim()
    .toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirmPassword = document.getElementById(
    "signupConfirmPassword",
  ).value;

  //check if pw match
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  //check if sign up user email alr exists
  const existingUser = localStorage.getItem("azoomUser");

  if (existingUser) {
    const user = JSON.parse(existingUser);

    if (user.email === email) {
      alert("An account with this email already exists.");
      return;
    }
  }
  // save in localstorage after signup
  const user = {
    name: name,
    email: email,
    password: password,
  };

  localStorage.setItem("azoomUser", JSON.stringify(user));

  alert("Account created successfully!");
  signupForm.reset();

  signupModal.style.display = "none";
  signupModal.setAttribute("aria-hidden", "true");

  loginModal.style.display = "flex";
  loginModal.setAttribute("aria-hidden", "false");
});
// login no account found
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document
    .getElementById("loginEmail")
    .value.trim()
    .toLowerCase();

  const password = document.getElementById("loginPassword").value;

  const savedUser = localStorage.getItem("azoomUser");

  if (!savedUser) {
    alert("No account found. Please sign up first.");
    return;
  }
  //check successful login
  const user = JSON.parse(savedUser);

  if (email === user.email && password === user.password) {
    localStorage.setItem("azoomLoggedIn", "true");
    localStorage.setItem("azoomCurrentUser", JSON.stringify(user));

    loginForm.reset();

    if (email === "employer@azoom.com") {
      window.location.href = "index2.html";
    } else {
      alert("Login successful! Welcome back, " + user.name + ".");

      loginModal.style.display = "none";
      loginModal.setAttribute("aria-hidden", "true");
    }
  } else {
    alert("Incorrect email or password.");
  }
});

//forget pw
const forgetPasswordModal = document.getElementById("forgetPasswordModal");
const forgetPassord = document.getElementById("forgetPassword");
const backToLogin = document.getElementById("backToLogin");
const forgetPasswordForm = document.getElementById("forgetPasswordForm");

forgetPassord.addEventListener("click", function (event) {
  event.preventDefault();

  loginModal.style.display = "none";
  loginModal.setAttribute("aria-hidden", "true");

  forgetPasswordModal.style.display = "flex";
  forgetPasswordModal.setAttribute("aria-hidden", "false");
});

backToLogin.addEventListener("click", function (event) {
  event.preventDefault();

  forgetPasswordModal.style.display = "none";
  forgetPasswordModal.setAttribute("aria-hidden", "true");

  loginModal.style.display = "flex";
  loginModal.setAttribute("aria-hidden", "false");
});

forgetPasswordForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const email = document
    .getElementById("resetEmail")
    .value.trim()
    .toLowerCase();

  const newPassword = document.getElementById("newPassword").value;
  const confirmNewPassword =
    document.getElementById("confirmNewPassword").value;

  if (newPassword !== confirmNewPassword) {
    alert("Passwords do not match.");
    return;
  }
  // forget pw checks
  const savedUser = localStorage.getItem("azoomUser");

  if (!savedUser) {
    alert("No account found. Please sign up first.");
    return;
  }

  const user = JSON.parse(savedUser);

  if (user.email.toLowerCase() !== email) {
    alert("No account found with that email address.");
    return;
  }

  user.password = newPassword;
  localStorage.setItem("azoomUser", JSON.stringify(user));

  alert("Password reset successfully! Proceed to log in.");
  forgetPasswordForm.reset();

  forgetPasswordModal.style.display = "none";
  forgetPasswordModal.setAttribute("aria-hidden", "true");

  loginModal.style.display = "flex";
  loginModal.setAttribute("aria-hidden", "false");
});

forgetPasswordModal.addEventListener("click", function (event) {
  if (event.target === forgetPasswordModal) {
    forgetPasswordModal.style.display = "none";
    forgetPasswordModal.setAttribute("aria-hidden", "true");
    forgetPasswordForm.reset();
  }
});

const closeForgetPassword = document.querySelector(
  '[data-close="forgetPasswordModal"]',
);

closeForgetPassword.addEventListener("click", function () {
  forgetPasswordModal.style.display = "none";
  forgetPasswordModal.setAttribute("aria-hidden", "true");
  forgetPasswordForm.reset();
});
// reservation modal
const reservationModal = document.getElementById("reservationModal");
const reservationForm = reservationModal.querySelector("form");
const reserveButton = document.getElementById("ReserveBtn");
const reserveButton2 = document.getElementById("CTAReserveBtn");

reserveButton.addEventListener("click", function () {
  reservationModal.style.display = "flex";
  reservationModal.setAttribute("aria-hidden", "false");
});

reserveButton2.addEventListener("click", function () {
  reservationModal.style.display = "flex";
  reservationModal.setAttribute("aria-hidden", "false");
});

const rentButtons = document.querySelectorAll("#cars .btn-primary");

rentButtons.forEach((button) => {
  button.addEventListener("click", function () {
    reservationModal.style.display = "flex";
    reservationModal.setAttribute("aria-hidden", "false");
  });
});

const closeButton = document.querySelector('[data-close="reservationModal"]');

function closeAndClearModal() {
  //clear inputs
  if (reservationForm) {
    reservationForm.reset();
  } else {
    // fallback check
    reservationModal
      .querySelectorAll("input, textarea, select")
      .forEach((input) => {
        if (input.type === "checkbox" || input.type === "radio")
          input.checked = false;
        else if (input.tagName === "SELECT") input.selectedIndex = 0;
        else input.value = "";
      });
  }

  reservationModal.style.display = "none";
  reservationModal.setAttribute("aria-hidden", "true");
}

closeButton.addEventListener("click", closeAndClearModal);

// close when click on grey area
window.addEventListener("click", function (event) {
  if (event.target === reservationModal) {
    closeAndClearModal();
  }
});

//reservation checks
const carModel = document.getElementById("CarModel");
const rentalDuration = document.getElementById("RentalDuration");
const pickupDate = document.getElementById("PickupDate");
const returnDate = document.getElementById("ReturnDate");
const estimatedPrice = document.getElementById("estimatedPrice");

reservationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const rentalPrice = Number(estimatedPrice.textContent);

  if (!Number.isFinite(rentalPrice) || rentalPrice <= 0) {
    alert("Please select valid pickup and return dates.");
    return;
  }

  const reservation = {
    id: "AZ-" + Date.now(),
    customerName: document.getElementById("CustomerName").value.trim(),
    customerEmail: document.getElementById("CustomerEmail").value.trim(),
    carModel: carModel.options[carModel.selectedIndex].text,
    rentalDuration: rentalDuration.value,
    pickupBranch:
      document.getElementById("PickupBranch").selectedOptions[0].text,
    pickupDate: pickupDate.value,
    returnDate: returnDate.value,
    rentalPrice: rentalPrice,
    status: "Rented",
    damageNotes: "",
    repairCost: 0,
    finalBill: rentalPrice,
  };

  const reservations = JSON.parse(
    localStorage.getItem("azoomReservations") || "[]",
  );

  reservations.push(reservation);

  localStorage.setItem("azoomReservations", JSON.stringify(reservations));

  alert("Reservation saved successfully!");

  reservationForm.reset();
  estimatedPrice.textContent = "0.00";

  reservationModal.style.display = "none";
  reservationModal.setAttribute("aria-hidden", "true");
});

const carRates = {
  SUV: {
    daily: 100,
    weekly: 700,
    monthly: 2500,
  },

  Sedan: {
    daily: 75,
    weekly: 475,
    monthly: 2000,
  },

  Premium: {
    daily: 200,
    weekly: 1500,
    monthly: 3500,
  },
};
//estimated price calc
function calculateEstimatedPrice() {
  if (!pickupDate.value || !returnDate.value) {
    estimatedPrice.textContent = "0.00";
    return;
  }

  const startDate = new Date(pickupDate.value);
  const endDate = new Date(returnDate.value);

  const difference = endDate - startDate;
  const days = difference / (1000 * 60 * 60 * 24);

  // invalid date range
  if (days <= 0) {
    estimatedPrice.textContent = "0.00";
    return;
  }

  // get the selected car category
  const selectedOption = carModel.options[carModel.selectedIndex];
  const carType = selectedOption.dataset.type;

  // get rates
  const rates = carRates[carType];

  // checks
  if (!rates) {
    estimatedPrice.textContent = "0.00";
    return;
  }

  let totalPrice = 0;

  // DAILY
  if (rentalDuration.value === "daily") {
    totalPrice = rates.daily * Math.ceil(days);
  }

  // WEEKLY
  else if (rentalDuration.value === "weekly") {
    if (days < 7) {
      estimatedPrice.textContent = "0.00";
      return;
    }

    const numberOfWeeks = Math.ceil(days / 7);
    totalPrice = rates.weekly * numberOfWeeks;
  }

  // MONTHLY
  else if (rentalDuration.value === "monthly") {
    if (days < 30) {
      estimatedPrice.textContent = "0.00";
      return;
    }

    const numberOfMonths = Math.ceil(days / 30);
    totalPrice = rates.monthly * numberOfMonths;
  }

  estimatedPrice.textContent = totalPrice.toFixed(2);
}

// force minimum date when reserving
function updateReturnDateMinimum() {
  if (!pickupDate.value) {
    returnDate.removeAttribute("min");
    return;
  }

  const startDate = new Date(pickupDate.value);

  let minimumDays = 1;

  if (rentalDuration.value === "weekly") {
    minimumDays = 7;
  } else if (rentalDuration.value === "monthly") {
    minimumDays = 30;
  }

  const minimumReturnDate = new Date(startDate);
  minimumReturnDate.setDate(minimumReturnDate.getDate() + minimumDays);

  // convert date back to YYYY-MM-DD
  const year = minimumReturnDate.getFullYear();
  const month = String(minimumReturnDate.getMonth() + 1).padStart(2, "0");

  const day = String(minimumReturnDate.getDate()).padStart(2, "0");

  const minimumDate = `${year}-${month}-${day}`;

  returnDate.min = minimumDate;

  if (returnDate.value && returnDate.value < minimumDate) {
    returnDate.value = "";
  }

  calculateEstimatedPrice();
}

rentalDuration.addEventListener("change", updateReturnDateMinimum);
pickupDate.addEventListener("change", updateReturnDateMinimum);
carModel.addEventListener("change", calculateEstimatedPrice);
returnDate.addEventListener("change", calculateEstimatedPrice);

const timeFilter = document.getElementById("timeFilter");
const priceElements = document.querySelectorAll("#carGrid article");

function updateCarPrices() {
  const selectedRate = timeFilter.value;

  priceElements.forEach((car) => {
    const carType = car.dataset.type;
    const priceElement = car.querySelector(".price");
    const price = carRates[carType][selectedRate];

    let rateName = "Day";

    if (selectedRate === "weekly") {
      rateName = "Week";
    } else if (selectedRate === "monthly") {
      rateName = "Month";
    }

    priceElement.innerHTML = `$${price} <small>/ ${rateName}</small>`;
  });
}

timeFilter.addEventListener("change", updateCarPrices);

// Set the correct prices
updateCarPrices();

const reviewsTrack = document.getElementById("reviewsTrack");
const reviewPrev = document.getElementById("reviewPrev");
const reviewNext = document.getElementById("reviewNext");

let reviewIndex = 0;

const reviewCards = document.querySelectorAll(".review-card");
function getCardsPerView() {
  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}

function updateReviews() {
  const cardsPerView = getCardsPerView();

  const maxIndex = reviewCards.length - cardsPerView;

  if (reviewIndex < 0) {
    reviewIndex = 0;
  }

  if (reviewIndex > maxIndex) {
    reviewIndex = maxIndex;
  }

  const cardWidth = reviewCards[0].offsetWidth;

  const gap = 25;

  const movement = reviewIndex * (cardWidth + gap);

  reviewsTrack.style.transform = `translateX(-${movement}px)`;

  reviewPrev.disabled = reviewIndex === 0;

  reviewNext.disabled = reviewIndex === maxIndex;
}

reviewPrev.addEventListener("click", function () {
  reviewIndex--;

  updateReviews();
});

reviewNext.addEventListener("click", function () {
  reviewIndex++;

  updateReviews();
});

window.addEventListener("resize", function () {
  updateReviews();
});

updateReviews();

const typeFilter = document.getElementById("typeFilter");
const carGrid = document.getElementById("carGrid");

const cars = carGrid.querySelectorAll("article");

function filterCars() {
  const selectedType = typeFilter.value;

  cars.forEach(function (car) {
    const carType = car.dataset.type;

    if (selectedType === "all" || carType === selectedType) {
      car.style.display = "";
    } else {
      car.style.display = "none";
    }
  });
}

typeFilter.addEventListener("change", filterCars);

filterCars();

const footerReserveBtn = document.getElementById("footerReserveBtn");

footerReserveBtn.addEventListener("click", function (event) {
  event.preventDefault();

  reservationModal.style.display = "flex";
  reservationModal.setAttribute("aria-hidden", "false");
});
// hero image anim
const heroImage = document.getElementById("heroImage");
const heroImages = ["img/hero.jpg", "img/hero2.png", "img/hero3.jpg"];

let heroIndex = 0;
function changeHeroImage() {
  heroImage.classList.add("fade-out");
  setTimeout(() => {
    heroIndex = (heroIndex + 1) % heroImages.length;
    heroImage.src = heroImages[heroIndex];
    heroImage.classList.remove("fade-out");
  }, 800);
}

setInterval(changeHeroImage, 5000);

const menuToggle = document.getElementById("menuToggle");
const mobileNav = document.getElementById("mobileNav");

// open and close menu
menuToggle.addEventListener("click", function () {
  const isOpen = mobileNav.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );

  // change burger icon when opened
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars", !isOpen);
  icon.classList.toggle("fa-times", isOpen);
});

//close menu when link is clicked
mobileNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    mobileNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  });
});

// close menu when resizing
window.addEventListener("resize", function () {
  if (window.innerWidth > 768) {
    mobileNav.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-times");
    icon.classList.add("fa-bars");
  }
});
