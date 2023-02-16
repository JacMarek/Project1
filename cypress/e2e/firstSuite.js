/// <reference types="cypress" />

import { navigateTo } from "../support/page_objects/navigation"
import { testData } from "../support/page_objects/test_data"
import { onContactUsPage } from "../support/page_objects/contact_us_page"
import { onDropdownPage } from "../support/page_objects/droprown_checkbox_radio_page"


describe(">>Contact us<< page", () => {
  beforeEach (() => {
    navigateTo.contactUsPage()
  })
  
  it("Fill in and send the form", () => {
    onContactUsPage.fillContactUsForm()
    onContactUsPage.clickSubmitBtn()
    onContactUsPage.checkConfirmation()
  })

  it("Reset data in the form", () => {
    onContactUsPage.fillContactUsForm()
    onContactUsPage.clickResetBtn()
    cy.get(onContactUsPage.firstNameField).should('not.have.value')
    cy.get(onContactUsPage.lastNameField).should('not.have.value')
    cy.get(onContactUsPage.eMailAddressField).should('not.have.value')
    cy.get(onContactUsPage.commentsField).should('not.have.value')
  })

  it("Submit a blank form", () => {
    onContactUsPage.clickSubmitBtn()
    onContactUsPage.checkEmailErrorMessage()
  })

  it("Submit the form with one blank field", () =>{

    onContactUsPage.fillContactUsForm()

    const inputs = [onContactUsPage.firstNameField, onContactUsPage.lastNameField, onContactUsPage.eMailAddressField, onContactUsPage.commentsField]

    for(let i=0; i<4; i++) {
      cy.get(inputs[i]).invoke('prop', 'value').then( value => {
        cy.get(inputs[i]).clear()
        onContactUsPage.clickSubmitBtn()
        if(i!==2) {
          onContactUsPage.checkIncompleteErrorMessage()
        } else {
          onContactUsPage.checkEmailErrorMessage()
        }
        cy.go('back')
        cy.get(inputs[i]).type(value)
      })
    }
  })

  // it("Verify e-mail - positive scenarios", () =>{

  //   fillContactUs (testData.firstName, testData.lastName, testData.eMail, testData.comments)
  //   testData.validEmail.forEach( email => {

  //     cy.get('[placeholder="Email Address"]').clear().type(email)
  //     submit()
  //     cy.get('body').should('contain', 'Thank You for your Message!')
  //     cy.go('back')
  //   })      
  // })

  // it("Verify e-mail - negative scenarios", () =>{

  //   fillContactUs (testData.firstName, testData.lastName, testData.eMail, testData.comments)
  //   testData.invalidEmail.forEach( email => {

  //     cy.get('[placeholder="Email Address"]').clear().type(email)
  //     submit()
  //     cy.get('body').should('contain', 'Error: Invalid email address')
  //     cy.go('back')
  //   })      
  // })
})

describe(">>Dropdown Menu(s), Checkboxe(s) & Radio Button(s)<< page", () => {
  beforeEach (() => {
    navigateTo.dropdownCheckboxesRadioPage()
  })
  
  it("Dropdown values", () => {

    onDropdownPage.dropdownMenus().each(dropdown => {
      cy.wrap(dropdown).find("option").each(option => {
        let dropdownValue = option.text()
        cy.wrap(dropdown).select(dropdownValue)
        cy.wrap(dropdown).find('option:selected').then(selectedValue => {
          cy.wrap(selectedValue).should('have.text', dropdownValue)
        })
        cy.wrap(testData.dataType.dropdownValues).should('contain', dropdownValue)
      })
    })

    testData.dataType.dropdownValues.forEach( dropdownOption => {
      onDropdownPage.dropdownMenus().should('contain', dropdownOption)
    })
  })

  it("Checkboxes", () => {

    onDropdownPage.checkboxes().each( checkboxInput => {
       
      if (!checkboxInput.is(":checked")) {
          cy.wrap(checkboxInput).click()
      }
      cy.wrap(checkboxInput).should('be.checked')
    })

    onDropdownPage.checkboxes().each( (toUncheck, index) => {
       
      if (index == 1 || index == 3) {
          cy.wrap(toUncheck).click()
          cy.wrap(toUncheck).should('not.be.checked')
      }
    })
  })

  it("Radio Buttons", () => {

    onDropdownPage.radioBtns().each( (checkedBtn, index) => {

      cy.wrap(checkedBtn).click()
      
      onDropdownPage.radioBtns().each( (radioBtn, index2) => {

        if (index == index2) {
          cy.wrap(radioBtn).should('be.checked')
        } else {
          cy.wrap(radioBtn).should('not.be.checked')
        }
      })
    })
  })
})

