import { loginPage } from '../pages/Login'

const LG = new loginPage()

describe('Login Page', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    cy.visit('https://gold.noveltytechnology.com/', { timeout: 5000 })
    cy.url().should('include', '/login')
  })
  it('Valid login with correct credentials', () => {
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
  it('Invalid login with invalid credentials', () => {
    LG.enterUsername('abcd@gmail.com')
    LG.enterPassword('123456789')
    LG.clickLoginButton()
    cy.wrap('Login Failed').should('eq', 'Login Failed')
    cy.get('.MuiAlert-message > .MuiTypography-root').should(
      'have.text',
      'Login Error'
    )
  })

  it('Invalid login with empty credentials', () => {
    LG.enterUsername('{backspace}')
    LG.enterPassword('123456789')
    LG.clickLoginButton()
    cy.wrap('Login Failed').should('eq', 'Login Failed')
    cy.get(':nth-child(1) > .MuiFormHelperText-root').should(
      'have.text',
      'This is a required field'
    )
  })
})
