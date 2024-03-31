export const getALLFilters = () => {
  return [
    {
      name: "Headphone type",
      remove: "Remove filter",
      types: ["In-ear headphone", "On-ear headphone", "Over-ear headphone"],
    },
    {
      name: "Company",
      remove: "Remove filter",
      types: ["JBL", "Sony", "Boat", "Zebronics", "Marshall", "Ptron"],
    },
    {
      name: "Colour",
      remove: "Remove filter",
      types: ["Blue", "Black", "White", "Brown"],
    },
    {
      name: "Price",
      remove: "Remove filter",
      types: [
        "₹0 - ₹1,000",
        "₹1,000 - ₹2,000",
        "₹2,000 - ₹3,000",
        "₹3,000 - ₹4,000",
        "₹4,000 - ₹10,000",
        "₹10,000 - ₹20,000",
      ],
    },
  ];
};
export const getSortByFilter = () => {
  return {
    name: "Sort by : Featured",
    remove: "Remove filter",
    types: [
      "Price : Lowest",
      "Price : Highest",
      "Name : (A-Z)",
      "Name : (Z-A)",
    ],
  };
};
