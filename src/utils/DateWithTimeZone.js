const getFormattedDate= () => {
  const now = new Date();

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // undefined : will default to system's locale
  return now.toLocaleDateString(undefined, options);
};

export default getFormattedDate;