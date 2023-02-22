import { testData } from "./test_data"

  class ContactUsPage {
    
    //przechowywanie selektorów w zmiennych
    firstNameField = '[placeholder="First Name"]';
    lastNameField = '[placeholder="Last Name"]';
    eMailAddressField = '[placeholder="Email Address"]';
    commentsField = '[placeholder="Comments"]';
    resetBtn = '[type="reset"]';
    submitBtn = '[type="submit"]';
    confirmation = '#contact_reply';
    errorMsg = 'body';
  
    clickResetBtn() {
        cy.get(this.resetBtn).click()
        }
    
    clickSubmitBtn() {
        cy.get(this.submitBtn).click()
        }
    
    checkConfirmation() {
        cy.get(this.confirmation).should('contain', 'Thank You for your Message!')
        }
    
    checkIncompleteErrorMessage() {
        cy.get(this.errorMsg)
            .should('contain', 'Error: all fields are required')
        }

    checkEmailErrorMessage() {
        cy.get(this.errorMsg)
            .and('contain', 'Error: Invalid email address')
        } 


    fillForm (firstName, lastName, eMail, comments) {
        cy.get(this.firstNameField).type(firstName)
        cy.get(this.lastNameField).type(lastName)
        cy.get(this.eMailAddressField).type(eMail)
        cy.get(this.commentsField).type(comments)
        }

    fillContactUsFormValidData(){
        this.fillForm (testData.dataType.firstName, testData.dataType.lastName, testData.dataType.eMail, testData.dataType.comments)
        cy.get(this.firstNameField).should('have.value', testData.dataType.firstName)
        cy.get(this.lastNameField).should('have.value', testData.dataType.lastName)
        cy.get(this.eMailAddressField).should('have.value', testData.dataType.eMail)
        cy.get(this.commentsField).should('have.value', testData.dataType.comments)
    }
  }

  export const onContactUsPage = new ContactUsPage()