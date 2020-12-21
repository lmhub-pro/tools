var selection = window.getSelection();

function copy(e) {
  selection.removeAllRanges();
  var range = new Range();
  range.selectNodeContents(e.target);
  selection.addRange(range);
  document.execCommand("Copy");
}

function showItem(question, answer) {
  const $li = $("<li>");
  $("<h5 class='title'>").text(question).appendTo($li);
  $("<div class='answer' onclick='copy(event)' title='点击答案进行复制'>").html(answer).appendTo($li);
  $li.appendTo($(".list"))
}

function render(list) {
  $(".list").empty();
  if (!list || list.length === 0) {
    $("<li>").text("很抱歉没有相关题目！").appendTo($(".list"))
    return;
  }
  list.forEach(item => {
    showItem(item.question, item.answer)
  })
}

$(function () {

  $("#desc").text("(共 " + questions.length + " 题)")

  $("#searchBtn").click(searchInfo);

  $("#seacher").focus(function () {
    $("#seacher").val("");
  })

  function searchInfo() {
    const question = $("#seacher").val();
    render(questions.filter(val => val.question.indexOf(question) !== -1));
  }

  $(document.body).bind('keyup', function (event) {
    if (event.keyCode == "13") {
      searchInfo();
    }
  });

  $(".tips").click(function () {
    $(".tips").hide();
  })

  searchInfo();
  $("#main").css("height", $(window).height() - 120);
})
