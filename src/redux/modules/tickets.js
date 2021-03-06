
const LOAD = 'redux-example/tickets/LOAD';
const LOAD_SUCCESS = 'redux-example/tickets/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/tickets/LOAD_FAIL';
const EDIT_ITEM_NUMBER = 'redux-example/tickets/EDIT_ITEM_NUMBER';

const STEP1 = 'redux-example/tickets/STEP1';
const STEP1_SUCCESS = 'redux-example/tickets/STEP1_SUCCESS';
const STEP1_FAIL = 'redux-example/tickets/STEP1_FAIL';


const GET_ORDER_LOAD = 'redux-example/tickets/GET_ORDER_LOAD';
const GET_ORDER_SUCCESS = 'redux-example/tickets/GET_ORDER_SUCCESS';
const GET_ORDER_FAIL = 'redux-example/tickets/GET_ORDER_FAIL';


const STEP2 = 'redux-example/tickets/STEP2';
const STEP2_SUCCESS = 'redux-example/tickets/STEP2_SUCCESS';
const STEP2_FAIL = 'redux-example/tickets/STEP2_FAIL';


// 會出現的prop最好都預先定義好
const initialState = {
  orderId: null,
  eventId: null,
  loading: false,
  goStep2: false,
  goStep3: false,
  data: []
};


export default function reducer(state = initialState, action = {}) {

  /*
  action是action傳進來的參數
  state是整個對應reducer的store
  */
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true,
        orderId: null,
      };
    case LOAD_SUCCESS:

      return {
        ...state,
        loading: false,
        loaded: true,
        eventId: action.result.eventId,
        data: action.result.data,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        eventId: null,
        data: null,
        error: action.error
      };
    case EDIT_ITEM_NUMBER:

      const data = state.data.map(ticket => {

        if (ticket.id === action.id) {
          return Object.assign({}, ticket, { quantity: +action.number });
        }
        return ticket;
      });

      return {
        ...state,
        data: data
      };

    case STEP1:
      return {
        ...state,
        loading: true,
        loaded: false
      };


    case STEP1_SUCCESS:

      return {
        ...state,
        goStep2: true,
        orderId: action.result.id,
        orderData: action.result,
        loading: false,
        loaded: true
      };

    case STEP1_FAIL:

      return {
        ...state,
        goStep2: false,
        loading: false,
        loaded: false,
        error: action.error
      };


    case GET_ORDER_LOAD:
      return {
        ...state,
        loading: true,
        loaded: false
      };


    case GET_ORDER_SUCCESS:

      return {
        ...state,
        orderId: action.result.id,
        orderData: action.result,
        loading: false,
        loaded: true,
        error: null
      };

    case GET_ORDER_FAIL:

      return {
        ...state,
        goStep2: false,
        loading: false,
        loaded: false,
        error: action.error
      };


    case STEP2:
      return {
        ...state,
        loading: true,
        loaded: false,
        goStep3: false
      };


    case STEP2_SUCCESS:

      // console.log(action.result);
      return {
        ...state,
        goStep2: false,
        goStep3: true,
        loading: false,
        loaded: true
      };

    case STEP2_FAIL:

      return {
        ...state,
        goStep3: false,
        error: action.error
      };

    default:
      return state;
  }
}

export function step1Submit(eventId, tickets) {

  // 至少要送出1筆, 不然會壞掉
  const lineItems = tickets
  .filter(ticket => {
    return +ticket.quantity > 0;
  })
  .map(ticket => {
    return {
      ticketClassId: ticket.id,
      quantity: ticket.quantity
    };
  });

  const options = {
    data: {
      eventId,
      lineItems,
      requestIp: '192.168.1.200',
      isTest: false
    }
  };

  return {
    types: [STEP1, STEP1_SUCCESS, STEP1_FAIL],
    promise: (client) => client.post('/apiTicket/v1/orders', options)
  };
}


export function step2Submit(orderId, profile) {

  const options = {
    data: profile
  };

  return {
    types: [STEP2, STEP2_SUCCESS, STEP2_FAIL],
    promise: (client) => client.post('/apiTicket/v1/checkouts/' + orderId + '/payment', options)
  };
}

export function load() {

  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/loadTickets')
  };
}

export function editItemNumber(id, number) {
  return {
    type: EDIT_ITEM_NUMBER,
    id,
    number
  };
}


export function getOrderById(orderId) {

  return {
    types: [GET_ORDER_LOAD, GET_ORDER_SUCCESS, GET_ORDER_FAIL],
    promise: (client) => client.get('/apiTicket/v1/orders/' + orderId)
  };
}
