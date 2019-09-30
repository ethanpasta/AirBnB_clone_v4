$(document).ready(function () {
  const arr = [];
  $('input[type=checkbox]').each(function () {
    $(this).change(function () {
      if (this.checked) {
        arr.push(this.getAttribute('data-name'));
      } else {
        const index = arr.indexOf(this.getAttribute('data-name'));
        if (index > -1) {
          arr.splice(index, 1);
        }
      }
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
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}'
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
