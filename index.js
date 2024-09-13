$(document).ready(function () {
  // Fetch info.JSON data
  $.getJSON("assets/info.json", function (data) {
    // $("#details").empty();
    $.each(data.round_details, function (index, round) {
      var roundHTML = `
        <div class="round">
          <div>
          <h5 class="num">Round ${round.round_number}</h5>
          <h4 class="name">${round.round_name}</h4>
          </div>
          <div>
          <p class="desc">${round.description}</p>
          <p class="difficulty">Difficulty: ${round.difficulty_level}</p>
          <p class="time">Time Limit: ${round.time_limit}</p>
          </div>
          </div>
      `;
      $("#details").append(roundHTML);
    });
    const facultyCoordinators = data.coordinator_details.faculty_coordinators;

    // Loop through each name and append it inside a <p> tag within .faculty div
    facultyCoordinators.forEach(function(name) {
        $('.faculty').append('<p>' + name + '</p>');
    });

    const studentCoordinators = data.coordinator_details.student_coordinators;

    // Loop through each name and append it inside a <p> tag within .student div
    studentCoordinators.forEach(function(name) {
        $('.student').append('<p>' + name + '</p>');
    });
  });

  $(window).on("scroll", function () {
    var scrollTop = $(window).scrollTop();
    var blurValue = Math.min(scrollTop / 10, 20);
    $("#bg").css("filter", "blur(" + blurValue + "px)");
    var imagePosition = +scrollTop * 0.3;
    var opacity = Math.max(1 - scrollTop / 500, 0.25);
    $("#home .logo").css({
      transform: "translateY(" + imagePosition + "px)",
      opacity: opacity,
    });
  });

  
        // Initialize Lottie animation but do not autoplay or loop
        var animationFist = lottie.loadAnimation({
          container: document.getElementById('first-container'),
          renderer: 'svg',
          loop: false,
          autoplay: false, // Disable autoplay initially
          path: './assets/animations/first.json'
        });
      var animationSec = lottie.loadAnimation({
          container: document.getElementById('sec-container'),
          renderer: 'svg',
          loop: false,
          autoplay: false, // Disable autoplay initially
          path: './assets/animations/sec.json'
        });
      var animationPapers = lottie.loadAnimation({
          container: document.getElementById('papers-container'),
          renderer: 'svg',
          loop: 2,
          autoplay: false, // Disable autoplay initially
          path: './assets/animations/papers.json'
        });
    
        // Wait for 2 seconds before scrolling
        setTimeout(function() {
          // Scroll to the Lottie container using jQuery
          $('html, body').animate({
            scrollTop: $('#winners').offset().top
          }, 1000); // Duration of the scroll (1 second)
    
          // After scrolling is done, play the animation once
          setTimeout(function() {
              animationFist.play(); // Play the animation
              animationPapers.play(); // Play the animation
          }, 1000); // Wait for scrolling to finish (1 second)
          setTimeout(function() {
              animationSec.play(); // Play the animation
          }, 1500); // Wait for scrolling to finish (1 second)
          
        }, 200); // 2 seconds delay before scrolling



  $('footer').click(function () {
    location.reload(); // This will refresh the page
  });
});
