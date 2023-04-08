import React, { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';

function BondCalculator() {
  const RAW_PRICE_DEFAULT = 0.00;

  const [total, setTotal] = useState(0);
  const [formattedPurchasePrice, setFormattedPurchasePrice] = useState("$0.00");
  const [rawPurchasePrice, setRawPurchasePrice] = useState(RAW_PRICE_DEFAULT);
  const [couponRate, setCouponRate] = useState("4.8");
  const [paymentsPerYear, setPaymentsPerYear] = useState("2");
  const [maturityDate, setMaturityDate] = useState("11/26/1994");
  const [ytm, setYTM] = useState("4.8");

  const handlePurchasePriceChange = (e) => {
    //Move cursor
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    let stripedString = e.target.value.replace(/\D/g, '');
    console.log(stripedString.length)
    if(stripedString.length === 2) {
      stripedString = '0' + stripedString;
    } else {
      if(stripedString.at(0) === "0") {
        stripedString = stripedString.slice(1);
      }
    }
    const decimalInsertIndex = stripedString.length - 2;
    let adjustedString = stripedString.slice(0, decimalInsertIndex) + '.' + stripedString.slice(decimalInsertIndex);
    setRawPurchasePrice(adjustedString)
    setFormattedPurchasePrice(formatAsUSD(adjustedString))
  };
  
  //Helper function
  function formatAsUSD(str) {
    const priceAsNum = parseFloat(str);
    if (isNaN(priceAsNum)) {
      return '0.00';
    }
    return priceAsNum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  
  
  function calculateTotal() {
    const totalValue = rawPurchasePrice + parseFloat(couponRate) + parseFloat(paymentsPerYear) + parseFloat(maturityDate) + parseFloat(ytm);
    console.log("Purchase Price: " + rawPurchasePrice)
    console.log("Coupon Rate: " + couponRate)
    console.log("Payments Per Year: " + paymentsPerYear)
    console.log("Maturity Date: " + maturityDate);
    console.log("YTM: " + ytm)
    setTotal(totalValue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bond Calculator</h1>
      </header>
      <main className="App-main">
        <div className="form-group">
          <label>Purchase Price:</label>
          <div style={{ position: 'relative' }}>
          <input type="text" className="form-control bond-input" name="purchasePrice" style={{textAlign: 'right'}} value={formattedPurchasePrice} onChange={handlePurchasePriceChange} onBlur={() => setFormattedPurchasePrice(formatAsUSD(rawPurchasePrice))}/>
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', left: 0, top: 0}}>$</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Coupon Rate:</label>
          <div style={{ position: 'relative' }}>
            <input type="text" className="form-control bond-input" name="couponRate" value={couponRate} onChange={(e) => setCouponRate(e.target.value)}/>
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', right: 0, top: 0}}>%</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Payments Per Year:</label>
          <input type="text" className="form-control bond-input" name="paymentsPerYear" value={paymentsPerYear} onChange={(e) => setPaymentsPerYear(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>Maturity Date:</label>
          <input type="text" className="form-control bond-input" name="maturityDate" value={maturityDate} onChange={(e) => setMaturityDate(e.target.value)}/>
        </div>
        <div className="form-group">
          <label>YTM:</label>
          <div style={{ position: 'relative' }}>
          <input type="text" className="form-control bond-input" name="ytm" value={ytm} onChange={(e) => setYTM(e.target.value)}/>
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', right: 0, top: 0 }}>%</span>
            </div>
          </div>
        </div>
        <Button variant="success" onClick={calculateTotal}>Calculate</Button>
        <p>Total Profit: {total}</p>
      </main>
    </div>
  );
}

export default BondCalculator;