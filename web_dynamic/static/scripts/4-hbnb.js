$(document).ready(function () {
  const dict = {};
  $('input[type=checkbox]').each(function () {
    $(this).change(function () {
      if (this.checked) {
        dict[this.getAttribute('data-id')] = this.getAttribute('data-name');
      } else {
	delete dict[this.getAttribute('data-id')];
      }
      let arr = $.map(dict, function(value, key) { return value });
      $('div.amenities h4').html(arr.join(', '));
    });
  });
  $.get('http://localhost:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $('button').click(function() {
    var myObject = new Object();
    myObject.amenities = $.map(dict, function(value, key) { return key });
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(myObject)
    }).done(function (data) {
      $.each(data, function (index, p) {
	const str = '<article><div class=\'title\'><h2>' + p.name +
	  '</h2><div class=\'price_by_night\'>' + p.price_by_night +
	  '</div></div><div class=\'information\'><div class=\'max_guest\'>' +
	  '<i class=\'fa fa-users fa-3x\' aria-hidden=\'true\'></i><br />' +
	  p.max_guest + ' Guests</div><div class=\'number_rooms\'>' +
	  '<i class=\'fa fa-bed fa-3x\' aria-hidden=\'true\'></i>' +
	  '<br />' + p.number_rooms + ' Bedrooms</div>' +
	  '<div class=\'number_bathrooms\'><i class=\'fa fa-bath fa-3x\' aria-hidden=\'true\'></i><br />' +
	  p.number_bathrooms + ' Bathroom</div></div><div class=\'description\'>' +
	  p.description + '</div></article>';
	$(str).insertAfter('section.places h1');
      });
    });
  });
});
