import { combineReducers, createStore } from 'redux';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const AccountActions = {
  deposit: 'account/deposit',
  withdraw: 'account/withdraw',
  requestLoan: 'account/requestLoan',
  payLoan: 'account/payLoan',
};

const CustomerActions = {
  create: 'customer/createCustomer',
  update: 'customer/updateName',
};

function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case AccountActions.deposit:
      return { ...state, balance: state.balance + action.payload };
    case AccountActions.withdraw:
      return { ...state, balance: state.balance - action.payload };
    case AccountActions.requestLoan:
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case AccountActions.payLoan:
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case CustomerActions.create:
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case CustomerActions.update: {
      console.log('Updating customer name, current name ', state.fullName);
      console.log('updating to: ', action.payload);
      console.log('action ', action);

      return {
        ...state,
        fullName: action.payload,
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: AccountActions.deposit, payload: 500 });
// store.dispatch({ type: AccountActions.withdraw, payload: 200 });

// store.dispatch({
//   type: AccountActions.requestLoan,
//   payload: { amount: 1000, purpose: 'Buy a car' },
// });

// console.log(store.getState());

// store.dispatch({ type: AccountActions.payLoan });

// console.log(store.getState());

function deposit(amount) {
  return { type: AccountActions.deposit, payload: amount };
}

function withdraw(amount) {
  return { type: AccountActions.withdraw, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: AccountActions.requestLoan,
    payload: { amount, purpose },
  };
}

function payLoan() {
  return { type: AccountActions.payLoan };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(300));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: CustomerActions.create,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return { type: CustomerActions.update, payload: fullName };
}

store.dispatch(createCustomer('Frank Addelia', '1234569'));

console.log(store.getState());

store.dispatch(updateCustomer('Woooo!'));
console.log(store.getState());
