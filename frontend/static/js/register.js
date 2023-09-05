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