const hiddenJobApplicantDiv = document.querySelector('.job-applicant')

const radioJobApplicant = document.querySelector('.account-type input[id="job-applicant"]')
radioJobApplicant.addEventListener('change', () => {
    if (radioJobApplicant.checked) {
        hiddenJobApplicantDiv.style.display = 'flex'
        hiddenCompanyDiv.style.display = 'none'
    }
})

const hiddenCompanyDiv = document.querySelector('.company')
const radioCompany = document.querySelector('.account-type input[id="company"]')

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
    password1: document.querySelector('#password-span'),
    password2: document.querySelector('#password2-span'),
}

const validationRules = {
    username: {
        validator: isValidUsername,
        message: 'Username must contain only letters and numbers and be at least 8 characters long.'
    },
    email: {
        validator: isValidEmail,
        message: 'Please enter a correct email address.'
    }
}

const outlineBorders = {
    correct: '3px solid green',
    incorrect: '2px solid red'
}
Object.keys(userInputs).map(inputName => {
    const input = userInputs[inputName];
    console.log(userInputs[inputName])
    input.addEventListener('blur', () => {
        const inputValue = input.value;
        if (!validationRules[inputName].validator(inputValue)) {
            inputSpans[inputName].innerHTML = validationRules[inputName].message;
            input.value = '';
            input.style.border = outlineBorders.incorrect;
        } else {
            inputSpans[inputName].innerHTML = '';
            input.style.border = outlineBorders.correct;
        }
    });
});


function isValidUsername(username) {
    return /^[a-zA-Z0-9]{8,}$/.test(username);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}