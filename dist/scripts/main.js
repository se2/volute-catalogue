"use strict";jQuery(document).ready(function(o){var t=o(window).width(),e=(o(window).height(),o(".home-slider"),o(".tool--infobox-slider")),s=o("ul.tools"),l=o("li.tool"),i=(o(".tool--infobox"),o(".scroll-down"));e.slick({autoplay:!0,infinite:!0,slidesToShow:1,dots:!1,arrows:!1,speed:1200,autoplaySpeed:4e3,fade:!0,mobileFirst:!0}),s.hover(function(){o(this).addClass("tools__hover")},function(){o(this).removeClass("tools__hover")});l.bind("click",function(){var e=o(this).data("url"),s=o(this).data("id"),l=o("#"+e);t>768&&(o(this).parents().eq(2).find(".tool--infobox").addClass("tool--infobox__active"),o(this).removeClass("tool__not-selected").addClass("tool__selected"),o(this).siblings().removeClass("tool__selected").addClass("tool__not-selected")),t>1024?o("html, body").animate({scrollTop:o("#"+e+" .tool--infobox-slider-wrapper").offset().top-90},"slow"):t>768&&1024==t&&o("html, body").animate({scrollTop:o("#"+e+" .tool--infobox-slider-wrapper").offset().top-120},"slow"),o.getJSON("tools.json",function(o){var t=o[s-1],e="";l.find(".tool--infobox-metadata h1 strong").html(t.name),l.find(".tool--infobox-metadata p.tool--description").html(t.description),e+="<strong>Author:</strong> "+t.author+" <br><strong>Developers:</strong> "+t.developers.join(", ")+" <br><strong>Category:</strong> "+t.category.join(", ")+" <br><strong>Release:</strong> "+t.release+" <br><strong>Version:</strong> "+t.version+" <br>",void 0!==t.related&&t.related.length>0&&(e+='<strong><i class="fa fa-puzzle-piece" aria-hidden="true"></i>:</strong> '+t.related.join(", ")+" <br>"),e+='<strong>Responsive:</strong>&nbsp;<i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-tablet" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-desktop" aria-hidden="true"></i> <br>',l.find(".tool--infobox-metadata p.tool--metadata").html(e)})}),o(".js-tool--infobox-close").bind("click",function(t){var e="#"+o(this).data("row");t.preventDefault(),o(this).parent().removeClass("tool--infobox__active"),o(e).find("ul.tools").find("li.tool__selected").removeClass("tool__selected"),o(e).find("ul.tools").find("li.tool__not-selected").removeClass("tool__not-selected")}),i.bind("click",function(t){t.preventDefault(),o("html, body").animate({scrollTop:o(o(this).attr("href")).offset().top},"slow")})});