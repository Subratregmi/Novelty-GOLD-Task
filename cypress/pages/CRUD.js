export class crudPage {
  details = {
    users: () => cy.get(`a[href='/users']`),
    addUser: () => cy.get('.css-69i1ev > .MuiStack-root > .MuiButtonBase-root'),
    firstName: () =>
      cy.get(
        '.MuiDialogContent-root > :nth-child(1) > .MuiGrid-grid-xs-6 > .MuiFormControl-root > .MuiInputBase-root > #firstName'
      ),
    middleName: () => cy.get('#middleName'),
    lastName: () =>
      cy.get(
        'body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > input:nth-child(1)'
      ),
    dob: () => cy.get('#dob'),
    gender: () => cy.get('#gender'),
    email: () =>
      cy.get(
        ':nth-child(1) > .MuiFormControl-root > .MuiInputBase-root > #email'
      ),
    phone: () =>
      cy.get(
        ':nth-child(2) > .MuiFormControl-root > .MuiInputBase-root > #phone'
      ),
    save: () =>
      cy.get(
        `body > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > form:nth-child(2) > div:nth-child(2) > button:nth-child(2)`
      ),
    actionBtn: () =>
      cy.get(
        ':nth-child(1) > .MuiTableCell-alignRight > .MuiButtonBase-root > svg'
      ),
  }

  clickUsers() {
    this.details.users().click()
  }
  clickAddUser() {
    this.details.addUser().click()
  }
  enterFirstName(data) {
    this.details.firstName().clear().type(data)
  }
  enterMiddleName(data) {
    this.details.middleName().clear().type(data)
  }
  enterLastName(data) {
    this.details.lastName().clear().type(data)
  }
  enterDOB(data) {
    this.details.dob().clear().type(data)
  }
  enterGender() {
    this.details.gender().click()
    cy.get('.MuiList-root > [tabindex="0"]').click()
  }
  enterEmail(data) {
    this.details.email().clear().type(data)
  }
  enterPhone(data) {
    this.details.phone().clear().type(data)
  }
  clickSave() {
    this.details.save().click()
  }
  clickActionButton() {
    this.details.actionBtn().click()
  }
}
