import { formatAsUSD } from '../../utils/moneyFormatUtil';

describe('formatAsUSD', () => {
  it('should return a formatted string in USD currency', () => {
    expect(formatAsUSD('50')).toEqual('$50.00');
    expect(formatAsUSD('100.5')).toEqual('$100.50');
    expect(formatAsUSD('1000.5')).toEqual('$1,000.50');
    expect(formatAsUSD('0')).toEqual('$0.00');
    expect(formatAsUSD('')).toEqual('$0.00');
  });

  it('should return "$0.00" for non-numeric values', () => {
    expect(formatAsUSD('abc')).toEqual('$0.00');
    expect(formatAsUSD('1.2.3')).toEqual('$0.00');
    expect(formatAsUSD(null)).toEqual('$0.00');
    expect(formatAsUSD(undefined)).toEqual('$0.00');
  });

  it('should return a formatted string in USD currency for float values', () => {
    expect(formatAsUSD(0)).toEqual('$0.00');
    expect(formatAsUSD(0.0)).toEqual('$0.00');
    expect(formatAsUSD(0.00)).toEqual('$0.00');
    expect(formatAsUSD(10.99)).toEqual('$10.99');
    expect(formatAsUSD(100.0)).toEqual('$100.00');
    expect(formatAsUSD(1000.99)).toEqual('$1,000.99');
  });
});
