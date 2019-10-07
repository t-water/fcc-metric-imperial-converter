/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    let num = input.split(/\s*[a-zA-Z]+/)[0];
    if (num === ""){
      return 1;
    }else if(/\//.test(num)){
      let fraction = num.split('/')
      return parseFloat(fraction[0]).toFixed(7) / parseFloat(fraction[1]).toFixed(7);
    }else{
      return parseFloat(num).toFixed(7)
    }
  };
  
  this.getUnit = function(input) {
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    if(this.splitInput(input)){
      if(units.indexOf(this.splitInput(input)) !== -1){
        return this.splitInput(input)[1]
      }
      return false
    }
    return false;
  };
  
  this.getReturnUnit = function(initUnit) {
    const units = {
      'gal': 'l',
      'l': 'gal',
      'lbs': 'kg',
      'kg': 'lbs',
      'mi': 'km',
      'km': 'mi'
    };
    if(units.hasOwnProperty(initUnit)){
      return units[initUnit];
    }    
    return false;
  };

  this.spellOutUnit = function(unit) {
    const units = {
      'gal': 'gallons',
      'l': 'liters',
      'lbs': 'pounds',
      'kg': 'kilograms',
      'mi': 'miles',
      'km': 'kilometers'
    };
    if(units.hasOwnProperty(unit)){
      return units[unit];
    }
    return false;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    
    const conversions = {
      'gal': [galToL, 'multiply'],
      'l': [galToL, 'divide'],
      'lbs': [lbsToKg, 'multiply'],
      'kg': [lbsToKg, 'divide'],
      'mi': [miToKm, 'multiply'],
      'km': [miToKm, 'divide']
    }
    
    if(conversions.hasOwnProperty(initUnit)){
      if(conversions[initUnit][1] === 'multiply'){
        return initNum * conversions[initUnit][0];
      }else if(conversions[initUnit][1] === 'divide'){
        return initNum / conversions[initUnit][0];
      }
      return false;
    }
    return false
    
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    function Singularize(unit, number){
      let expandedUnit = this.SpellOutUnit(unit);
      if(number == 1){
        expandedUnit = expandedUnit.replace(/s$/, '')
        return expandedUnit
      }else{
        return expandedUnit
      }
    }
    
    return `${initNum} ${Singularize(initUnit)} converts to ${returnNum} ${Singularize(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
