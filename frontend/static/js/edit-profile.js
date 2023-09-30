const API_URL = 'http://localhost:5000/api/edit_profile'

const inputFields = {
    newUsername: document.querySelector('#new-username'),
    newEmail: document.querySelector('#new-email'),
    oldPassword: document.querySelector('#old-password'),
    newPassword: document.querySelector('#new-password'),
    confirmPassword: document.querySelector('#confirm-password')
}

const outlineBorders = {
    correct: '4px solid green',
    incorrect: '2px solid red'
}

const saveChangesBtn = document.querySelector('#save-changes-btn');
saveChangesBtn.addEventListener('click', editProfile)

const changePwdAnchor = document.querySelector('.change-password')

function showChangePwdForm() {
    const passwordDiv = document.querySelector('.password-container')
    passwordDiv.style.display = (passwordDiv.style.display === 'none') ? 'flex' : 'none'
}

changePwdAnchor.addEventListener('click', showChangePwdForm)

async function editProfile(e) {
    e.preventDefault()

    const response = await fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify({
            newUsername: inputFields.newUsername.value,
            newEmail: inputFields.newEmail.value,
            newPassword: inputFields.newPassword.value,
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        }
    }).catch(error => console.log(error))

    if (response.status === 200) {
        await response.json().then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token)
            }
        }).catch(error => console.log(error))
    } else {
        await response.json().then(data => {
            alert(data.message)
        }).catch(error => console.log(error))
    }
}