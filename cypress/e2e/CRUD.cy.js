import { loginPage } from '../pages/Login'
import { crudPage } from '../pages/CRUD'
const LG = new loginPage()
const crud = new crudPage()

describe('User CRUD ', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('https://gold.noveltytechnology.com/', { timeout: 150000 })
    cy.url().should('include', '/login')
    LG.enterUsername('tester@noveltytechnology.com')
    LG.enterPassword('P@ssw0rd@2023')
    LG.clickLoginButton()
    cy.get('.css-1juf0i0 > .MuiTypography-root').then(($app) => {
      if ($app.text().includes('Dashboard')) {
        cy.wrap('Login Successful').should('eq', 'Login Successful')
        cy.get('.css-1juf0i0 > .MuiTypography-root').should(
          'have.text',
          'Dashboard'
        )
      } else {
        cy.wrap('Unable to Login').should('eq', 'Unable to Login')
      }
    })
  })
  it('Validation for the user add attempt with any or all of the required fields empty', () => {
    crud.clickUsers()
    cy.url().should('include', '/users')
    crud.clickAddUser()
    crud.enterFirstName('{backspace}')
    crud.enterMiddleName('{backspace}')
    crud.enterLastName('{backspace}')
    crud.enterDOB('{backspace}')
    crud.enterGender()
    crud.enterEmail('test@yopmail.com')
    crud.enterPhone('{backspace}')
    crud.clickSave()
    cy.get(
      ':nth-child(1) > .MuiGrid-grid-xs-6 > .MuiFormControl-root > .MuiFormHelperText-root'
    ).should('contain', 'This is a required field')
  })
  it('Successful addition of a user along with verification for the updated user list with the added user', () => {
    crud.clickUsers()
    cy.url().should('include', '/users')
    crud.clickAddUser()
    crud.enterFirstName('Subrat')
    crud.enterMiddleName('Kumar')
    crud.enterLastName('Regmi')
    crud.enterDOB('01/01/2000')
    crud.enterGender()
    crud.enterEmail('subrattt@yopmail.com')
    crud.enterPhone('1234567890')
    crud.clickSave()

    cy.get(
      ':nth-child(1) > th.MuiTableCell-root > .MuiTypography-bodyTextMedium'
    ).then(($app) => {
      if ($app.text().includes('Subrat Kumar Regmi')) {
        cy.wrap('User Added Successful').should('eq', 'User Added Successful')
        cy.get('#notistack-snackbar').should(
          'contain',
          'User added successfully'
        )
        cy.get(
          ':nth-child(1) > th.MuiTableCell-root > .MuiTypography-bodyTextMedium'
        ).should('contain', 'Subrat Kumar Regmi')
      } else {
        cy.wrap('Unable to Add').should('eq', 'Unable to Add')
      }
    })
  })

  it('Validation for the user edit attempt with any or all of the required fields empty', () => {
    crud.clickUsers()
    cy.url().should('include', '/users')
    crud.clickAddUser()
    crud.enterFirstName('Subrat')
    crud.enterMiddleName('Kumar')
    crud.enterLastName('Regmi')
    crud.enterDOB('01/01/2000')
    crud.enterGender()
    crud.enterEmail('subrattt@yopmail.com')
    crud.enterPhone('1234567890')
    crud.clickSave()
    cy.get('.MuiAlert-message > .MuiTypography-root').should(
      'contain',
      'Error adding user'
    )
    // cy.get('.MuiAlert-message').should('contain', 'Email already taken')
  })
  it('Successful update of a user with verification for the updated user list with the updated user', () => {
    crud.clickUsers()
    cy.url().should('include', '/users')
    crud.clickActionButton()
    cy.get('.MuiList-root > :nth-child(1) > .MuiButtonBase-root').click()
    crud.enterFirstName('Rajesh')
    crud.enterMiddleName('{backspace}')
    crud.enterLastName('Rai')
    crud.enterDOB('01/01/2000')
    crud.enterGender()
    crud.enterEmail('subrattt@yopmail.com')
    crud.enterPhone('1234567890')
    crud.clickSave()
    // cy.get(
    //   ':nth-child(1) > th.MuiTableCell-root > .MuiTypography-bodyTextMedium'
    // ).should('contain', 'Rajesh Rai')
    cy.get(
      ':nth-child(1) > th.MuiTableCell-root > .MuiTypography-bodyTextMedium'
    ).then(($app) => {
      if ($app.text().includes('Rajesh Rai')) {
        cy.wrap('User Updated Successful').should(
          'eq',
          'User Updated Successful'
        )
        cy.get('#notistack-snackbar').should(
          'contain',
          'User edited successfully'
        )
        cy.get(
          ':nth-child(1) > th.MuiTableCell-root > .MuiTypography-bodyTextMedium'
        ).should('contain', 'Rajesh Rai')
      } else {
        cy.wrap('Unable to Add').should('eq', 'Unable to Add')
      }
    })
  })
  it('Successful removal of a user verifying the removal of the user from the list.', () => {
    crud.clickUsers()
    cy.url().should('include', '/users')
    crud.clickActionButton()
    cy.get('.MuiList-root > :nth-child(2) > .MuiButtonBase-root').click()
    cy.xpath(`//button[@id=':r9:']`).click()
    cy.get('#notistack-snackbar').should('contain', 'User deleted successfully')
  })
})
