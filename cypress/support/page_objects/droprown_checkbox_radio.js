class DropdownPage {

    dropdownMenuFirst = '#dropdowm-menu-1';
    checkboxes = '#checkboxes';    
    radioBtns = '#radio-buttons';
    
    getDropdownMenus() {
        return cy.get(this.dropdownMenuFirst).parent().find('select')
    }

    // getDropdownOptions() {
    //     return this.getDropdownMenus().each(dropdown => {
    //         cy.wrap(dropdown).find("option")
    //     })    
    // }

    getCheckboxesInputs() {
        return cy.get(this.checkboxes).find('input')
    }

    getRadioBtnsInputs() {
        return cy.get(this.radioBtns).find('input')
    }
}

export const onDropdownPage = new DropdownPage