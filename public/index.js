'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(bars);
console.log(events);
console.log(actors);

//step1 Euro-People
var bookprice0=[];
for(var i = 0; i<events.length; i++){
  for(var j = 0; j < bars.length; j++){
    if(events[i].barId == bars[j].id)
    {
        events[i].price = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson;
        bookprice0.push(events);
    }
  }
}
console.log(bookprice0);

//Step 2 Send more, pay less
var bookprice1=[];
for(var i = 0 ; i<events.length ; i++){
  for(var j = 0 ; j<bars.length ; j++){
    if(events[i].barId==bars[j].id){
      if(events[i].persons>=10 && events[i].persons<20){
        events[i].price = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson*0.9;
        bookprice1.push(events);
      }else if(events[i].persons>=20 && events[i].persons<60){
        events[i].price = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson*0.7;
        bookprice1.push(events);
      }else if(events[i].persons>=60){
        events[i].price = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson*0.5;
        bookprice1.push(events);
      }else{
        events[i].price = events[i].time * bars[j].pricePerHour + events[i].persons * bars[j].pricePerPerson;
        bookprice1.push(events);
      }
    }
  }
}
console.log(bookprice1);

//step 3 Give me all your money
var bookprice2=[];
for(var i = 0; i<events.length; i++)
{
    for(var j = 0; j < bars.length; j++)
    {
        if(events[i].barId == bars[j].id)
        {
          events[i].commission = events[i].price * 0.3;
          events[i].commission.insurance = events[i].commission *0.5;
          events[i].commission.treasury = events[i].persons * 1;
          events[i].commission.privateaser = events[i].price * 0.3-events[i].commission *0.5-events[i].persons * 1;
          bookprice2.push(events);
        }
    }
}
console.log(bookprice2);

//Step 4 The famous deductible
var booking_price3=[];
var deductibleReduction;
for(var i = 0; i<events.length; i++){
  for(var j = 0; j < bars.length; j++){
      if(events[i].barId == bars[j].id){
          if (events[i].options.deductibleReduction == true){
            events[i].commission.newprivateaser = events[i].commission.privateaser + events[i].persons * 1;
            console.log("Your deductible is 200€");
          }
          else events[i].price = events[i].price + 5000;
            events[i].commission.newprivateaser = events[i].commission.privateaser;
            console.log("Your deductible is 5000€");
            bookprice3.push(events);
      }
  }
}
console.log(bookprice3);

//step5
for(var i = 0; i<actors.length; i++){
  for(var j = 0; j < events.length; j++){
      if(actors[i].eventId == events[j].id,){
          for (var m = 0; m < actors[i].payment.length; m++){
              if (actors[i].payment[m].who == 'booker'){
                  actors[i].payment[m].amount = events[j].price + events[i].persons * 1;;
              }
              else if (actors[i].payment[m].who == 'bar'){
                  actors[i].payment[m].amount = events[j].price - events[j].commission;
              }
              else if (actors[i].payment[m].who == 'insurance'){
                  actors[i].payment[m].amount = events[j].commission.insurance;
              }
              else if (actors[i].payment[m].who == 'treasury'){
                  actors[i].payment[m].amount = events[j].commission.treasury;
              }
              else if (actors[i].payment[m].who == 'privateaser'){
                  actors[i].payment[m].amount = events[i].commission.newprivateaser;
              }
          }
      }
  }
}
console.log(actors);


