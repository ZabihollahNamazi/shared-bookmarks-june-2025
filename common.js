export function dateForDisplay(dateObj){
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // add 1 & pad with zero
      const day = String(dateObj.getDate()).padStart(2, '0');

      return `${year}-${month}-${day}`;
}