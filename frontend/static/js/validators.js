export const applicantValidationRules = {
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

export const userValidationRules = {
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
        validator: isValidPassword,
        isValid: false
    }
}


export const companyValidationRules = {
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

export function equalPasswords(password1, password2) {
    return password1 === password2 && password2 === password1 && password1.length > 0 && password2.length > 0
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function isValidUsername(username) {
    return /^[a-zA-Z0-9]{8,}$/.test(username);
}

function isValidPassword(password) {
    return /^[a-zA-Z0-9]{8,}$/.test(password);
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
