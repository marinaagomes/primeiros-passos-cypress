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