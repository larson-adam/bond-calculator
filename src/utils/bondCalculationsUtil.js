import * as dateUtil from "./dateUtil";
import * as constVals from "../constants/constantValues"

export const calculateRemainingPayments = (settlementDate, maturityDate, paymentsPerYear) => {
  const endDate = new Date(maturityDate);
  const startDate = new Date(settlementDate);
  const couponFrequencyInMonths = dateUtil.MONTHS_IN_YEAR / paymentsPerYear;
  let paymentDates = [endDate];

  let adjustedDate = dateUtil.adjustDate(endDate, couponFrequencyInMonths, endDate.getDate());
  while(startDate < adjustedDate) {
    paymentDates.push(adjustedDate);
    adjustedDate = dateUtil.adjustDate(adjustedDate, couponFrequencyInMonths, endDate.getDate());
  }

  return paymentDates.length;
}

export const calculateRawCouponsProfit = (faceValue, couponRate, paymentsPerYear, remainingPayments) => {
  return faceValue * ((couponRate / paymentsPerYear) / 100) * remainingPayments;
}

export const calculateRawTotalProfit = (faceValue, purchasePrice, couponProfit) => {
  return faceValue - purchasePrice + couponProfit;
}

function calculateROI(totalProfit, daysUntilMaturity, purchasePrice) {
  const leapYearCounts = countLeapYearDays(settlementDate, maturityDate);
  const daysFromLeapYears = leapYearCounts.leapYearCount * constVals.DAY_IN_LEAP_YEAR;
  let daysFromNormalYears = leapYearCounts.nonLeapYearCount * constVals.DAY_IN_NORMAL_YEAR;
  let totalYears = leapYearCounts.leapYearCount + leapYearCounts.nonLeapYearCount;
  if(totalYears === 0) {
    totalYears++;
    daysFromNormalYears = constVals.DAY_IN_NORMAL_YEAR;
  }
  const dayAveragePerYearDuringInvestment = (daysFromNormalYears + daysFromLeapYears) / totalYears;
  console.log(dayAveragePerYearDuringInvestment)
  const calculatedROI = ((totalProfit * (dayAveragePerYearDuringInvestment / daysUntilMaturity)) / purchasePrice) * 100;
  return calculatedROI.toFixed(3);
}

export const calculateDaysUntilMaturity = (maturityDate, settlementDate, ) => {
  const endDate = new Date(maturityDate);
  const sDate = new Date(settlementDate);
  const timeDiff = endDate.getTime() - sDate.getTime();
  return Math.ceil(timeDiff / (constVals.DAY_IN_MILLISENDS));
}

export const countLeapYearDays = (sDate, mDate) => {
  const startDate = new Date(sDate);
  const endDate = new Date(mDate);
  let nonLeapYearCount = 0;
  let leapYearCount = 0;
  for (let year = startDate.getFullYear(); year <= endDate.getFullYear(); year++) {
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      const currentLeapYearDate = new Date(year, 1, 29);
      if (currentLeapYearDate >= startDate && currentLeapYearDate <= endDate) {
        leapYearCount++;
      }
    } else {
      const currentFeb28 = new Date(year, 1, 28);
      if (currentFeb28 >= startDate && currentFeb28 <= endDate) {
        nonLeapYearCount++;
      }
    }
  }
  return { nonLeapYearCount, leapYearCount};
}


export const calculateTotal = () => {
  const calculatedRemainingPayments = bondCalculationsUtil.calculateRemainingPayments();
  const calculatedDaysUntilMaturity = calculateDaysUntilMaturity();
  const calculatedRawCouponProfit = calculateRawCouponsProfit(rawFaceValue, couponRate, calculatedRemainingPayments);
  const calculatedRawTotalProfit = calculateRawTotalProfit(rawFaceValue, rawPurchasePrice, calculatedRawCouponProfit);
  const calculatedROI = calculateROI(calculatedRawTotalProfit, calculatedDaysUntilMaturity, rawPurchasePrice);
  setRemainingPayments(calculatedRemainingPayments);
  setDaysUntilMaturity(calculatedDaysUntilMaturity);
  setRawCouponProfit(calculatedRawCouponProfit);
  setRawTotalProfit(calculatedRawTotalProfit);
  setROI(calculatedROI);
}
