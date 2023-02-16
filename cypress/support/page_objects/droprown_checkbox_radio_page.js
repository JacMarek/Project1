class DropdownPage {

    dropdownMenus() {
        return cy.get('#dropdowm-menu-1').parent().find('select')
    }

    checkboxes() {
        return cy.get('#checkboxes').find('input[type="checkbox"]')
    }

    radioBtns() {
        return cy.get('#radio-buttons').find('input')
    }
}

export const onDropdownPage = new DropdownPage