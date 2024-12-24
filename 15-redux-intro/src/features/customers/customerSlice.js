import { createSlice } from '@reduxjs/toolkit';

import { CustomerActions } from '../../action-types/CustomerActions';

const initialState = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export const { createCustomer, updateName } = customerSlice.actions;
export default customerSlice.reducer;

// export default function customerReducer(state = initialStateCustomer, action) {
//   switch (action.type) {
//     case CustomerActions.create:
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalID: action.payload.nationalID,
//         createdAt: action.payload.createdAt,
//       };
//     case CustomerActions.update: {
//       console.log('Updating customer name, current name ', state.fullName);
//       console.log('updating to: ', action.payload);
//       console.log('action ', action);

//       return {
//         ...state,
//         fullName: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// }

// export function createCustomer(fullName, nationalID) {
//   return {
//     type: CustomerActions.create,
//     payload: { fullName, nationalID, createdAt: new Date().toISOString() },
//   };
// }

// export function updateCustomer(fullName) {
//   return { type: CustomerActions.update, payload: fullName };
// }
