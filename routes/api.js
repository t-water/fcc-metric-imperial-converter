'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      let feedback = {"initNum": initNum, "initUnit": initUnit, "returnNum": returnNum, "returnUnit": returnUnit, "string": toString};
      
      if(!initUnit && !initNum){
        res.statusCode = 404;
        res.send("Invalid Number and Unit")
      }else if(!initUnit){
        res.statusCode = 404;
        res.send("Invalid Unit")
      }else if(!initNum){
        res.statusCode = 404;
        res.send("Invalid Number")
      }else if(toString == "Conversion Error"){
        res.statusCode = 404;
        res.send('Conversion Error')
      }else{
        res.json(feedback)
      }
    });
    
};
