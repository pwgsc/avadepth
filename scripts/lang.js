/**
 * Created by wsiddall on 02/04/2015.
 */

lang={code_index:{},codes:{},setLang:function(lg){if(lg.length>2 && lg.indexOf('-')>=0){lg = lg.split('-')[0];}if(!(lg in lang.code_index)){console.log("Language not supported, add index for",lg);lg = 'en-gb';}lang.cur_lang=lang.code_index[lg];},getText:function(key, options){try{var trnslt = lang.codes[key][lang.cur_lang];if(options){$.each(options, function(optionKey, optionValue){var ptrn = new RegExp('{{'+optionKey+'}}', 'g');trnslt = trnslt.replace(ptrn, optionValue);});if(trnslt.match(/{{.*}}/)){$.error("Missing option key for '"+key+"'");}}return trnslt;}catch (Exception){console.log("Error loading label: "+key);}}};