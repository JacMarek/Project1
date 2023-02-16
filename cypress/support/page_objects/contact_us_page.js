import { testData } from "./test_data"

function fillForm (firstName, lastName, eMail, comments) {
    cy.get(onContactUsPage.firstNameField).type(firstName)
    cy.get(onContactUsPage.lastNameField).type(lastName)
    cy.get(onContactUsPage.eMailAddressField).type(eMail)
    cy.get(onContactUsPage.commentsField).type(comments)
  }

  class ContactUsPage {
    
    constructor() { //przechowywanie selektorów w zmiennych
        this.firstNameField = '[placeholder="First Name"]';
        this.lastNameField = '[placeholder="Last Name"]';
        this.eMailAddressField = '[placeholder="Email Address"]';
        this.commentsField = '[placeholder="Comments"]'
    }
    
    //inna opcja na trzymanie selektorów:
    // firstNameField() {
    //    return cy.get('[placeholder="First Name"]')
    // }

    // lastNameField() {
    //    return cy.get('[placeholder="Last Name"]')
    // }

    // eMailAddressField() {
    //    return cy.get('[placeholder="Email Address"]')
    // }

    // commentsField() {
    //    return cy.get('[placeholder="Comments"]')
    // }
  
    clickResetBtn() {
        cy.get('[type="reset"]').click()
        }
    
    clickSubmitBtn() {
        cy.get('[type="submit"]').click()
        }
    
    checkConfirmation() {
        cy.get('body').should('contain', 'Thank You for your Message!')
        }
    
    checkIncompleteErrorMessage() {
        cy.get('body')
            .should('contain', 'Error: all fields are required')
            .and('not.contain', 'Error: Invalid email address')
        }

    checkEmailErrorMessage() {
        cy.get('body')
            .should('contain', 'Error: all fields are required')
            .and('contain', 'Error: Invalid email address')
        } 

    fillContactUsForm(){
        fillForm (testData.dataType.firstName, testData.dataType.lastName, testData.dataType.eMail, testData.dataType.comments)
        cy.get(this.firstNameField).should('have.value', testData.dataType.firstName)
        cy.get(this.lastNameField).should('have.value', testData.dataType.lastName)
        cy.get(this.eMailAddressField).should('have.value', testData.dataType.eMail)
        cy.get(this.commentsField).should('have.value', testData.dataType.comments)
    }
  }

  export const onContactUsPage = new ContactUsPage()