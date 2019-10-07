/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.splitInput = function(input){
    let reg = new RegExp(/([0-9]|\s)(?=[a-zA-z])/);
    let index = input.search(reg);
    if(index != -1){
      if(input[index] === ' '){
        return input.split(' ')
      }else{
        let addedSpace = input[index] + ' ';
        addedSpace = input.replace(reg, addedSpace);
        return addedSpace.split(' ')
      }
    }
    return false
  }
  
  this.removeZeros = function(num){
    if(num < 1){
      return num.replace(/0+$/, '')
    }
  }
  
  this.getNum = function(input) {
    
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
