const initialErrorCheckouts = {
  "ErrorCode": "NOT_FOUND",
  "Message": null,
  "Details": null
}


const initialCheckouts = {
  "id": "O15Z785DE4679",
  "eventId": 23,
  "paymentId": 0,
  "contact": {
    "name": "林真心",
    "phone": "886911234567",
    "email": "aa@bb.com"
  },
  "lineItems": [
    {
      "id": 3,
      "ticketClassId": 8,
      "type": "normal",
      "name": "VIP Ticket 1",
      "unitPrice": 5,
      "quantity": 1,
      "extendedPrice": 5,
      "tickets": [],
      "creatorId": "00000000-0000-0000-0000-000000000000",
      "modifierId": "00000000-0000-0000-0000-000000000000",
      "createdAt": "2015-09-10T05:48:08+00:00",
      "updatedAt": "2015-09-10T05:48:08+00:00"
    }
  ],
  "amount": {
    "currency": "TWD",
    "total": 5
  },
  "state": "completed",
  "step": "thank_you",
  "expiration": "2015-09-10T05:58:08+00:00",
  "requestIp": "192.168.1.200",
  "isAnonymous": true,
  "isTest": false,
  "token": "15BCAAAA2F79",
  "creatorId": "00000000-0000-0000-0000-000000000000",
  "modifierId": "00000000-0000-0000-0000-000000000000",
  "createdAt": "2015-09-10T05:48:08+00:00",
  "updatedAt": "2015-09-10T05:48:13+00:00"
}



/*
  vi/orders/aaa/bbb
  req, param1(aaa), param2(bbb), ...
*/
export default function checkouts(req, params) {

  console.log('#####:', params);
  console.log('orderId:', params[0]);
  console.log('payment:', params[1]);

  return new Promise((resolve, reject) => {
    // make async call to database
    resolve(initialCheckouts);

  });
}


