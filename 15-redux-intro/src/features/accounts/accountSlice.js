import { createSlice } from '@reduxjs/toolkit';

import { AccountActions } from '../../action-types/AccountActions';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export function deposit(amount, currency) {
  if (currency === 'USD')
    return { type: AccountActions.deposit, payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: AccountActions.convertingCurrency });

    // API call
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD * amount;

    // return (dispatch) action
    dispatch({ type: AccountActions.deposit, payload: converted });
  };
}

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;
export default accountSlice.reducer;

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case AccountActions.deposit:
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case AccountActions.withdraw:
//       return { ...state, balance: state.balance - action.payload };
//     case AccountActions.requestLoan:
//       if (state.loan > 0) return state;
//       // LATER
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case AccountActions.payLoan:
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     case AccountActions.convertingCurrency:
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === 'USD')
//     return { type: AccountActions.deposit, payload: amount };

//   return async function (dispatch, getState) {
//     dispatch({ type: AccountActions.convertingCurrency });

//     // API call
//     const res = await fetch(
//       `https://api.frankfurter.dev/v1/latest?base=${currency}&symbols=USD`
//     );

//     const data = await res.json();
//     const converted = data.rates.USD * amount;

//     // return (dispatch) action
//     dispatch({ type: AccountActions.deposit, payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: AccountActions.withdraw, payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return {
//     type: AccountActions.requestLoan,
//     payload: { amount, purpose },
//   };
// }

// export function payLoan() {
//   return { type: AccountActions.payLoan };
// }
