class Datepicker {

    visibleDate = '#datepicker input'
    monthOnCalendarCard = '.datepicker-days > .table-condensed > thead > tr > .datepicker-switch'
    prevSwitch = '.datepicker-days > .table-condensed > thead > tr > .prev'
    dayOnCalendarCard = '[class="day"]'

    clickPrev() {
        cy.get(this.prevSwitch).click()
    }

    clickDay(day) {
        cy.get(this.dayOnCalendarCard).contains(day).click()
    }

    selectDay(substractDays) {

        let date = new Date() //pobiera bieżącą datę
        date.setDate(date.getDate() -substractDays) //odejmuje dni od dnia bieżącego i ustawia nową wartość zmiennej "date"
        const pastDay = date.getDate() //ustawia dzień ze zmienionej daty
        const pastMonth = date.toLocaleString('default', {month: 'long'}) //ustawia miesiąc ze zmienionej daty
        const pastYear = date.getFullYear() //ustawia rok ze zmienionej daty
        const selectedDate = date.toLocaleString('default', {month: '2-digit'}) + "-" + date.toLocaleString('default', {day: '2-digit'}) + "-" + pastYear //ustawia pełną datę do wyświetlenia
  
        cy.get(this.monthOnCalendarCard).then( calendarCard => {
        
          const calendarCardText = calendarCard.text()
                
          if(!calendarCardText.includes(pastYear)) { 
            this.clickPrev()
            this.selectDay(substractDays)
          } else {
            if (!calendarCardText.includes(pastMonth)) {
                this.clickPrev()
                this.selectDay(substractDays)
            } else {
                this.clickDay(pastDay)
            }
          }
        })
        return selectedDate
      } 

}

export const onDatepickerPage = new Datepicker