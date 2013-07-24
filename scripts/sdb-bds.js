(function() {
  var adjustHeight;

  adjustHeight = function(map) {
    if (map === 'north-arm-map' || map === 'south-arm-map') {
      $('#map').css("min-height", "380px");
      return $('.tabs-panel').height("400px");
    } else if (map === 'pitt-river-map') {
      $('#map').css("min-height", "400px");
      return $('.tabs-panel').height("420px");
    } else {
      $('#map').height("520px");
      return $('.tabs-panel').height("540px");
    }
  };

  $(function() {
    $('#surveys').dataTable({
      bPaginate: false,
      bInfo: false,
      bFilter: false
    });
    $('#waterway').change(function() {
      $('#heading-waterway').text($(this).find('option:selected').text());
      $('#tile').text('');
      $('.map-group').hide();
      $('.map-group>div').hide();
      $('#' + $(this).val() + '-map').show();
      $('#' + $(this).val() + '-map').find('.map0').show();
      return adjustHeight($(this).val() + '-map');
    });
    $('.back').click(function() {
      $(this).closest('.map-group').find('.map0').show();
      $(this).closest('div').hide();
      $('#tile').text('');
      return adjustHeight($(this).closest('.map-group').attr('id'));
    });
    $('.map0 area').click(function() {
      $(this).closest('div').hide();
      $(this).closest('.map-group').find('.map' + $(this).attr('title')).show();
      $('#tile').text('- Tile 00' + $(this).attr('title'));
      $('#map').css("min-height", "600px");
      return $('.tabs-panel').height("620px");
    });
    $('#waterway').change();
    return $('#heading-waterway').parent().css('margin-top', '0');
  });

}).call(this);
