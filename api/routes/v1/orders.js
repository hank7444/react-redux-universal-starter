const postOrderData = {
  "id": "O15C417DD8B79",
  "eventId": 23,
  "paymentId": 0,
  "contact": {
    "name": "",
    "phone": "",
    "email": ""
  },
  "lineItems": [
    {
      "id": 27,
      "ticketClassId": 8,
      "type": "normal",
      "name": "VIP Ticket",
      "unitPrice": 10,
      "quantity": 2,
      "extendedPrice": 0,
      "tickets": [],
      "creatorId": "03b9f8e4-7cbf-4ec8-8253-43142f165cfd",
      "modifierId": "03b9f8e4-7cbf-4ec8-8253-43142f165cfd",
      "createdAt": "2015-09-10T02:30:41+00:00",
      "updatedAt": "2015-09-10T02:30:41+00:00"
    }, {
      "id": 28,
      "ticketClassId": 8,
      "type": "normal",
      "name": "VIP Ticket 2",
      "unitPrice": 30,
      "quantity": 5,
      "extendedPrice": 0,
      "tickets": [],
      "creatorId": "03b9f8e4-7cbf-4ec8-8253-43142f165cfd",
      "modifierId": "03b9f8e4-7cbf-4ec8-8253-43142f165cfd",
      "createdAt": "2015-09-10T02:30:41+00:00",
      "updatedAt": "2015-09-10T02:30:41+00:00"
    }
  ],
  "amount": {
    "currency": "TWD",
    "total": 170
  },
  "state": "created",
  "step": 1,
  "expiration": "2015-09-10T02:40:41+00:00",
  "requestIp": "192.168.1.200",
  "isTest": false,
  "token": "156E21021B79",
  "createdAt": "2015-09-10T02:30:41+00:00"
};

const getOrderData = {
  'O15C417DD8B79': {
    "id": "O15C417DD8B79",
    "eventId": 23,
    "paymentId": 0,
    "contact": {
      "name": "",
      "phone": "",
      "email": ""
    },
    "lineItems": [
      {
        "id": 24,
        "ticketClassId": 8,
        "type": "normal",
        "name": "VIP Ticket 1",
        "unitPrice": 5,
        "quantity": 1,
        "extendedPrice": 5,
        "tickets": [],
        "creatorId": "00000000-0000-0000-0000-000000000000",
        "modifierId": "00000000-0000-0000-0000-000000000000",
        "createdAt": "2015-09-15T02:54:15+00:00",
        "updatedAt": "2015-09-15T02:54:15+00:00"
      }
    ],
    "amount": {
      "currency": "TWD",
      "total": 5
    },
    "state": "created",
    "step": "registration",
    "expiration": "2015-09-15T03:04:15+00:00",
    "requestIp": "192.168.1.200",
    "isAnonymous": true,
    "isTest": false,
    "token": "15F64D18D779",
    "creatorId": "00000000-0000-0000-0000-000000000000",
    "modifierId": "00000000-0000-0000-0000-000000000000",
    "createdAt": "2015-09-15T02:54:15+00:00",
    "updatedAt": "2015-09-15T02:54:15+00:00"
  }
};



/*
  vi/orders/aaa/bbb
  req, param1(aaa), param2(bbb), ...
*/
export default function orders(req) {


  console.log('#####Get Request from Jmeter!!');

  const method = req.method;


  let data = null;

  if (method === 'POST') {
    data = postOrderData;
  } else {

    const orderId = req.url.substr(11);
    data = getOrderData[orderId]
  }


  console.log('orders Data:', data);


  return new Promise((resolve, reject) => {
    // make async call to database

    if (data) {
      resolve(data);
    } else {
      reject('The order Id is illegal!');
    }

  });
}








