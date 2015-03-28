var request = require('superagent');

var httpOrLocalStorage = function(settings){
  if(typeof(settings) != 'object'
      || typeof(settings.url) != 'string'
      || typeof(settings.callback) != 'function')
        throw new Error('Wrong "settings" argument ("ajaxHttpOrLocalStorage" function)');
  
  if(window.siteDoesAvailable){
    request.get(settings.url, ajaxCallback);
  } else {
    getFromLocalStorage();
  }

  function ajaxCallback(err, res){
    if(err){
      console.log(err);
      getFromLocalStorage();
    } else {
      if(!!window.localStorage) window.localStorage.setItem(settings.url, res.text);
      settings.callback(res.body);
    }
  }

  function getFromLocalStorage(){
    if(!window.localStorage) return;

    var categories;
    var categoriesJSON = window.localStorage.getItem(settings.url);
    try {
      categories = JSON.parse(categoriesJSON);
    } catch (err) {
      console.log(err);
      categories = {};
    }
    settings.callback(categories);
  }
};

exports.httpOrLocalStorage = httpOrLocalStorage;
