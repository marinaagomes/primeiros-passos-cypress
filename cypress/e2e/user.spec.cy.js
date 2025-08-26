import userData from '../fixtures/users/user-data.json'

describe('Orange HRM Tests', () => {

  const selectorsList = {
    usernameField: "[name='username']",
    passwordField: "[name='password']",
    loginButton: "[type='submit']",
    sectionTitleTopBar: ".oxd-topbar-header-breadcrumb-module",
    dashboardGrid: ".orangehrm-dashboard-grid",
    wrongCredentialAlert: ".oxd-alert",
    myInfoButton: '[href="/web/index.php/pim/viewMyDetails"]',
    firstNameField: "[name='firstName']",
    lastNameField: "[name='lastName']",
    genericField: ".oxd-input--active",
    dateCloseButton: ".--close",
    submitButton: "[type='submit']",
  }

  it.only('User Info Update - Success', () => {
    cy.visit('/auth/login')
    cy.get(selectorsList.usernameField)
      .type(userData.userSuccess.username)
    cy.get(selectorsList.passwordField)
      .type(userData.userSuccess.password)
    cy.get(selectorsList.loginButton)
      .should('be.visible')
      .should('not.be.disabled')
      .click()
    cy.get(selectorsList.dashboardGrid, { timeout: 10000 })
      .should('be.visible')
    cy.get(selectorsList.sectionTitleTopBar, { timeout: 10000 })
      .should('be.visible')
    cy.get(selectorsList.myInfoButton).click()
    cy.get(selectorsList.firstNameField).clear().type('FirstNameTest')
    cy.get(selectorsList.lastNameField).clear().type('LastNameTest')
    cy.get(selectorsList.genericField).clear().eq(4).type('Employee')
    cy.get(selectorsList.genericField).clear().eq(5).type('OtherIdTest')
    cy.get(selectorsList.genericField).clear().eq(6).type('DriversLicenseTest')
    cy.get(selectorsList.genericField).clear().eq(7).type('2025-03-10')
    cy.get(selectorsList.dateCloseButton).click()
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