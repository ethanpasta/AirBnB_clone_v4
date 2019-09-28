$(document).read(function() {
  let arr = [];
  $('input[type=checkbox]').each(function() {
    if (this.checked) {
      arr.push(this.getAttribute('data-id'));
    } else {
      let index = arr.indexOf(this.getAttribute('data-id'));
      if (index > -1) {
	arr.splice(index, 1);
      }
    }
  });
  $('div.amenities h4').html(arr);
});
