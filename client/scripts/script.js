$(document).on('click', '.navbar-toggle', function(event) {
  $(this).parent().parent().find('.dropdown').addClass('open');
})
$(document).click(function (event) {
    var clickover = $(event.target);
    var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
    if (_opened === true && !clickover.hasClass("navbar-toggle")) {
        $("button.navbar-toggle").click();
    }
});
