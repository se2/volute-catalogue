"use strict";jQuery(document).ready(function(o){var t=o(window).width(),e=(o(window).height(),o(".home-slider"),o(".tool--infobox-slider")),i=o(".tool--infobox-slider__mobile"),l=o("ul.tools"),s=o("li.tool"),a=(o(".tool--infobox"),o(".scroll-down"));e.slick({autoplay:!0,infinite:!0,slidesToShow:1,dots:!1,arrows:!1,speed:1200,autoplaySpeed:4e3,fade:!0,mobileFirst:!0}),l.hover(function(){o(this).addClass("tools__hover")},function(){o(this).removeClass("tools__hover")});s.bind("click",function(){var e=o(this).data("url"),l=o(this).data("id"),s=0,a=o("#row-"+e);t>768?(o("li.tool").removeClass("tool__selected").removeClass("tool__not-selected"),o(".tool--infobox").removeClass("tool--infobox__active"),o(this).parents().eq(2).find(".tool--infobox").addClass("tool--infobox__active"),o(this).removeClass("tool__not-selected").addClass("tool__selected"),o(this).siblings().removeClass("tool__selected").addClass("tool__not-selected")):(o(".tool--infobox__mobile").addClass("tool--infobox__mobile__active"),i.not(".slick-initialized").slick({autoplay:!0,infinite:!0,slidesToShow:1,dots:!1,arrows:!1,speed:1200,autoplaySpeed:4e3,fade:!0,mobileFirst:!0}));for(var n=0;n<parseInt(e);n++)void 0!==o("#row-"+n+" .tool--infobox-slider-wrapper").height()&&(s+=o("#row-"+n+" .tool--infobox-slider-wrapper").height()-1);t>1024?o("html, body").animate({scrollTop:o("#row-"+e+" .tool--infobox-slider-wrapper").offset().top-90-60-s},1200):t>768&&1024==t&&o("html, body").animate({scrollTop:o("#row-"+e+" .tool--infobox-slider-wrapper").offset().top-120-60-s},1200),o.getJSON("tools.json",function(e){var i=e[l-1],s="<strong>Author:</strong> "+i.author+" <br><strong>Developers:</strong> "+i.developers.join(", ")+" <br><strong>Category:</strong> "+i.category.join(", ")+" <br><strong>Release:</strong> "+i.release+" <br><strong>Version:</strong> "+i.version+" <br>";if(void 0!==i.related&&i.related.length>0&&(s+='<strong><i class="fa fa-puzzle-piece" aria-hidden="true"></i>:</strong> '+i.related.join(", ")+" <br>"),s+='<i class="fa fa-mobile" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-tablet" aria-hidden="true"></i>&nbsp;&nbsp;<i class="fa fa-desktop" aria-hidden="true"></i> <br>',t>768)a.find(".tool--infobox-metadata h1 strong").html(i.name),a.find(".tool--infobox-metadata p.tool--description").html(i.description),a.find(".tool--infobox-metadata p.tool--metadata").html(s);else{var n=o(".tool--infobox__mobile");n.find(".tool--infobox-metadata h1 strong").html(i.name),n.find(".tool--infobox-metadata p.tool--description").html(i.description),n.find(".tool--infobox-metadata p.tool--metadata").html(s)}})}),o(".js-tool--infobox-close").bind("click",function(t){var e="#"+o(this).data("row");t.preventDefault(),o(this).parent().removeClass("tool--infobox__active"),o(e).find("ul.tools").find("li.tool__selected").removeClass("tool__selected"),o(e).find("ul.tools").find("li.tool__not-selected").removeClass("tool__not-selected"),o(".tool--infobox__mobile").removeClass("tool--infobox__mobile__active")}),a.bind("click",function(t){t.preventDefault(),o("html, body").animate({scrollTop:o(o(this).attr("href")).offset().top},"slow")})});