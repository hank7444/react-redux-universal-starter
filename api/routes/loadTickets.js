const initialTickets = {
  eventId: 23,
  data: [{
    id: 8,
    name: '熱舞搖滾區',
    unitPrice: 5
  }, {
    id: 9,
    name: '一般區',
    unitPrice: 10
  }]
};

export default function loadTickets() {

  return new Promise((resolve, reject) => {

    if (!initialTickets) {
      reject('tickets load fails.');
    }

    resolve(initialTickets);
  });
}


