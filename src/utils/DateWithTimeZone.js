const getFormattedDate= (dateString = "") => {
  let date;
  if (dateString) {
    date = new Date(dateString);
  } else {
    date = new Date();
  }

  const options = {
    weekday: "long",
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  // undefined : will default to system's locale
  return date.toLocaleDateString(undefined, options);
};

export default getFormattedDate;