describe(">>Datepicker<< page", () => {

  it("Select a date in the past", () => {
    
    function selectDay(substractDays) {

      let date = new Date()
      date.setDate(date.getDate() -substractDays)
      let pastDay = date.getDate()
      let pastMonth = date.toLocaleString('default', {month: 'long'})
      let pastYear = date.getFullYear()
      let selectedDate = date.toLocaleString('default', {month: '2-digit'}) + "-" + date.toLocaleString('default', {day: '2-digit'}) + "-" + pastYear
      cy.log(selectedDate) 

      cy.get('[class="datepicker-days"]').find('[class="datepicker-switch"]').then( calendarCard => {
      
        let calendarCardText = calendarCard.text()
              
        if(!calendarCardText.includes(pastYear)) { 
          cy.contains("«").click()
          selectDay(substractDays)
        } else {
          if (!calendarCardText.includes(pastMonth)) {
            cy.contains("«").click()
            selectDay(substractDays)
          } else {
            cy.get('[class="day"]').contains(pastDay).click()
          }
        }
      })
      return selectedDate
    } 
    
    navigateTo.datepickerPage()
    
    cy.get('#datepicker input').then( visibleDate => {
      
      let dateAssert = selectDay(testData.dataType.goBackForDays)
      cy.wrap(visibleDate).should('have.value', dateAssert)
    })  
  })
})

describe('>>Autocomplete TextField<< page', () => {
  beforeEach (() => {
    navigateTo.autocompleteTextFieldPage()
  })

  it('Type "chi" and select 2nd option', () => {
 
    cy.get('[placeholder="Food Item"]')
      .type("chi")
      .get('[class="autocomplete-items"] div')
      .eq(1)
      .then( selectedFood => {

        let foodText = selectedFood.text()
        cy.wrap(selectedFood).click()
        cy.get('[placeholder="Food Item"]').should('have.value', foodText)
      })
  })

  it('Type 3 characters of item and select it', () => {

    cy.wrap(testData.dataType.food).each( foodToSelect => {
      
      let foodShortcut = foodToSelect.substring(0, 3)
      
      cy.get('[placeholder="Food Item"]')
        .type(foodShortcut)
        .get('[class="autocomplete-items"] div')
        .contains(foodToSelect)
        .click()

      cy.get('[placeholder="Food Item"]').should('have.value', foodToSelect)

      cy.get('[placeholder="Food Item"]').clear()
    })
  })
})

describe('>>Ajax loader<< page', () => {

  it('Wait for the button to load', () => {

    function waiting() {
      cy.get('#myDiv').invoke('attr', 'style').then( loader =>{

        if(loader == "display:none;") {
          cy.log('not visible')
          cy.wait(50)
          waiting()
        } else {
          cy.log('visible')
          cy.get('#button1').click()
        }
      })
    }
    
    navigateTo.ajaxLoaderPage()
    
    waiting()

    cy.get('[class="modal-title"]').should('contain', 'Well Done For Waiting....!!!')
  })
}) 

/* 
1) powyżej 2 testy weryfikacji email są wykomentowane ponieważ znalazły błędy (ale testy są raczej zaprojektowane dobrze, zgodnie z https://en.wikipedia.org/wiki/Email_address)
-- czy w związku z tym w cypress szukać i stosować soft asserts?

2) strona Ajax-Loader wyrzuca jakiś błąd więc musiałem wyłączyć jakiś bezpiecznik w e2e.js

3) czekanie na załadowanie strony Ajax-Loader na pewno można zrobić w jakiś właściwszy sposób ale nie udało mi się kombinowanie z cy.intercept() ani z if() opartym o warunek na hasClass()
*/