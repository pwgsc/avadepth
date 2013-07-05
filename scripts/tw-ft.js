// Generated by CoffeeScript 1.6.3
(function() {
  $(function() {
    $('#date').change(function() {
      if (moment().diff($('#date').val()) > 0) {
        $("#actual").attr('disabled', false);
      } else {
        $("#actual").attr('disabled', true);
      }
      return $('#static-date').text($('#alt-date').val());
    });
    $('#compliance').change(function() {
      $('#cmp_box').val(0);
      if ($('#compliance').is(':checked')) {
        return $('input[name="cmp_box"]').attr('disabled', false);
      } else {
        $('input[name="cmp_box"]').attr('disabled', true);
        return $('input[name=cmp_box]').change(function() {
          return $('#cmp_box').val();
        });
      }
    });
    $('input[name=discharge]').change(function() {
      var flowrate;
      flowrate = (function() {
        switch ($(this).val()) {
          case 'Actual':
            return $('#actual_discharge').text();
          case 'Predicted':
            return $('#predicted_discharge').text();
          case 'Defined':
            return $('#defined_discharge').val();
          case 'Selected':
            return $('#selected_discharge').val();
        }
      }).call(this);
      $('#flowRate').val(flowrate);
      $('#static-discharge').text(flowrate);
      return $('#static-discharge-eval').text($(this).val());
    });
    $('input[name=discharge]').change(function() {
      var flowtype;
      flowtype = (function() {
        switch ($(this).val()) {
          case 'Actual':
            return 0;
          case 'Predicted':
            return 1;
          case 'Defined':
            return 2;
          case 'Selected':
            return 3;
        }
      }).call(this);
      return $('#flowType').val(flowtype);
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
    $('input[name="channel"]').change(function() {
      return $('#static-channel').text($(this).next().text());
    });
    $('input[name="sounding"]').change(function() {
      return $('#static-sounding').text($(this).next().text());
    });
    $('select#width').change(function() {
      return $('#static-width').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    $.getJSON("api/depths?date=" + ($('#date').val()), function(data) {
      var flow, _i, _len, _ref;
      $('#selected_discharge option').remove();
      _ref = data.Flowrates;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        flow = _ref[_i];
        $('#selected_discharge').append("<option value=" + flow + ">" + flow + "</option>");
      }
      $('#predicted_discharge').text(data.Predicted);
      $('#actual_discharge').text(data.Actual);
      $('#static-discharge').text(data);
      $.getJSON("api/transit?date=" + ($('#date').val()) + "&lane=" + ($('input[name=channel]:checked').val()) + "&window=" + ($('#window').val()) + "&cmp=" + ($('#cmp_box').val()) + "&flowType=" + ($('#flowType').val()) + "&periodType=" + ($('#period').val()) + "&chainage=" + ($('#chainage').val()) + "&flowRate=" + ($('#flowRate').val()) + "&width=" + ($('#width').val()) + "&sounding=" + ($('input[name=sounding]:checked').val()), function(data2) {
        var item, _j, _len1, _ref1, _results;
        $('#num_days').text(data2.statistics.numberOfDays);
        $('#min_depth').text(data2.statistics.minimumDepth);
        $('#max_depth').text(data2.statistics.maximumDepth);
        $('#avg_depth').text(data2.statistics.totalWindow);
        $('#transit-window tbody tr').remove();
        _ref1 = data2.items;
        _results = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          item = _ref1[_j];
          _results.push($('#transit-window tbody').append("<tr><td>" + item.startTime + "</td><td>" + item.windowStart + "</td><td>" + item.endTime + "</td><td>" + item.windowEnd + "</td><td>" + item.depth + "</td></tr>"));
        }
        return _results;
      });
      return $('#transit-window').dataTable();
    });
    return $('#date, input[name=discharge], #defined_discharge, #selected_discharge, #chainage, input[name="sounding"], input[name="channel"], #width, #period, #window, #compliance, #cmp_box').change(function() {
      return $.getJSON("api/depths?date=" + ($('#date').val()), function(data) {
        var flow, _i, _len, _ref;
        $('#selected_discharge option').remove();
        _ref = data.Flowrates;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          flow = _ref[_i];
          $('#selected_discharge').append("<option value=" + flow + ">" + flow + "</option>");
        }
        $('#predicted_discharge').text(data.Predicted);
        $('#actual_discharge').text(data.Actual);
        $('#static-discharge').text(data);
        $('#transit-window tbody tr').remove();
        return $.getJSON("api/transit?date=" + ($('#date').val()) + "&lane=" + ($('input[name=channel]:checked').val()) + "&window=" + ($('#window').val()) + "&cmp=" + ($('#cmp_box').val()) + "&flowType=" + ($('#flowType').val()) + "&periodType=" + ($('#period').val()) + "&chainage=" + ($('#chainage').val()) + "&flowRate=" + ($('#flowRate').val()) + "&width=" + ($('#width').val()) + "&sounding=" + ($('input[name=sounding]:checked').val()), function(data2) {
          var item, _j, _len1, _ref1, _results;
          $('#num_days').text(data2.statistics.numberOfDays);
          $('#min_depth').text(data2.statistics.minimumDepth);
          $('#max_depth').text(data2.statistics.maximumDepth);
          $('#avg_depth').text(data2.statistics.totalWindow);
          _ref1 = data2.items;
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            item = _ref1[_j];
            _results.push($('#transit-window tbody').append("<tr><td>" + item.startTime + "</td><td>" + item.windowStart + "</td><td>" + item.endTime + "</td><td>" + item.windowEnd + "</td><td>" + item.depth + "</td></tr>"));
          }
          return _results;
        });
      });
    });
  });

}).call(this);
