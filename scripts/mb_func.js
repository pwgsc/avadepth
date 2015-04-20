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
      parent.$('#bathylayer').on('click',avaMapJS.mb_func.changeLayer);
      avaMapJS.mb_func.bathy_WMS = new OpenLayers.Layer.WMS("BathyLayer",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'Avadepth_surfaces',
          transparent:true
        }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.bathy_WMS);
    },
    changeLayer: function(evt){
      //TODO: Set trigger event to enable/disable the map layer
    }
  }
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.mb_func = {init: function () {}};
}
