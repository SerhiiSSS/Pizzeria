import {settings, select } from '../settings.js';
import BaseWidget from './BaseWidget.js';


class AmountWidget extends BaseWidget{
  constructor(element) {
    super(element, settings.amountWidget.defaultValue);

    const thisWidget = this;
    // console.log(thisWidget);
   
    thisWidget.getElements(element);
    
    // thisWidget.setValue(thisWidget.dom.input.value);
    thisWidget.initActions();
    // console.log('AmoutWidget:', thisWidget);
    // console.log('constructor arguments:', element);
  }
  
  getElements(){
    const thisWidget = this;
    
    // thisWidget.dom.wrapper = element;
    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(select.widgets.amount.input);
    thisWidget.dom.linkDecrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkDecrease);
    thisWidget.dom.linkIncrease = thisWidget.dom.wrapper.querySelector(select.widgets.amount.linkIncrease);

    // thisWidget.value = settings.amountWidget.defaultValue;
  }
  
  isValid(value){
    return !isNaN(value) 
    && settings.amountWidget.defaultMin <= value 
    && settings.amountWidget.defaultMax >= value;
  }

  renderValue(){
    const thisWidget = this;

    thisWidget.dom.input.value = thisWidget.value; 
  }
  
  initActions(){
    const thisWidget = this;

    thisWidget.dom.input.addEventListener('change', function () {
      // thisWidget.setValue(thisWidget.dom.input.value);
      thisWidget.value = thisWidget.input.value;
    });

    thisWidget.dom.linkDecrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value -1 );
    });

    thisWidget.dom.linkIncrease.addEventListener('click', function(event){
      event.preventDefault();
      thisWidget.setValue(thisWidget.value +1 );
    });
  }
}

export default AmountWidget;