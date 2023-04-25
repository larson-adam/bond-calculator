import React, { useState, useEffect } from 'react';
import '../App.css';
import Button from 'react-bootstrap/Button';
import * as bondCalculationsUtil from "../utils/bondCalculationsUtil";
import { formatAsUSD } from "../utils/moneyFormatUtil";
import { formatDate } from '../utils/dateUtil';
import * as constVals from "../constants/constantValues";


function BondCalculator() {
  const TODAY = new Date();

  //const [formattedFaceValue, setFormattedFaceValue] = useState(constVals.ONE_THOUSAND_USD_FORMATTED);
  const [rawFaceValue, setRawFaceValue] = useState(constVals.ONE_THOUSAND_USD_RAW);
  //const [formattedPurchasePrice, setFormattedPurchasePrice] = useState(constVals.ONE_THOUSAND_USD_FORMATTED);
  const [rawPurchasePrice, setRawPurchasePrice] = useState(constVals.ONE_THOUSAND_USD_RAW);
  const [couponRate, setCouponRate] = useState(constVals.RATE_DEFAULT);
  const [paymentsPerYear, setPaymentsPerYear] = useState("2");
  const [settlementDate, setSettlementDate] = useState(dateUtil.formatDate(TODAY));
  const [maturityDate, setMaturityDate] = useState(TODAY);
  const [remainingPayments, setRemainingPayments] = useState(0);
  const [rawCouponProfit, setRawCouponProfit] = useState(constVals.ZERO_USD_RAW);
  //const [formattedCouponProfit, setFormattedCouponProfit] = useState(constVals.ZERO_USD_FORMATTED);
  const [rawTotalProfit, setRawTotalProfit] = useState(constVals.ZERO_USD_RAW);
  //const [formattedTotalProfit, setFormattedTotalProfit] = useState(constVals.ZERO_USD_FORMATTED);
  const [roi, setROI] = useState((0.00).toFixed(3));
  const [daysUntilMaturity, setDaysUntilMaturity] = useState(0)

  useEffect(() => {
    setFormattedFaceValue(formatAsUSD(rawFaceValue))
  }, [rawFaceValue]);

  useEffect(() => {
    setFormattedPurchasePrice(formatAsUSD(rawPurchasePrice))
  }, [rawPurchasePrice]);
  
  useEffect(() => {
    setFormattedCouponProfit(formatAsUSD(rawCouponProfit))
  }, [rawCouponProfit]);

  useEffect(() => {
    setFormattedTotalProfit(formatAsUSD(rawTotalProfit))
  }, [rawTotalProfit]);

  const handlePurchasePriceChange = (e, setRawFn) => {
    //Move cursor
    e.target.setSelectionRange(e.target.value.length, e.target.value.length);
    let stripedString = e.target.value.replace(/\D/g, '');
    if (stripedString.length === 2) {
      stripedString = '0' + stripedString;
    } else {
      if (stripedString.at(0) === "0") {
        stripedString = stripedString.slice(1);
      }
    }
    const decimalInsertIndex = stripedString.length - 2;
    let adjustedString = stripedString.slice(0, decimalInsertIndex) + '.' + stripedString.slice(decimalInsertIndex);
    setRawFn(adjustedString)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bond Calculator</h1>
      </header>
      <main className="App-main">
        <div className="form-group">
          <label>Face Value:</label>
          <div style={{ position: 'relative' }}>
            <input type="text" className="form-control bond-input" name="faceValue" style={{ textAlign: 'right' }} value={formattedFaceValue} onChange={(e) => handlePurchasePriceChange(e, setRawFaceValue)}
              onBlur={() => setFormattedFaceValue(formatAsUSD(rawFaceValue))} />
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', left: 0, top: 0 }}>$</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Purchase Price:</label>
          <div style={{ position: 'relative' }}>
            <input type="text" className="form-control bond-input" name="purchasePrice" style={{ textAlign: 'right' }} value={formattedPurchasePrice} onChange={(e) => handlePurchasePriceChange(e, setRawPurchasePrice)} 
              onBlur={() => setFormattedPurchasePrice(formatAsUSD(rawPurchasePrice))} />
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', left: 0, top: 0 }}>$</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Coupon Rate:</label>
          <div style={{ position: 'relative' }}>
            <input type="text" className="form-control bond-input" name="couponRate" value={couponRate} onChange={(e) => setCouponRate(e.target.value)} />
            <div className="input-group-append">
              <span className="input-group-text" style={{ position: 'absolute', right: 0, top: 0 }}>%</span>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Payments Per Year:</label>
          <input type="text" className="form-control bond-input" name="paymentsPerYear" value={paymentsPerYear} onChange={(e) => setPaymentsPerYear(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Settlement Date:</label>
          <input type="text" className="form-control bond-input" name="settlementDate" value={settlementDate} onChange={(e) => setSettlementDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Maturity Date:</label>
          <input type="text" className="form-control bond-input" name="maturityDate" value={maturityDate} onChange={(e) => setMaturityDate(e.target.value)} />
        </div>
        <Button variant="success" onClick={calculateTotal}>Calculate</Button>
        <br/>
        <p>Remaining Payments: {remainingPayments}</p>
        <p>Days Until Maturity: {daysUntilMaturity}</p>
        <p>Coupons Profit: {formattedCouponProfit}</p>
        <p>Total Profit: {formattedTotalProfit}</p>
        <p>Return on Investment: {roi}%</p>
      </main>
    </div>
  );
}

export default BondCalculator;