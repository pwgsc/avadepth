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

  avaMapJS.mb_func={init: function(){}}
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.mb_func = {init: function () {}};
}
