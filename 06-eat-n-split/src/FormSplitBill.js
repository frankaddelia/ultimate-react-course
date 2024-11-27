import { useState } from "react";
import Button from "./Button";

const FormSplitBill = (props) => {
  const { selectedFriend, onCalculateBill } = props;

  const [billValue, setBillValue] = useState(0);
  const [yourExpenseValue, setYourExpenseValue] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState('user');

  const handleBillValueChange = (e) => {
    setBillValue(Number(e.target.value));
  }

  const handleYourExpenseChange = (e) => {
    setYourExpenseValue(Number(e.target.value));
  }

  const handleWhoIsPayingChange = (e) => {
    setWhoIsPaying(e.target.value);
  }

  const handleFriendExpenseChange = (e) => {
    e.preventDefault();

    onCalculateBill(selectedFriend.id, billValue, yourExpenseValue, whoIsPaying);
  };

  return <form className="form-split-bill">
    <h2>Split a bill with { selectedFriend.name }</h2>

    <label for="bill-value">💰 Bill Value</label>
    <input id="bill-value" type="text" onChange={handleBillValueChange} />
    
    <label for="bill-value">🧑 Your expense</label>
    <input id="bill-value" type="text" onChange={handleYourExpenseChange} />
    
    <label for="bill-value">🤼 { selectedFriend.name }'s expense</label>
    <input id="bill-value" type="text" value={Math.abs(selectedFriend.balance)} disabled />

    <label>🤑 Who is paying the bill</label>
    <select onChange={handleWhoIsPayingChange}>
      <option value='user'>You</option>
      <option value='friend'>{selectedFriend.name}</option>
    </select>

    <Button className="button" onClick={(e) => handleFriendExpenseChange(e)}>Split bill</Button>
  </form>
}

export default FormSplitBill;
