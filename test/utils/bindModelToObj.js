var assert = require("assert");
var ctrlHelpers = require("../../app/utils/ctrlHelpers");

describe('Utils - bindModelToObj', function(){
  describe('#bindModelToObj(model, obj)', function(){
    it('should bind model properties with obj properties', function(){

      var model = {
        id: '123',
        name: 'model'
      };

      var obj = {
        name: 'obj'
      };

      ctrlHelpers.bindModelToObj(model, obj);
      assert.equal(model.name, 'obj');
    });

    it('Not modify model properties with undefined properties', function(){

      var model = {
        id: '123',
        name: 'model'
      };

      var obj = {
        name: undefined
      };

      ctrlHelpers.bindModelToObj(model, obj);
      assert.equal(model.name, 'model');
    });
  })
})
