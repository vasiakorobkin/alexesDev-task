var getBaseStoreSettings = function(storeProp){
  if(typeof(storeProp) != 'string') throw new Error('No action category! (getBaseStoreSettings)');
  return {
    _data: [],
    returnAll: function(){
      return this._data;
    },
    getAllHandler: function(data){
      this._data = data;
      this.emitChange();
    },
    register: function(){
      var res = {}
      res[storeProp] = {
        getAll: this.getAllHandler
      }
      return res;
    }
  }
}

module.exports = getBaseStoreSettings;
