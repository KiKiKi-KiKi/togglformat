jQuery.noConflict();
!function(w, d, $) {
$(function() {
  var $main = $('#time-entry-list');
  if(!$main.length) return;
  var modalName = 'chaikaToggleFormatModal',
      $modal = $('<div style="position:fixed;top: 0;left:0;width:100%;height:100%;z-index:1000;">' +
        '<div style="position:absolute;background:rgba(0,0,0,.5);width:100%;height:100%;"></div>' +
        '<div style="position:relative;display:table;width:100%;height:100%;">' +
          '<div class="' + modalName + '" style="display:table-cell;padding:0 25px;vertical-align: middle;"><a href="#" class="modalCloseBtn" style="display:inline-block;position:absolute;right:50px;color:#FFF;font-weight:bold;background:#E41A1A;margin-top:10px;padding:5px 10px;">\u00d7 Close</a></div>' +
        '</div>' +
      '</div>'),
      $textarea = $('<textarea style="padding:20px;min-height:70%;"></textarea>'),
      val = '';

  $modal.on('click', '.modalCloseBtn', function(){
    $modal.remove();
    return false;
  }).appendTo('body').find('.'+modalName).append($textarea);

  $('#time-entry-list').find('.time-entries-day').each(function(i, elm) {
    var $e = $(elm),
        $header = $e.find('.timer-entries-group-header'),
        $list = $e.find('.time-entries-list'),
        date = $header.find('.checkbox-container div.button').data('date'),
        total = $header.find('.date-container .super').text(),
        arg = [];

    val += "---------------------------\n" + moment(date, "YYYYMMDD").format("MM/DD") + ' : ' + total + "\n";
    $list.find('.entry').each(function(j, entry) {
      var $li = $(entry),
          times = $li.find('.entry-time').text(),
          description = $li.find('.js-description span').text(),
          projectName = $li.find('.js-project span.project-project').text(),
          duration = $li.find('.js-duration .entry-duration').text(),
          entryVal = '  ', l;

      times = times.split('–');
      l = times.length;
      if(l>0) {
        for(var n=0; n<l; n+=1) {
          var time = times[n].trim();
          times[n] = moment(time, "h:mm a").format("HH:mm");
        }
        entryVal += times.join(' – ') + '  ';
      }
      entryVal += description + ' (' + duration + ')';
      if(projectName) {
        entryVal += ' - ' + projectName;
      }
      arg[arg.length] = entryVal;
    });
    val += arg.reverse().join("\n") + "\n";
  });

  val += "---------------------------";
  $textarea.val(val).focus();
});
}(window, document, jQuery);
