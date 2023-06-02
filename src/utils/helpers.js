export const n_f = (number) => {
  if (!number || isNaN(number)) return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const short_n_f = (number) => {
  if (isNaN(number)) {
    throw new Error("Input isn't number");
  }

  const isNegative = number < 0;
  const absoluteNumber = Math.abs(number);

  const abbreviations = ["", "K", "M", "B", "T", "Q"];
  const base = 1000;

  if (absoluteNumber < base) {
    return isNegative ? `-${absoluteNumber}` : absoluteNumber.toString();
  }

  const exponent = Math.floor(Math.log10(absoluteNumber) / Math.log10(base));
  const abbreviatedNumber = (absoluteNumber / Math.pow(base, exponent)).toFixed(
    2
  );

  return (isNegative ? "-" : "") + abbreviatedNumber + abbreviations[exponent];
};
