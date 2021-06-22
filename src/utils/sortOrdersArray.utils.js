const STATUSES = {
  "OPEN": 1,
  "IN_PROGRESS": 2,
  "DELIVERING": 3,
  "COMPLETED": 4,
  "CANCELED": 5,
};
 
export const sortOrdersArray = (array) => {
 const sortedArr = array.slice().sort((a, b) => STATUSES[a.status] - STATUSES[b.status]);
 return sortedArr;
}

