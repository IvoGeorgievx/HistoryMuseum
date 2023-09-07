const hiddenJobApplicantDiv = document.querySelector('.job-applicant')

const radioJobApplicant = document.querySelector('.account-type input[id="job-applicant"]')
radioJobApplicant.disabled = true
radioJobApplicant.addEventListener('change', () => {
    if (radioJobApplicant.checked) {
        hiddenJobApplicantDiv.style.display = 'flex'
        hiddenCompanyDiv.style.display = 'none'
    }
})

const hiddenCompanyDiv = document.querySelector('.company')
const radioCompany = document.querySelector('.account-type input[id="company"]')
radioCompany.disabled = true

radioCompany.addEventListener('change', () => {
    if (radioCompany.checked) {
        hiddenJobApplicantDiv.style.display = 'none'
        hiddenCompanyDiv.style.display = 'flex'
    }
})


const userInputs = {
    username: document.querySelector('input[name="username"]'),
    email: document.querySelector('input[name="email"]'),
    password1: document.querySelector('input[name="password"]'),
    password2: document.querySelector('input[name="password2"]'),
}

const inputSpans = {
    username: document.querySelector('#username-span'),
    email: document.querySelector('#email-span'),
    password1: document.querySelector('#password1'),
    password2: document.querySelector('#passwordTwo'),
}

const validationRules = {
    username: {
        validator: isValidUsername,
        message: 'Username must contain only letters and numbers and be at least 8 characters long.',
        isValid: false
    },
    email: {
        validator: isValidEmail,
        message: 'Please enter a correct email address.',
        isValid: false
    },
    password1 : {
        validator: isValidPassword,
        message: 'Password must contain only letters and numbers and be at least 8 characters long.',
        isValid: false
    },
    password2 : {
        isValid: false
    }
}

const outlineBorders = {
    correct: '4px solid green',
    incorrect: '2px solid red'
}
Object.keys(userInputs).map(inputName => {
    const input = userInputs[inputName];
    input.addEventListener('input', () => {
        const inputValue = input.value;
        if (!validationRules[inputName].validator(inputValue)) {
            inputSpans[inputName].innerHTML = validationRules[inputName].message;
            input.style.border = outlineBorders.incorrect;
            validationRules[inputName].isValid = false;
        } else {
            inputSpans[inputName].innerHTML = '';
            input.style.border = outlineBorders.correct;
            validationRules[inputName].isValid = true;
        }
        updateRadioButtonsState();
    });
});
userInputs.password1.addEventListener('input', () => {
  validatePasswords();
});

userInputs.password2.addEventListener('input', () => {
  validatePasswords();
});

function validatePasswords() {
  const password1 = userInputs.password1.value;
  const password2 = userInputs.password2.value;

  if (!equalPasswords(password1, password2)) {
    inputSpans.password2.innerHTML = 'Passwords do not match.';
    userInputs.password2.style.border = outlineBorders.incorrect;
    validationRules.password2.isValid = false;
  } else {
    inputSpans.password2.innerHTML = '';
    userInputs.password2.style.border = outlineBorders.correct;
    validationRules.password2.isValid = true;
  }
  updateRadioButtonsState();
}

function updateRadioButtonsState() {
    const allFieldsValid = checkIfAllFieldsAreValid();

    radioJobApplicant.disabled = !allFieldsValid;
    radioCompany.disabled = !allFieldsValid;
    radioCompany.checked = false;
    radioJobApplicant.checked = false;
    hiddenCompanyDiv.style.display = 'none';
    hiddenJobApplicantDiv.style.display = 'none';
}

function checkIfAllFieldsAreValid() {
    return Object.keys(validationRules).every(key => validationRules[key].isValid);
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9]{8,}$/.test(username);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password) {
    return /^[a-zA-Z0-9]{8,}$/.test(password);
}

function equalPasswords(password1, password2) {
    return password1 === password2 && password2 === password1;
}