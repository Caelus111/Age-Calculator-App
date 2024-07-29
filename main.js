const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const btn = document.getElementById("btn");

//  validate the inputs
// function validateInputs() {
//   for (const input of inputs) {
//     const value = input.value;
//     const id = input.id;

//     const day = document.getElementById("day");
//     const month = document.getElementById("month");
//     const year = document.getElementById("year");

//     let dateInput = new Date(`${year.value}-${month.value}-${day.value}`);

//     // check if the input is empty
//     if (value === "") {
//       setError(input, "This field is required");
//     } else if (id === "day" && (value < 1 || value > 31)) {
//       setError(input, "Must be a valid day");
//     } else if (id === "month" && (value < 1 || value > 12)) {
//       setError(input, "Must be a valid month");
//     } else if (id === "year") {
//       if (value > 2024) {
//         setError(input, "Must be in the past");
//       } else if (value < 1900) {
//         setError(input, 'Must be a valid year')
//       }
//     } else if (!dateInput) {
//       setError(input, "Must be a valid date");
//     } else {
//       setSuccess(input);
//     }

//     console.log(dateInput);
//   }
// }

dayInput.addEventListener("input", () => {
  if (dayInput.classList.contains("error")) {
    setSuccess(dayInput);
    setSuccess(monthInput);
    setSuccess(yearInput);
  }

  if (dayInput.value > 31 || dayInput.value < 1) {
    setError(dayInput, "Must be a valid day");
  } else {
    setSuccess(dayInput);
  }
});

monthInput.addEventListener("input", () => {
  if (dayInput.classList.contains("error")) {
    setSuccess(dayInput);
    setSuccess(monthInput);
    setSuccess(yearInput);
  }

  if (monthInput.value > 12 || monthInput.value < 1) {
    setError(monthInput, "Must be a valid month");
  } else {
    setSuccess(monthInput);
  }
});

let date = new Date();
yearInput.addEventListener("input", () => {
  if (dayInput.classList.contains("error")) {
    setSuccess(dayInput);
    setSuccess(monthInput);
    setSuccess(yearInput);
  }

  if (yearInput.value > date.getFullYear()) {
    setError(yearInput, "Must be in the past");
  } else {
    setSuccess(yearInput);
  }
});

btn.addEventListener("click", () => {
  day = dayInput.value;
  month = monthInput.value;
  year = yearInput.value;

  console.log(day, month, year);

  if (!day) {
    setError(dayInput, "This field is required");
  }
  if (!month) {
    setError(monthInput, "This field is required");
  }
  if (!year) {
    setError(yearInput, "This field is required");
  }
  if (!day || !month || !year) {
    return;
  }

  let dateInput = new Date(year, month - 1, day);
  let currentDay = new Date();

  if (
    !(
      dateInput.getFullYear() == year &&
      dateInput.getMonth() == month - 1 &&
      dateInput.getDate() == day
    ) ||
    document.getElementsByClassName("error").length ||
    dateInput > currentDay ||
    year < 0
  ) {
    setError(dayInput, "Must be a valid date");
    setError(monthInput, "");
    setError(yearInput, "");
  }

  let ageYear = currentDay.getFullYear() - year;
  let ageMonth = currentDay.getMonth() - (month - 1);
  let ageDay = currentDay.getDate() - day;

  // got it from 'https://github.com/GragertVD/age-calculator-app-main/blob/master/js/main.js#L148' after A lot of try and error

  if (currentDay < new Date(currentDay.getFullYear(), month - 1, day)) {
    ageYear = ageYear - 1;
    ageMonth = currentDay.getMonth() + 1;
    ageDay = currentDay.getDate();
  } else {
    if (currentDay.getMonth() + 1 === month) {
      ageMonth = 0;
      ageDay = currentDay.getDate() - day;
      console.log(ageDay);
    } else {
      ageMonth = currentDay.getMonth() + 1 - month;
      if (currentDay.getDate() < day) {
        ageMonth = ageMonth - 1;
        ageDay =
          currentDay.getDate() +
          new Date(
            currentDay.getFullYear(),
            currentDay.getMonth(),
            0
          ).getDate() -
          day;
      } else {
        ageDay = currentDay.getDate() - day;
      }
    }
  }

  const outputDay = document.querySelector(".output-day").querySelector("span");
  const outputMonth = document
    .querySelector(".output-month")
    .querySelector("span");
  const outputYear = document
    .querySelector(".output-year")
    .querySelector("span");

  outputDay.innerHTML = ageDay;
  outputMonth.innerHTML = ageMonth;
  outputYear.innerHTML = ageYear;

  OutputNumber(outputYear, ageYear);
  OutputNumber(outputMonth, ageMonth);
  OutputNumber(outputDay, ageDay);
});

function OutputNumber(el, num) {
  let step = 50;
  num > 25 && (step = 35);
  num > 50 && (step = 25);
  num > 75 && (step = 20);
  num > 100 && (step = 10);
  num > 200 && (step = 1);

  let n = 0;
  if (num === 0) {
    el.innerHTML = n;
  } else {
    let interval = setInterval(() => {
      n = n + 1;
      if (n === num) {
        clearInterval(interval);
      }
      el.innerHTML = n;
    }, step);
  }
}

function setError(ele, eleMessage) {
  const labels = document.querySelectorAll("label");
  const eleParent = ele.parentElement;
  const errorText = eleParent.querySelector(".error-message");

  errorText.innerHTML = eleMessage;

  labels.forEach((label) => {
    if (label.htmlFor === ele.id) {
      label.classList.add("error-text");
    }
  });
  errorText.classList.remove("hidden");
  ele.classList.add("error");
}

function setSuccess(ele) {
  const labels = document.querySelectorAll("label");
  const eleParent = ele.parentElement;
  const errorText = eleParent.querySelector(".error-message");

  labels.forEach((label) => {
    if (label.htmlFor === ele.id) {
      label.classList.remove("error-text");
    }
  });
  errorText.classList.add("hidden");
  ele.classList.remove("error");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
});
