'use strict';

//list of cars
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const cars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'fiat-500-x',
  'pricePerDay': 36,
  'pricePerKm': 0.10
}, {
  'id': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'name': 'mercedes-class-a',
  'pricePerDay': 44,
  'pricePerKm': 0.30
}, {
  'id': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'name': 'bmw-x1',
  'pricePerDay': 52,
  'pricePerKm': 0.45
}];

//list of current rentals
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful for step 4
const rentals = [{
  'id': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'driver': {
    'firstName': 'Roman',
    'lastName': 'Frayssinet'
  },
  'carId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'pickupDate': '2020-01-02',
  'returnDate': '2020-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'driver': {
    'firstName': 'Redouane',
    'lastName': 'Bougheraba'
  },
  'carId': '697a943f-89f5-4a81-914d-ecefaa7784ed',
  'pickupDate': '2020-01-05',
  'returnDate': '2020-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}, {
  'id': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'driver': {
    'firstName': 'Fadily',
    'lastName': 'Camara'
  },
  'carId': '4afcc3a2-bbf4-44e8-b739-0179a6cd8b7d',
  'pickupDate': '2019-12-01',
  'returnDate': '2019-12-15',
  'distance': 1500,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'virtuo': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'rentalId': '893a04a3-e447-41fe-beec-9a6bfff6fdb4',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
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
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': 'bc16add4-9b1d-416c-b6e8-2d5103cade80',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
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
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '8c1789c0-8e6a-48e3-8ee5-a6d4da682f2a',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'partner',
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
    'who': 'virtuo',
    'type': 'credit',
    'amount': 0
  }]
}];

console.log(cars);
console.log(rentals);
console.log(actors);

// Step 1

function rentalPrice(rental)
{
    var date1=new Date(rental.pickupDate);
    var date2=new Date(rental.returnDate);
    var time=(Math.abs(date2-date1)/86400000)+1;
    var prices=fetchCarPrices(rental.carId);
    time=time*prices[0];
    var dist=rental.distance*prices[1];
    var price=dist+time;
    return price;
}

function fetchCarPrices(carID)
{
    var size=cars.length;
    for(var i=0;i<size;i++)
    {
        if (cars[i].id==carID)
        {
            return [cars[i].pricePerDay,cars[i].pricePerKm];
        }
    }
}


console.log("Unscaled price: ",rentalPrice(rentals[2]));


// Step 2

function ScalingRentalPrice(rental)
{
    var date1=new Date(rental.pickupDate);
    var date2=new Date(rental.returnDate);
    var time=(Math.abs(date2-date1)/86400000)+1;
    var prices=fetchCarPrices(rental.carId);
    if(time>=1 && time<5)
    {
        time=prices[0]+(time-1)*(prices[0]*0.9);
    }
    else if(time>4 && time<11)
    {
        time=prices[0]+3*(prices[0]*0.9)+(time-4)*(prices[0]*0.7);
    }
    else if(time>10)
    {
        time=prices[0]+3*(prices[0]*0.9)+6*(prices[0]*0.7)+(time-10)*(prices[0]*0.5);
    }
    var dist=rental.distance*prices[1];
    var price=dist+time;
    return price;
}

console.log("Scaling price: ",ScalingRentalPrice(rentals[2]));

// Step 3

function Commission(rental,rentalPrice)
{
    var totalCommission=0.3*rentalPrice;
    var insurance=0.5*totalCommission;
    var date1=new Date(rental.pickupDate);
    var date2=new Date(rental.returnDate);
    var time=(Math.abs(date2-date1)/86400000)+1;
    var treasury=time;
    var virtuo=totalCommission-insurance-treasury;
    return {'insurance':insurance,'treasury':treasury,'virtuo':virtuo};
}

console.log("Commissions: ",Commission(rentals[2],ScalingRentalPrice(rentals[2])))

// Step 4

function ScalingDeductibleRentalPrice(rental)
{
    var date1=new Date(rental.pickupDate);
    var date2=new Date(rental.returnDate);
    var time=(Math.abs(date2-date1)/86400000)+1;
    var prices=fetchCarPrices(rental.carId);
    var timeCost;
    if(time>=1 && time<5)
    {
        timeCost=prices[0]+(time-1)*(prices[0]*0.9);
    }
    else if(time>4 && time<11)
    {
        timeCost=prices[0]+3*(prices[0]*0.9)+(time-4)*(prices[0]*0.7);
    }
    else if(time>10)
    {
        timeCost=prices[0]+3*(prices[0]*0.9)+6*(prices[0]*0.7)+(time-10)*(prices[0]*0.5);
    }
    var dist=rental.distance*prices[1];
    var deductiblePrice;
    var price;
    if(rental.options.deductibleReduction==true)
    {
        deductiblePrice=4*time;
        price=dist+timeCost+deductiblePrice;
    }
    else
    {
        price=dist+timeCost;
        deductiblePrice=0;
    }
    return {'price':price,'deductiblePrice':deductiblePrice};
}

console.log("Price :",ScalingDeductibleRentalPrice(rentals[2]));

// Step 5

function createJson(who,type,amount)
{
    var obj = new Object();
    obj.who = who;
    obj.type  = type;
    obj.amount = amount;
    return obj;
}

function Transactions(rental)
{
    var payment = [];
    var temp = ScalingDeductibleRentalPrice(rental);
    var price = temp.price;
    var deductiblePrice = temp.deductiblePrice;
    var commissions = Commission(rental,price-deductiblePrice);
    var driverAmount = price;
    var partnerAmount = 0.7*price;
    var insuranceAmount = commissions.insurance;
    var treasuryAmount = commissions.treasury;
    var virtuoAmount= commissions.virtuo+deductiblePrice;
    var driver = createJson('driver','debit',driverAmount);
    var partner = createJson('partner','credit',partnerAmount);
    var insurance = createJson('insurance','credit',insuranceAmount);
    var treasury = createJson('treasury','credit',treasuryAmount);
    var virtuo = createJson('virtuo','credit',virtuoAmount);
    var payment = [driver, partner, insurance, treasury, virtuo];
    var display = new Object();
    display.rentalId = rental.id;
    display.payment = payment;
    return display;
}

console.log(Transactions(rentals[2]));
