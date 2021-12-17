import { templates, select, settings } from '../settings.js';
import  {utils}   from '../utils.js';
import AmountWidget from './AmountWidget.js';
import HourPicker from './HourPicker.js';
import DatePicker from './DatePicker.js';

class Booking {
  constructor(element){
    const thisBooking = this;

    thisBooking.render(element);
    thisBooking.initWidgets();
    thisBooking.getDate();
  }

  getDate(){
    const thisBooking = this;

    const startDateParam = settings.db.dateStartParamKey + '=' + utils.dateToStr(thisBooking.datePicker.minDate);
    const endDateParam = settings.db.dateEndParamKey + '=' + utils.dateToStr(thisBooking.datePicker.maxDate); 


    const params = {
      booking: [
        startDateParam,
        endDateParam,
      ],
      eventsCurren: [
        settings.db.notRepeatParam,
        startDateParam,
        endDateParam,
      ],
      eventsRepeat: [
        settings.db.repeatParam,
        endDateParam,
      ],
    };
    // console.log('getData params:', params);

    const url = {
      booking:           settings.db.url + '/'  + settings.db.booking 
                                                + '?' + params.booking.join('&'),
      eventsCurren:      settings.db.url + '/'  + settings.db.event   
                                                + '?' + params.eventsCurren.join('&'),
      eventsRepeat:      settings.db.url + '/'  + settings.db.event   
                                                + '?' + params.eventsRepeat.join('&'),
    };
    // console.log('urls:', urls);

    fetch(url.booking)
      .then(function(bookingResponse){
        return bookingResponse;
      })
      .then(function(bookings){
        console.log(bookings);
      });
  } 

  render(element){
    const thisBooking = this;

    const generateHTML = templates.bookingWidget();

    thisBooking.dom = {};
    thisBooking.dom.wrapper = element;
    thisBooking.dom.wrapper.innerHTML = generateHTML;

    thisBooking.dom.peopleAmount = document.querySelector(select.widgets.booking.peopleAmount);
    thisBooking.dom.hoursAmount = document.querySelector(select.widgets.booking.hoursAmount);

    thisBooking.dom.datePicker = document.querySelector(select.widgets.datePicker.wrapper);
    thisBooking.dom.hourPicker = document.querySelector(select.widgets.hourPicker.wrapper);
  }

  initWidgets(){
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker); 
  }
}
export default Booking;