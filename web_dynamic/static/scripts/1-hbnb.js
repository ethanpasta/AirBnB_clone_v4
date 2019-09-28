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
});
