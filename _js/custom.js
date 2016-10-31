/* jshint -W117 */
/* jshint -W098 */
/* jshint -W070 */

document.addEventListener('turbolinks:load', function () {

  // LISTJS //

  var searchOptions = {
    valueNames: [
      'name',
      'country',
      'language',
      {
        data: ['year'],
      },
    ],
  };

  var lists = document.getElementsByClassName('js-list');
  var colleges = document.getElementsByClassName('js-college');
  var years = document.getElementsByClassName('js-years');

  var data = [];

  for (var i = 0; i < lists.length; ++i) {
    var listId = lists[i].id;
    data[i] = new List(listId, searchOptions);
  }

  var searchInput = document.getElementById('js-search');

  function searchAll() {

    // Get search value.
    var searchValue = searchInput.value;

    // Search all lists.
    for (var i = 0; i < lists.length; ++i) {
      data[i].search(searchValue);
    }

    // Hide all year numbers without blogs.
    for (var j = 0; j < years.length; ++j) {
      if (years[j].hasChildNodes()) {
        years[j].parentNode.style.display = 'block';
      } else {
        years[j].parentNode.style.display = 'none';
      }
    }

    // Hide all college names with all years hidden.
    for (var k = 0; k < colleges.length; ++k) {
      var yearsInCollege = colleges[k].getElementsByClassName('js-list');
      var empty = 0;

      for (var m = 0; m < yearsInCollege.length; ++m) {
        if (yearsInCollege[m].style.display === 'none') {
          empty++;
        }
      }

      if (empty === yearsInCollege.length) {
        colleges[k].style.display = 'none';
      } else {
        colleges[k].style.display = 'block';
      }
    }
  }

  searchInput.addEventListener('keyup', searchAll);
});
