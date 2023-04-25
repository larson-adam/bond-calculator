import { formatDate } from '../../utils/dateUtil';

describe('formatDate', () => {
  it('should return the current date in MM/DD/YYYY format', () => {
    const date = new Date();
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    const expectedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
    expect(formatDate(date)).toEqual(expectedDate);
  });

  it('should return the date in MM/DD/YYYY format', () => {
    const month = 10;
    const day = 10;
    const year = 2023;
    const date = new Date(year, month, day);

    const expectedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
    expect(formatDate(date)).toEqual(expectedDate);
  });

  it('should return the date in MM/DD/YYYY format and prefix zero for single digit month', () => {
    const month = 1;
    const day = 10;
    const year = 2023;
    const date = new Date(year, month, day);

    const expectedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
    expect(formatDate(date)).toEqual(expectedDate);
  });

  it('should return the date in MM/DD/YYYY format and prefix zero for single digit day', () => {
    const month = 10;
    const day = 1;
    const year = 2023;
    const date = new Date(year, month, day);

    const expectedDate = `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year.toString()}`;
    expect(formatDate(date)).toEqual(expectedDate);
  });
});
