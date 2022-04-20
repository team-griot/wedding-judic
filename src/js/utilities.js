export class Utilities {    

  /** check if _value or object is null or undefined or empty
   * @param _value _value to check
   * @returns boolean "true" if _value is null or undefined or empty
   */
  isNullOrEmpty = () => {
    if (_value && typeof _value === 'object') {
      return Object.entries(_value).length === 0 && _value.constructor === Object;
    } else {
      return (
        _value === null ||
        _value === '' ||
        _value === undefined ||
        _value.length === 0
      );
    }
  }

  /** convert date from yyyy-mm-dd to dd/mm/yyyy */
  dateYYYYMMDDToDDMMYYYY = (_date) => {
        if (_date) {
            let date = new Date(_date);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
        }
};