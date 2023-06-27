export class loginPage {
  details = {
    username: () => cy.get('#username'),
    password: () => cy.get('#password'),
    loginbtn: () =>
      cy.get(
        'body > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > form:nth-child(2) > div:nth-child(2) > button:nth-child(1)'
      ),
  }

  enterUsername(data) {
    this.details.username().type(data)
  }
  enterPassword(data) {
    this.details.password().type(data)
  }
  clickLoginButton() {
    this.details.loginbtn().click()
  }
}
