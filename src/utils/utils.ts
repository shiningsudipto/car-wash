export const formatDateToDDMMYYYY = (isoDateString: string): string => {
  // Create a Date object from the ISO date string
  const date = new Date(isoDateString);

  // Extract day, month, and year from the Date object
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getUTCFullYear();

  // Return the date in DD-MM-YYYY format
  return `${day}-${month}-${year}`;
};

export const MenuLinks = [
  {
    path: "/",
    name: "Home",
  },
  {
    path: "/services",
    name: "Services",
  },
  {
    path: "/reviews",
    name: "Reviews",
  },
  {
    path: "/sign-in",
    name: "Login",
  },
];
