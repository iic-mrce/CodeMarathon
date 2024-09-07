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
});
