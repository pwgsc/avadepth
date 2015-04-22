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
	    avaIFaceJS.mb_func.bathy_ctrl = $('#bathylayer');
	    avaIFaceJS.mb_func.navaid_ctrl = $('#enclayer');
	    avaIFaceJS.mb_func.sound_ctrl = $('#soundlayer');
    },
	  checkLayer: function(){
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
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection,
		      exceptions: 'XML'
        }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.bathy_WMS);
      avaMapJS.mb_func.navaid_WMS = new OpenLayers.Layer.WMS("NavAids",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'NavAids',
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection
        },
	      {
		      minScale: 300000
	      }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.navaid_WMS);
      avaMapJS.mb_func.sound_WMS = new OpenLayers.Layer.WMS("soundings",
        'http://vapw-chintz.pwgsc.gc.ca/spatialfusionserver/services/ows/wms/avadepth',{
          layers:'Soundings',
          transparent:true,
		      version:'1.3.0',
		      projection: avaMapJS.map.projection
        },
	      {
		      minScale: 7500
	      }
      );
      avaMapJS.setMapLayer(avaMapJS.mb_func.sound_WMS);
	    avaMapJS.mb_func.navaid_inrng = false;
	    avaMapJS.mb_func.sound_inrng = false;

	    avaMapJS.map.events.register('moveend', avaMapJS.map, avaMapJS.mb_func.newZoom);
	    avaMapJS.mb_func.newZoom();
    },
	  newZoom: function(){
		  avaMapJS.mb_func.navaid_inrng = avaMapJS.mb_func.navaid_WMS.minScale>avaMapJS.map.getScale();
		  avaMapJS.mb_func.sound_inrng = avaMapJS.mb_func.sound_WMS.minScale>avaMapJS.map.getScale();
		  avaMapJS.mb_func.navaid_WMS.setVisibility(avaMapJS.mb_func.navaid_inrng && parent.avaIFaceJS.mb_func.navaid_ctrl.prop('checked'));
		  avaMapJS.mb_func.navaid_WMS.redraw();
		  avaMapJS.mb_func.sound_WMS.setVisibility(avaMapJS.mb_func.sound_WMS && parent.avaIFaceJS.mb_func.navaid_ctrl.prop('checked'));
		  avaMapJS.mb_func.sound_WMS.redraw();
		  parent.avaIFaceJS.mb_func.navaid_ctrl.prop('disabled',!(avaMapJS.mb_func.navaid_inrng));
		  parent.$('label[htmlfor=enclayer]').css({color:{true:'#000',false:'#aaa'}[avaMapJS.mb_func.navaid_inrng]});
		  parent.avaIFaceJS.mb_func.sound_ctrl.prop('disabled',!(avaMapJS.mb_func.sound_inrng));
		  parent.$('label[htmlfor=soundlayer]').css({color:{true:'#000',false:'#aaa'}[avaMapJS.mb_func.sound_inrng]});
	  },
    changeLayer: function(evt){
      //TODO: Set trigger event to enable/disable the map layer
	    var t = $(evt).target;
	    if (t.id == 'bathylayer')avaMapJS.mb_func.bathy_WMS.setVisibility(t.checked);
	    if (t.id == 'enclayer')avaMapJS.mb_func.navaid_WMS.setVisibility(avaMapJS.mb_func.navaid_inrng && t.checked);
	    if (t.id == 'soundlayer')avaMapJS.mb_func.sound_WMS.setVisibility(avaMapJS.mb_func.sound_inrng && t.checked);
    }
  }
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.mb_func = {init: function () {}};
}
