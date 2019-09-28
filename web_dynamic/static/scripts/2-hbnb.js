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
});
