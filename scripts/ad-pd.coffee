$(->
  points = [
    [0, 10.6]
    [2, 11.1]
    [4, 11.85]
    [6, 12.2]
    [8, 11.3]
    [10, 10.0]
    [12, 9.4]
    [14, 9.4]
    [16, 10.5]
    [18, 11.75]
    [20, 12.1]
    [22, 11.6]
  ]

  d1 = 
    color: "red"
    lines: {lineWidth: 3}
    data: points

  leadingZero = (num, axis) ->
    s = "0" + num
    s.substr(s.length-2)

  $.plot("#placeholder", [ d1 ], 
    xaxes: [color: 'black', tickColor: '#aaa', axisLabel: 'Pacific Standard Time (hrs)', tickSize: 2, tickFormatter: leadingZero],
    yaxes: [{ color: 'black', tickColor: '#aaa', position: 'left', axisLabel: 'Available Depth (m)' }]
  )

  $(".yaxislabel").css("color","black")

  $('input[name=discharge]').change(->
    flowrate = switch $(this).val()
      when 'actual' then 0
      when 'predicted' then $('#predicted_discharge').text()
      when 'defined' then $('#defined_discharge').val()
      when 'selected' then $('#selected_discharge').val()

    $('#flowRate').val(flowrate)
  )

  $('#date').change(->
    $.getJSON("/api/Flow/Get?date=#{$('#date').val()}", (data) ->
      $('#predicted_discharge').text(data)
      $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&flowType=0&width=#{$('#width').val()}&sounding=#{$('#sounding').val()}", 
        (data) ->
          $('#depths tbody tr').remove()
          $.each(data.items[0].items, ->
            $('#depths').append("<tr><td>#{this.period}</td><td>#{this.chainage}</td><td>#{this.depth}</td><td>#{this.location}</td>")
          )
          $('.zebra-striped tr:even').addClass('stripe')
      )
    )

    if (moment().diff($('#date').val()) > 0)
      $("#actual").attr('disabled', false)
    else
      $("#actual").attr('disabled', true)
  )
  $('#date').change()
)