const API_URL = 'http://localhost:5000/edit_profile'

const inputFields = {
    newUsername: document.querySelector('#new-username'),
    newEmail: document.querySelector('#new-email'),
    oldPassword: document.querySelector('#old-password'),
    newPassword: document.querySelector('#new-password'),
    confirmPassword: document.querySelector('#confirm-password')
}

// TODO: add validations for inputs

const saveChangesBtn = document.querySelector('#save-changes-btn');
saveChangesBtn.addEventListener('click', editProfile)

const changePwdAnchor = document.querySelector('.change-password')
changePwdAnchor.addEventListener('click', showChangePwdForm)

function showChangePwdForm() {
    const passwordDiv = document.querySelector('.password-container')
    passwordDiv.style.display = (passwordDiv.style.display === 'none') ? 'flex' : 'none'
}

async function editProfile(e) {
    e.preventDefault()
    const data = {
        username: inputFields.newUsername.value,
        email: inputFields.newEmail.value,
        password: inputFields.newPassword.value,
    }
    console.log(data)

    await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(data),
        }
    ).then(response => {
            if (response.status === 200) {
                alert('Changes saved successfully!')
                window.location.href = 'http://localhost:5000'
            }
        }
    ).catch(error => console.log(error))
}