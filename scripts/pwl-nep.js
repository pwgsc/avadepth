
  $(function() {
    $('#date').change(function() {
      if (moment().diff($('#date').val()) > 0) {
        $("#actual").attr('disabled', false);
      } else {
        $("#actual").attr('disabled', true);
      }
      return $('#static-date').text($('#alt-date').val());
    });
    $('input[name="discharge"]').change(function() {
      switch ($(this).val()) {
        case 'Actual':
          0;
          break;
        case 'Predicted':
          0;
          break;
        case 'Defined':
          $('#static-discharge').text($('#defined_discharge').val());
          break;
        case 'Selected':
          $('#static-discharge').text($('#selected_discharge').val());
      }
      return $('#static-discharge-eval').text($(this).val());
    });
    $('input[name="discharge"]').change(function() {
      return $('#static-discharge-eval').text($(this).val());
    });
    $('#defined_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Defined") {
        return $('#static-discharge').text($('#defined_discharge').val());
      }
    });
    $('#selected_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Selected") {
        return $('#static-discharge').text($('#selected_discharge').val());
      }
    });
    $('input[name="fraser_river"]').change(function() {
      return $('#static-arm').text($(this).val());
    });
    $('input[name="channel"]').change(function() {
      return $('#static-limit').text($(this).next().text());
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    return $('#date').change();
  });