$(document).ready(function () {
  const bigDict = {};
  const amenVal = [];
  const amenKey = [];
  const stateVal = [];
  const stateKey = [];
  const cityVal = [];
  const cityKey = [];
  $('div.amenities > ul > li > input[type=checkbox]').each(function () {
    $(this).change(function () {
      const name = this.getAttribute('data-name');
      const id = this.getAttribute('data-id');
      if (this.checked) {
        amenVal.push(name);
        amenKey.push(id);
      } else if (amenVal.indexOf(name) > -1) {
        amenVal.splice(amenVal.indexOf(name), 1);
        amenKey.splice(amenKey.indexOf(id), 1);
      }
      bigDict.amenities = amenKey;
      $('div.amenities h4').html(amenVal.join(', '));
    });
  });
  $('div.locations > ul.popover > li > input[type=checkbox]').each(function () {
    $(this).change(function () {
      const name = this.getAttribute('data-name');
      const id = this.getAttribute('data-id');
      console.log('state: ' + name, id);
      if (this.checked) {
        stateVal.push(name);
        stateKey.push(id);
      } else if (stateVal.indexOf(name) > -1) {
        stateVal.splice(stateVal.indexOf(name), 1);
        stateKey.splice(stateKey.indexOf(id), 1);
      }
      bigDict.states = stateKey;
      $('div.locations h4').html(cityVal.concat(stateVal).join(', '));
    });
  });
  $('div.locations > ul.popover > li > ul > li > input[type=checkbox]').each(function () {
    $(this).change(function () {
      const name = this.getAttribute('data-name');
      const id = this.getAttribute('data-id');
      if (this.checked) {
        cityVal.push(name);
        cityKey.push(id);
      } else if (cityVal.indexOf(name) > -1) {
        cityVal.splice(cityVal.indexOf(name), 1);
        cityKey.splice(cityKey.indexOf(id), 1);
      }
      bigDict.cities = cityKey;
      $('div.locations h4').html(stateVal.concat(cityVal).join(', '));
    });
  });
  $.get('http://localhost:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });
  $('button').click(function () {
    console.log(bigDict);
    $.ajax({
      type: 'POST',
      url: 'http://localhost:5001/api/v1/places_search/',
      contentType: 'application/json',
      data: JSON.stringify(bigDict)
    }).done(function (data) {
      $('section.places').empty();
      $('section.places').append('<h1>Places</h1>');
      $.each(data, function (index, p) {
        console.log(p.id);
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
