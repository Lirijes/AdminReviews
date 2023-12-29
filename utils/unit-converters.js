/**
 * Converts centimeters to feets/inches
 * @param {number} cm Centimeters
 *
 * @returns {FeetInch}
 */
export function convertCmToFeetAndInches(cm) {
    const inches = Math.round(cm / 2.54);
  
    return {
      ft: Math.floor(inches / 12),
      in: inches % 12,
    };
  }
  
  /**
   * Converts feets/inches into centimeters
   * @param {FeetInch} ftIn Feets and inches
   * @returns {number}
   */
  export function convertFeetAndInchesToCm(ftIn) {
    const inches = ftIn.ft * 12 + ftIn.in;
  
    return inches * 2.54;
  }
  
  /**
   * Converts centimeters to inches
   * @param {number} cm Centimeters
   * @returns {number}
   */
  export function convertCmToInches(cm) {
    return cm / 2.54;
  }
  
  export function convertKgToPounds(kg) {
    return kg * 2.20462;
  }
  
  export function convertPundsToKG(lb) {
    return lb / 2.20462;
  }
  
  /**
   * Convert kilogram to stones
   *
   * @param {number} kg Weight in kilograms
   */
  export function convertKgToStones(kg) {
    return kg / 6.35029318;
  }
  
  /**
   * Convert kg to st/lb
   * @param {number} kg Weight in kilogram
   *
   * @returns {StonePound}
   */
  export function convertKgToStonesAndPounds(kg) {
    const st = convertKgToStones(kg);
    const lb = (st % 1) * 14;
  
    return {
      st: Math.floor(st),
      lb,
    };
  }
  
  /**
   * Convert stondes and pounds to kilograms
   * @param {number} st - Stones
   * @param {number} lb - Pounds
   */
  export function convertStonesAndPoundsToKg(st, lb) {
    const totalLbs = st * 14 + lb;
    return convertPundsToKG(totalLbs);
  }
  
  /**
   * @typedef {Object} StonePound
   * @property {number} st - Stones
   * @property {number} lb - Pounds
   */
  
  /**
   * @typedef {Object} FeetInch
   * @property {number} ft - Feets
   * @property {number} in - Inches
   */
  