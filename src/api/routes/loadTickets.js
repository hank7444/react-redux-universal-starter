const initialTickets = {
  eventId: 23,
  data: [{
    id: 8,
    name: 'VIP Ticket 1',
    unitPrice: 5
  }, {
    id: 9,
    name: 'VIP Ticket 2',
    unitPrice: 10
  }]
};



export default function loadTickets(req) {

  return new Promise((resolve, reject) => {
    // make async call to database

    //console.log('aaa:', aaa);
    
    resolve(initialTickets);
    /*
    setTimeout(() => {
      if (Math.floor(Math.random() * 3) === 0) {
        reject('Widget load fails 33% of the time. You were unlucky.');
      } else {
        resolve(getWidgets(req));
      }
    }, 1000); // simulate async load
    */
  });
}


