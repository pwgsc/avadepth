/**
 * Created by wsiddall on 02/04/2015.
 */
lang={
  code_index:{},
  codes:{},
  default_language:'en',
  addCodes:function(a){
    lang.codes=$.extend({},lang.codes,a)
  },
  setLang:function(l){
    if(!(l==undefined)){
      if(l.length>2&&l.indexOf('-')>=0)l=l.split('-')[0]
    }else{
      l=(navigator.language||navigator.userLanguage||navigator.systemLanguage).split("-")[0]
    }
    if(!(l in lang.code_index)){
      console.log("Language not supported, add index for",l);
      l=lang.default_language
    }
    lang.cur_lang=lang.code_index[l];
    $.each(lang.codes,function(a,b){
      if(a.substr(0,1)=='!'){
        var c=$(a.substr(1));
        if(!(c.is('button')||c.is('input'))){
          c.html(lang.getText(a))
        }else{
          c.val(lang.getText(a))
        }
      }
    })
  },
  getText:function(k,o){
    try{
      var t=lang.codes[k][lang.cur_lang];
      var e=$.extend({},lang.codes,o);
      if(e){
        $.each(e,function(a,b){
          var c=new RegExp('{{'+a+'}}','g');
          var d=(typeof b=='string' ?b:b[lang.cur_lang]);
          t=t.replace(c,d)
      })}
      if(t.match(/{{.*}}/))$.error("Missing option key for '"+k+"'");
      return t
    }catch(e){
      console.log("Error loading label: "+k)
    }
  }
};