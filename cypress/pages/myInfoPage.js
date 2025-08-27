class MyInfoPage {
    selectorsList() {
    
        const selectors = {
            firstNameField: "[name='firstName']",
            lastNameField: "[name='lastName']",
            genericField: ".oxd-input--active",
            dateCloseButton: ".--close",
            dropdownButton: ".oxd-select-text",
            genderField: ".oxd-radio-input",
            submitButton: "[type='submit']",
        }

        return selectors
    }

    fillPersonalDetails(firstName, lastName) {
        cy.get(this.selectorsList().firstNameField).clear().type(firstName)
        cy.get(this.selectorsList().lastNameField).clear().type(lastName)
    }

    fillEmployeeDetails(employeeId, otherId, driversLicenseNumber, expiryDate) {
        cy.get(this.selectorsList().genericField).clear().eq(4).type(employeeId)
        cy.get(this.selectorsList().genericField).clear().eq(5).type(otherId)
        cy.get(this.selectorsList().genericField).clear().eq(6).type(driversLicenseNumber)
        cy.get(this.selectorsList().genericField).clear().eq(7).type(expiryDate)
        cy.get(this.selectorsList().dateCloseButton).click()

    }

    saveForm() {
        cy.get(this.selectorsList().submitButton).eq(1).click()
        cy.get('body').should('contain', 'Successfully Saved')

    }

    fillStatus() {
            cy.get(this.selectorsList().dropdownButton).eq(0).click()
            cy.contains('.oxd-select-option', 'Brazilian').click()
            cy.get(this.selectorsList().dropdownButton).eq(1).click()
            cy.contains('.oxd-select-option', 'Married').click()
            cy.get(this.selectorsList().genderField).eq(1).click()
    }
}

export default MyInfoPage
