const API_URL = 'http://127.0.0.1:5000/register'

const regButtons = document.querySelectorAll('.reg-submit-btn')
regButtons.forEach(btn => {
    btn.addEventListener('click', register)
})

async function register(e) {
    e.preventDefault()
    let body = {
        username: userInputs.username.value,
        email: userInputs.email.value,
        password: userInputs.password1.value,
    }

    if (radioJobApplicant.checked) {
        body = {
            ...body,
            role: 'job_applicant',
            first_name: applicantInputs.firstName.value,
            last_name: applicantInputs.lastName.value,
            phone_number: applicantInputs.phoneNumber.value,
            age: applicantInputs.age.value,
        }
    } else {
        body = {
            ...body,
            role: 'company',
            company_name: companyInputs.companyName.value,
            company_phone_number: companyInputs.companyPhone.value,
            company_address: companyInputs.companyAddress.value,
            company_description: companyInputs.companyDescription.value,
        }
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if (response.status === 201) {
            const responseData = await response.json()
            const hiddenRegDiv = document.querySelector('.reg-success')
            const regForm = document.querySelector('.reg-form')
            hiddenRegDiv.style.display = 'flex'
            regForm.style.display = 'none'
        }
        console.log(response)
    } catch (err) {
        console.log(err)
    }


}


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

const applicantInputs = {
    firstName: document.querySelector('input[name="first-name"]'),
    lastName: document.querySelector('input[name="last-name"]'),
    phoneNumber: document.querySelector('input[name="phone"]'),
    age: document.querySelector('input[name="age"]')
}

const companyInputs = {
    companyName: document.querySelector('input[name="company-name"]'),
    companyPhone: document.querySelector('input[name="company-phone"]'),
    companyAddress: document.querySelector('input[name="company-address"]'),
    companyDescription: document.querySelector('input[name="company-description"]')
}

const inputSpans = {
    username: document.querySelector('#username-span'),
    email: document.querySelector('#email-span'),
    password1: document.querySelector('#password1'),
    password2: document.querySelector('#passwordTwo'),
    firstName: document.querySelector('#first-name-span'),
    lastName: document.querySelector('#last-name-span'),
    phoneNumber: document.querySelector('#phone-span'),
    age: document.querySelector('#age-span'),
    companyName: document.querySelector('#company-name-span'),
    companyPhone: document.querySelector('#company-phone-span'),
    companyAddress: document.querySelector('#company-address-span'),
    companyDescription: document.querySelector('#company-description-span'),
}

const userValidationRules = {
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
    password1: {
        validator: isValidPassword,
        message: 'Password must contain only letters and numbers and be at least 8 characters long.',
        isValid: false
    },
    password2: {
        isValid: false
    }
}

const applicantValidationRules = {
    firstName: {
        validator: isValidFirstNameLastName,
        message: 'Names must contain only letters and be at least 2 characters long.',
    },
    lastName: {
        validator: isValidFirstNameLastName,
        message: 'Names must contain only letters and be at least 2 characters long.',
    },
    phoneNumber: {
        validator: isValidPhoneNumber,
        message: 'Phone number must contain only numbers and be 10 digits long.',
    },
    age: {
        validator: isValidAge,
        message: 'You must be at least 18 years old to register.'
    }
}

const companyValidationRules = {
    companyName: {
        validator: isValidCompanyName,
        message: 'Company name must contain only letters and numbers and be at least 6 characters long.',
    },
    companyPhone: {
        validator: isValidPhoneNumber,
        message: 'Phone number must contain only numbers and be 10 digits long.'
    },
    companyAddress: {
        validator: isValidAddress,
        message: 'Please enter a valid address.'
    },
    companyDescription: {
        validator: isValidDescription,
        message: 'Please enter a short description of what does the company do.'
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
        if (!userValidationRules[inputName].validator(inputValue)) {
            inputSpans[inputName].innerHTML = userValidationRules[inputName].message;
            input.style.border = outlineBorders.incorrect;
            userValidationRules[inputName].isValid = false;
        } else {
            inputSpans[inputName].innerHTML = '';
            input.style.border = outlineBorders.correct;
            userValidationRules[inputName].isValid = true;
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

Object.keys(applicantInputs).map(inputName => {
    const input = applicantInputs[inputName];
    input.addEventListener('input', () => {
        const inputValue = input.value;
        if (!applicantValidationRules[inputName].validator(inputValue)) {
            inputSpans[inputName].innerHTML = applicantValidationRules[inputName].message;
            input.style.border = outlineBorders.incorrect;
        } else {
            inputSpans[inputName].innerHTML = '';
            input.style.border = outlineBorders.correct;
        }
    });
})

Object.keys(companyInputs).map(inputName => {
    const input = companyInputs[inputName];
    input.addEventListener('input', () => {
        const inputValue = input.value;
        if (!companyValidationRules[inputName].validator(inputValue)) {
            inputSpans[inputName].innerHTML = companyValidationRules[inputName].message;
            input.style.border = outlineBorders.incorrect;
        } else {
            inputSpans[inputName].innerHTML = '';
            input.style.border = outlineBorders.correct;
        }
    });
})

function validatePasswords() {
    const password1 = userInputs.password1.value;
    const password2 = userInputs.password2.value;

    if (!equalPasswords(password1, password2)) {
        inputSpans.password2.innerHTML = 'Passwords do not match.';
        userInputs.password2.style.border = outlineBorders.incorrect;
        userValidationRules.password2.isValid = false;
    } else {
        inputSpans.password2.innerHTML = '';
        userInputs.password2.style.border = outlineBorders.correct;
        userValidationRules.password2.isValid = true;
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
    return Object.keys(userValidationRules).every(key => userValidationRules[key].isValid);
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
    return password1 === password2 && password2 === password1 && password1.length > 0 && password2.length > 0
}

function isValidFirstNameLastName(name) {
    return /^[a-zA-Z]{2,}$/.test(name);
}

function isValidPhoneNumber(phoneNumber) {
    return /^[0-9]{10}$/.test(phoneNumber);
}

function isValidAge(age) {
    return age >= 18;
}

function isValidCompanyName(companyName) {
    return /^[a-zA-Z0-9]{6,}$/.test(companyName);
}

function isValidAddress(address) {
    return address.length > 5;
}

function isValidDescription(description) {
    return description.length > 10;
}