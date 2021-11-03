jQuery(document).foundation();

(function($){
  $.fn.requiredforpost = function(){

  	/* ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	GALLERY
	ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo */
  	$(".postgalleryslider").owlCarousel({
		singleItem: true
	});


  	/* ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	Video Play
	ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo */
	$( ".cover" ).each(function() {
		var $cover = $(this);
		var parent = $(this).parent();
		var thumb = $cover.find('.vidthumb');
		var hiddenvideo = $cover.find('.hiddenvid');
		var playbutton = $cover.find('.letsplay');
		var loader = $cover.find('.loader');
		var embeded = $cover.find('.embedly-embed');
		//GET THE GIVEN URL
		var vidurl = $cover.find('a.videotarget');

		$(playbutton).click(function(event){
				event.preventDefault();
				$($cover).addClass('videoactive');
				$(thumb).hide();
				$(hiddenvideo).show();
				vidurl.oembed(null, 
				{
					embedMethod: "replace", 
					defaultOEmbedProvider: "oohembed", 	// "oohembed", "embed.ly", "none"
					vimeo: { autoplay: true, maxWidth: 750, maxHeight: 450},
					youtube: { autoplay: true, maxWidth: 750, maxHeight: 450},
					afterEmbed: function(oembedData) { 
						$(loader).addClass('fadeOut animated').hide();
						$(parent).find('.foundation').css("margin-top","30px");
						$(parent).find('.post-author a').css("color","#353535");
					}
				});
				//player.api("play");
				//ADD ID to Iframe
				//var iframeID = $(cover + '.hiddenvid iframe');
				//$(iframeID).attr('id', 'videopost');
		});
		
	});
	
	/* ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	Share EFFECT
	ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo */
	$('div.post').each(function(){
		var ini = $(this);
		var sharer = ini.find('.el_share');
		var sharelist = ini.find('.sharelist');
		var shareitems = sharelist.find('li');
		var shareitemsOut = sharelist.find('li:last-child');


		$(sharer).funcToggle('click', function(ev) {
			ev.preventDefault();
		   	$(sharelist).slideDown(200, function(){
		   		//Bring it up
		   		$(shareitems).eachStep(100, function(i, el, duration){
				    $(el).addClass('animated fadeInUp');
				});
		   });
		   	return false;
		}, function(ev) {
			ev.preventDefault();
			//Bring it Down
			
			$(sharelist).slideUp(200, function(){
				$(shareitems).removeAttr('class');
			});
		  	return false;
		});
	});
	$("a.gallzoom").prettyPhoto({
		deeplinking: false,
		social_tools:'',
		theme: 'light_square'
	});
	
	/* ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo
	POST LIKE 
	ooooooooooooooooooooooooooooooooooooooooooooooooooooooooo */
	jQuery(".post-like a").click(function(){
	
		heart = jQuery(this);
		post_id = heart.data("post_id");
		
		jQuery.ajax({
			type: "post",
			url: ajax_var.url,
			data: "action=post-like&nonce="+ajax_var.nonce+"&post_like=&post_id="+post_id,
			success: function(count){
				if( count.indexOf( "already" ) !== -1 )
				{
					var lecount = count.replace("already","");
					if (lecount == 0 )
					{
						var lecount = "0 Like";
					} else if (lecount >= 1){
						var lecount = lecount + " Like";
					}
					heart.children(".like").removeClass("pastliked").addClass("disliked").html("<i class='fa fa-heart'></i>");
					heart.children(".unliker").text("");
					heart.children(".count").removeClass("liked").addClass("disliked").text(lecount);
				}
				else
				{
					if (count <= 1 ){
						var lelike = ' Like';
					} else if(count >= 1 ){
						var lelike = ' Likes';
					}
					heart.children(".like").addClass("pastliked").removeClass("disliked").html("<i class='fa fa-heart'></i>");
					heart.children(".unliker").html("<i class='fa fa-times-circle'></i>");
					heart.children(".count").addClass("liked").removeClass("disliked").text(count + lelike);
				}
			}
		});
		
		return false;
	})

  };
})(jQuery);

jQuery(window).load(function(){
	jQuery("[data-sticky_column]").stick_in_parent({
		parent: "[data-sticky_parent]"
	});
});

jQuery(document).ready(function($) {
	$(document).requiredforpost();
	$(".related_slider").owlCarousel({
		items: 3,
		pagination: false,
		navigationText: ['<i class="fa fa-long-arrow-left"></i>','<i class="fa fa-long-arrow-right"></i>'],
		navigation: true,
		itemsScaleUp: true
	});
	
	$('.tab-container').easytabs({ updateHash: false });
	
	// ------------------------------
	//Search Button Effect
	$('.el_srctrigger').funcToggle('click', function(src) {
		src.preventDefault();
	   	//$('.el_searchform').addClass('animated fadeInDown').removeClass('fadeOutUp').css('visibility','visible');
	   	$('.el_searchform').show(300);
	   	$('.el_searchform input[type="text"]').focus();
	   	$('.le_logo, .le_profile, .le_social').css('opacity','0');
	   	$('.el_srctrigger > i.fa').toggleClass('fa-search fa-times');
	   	return false;
	}, function(src) {
		src.preventDefault();
		//Bring it Down
		//$('.el_searchform').toggleClass('fadeInDown fadeOutUp').css('visibility','hidden');
		$('.el_searchform').hide(300);
	  	$('.le_logo, .le_profile, .le_social').css('opacity','1');
	  	$('.el_srctrigger > i.fa').toggleClass('fa-times fa-search ');
	  	return false;
	});
	
	$(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('.el_totop').removeClass("eltophide");
        } else {
            $('.el_totop').addClass("eltophide");
        }
    });
	$('.el_totop').click(function(){
		$("html, body").animate({ scrollTop: 0 }, 600);
		//$(window).scrollTop();
		return false;
	});

	$('.mobilemenu').click(function(){
		$('.el_mainmenu').show();
		$('.el_mainmenu li').show();
	});
	
	$('.mobilemenuclose').click(function(){
		$('.el_mainmenu').hide();
		$('.el_mainmenu li').hide();
	});

	
	
});
