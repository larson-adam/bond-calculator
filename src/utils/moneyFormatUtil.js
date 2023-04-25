export const formatAsUSD = (input) => {
  let priceAsNum  = 0.00;
  if(input !== null && input !== undefined) {
    let inValString = input;
    if (typeof input !== 'string') {
      inValString = input.toString();
    }
    priceAsNum = parseFloat(inValString);
    if (isNaN(priceAsNum)) {
      priceAsNum = 0.00;
    } else {
      let dotCount = 0;
      inValString.split('').forEach((char) => {
        if (char === '.') {
          dotCount++;
        }
      });
      if(dotCount > 1) {
        priceAsNum = 0.00;
      }
    }
  }
  const asLocaleString = priceAsNum.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  return asLocaleString;
};