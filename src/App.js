import "./styles.css";
import { useState } from "react";

export default function App() {
  const [cost, setCost] = useState("");
  const [myRating, setMyRating] = useState(50);
  const [friendRating, setFriendRating] = useState(70);

  function handleCost(e) {
    setCost(e.target.value);
  }
  function handleMR(e) {
    setMyRating(e.target.value);
  }
  function handleFR(e) {
    setFriendRating(e.target.value);
  }
  function handlereset() {
    setCost("");
    setMyRating("");
    setFriendRating("");
  }
  return (
    <div className="App">
      <Bill OnCost={handleCost} cost={cost} />
      <YourServiceRating mine={myRating} onRating={handleMR} />
      <FriendServiceRating friend={friendRating} onRating={handleFR} />
      <CalcBill cost={cost} mine={myRating} friend={friendRating} />
      <Reset onReset={handlereset} cost={cost} />
    </div>
  );
}

function Bill({ cost, OnCost }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How much was the bill?</p>
      <input
        type="number"
        placeholder="How much was the bill?"
        required
        value={cost}
        onChange={(e) => OnCost(e)}
      />
    </div>
  );
}
function YourServiceRating({ mine, onRating }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How did you like the service?</p>
      <select value={mine} onChange={(e) => onRating(e)}>
        <option value="5"> Dissatisfied (5%) </option>
        <option value="50"> Not bad (50%) </option>
        <option value="70">It was good (70%)</option>
        <option value="90">Absolutely amazing (90%)</option>
      </select>
    </div>
  );
}
function FriendServiceRating({ friend, onRating }) {
  return (
    <div>
      <p style={{ display: "inline" }}>How did your friend like the service?</p>
      <select value={friend} onChange={(e) => onRating(e)}>
        <option value="5"> Dissatisfied (5%) </option>
        <option value="50"> Not bad (50%) </option>
        <option value="70">It was good (70%)</option>
        <option value="90">Absolutely amazing (90%)</option>
      </select>
    </div>
  );
}

function CalcBill({ cost, mine, friend }) {
  if (!cost) return;
  if (!mine) return;
  if (!friend) return;
  function averageRatingBill(mine, friend) {
    const summation = Number(mine) + Number(friend);
    const averagePercentage = summation / 100;
    if (Number.isInteger(averagePercentage)) return averagePercentage;
    if (!Number.isInteger(averagePercentage))
      return averagePercentage.toFixed(2);
  }
  function summation(bill, mine, friend) {
    return Number(bill) + averageRatingBill(mine, friend);
  }
  return (
    <div className="bill-summary">
      {" "}
      Your Bill is ₦{summation(cost, mine, friend)} (₦{cost}+ ₦
      {averageRatingBill(mine, friend)} tip){" "}
    </div>
  );
}
function Reset({ onReset, cost }) {
  if (!cost) return;

  return <button onClick={onReset}>RESET</button>;
}
