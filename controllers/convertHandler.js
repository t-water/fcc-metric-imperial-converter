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
    const units = ['gal', 'gallon', 'gallons', 'l', 'liter', 'litre', 'liters', 'litres', 'lbs', 'pound', 'pounds', 'kg', 'kilo', 'kilogram', 'kilos', 'kilograms', 'mi', 'mile', 'miles', 'km', 'kilometer', 'kilometers'];
    let str = ''
    if(/[0-9]/.test(input)){
      let num = input.split(/[a-zA-Z]/)[0];
      str = input.replace(num, '')
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
      'l': ['gal', 'gallon', 'gallons'],
      'gal': ['l', 'liter', 'litre', 'liters', 'litres'],
      'kg': ['lbs', 'pound', 'pounds'],
      'lbs': ['kg', 'kilo', 'kilogram', 'kilos', 'kilograms'],
      'km': ['mi', 'mile', 'miles'],
      'mi': ['km', 'kilometer', 'kilometers']
    };
    let unit = ''
    Object.keys(units).forEach(x => {
      if(units[x].indexOf(initUnit) !== -1){
        unit = x
      }
    })
    return unit
  };

  this.spellOutUnit = function(unit) {
    const units = {
      'gallons': ['gal', 'gallon', 'gallons'],
      'liters': ['l', 'liter', 'liters'],
      'litres': ['litre', 'litres'],
      'pounds': ['lbs', 'pound', 'pounds'],
      'kilograms': ['kg', 'kilo', 'kilos', 'kilogram', 'kilograms'],
      'miles': ['mi', 'mile', 'miles'],
      'kilometers': ['km', 'kilometer', 'kilometers'],    
    };
    let spelledOutUnit = ''
    Object.keys(units).forEach(x => {
      if(units[x].indexOf(unit) > -1){
        spelledOutUnit = x
      }
    })
    return spelledOutUnit
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = this.spellOutUnit(initUnit)
    
    const conversions = {
      'gallons': [galToL, 'multiply'],
      'liters': [galToL, 'divide'],
      'litres': [galToL, 'divide'],
      'pounds': [lbsToKg, 'multiply'],
      'kilograms': [lbsToKg, 'divide'],
      'miles': [miToKm, 'multiply'],
      'kilometers': [miToKm, 'divide'],
    }
    
    if(conversions.hasOwnProperty(unit)){
      if(conversions[unit][1] === 'multiply'){
        return initNum * conversions[unit][0];
      }else if(conversions[unit][1] === 'divide'){
        return initNum / conversions[unit][0];
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
      if(initNum == 1){
        initUnit = this.spellOutUnit(initUnit).replace(/s$/, '')
      }else{
        initUnit = this.spellOutUnit(initUnit)
      }
      if(returnNum == 1){
        returnUnit = this.spellOutUnit(returnUnit).replace(/s$/, '')
      }else{
        returnUnit = this.spellOutUnit(returnUnit)
      }
      
      if(!initNum || !initUnit || !returnNum || !returnUnit){
        return 'Conversion Error'
      }else{
        return `${initNum} ${initUnit} converts to ${returnNum} ${returnUnit}`;
      }
    }
  };
}

module.exports = ConvertHandler;
