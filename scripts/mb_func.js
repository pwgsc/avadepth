/**
 * Created by wsiddall on 26/08/2014.
 */

  // Fraser River Hydrograph Object
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  var curDate = new Date();
  avaIFaceJS.mb_func= {
    init: function(){
      avaIFaceJS.mb_func.update();
    },

    update: function() {
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/

  avaMapJS.mb_func={
    init: function(){
        //TODO: Get WMS URL and layer name
      parent.$('#bathylayer, #enclayer, #soundlayer').on('click',avaMapJS.mb_func.changeLayer);
      avaMapJS.mb_func.bathy_WMS = new OpenLayers.Layer.WMS("BathyLayer",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'Avadepth_surfaces',
          //layers:'Mundo',
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection,
		      exceptions: 'XML'
        }
      );
	    avaMapJS.mb_func.bathy_WMS.maxExtent = avaMapJS.map.maxExtent;
      avaMapJS.setMapLayer(avaMapJS.mb_func.bathy_WMS);
      avaMapJS.mb_func.navaid_WMS = new OpenLayers.Layer.WMS("NavAids",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'NavAids',
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection
        }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.navaid_WMS);
      avaMapJS.mb_func.sound_WMS = new OpenLayers.Layer.WMS("soundings",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'Soundings',
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection
        }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.sound_WMS);
    },
    changeLayer: function(evt){
      //TODO: Set trigger event to enable/disable the map layer
	    var t = $(evt).target;
	    if (t.id == 'bathylayer')avaMapJS.mb_func.bathy_WMS.display(t.checked);
	    if (t.id == 'enclayer')avaMapJS.mb_func.navaid_WMS.display(t.checked);
	    if (t.id == 'soundlayer')avaMapJS.mb_func.sound_WMS.display(t.checked);
    }
  }
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.mb_func = {init: function () {}};
}
