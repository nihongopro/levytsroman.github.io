function clearFilters(){
  $(".closing-icon").remove();
  $(".active_tag").removeClass('active_tag');
  $('.card').show();
}

function toggleTags(button, tag){
  if(button.attr('class').indexOf('active_tag') > -1){
    button.removeClass("active_tag");
    button.html(tag);
  } else {
    button.html(tag + '<i class="material-icons left closing-icon">close</i>');
    button.addClass("active_tag");
  }
}

function addActiveTags(buttons){
  var active_tags = [];
  for(var j=0; j < buttons.length; j++){
    current_button = $(buttons[j]);
    if(current_button.attr('class').indexOf('active_tag') > -1){
      active_tags.push(current_button.attr('val'));
    }
  }
  return active_tags;
}

function showProjects(projects, active_tags){
  projects.each(function(i){
    var project = $(projects[i]);
    project.hide();

    $.each(active_tags, function(k){
      var active_tag = active_tags[k],
      projectContainsTag = project.attr('tags').indexOf(active_tag) > -1;

      if(projectContainsTag){
        project.show();
      }
    })
  })

  var activeTagsAreEmpty = active_tags.length === 0;

  if(activeTagsAreEmpty){
    projects.show();
  }
}

function hideCloseIcons(element){
  element.children().remove('i');
}

$(document).ready(function(){
  $(".button-collapse").sideNav({
    menuWidth: 200,
    edge: 'left',
    closeOnClick: true,
    draggable: true
  });

  var colors = {
        'about': 'rgb(142,85,114)',
        'projects': '#F46036',
        'algorithms': '#2E294E'
      },
      urlString = window.location.href,
      color = "";

  $.each(colors, function(key,val){
    if(urlString.indexOf(key) > -1){
      color = val;
      pagename = key;
    }
  });

  $('body').css('background-color', color);
  $('.card-action a').css('color', color);
  $('nav a').attr('style', 'color: ' + color + '');
  $("a:contains('" + pagename + "')").parent().css('background-color', color);
  $("a:contains('" + pagename + "')").css('color', "white");

  $('.tag').click(function(event){
    event.preventDefault();

    hideCloseIcons($(this));

    var button = $(this),
        tag = $(this).attr('val'),
        projects = $('.card'),
        buttons = $('.btn'),
        active_tags = [],
        needToClearFilters = tag === "clear-filters";

    if(needToClearFilters){
      clearFilters();
    } else{
      toggleTags(button, tag);
      active_tags = addActiveTags(buttons);
      showProjects(projects, active_tags);
    }
  })

  $("#filter").click(function(event){
    event.preventDefault();
    var text = $('#filter').text(),
        options = {
          "filter": "hide filters",
          "hide filters": "filter"
        };

    $("#filter").text(options[text]);
    $("#tags").toggle(400);
  })
});
