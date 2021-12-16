import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';


class Booking {
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element)
    thisBooking.initWidgets();
  }

  render(element){
    const thisBooking = this;

    const generateHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    console.log(element);
    thisBooking.dom.wrapper.innerHTML = generateHTML;

    thisBooking.dom.peopleAmount = document.querySelector(select.widgets.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.widgets.booking.hoursAmount);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
  }
}
export default Booking