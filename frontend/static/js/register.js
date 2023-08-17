function sendRegisterData() {
    const submitInput = document.querySelector('#reg-submit')
    submitInput.addEventListener('click', handleData)

}

async function handleData() {
    event.preventDefault()
    const usernameInput = document.querySelector('#username')
    const passwordInput = document.querySelector('#password')
    const emailInput = document.querySelector('#email')
    const firstNameInput = document.querySelector('#first-name')
    const lastNameInput = document.querySelector('#last-name')

    const username = usernameInput.value
    const password = passwordInput.value
    const email = emailInput.value
    const firstName = firstNameInput.value
    const lastName = lastNameInput.value

    const user = {
        username,
        password,
        email,
        first_name: firstName,
        last_name: lastName
    }


    const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const data = await response.json()
        .catch(err => console.log(err))

}

sendRegisterData()