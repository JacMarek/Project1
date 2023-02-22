/// <reference types="cypress" />

import { navigateTo } from "../support/page_objects/navigation"
import { testData } from "../support/page_objects/test_data"
import { onContactUsPage } from "../support/page_objects/contact_us"
import { onDropdownPage } from "../support/page_objects/droprown_checkbox_radio"
import { onDatepickerPage } from "../support/page_objects/datepicker"
import { onAutocompletePage } from "../support/page_objects/autocomplete"
import { onAjaxLoader } from "../support/page_objects/ajax_loader"


describe(">>Contact us<< page", () => {
  beforeEach (() => {
    navigateTo.contactUsPage()
  })
  
  it("Fill in and send the form", () => {
    onContactUsPage.fillContactUsFormValidData()
    onContactUsPage.clickSubmitBtn()
    onContactUsPage.checkConfirmation()
  })

  it("Reset data in the form", () => {
    onContactUsPage.fillContactUsFormValidData()
    onContactUsPage.clickResetBtn()
    cy.get(onContactUsPage.firstNameField).should('not.have.value')
    cy.get(onContactUsPage.lastNameField).should('not.have.value')
    cy.get(onContactUsPage.eMailAddressField).should('not.have.value')
    cy.get(onContactUsPage.commentsField).should('not.have.value')
  })

  it("Submit a blank form", () => {
    onContactUsPage.clickSubmitBtn()
    onContactUsPage.checkIncompleteErrorMessage()
    onContactUsPage.checkEmailErrorMessage()
  })

  it("Submit the form with one blank field", () =>{

    onContactUsPage.fillContactUsFormValidData()

    const inputs = [onContactUsPage.firstNameField, onContactUsPage.lastNameField, onContactUsPage.eMailAddressField, onContactUsPage.commentsField]

    for(let i=0; i<4; i++) {
      cy.get(inputs[i]).invoke('prop', 'value').then( value => {
        cy.get(inputs[i]).clear()
        onContactUsPage.clickSubmitBtn()
        onContactUsPage.checkIncompleteErrorMessage()
        if(i==2) {
          onContactUsPage.checkEmailErrorMessage()
        }
        cy.go('back')
        cy.get(inputs[i]).type(value)
      })
    }
  })

  it("Verify e-mail - positive scenarios", () =>{

    onContactUsPage.fillContactUsFormValidData()
    testData.dataType.validEmail.forEach( email => {

      cy.get(onContactUsPage.eMailAddressField).clear().type(email)
      onContactUsPage.clickSubmitBtn()
      onContactUsPage.checkConfirmation()
      cy.go('back')
    })      
  })

  it("Verify e-mail - negative scenarios", () =>{

    onContactUsPage.fillContactUsFormValidData()
    testData.dataType.invalidEmail.forEach( email => {

      cy.get(onContactUsPage.eMailAddressField).clear().type(email)
      onContactUsPage.clickSubmitBtn()
      onContactUsPage.checkEmailErrorMessage()
      cy.go('back')
    })      
  })
})

describe(">>Dropdown Menu(s), Checkboxe(s) & Radio Button(s)<< page", () => {
  beforeEach (() => {
    navigateTo.dropdownCheckboxesRadioPage()
  })
  
  it("Dropdown values", () => {

    onDropdownPage.getDropdownMenus().each(dropdown => {
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
      onDropdownPage.getDropdownMenus().should('contain', dropdownOption)
    })
  })

  it("Checkboxes", () => {

    onDropdownPage.getCheckboxesInputs().each( checkboxInput => {
       
      if (!checkboxInput.is(":checked")) {
          cy.wrap(checkboxInput).click()
      }
      cy.wrap(checkboxInput).should('be.checked')
    })

    onDropdownPage.getCheckboxesInputs().each( (toUncheck, index) => {
       
      if (index == 1 || index == 3) {
          cy.wrap(toUncheck).click()
          cy.wrap(toUncheck).should('not.be.checked')
      }
    })
  })

  it("Radio Buttons", () => {

    onDropdownPage.getRadioBtnsInputs().each( (checkedBtn, index) => {

      cy.wrap(checkedBtn).click()
      
      onDropdownPage.getRadioBtnsInputs().each( (radioBtn, index2) => {

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
       
    navigateTo.datepickerPage()
    
    cy.get(onDatepickerPage.visibleDate).then( visibleDate => {

      const dateAssert = onDatepickerPage.selectDay(testData.dataType.goBackForDays)
      cy.wrap(visibleDate).should('have.value', dateAssert)
    })  
  })
})

describe('>>Autocomplete TextField<< page', () => {
  beforeEach (() => {
    navigateTo.autocompleteTextFieldPage()
  })

  it('Type "chi" and select 2nd option', () => {
 
    cy.get(onAutocompletePage.input)
      .type("chi")
      .get(onAutocompletePage.itemsOnFoodList)
      .eq(1)
      .then( selectedFood => {

        let foodText = selectedFood.text()
        cy.wrap(selectedFood).click()
        cy.get(onAutocompletePage.input).should('have.value', foodText)
      })
  })

  it('Type 3 characters of item and select it', () => {

    cy.wrap(testData.dataType.food).each( foodToSelect => {
      
      let foodShortcut = foodToSelect.substring(0, 3)
      
      cy.get(onAutocompletePage.input)
        .type(foodShortcut)
        .get(onAutocompletePage.itemsOnFoodList)
        .contains(foodToSelect)
        .click()

      cy.get(onAutocompletePage.input).should('have.value', foodToSelect)

      cy.get('[placeholder="Food Item"]').clear()
    })
  })
})

describe('>>Ajax loader<< page', () => {

  it('Wait for the button to load', () => {
    
    navigateTo.ajaxLoaderPage()
    cy.get(onAjaxLoader.clickMeBtn).click({timeout:10000})
    cy.get(onAjaxLoader.popUp).should('contain', 'Well Done For Waiting....!!!')
  })
}) 

/* 
1) powyżej 2 testy weryfikacji email znalazły błędy (ale testy są zaprojektowane dobrze, zgodnie z https://en.wikipedia.org/wiki/Email_address)
-- czy w związku z tym w cypress szukać i stosować soft asserts?

2) strona Ajax-Loader wyrzuca jakiś błąd więc musiałem wyłączyć jakiś bezpiecznik w e2e.js
*/