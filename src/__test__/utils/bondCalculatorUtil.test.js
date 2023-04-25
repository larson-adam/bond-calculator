import * as bondCalcUtil from '../../utils/bondCalculationsUtil';

describe("calculateRemainingPayments", () => {
  it("should return the correct number of remaining payments for a bond", () => {
    const settlementDate = "01/01/2023";
    const maturityDate = "12/31/2028";
    const paymentsPerYear = 2;
    const expectedPayments = 12;

    const actualPayments = bondCalcUtil.calculateRemainingPayments(settlementDate, maturityDate, paymentsPerYear);

    expect(actualPayments).toEqual(expectedPayments);
  });
});

describe("calculateRawCouponsProfit", () => {
  it("should return the correct coupon profit for a bond with annual payments", () => {
    const faceValue = 1000.00;
    const couponRate = 4.8;
    const remainingPayments = 1;
    const paymentsPerYear = 1;

    const actualCouponsProfit = bondCalcUtil.calculateRawCouponsProfit(faceValue, couponRate, paymentsPerYear, remainingPayments);

    const expectedCouponsProfit = 48;
    expect(actualCouponsProfit).toEqual(expectedCouponsProfit);
  });

  it("should return the correct coupon profit for a bond with semi-annual payments", () => {
    const faceValue = 1000.00;
    const couponRate = 4.8;
    const remainingPayments = 8;
    const paymentsPerYear = 2;

    const actualCouponsProfit = bondCalcUtil.calculateRawCouponsProfit(faceValue, couponRate, paymentsPerYear, remainingPayments);

    const expectedCouponsProfit = 192;
    expect(actualCouponsProfit).toEqual(expectedCouponsProfit);
  });

  it("should return the correct coupon profit for a bond with quarterly payments", () => {
    const faceValue = 1000.00;
    const couponRate = 4.8;
    const remainingPayments = 20;
    const paymentsPerYear = 4;

    const actualCouponsProfit = bondCalcUtil.calculateRawCouponsProfit(faceValue, couponRate, paymentsPerYear, remainingPayments);

    const expectedCouponsProfit = 240;
    expect(actualCouponsProfit).toEqual(expectedCouponsProfit);
  });

  it("should return the correct coupon profit for a bond with quarterly payments", () => {
    const faceValue = 1000.00;
    const couponRate = 4.8;
    const remainingPayments = 8;
    const paymentsPerYear = 12;

    const actualCouponsProfit = bondCalcUtil.calculateRawCouponsProfit(faceValue, couponRate, paymentsPerYear, remainingPayments);

    const expectedCouponsProfit = 32;
    expect(actualCouponsProfit).toEqual(expectedCouponsProfit);
  });
});