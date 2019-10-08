/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.removeExtraDecimals = function(num){
    if(num.match(/\./g) != null){
        if(num.match(/\./g).length > 1){
          return false;
        }
        return parseFloat(num)
      }
      return parseFloat(num)
  }
  
  this.getNum = function(input) {
    let num = input.split(/\s*[a-zA-Z]+/)[0];
    
    if(input === ''){
      return false;
    }
    if (num === ""){
      return 1;
    }else if(/\//.test(num)){
      let fraction = num.split('/')
      if(fraction.length > 2){
        return false
      }
      let numerator = fraction[0];
      let denominator = fraction[1];
      if(this.removeExtraDecimals(numerator) && this.removeExtraDecimals(denominator)){
        let result = parseFloat(fraction[0]) / parseFloat(fraction[1]);
        if(!isNaN(result)){
          return result
        }
      }
      return false;
    }else{
      if(!isNaN(num)){
        return this.removeExtraDecimals(num)
      }
      return false;
    }
    return false
  };
  
  this.getUnit = function(input){
    const units = ['gal', 'l', 'lbs', 'kg', 'mi', 'km'];
    let str = ''
    if(/[0-9]/.test(input)){
      let num = input.split(/[a-zA-Z]/)[0];
      str = input.split(num)[1].toLowerCase();
    }else{
      str = input.trim().toLowerCase();
    }
    if(units.indexOf(str) !== -1){
        return str;
    }
    return false;
  }
  
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
    if(!initUnit){
      return 'Incorrect Unit'
    }else{
      if(initNum !== false){
        initNum = +initNum.toFixed(5);
      }
      if(returnNum !== false){
        returnNum = +returnNum.toFixed(5);
      }      
      
      return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    }
  };
  
}

module.exports = ConvertHandler;
