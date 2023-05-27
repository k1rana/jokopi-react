export const n_f = (number) => {
  if (!number || isNaN(number)) return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
