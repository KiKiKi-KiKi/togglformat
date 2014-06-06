jQuery.noConflict();
!function(w, d, $) {
$(function() {
  var area = '#time-entry-list',
      day  = '.time-entries-day',
      header = '.timer-entries-group-header';

  (function() {
    var $modal = $('<div id="chaika-toggle-format-modal"></div>'),
        $textarea = $('<textarea></textarea>'),
        val = '';
    $modal.append($textarea).appendTo('body');
    $(area).find(day).each(function(i, elm) {
      var $e = $(elm),
          $header = $e.find(header),
          date = $header.find('.checkbox-container div.button').data('date'),
          total = $header.find('.date-container .super').text();
      val += "---------------------------\n" + moment(date, "YYYYMMDD").format("MM/DD") + ' : ' + total + "\n";
    });
    $textarea.val(val).focus();
  })();
});
}(window, document, jQuery);
