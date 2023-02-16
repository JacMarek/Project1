class Navigation {
    contactUsPage(){
        cy.openHomePage()
        cy.get('[id="contact-us"]').invoke("removeAttr", "target").click()
    }

    dropdownCheckboxesRadioPage(){
        cy.openHomePage()
        cy.get('#dropdown-checkboxes-radiobuttons').invoke("removeAttr", "target").click()
    }

    datepickerPage(){
        cy.openHomePage()
        cy.get('#datepicker').invoke("removeAttr", "target").click()
        cy.get('#datepicker input').click()
    }

    autocompleteTextFieldPage(){
        cy.openHomePage()
        cy.get('#autocomplete-textfield').invoke("removeAttr", "target").click()
    }

    ajaxLoaderPage(){
        cy.openHomePage()
        cy.get('#ajax-loader').invoke("removeAttr", "target").click()
    }
};

export const navigateTo = new Navigation()