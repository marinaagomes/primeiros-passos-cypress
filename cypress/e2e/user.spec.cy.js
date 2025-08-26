import userData from '../fixtures/users/user-data.json'
import LoginPage from '../pages/loginPage.js'
import DashboardPage from '../pages/dashboardPage.js'
import MenuPage from '../pages/menuPage.js'

const loginPage = new LoginPage()
const dashboardPage = new DashboardPage()
const menuPage = new MenuPage() 

describe('Orange HRM Tests', () => {

  const selectorsList = {
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateCloseButton: ".--close",
    dropdownButton: ".oxd-select-text",
    genderField: ".oxd-radio-input",
    submitButton: "[type='submit']",
  }

  it.only('User Info Update - Success', () => {
    loginPage.accessLoginPage()
    loginPage.loginWithUser(userData.userSuccess.username, userData.userSuccess.password)

    dashboardPage.checkDashboardPage()

    menuPage.accessMyInfo()

    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorsList.genericField).clear().eq(4).type('Employee')
    cy.get(selectorsList.genericField).clear().eq(5).type('OtherIdTest')
    cy.get(selectorsList.genericField).clear().eq(6).type('DriversLicenseTest')
    cy.get(selectorsList.genericField).clear().eq(7).type('2025-03-10')
    cy.get(selectorsList.dateCloseButton).click()
    cy.get(selectorsList.dropdownButton).eq(0).click()
    cy.contains('.oxd-select-option', 'Brazilian').click()
    cy.get(selectorsList.dropdownButton).eq(1).click()
    cy.contains('.oxd-select-option', 'Married').click()
    cy.get(selectorsList.genericField).clear().eq(9).type('1985-04-20')
    cy.get(selectorsList.genderField).eq(1).click()
    cy.get(selectorsList.submitButton).eq(1).click()
    cy.get('body').should('contain', 'Successfully Saved')
  })
  it('Login - Fail', () => {
    cy.visit('/auth/login')

    cy.get(selectorsList.usernameField)
      .type(userData.userFail.username)
    cy.get(selectorsList.passwordField)
      .type(userData.userFail.password)
    cy.get(selectorsList.loginButton)
      .should('be.visible')
      .should('not.be.disabled')
      .click()
    cy.get(selectorsList.wrongCredentialAlert, { timeout: 10000 })
      .should('be.visible')
  })
})