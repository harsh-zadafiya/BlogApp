export const valueMaker = (value, options) => {
  let defaultV = [];
  if (!value) return defaultV;
  value.forEach((obj) => {
    let selected = options.find((data) => data.value === obj);
    if (selected) defaultV.push(selected);
  });

  return defaultV;
};
