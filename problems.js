$(document).ready(function () {
    // Load JSON data from a file (or an API)
    $.getJSON('./assets/round1.json', function (data) {
      // Iterate through the JSON data and append rows to the table
      $.each(data, function (index, item) {
        $('#round1Table tbody').append(
          '<tr><td>' + item.problem_no + '</td><td><pre><code>' + $('<div>').text(item.problem).html() + '</code></pre></td><td>' + item.marks + '</td></tr>'
        );
      });
    });
    $.getJSON('./assets/round2.json', function (data) {
      // Iterate through the JSON data and append rows to the table
      $.each(data, function (index, item) {
        $('#round2Table tbody').append(
          '<tr><td>' + item.problem_no + '</td><td><pre><code>' + $('<div>').text(item.problem).html() + '</code></pre></td><td>' + item.marks + '</td></tr>'
        );
      });
    });
    $.getJSON('./assets/round3.json', function (data) {
      // Iterate through the JSON data and append rows to the table
      $.each(data, function (index, item) {
        $('#round3Table tbody').append(
          '<tr><td>' + item.problem_no + '</td><td><pre><code>' + $('<div>').text(item.problem).html() + '</code></pre></td><td>' + item.marks + '</td></tr>'
        );
      });
    });
  });