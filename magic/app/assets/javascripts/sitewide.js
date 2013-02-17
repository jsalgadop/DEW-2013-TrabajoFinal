$(document).ready(function(){

    /* Decorations */

    $('.btn1, .btn2, .btn3, .btn4, .btn5, .flagtabs li.current').append('<span class="left"></span><span class="right"></span>');
    $('.deco').wrapInner('<div class="liner"></div>').append('<span class="deco-corner-left"></span><span class="deco-corner-right"></span>');
    $('.home #hestia .erebus').append('<a class="prev btn3"><span>Prev</span><span class="left"></span><span class="right"></span></a><a class="next btn2"><span>Next</span><span class="left"></span><span class="right"></span></a>');
    $('#ouranos').append('<span id="siteCornerLeft"></span><span id="siteCornerRight"></span>');
    $('#overheard dl dd').append('<span class="fancy1"></span>');
//    $('#overheard dl dd blockquote').append('<span class="fancy2"></span>');
    $('.flagtabs li.current, #moirae #clotho.callouts #subNav dl dd ul li.current-cat').prev('li').addClass('prev');
    $('#eurynome div.not(#clotho,#atropos) table tr td:first-child, .projects .deco ul li:first-child, div.wp-polls ul li:first-child, #pageNav span.page-numbers :first-child').addClass('first');
    $('#eurynome div.not(#clotho,#atropos) table tr td:last-child, .projects .deco ul li:last-child, .bbcrumb a:last-child, #pageNav span.page-numbers :last-child, #pageTop span.page-numbers :last-child').addClass('last');
    $('#forumfront table th.category, div#lachesis.studio dl#positionList dd ul li.togglee').append('<div class="togglers"><a class="expand flag" href="#">Expand</a><a class="collapse flag" href="#">Collapse</a></div>');
    $('#threadNav ul li.current a').wrapInner('<span></span>');
    $('#lachesis.profile .main table#profileDeets tr:even').addClass('stripe');
    $('#agora table.thread img.avatar').attr('alt','');
    $('#tml-main ul.links a[href="/login/?instance=tml-main&action=register"]').attr('href','/register');

    /* Subscribe Form Stuff */

    $("#listSignup").submit(function() {
        var signupText = $(this).find("#signupText").val();

        if(checkEmail(signupText)) {
            $.ajax({
                type: "POST",
                url: "/?signup=true",
                data: "signupText=" + signupText,
                success: function() {
                    $("#listSignup #signupText").attr("value", "Thanks for subscribing!");
                }
            });
        }

        return false;
    });

    /* Contest Form Stuff */

	$('input#contestWeight').click(function(){
		if ( $(this).is(':checked') ){
			$(this).val('heavy');
		} else { $(this).val('light'); }
	});

    $("#contestSignup").submit(function(e) {
		$('#contestBox').removeClass('heavy').removeClass('sneakypants').removeClass('error');
        var contest = {
                'contestName' : {
                    value :     $(this).find("#contestName").val(),
                    validate:   true,
                    name:       'Name'
                },
                'contestEmail' : {
                    value:      $(this).find("#contestEmail").val(),
                    validate:   'email',
                    name:       'Email'
                },
                'contestAge' : {
                    value:      $(this).find("#contestAge").val(),
                    validate:   true,
                    name:       'Age'
                },
                'contestCountry' : {
                    value:      $(this).find("#contestCountry").val(),
                    validate:   true,
                    name:       'Country'
                },
                'contestWeight' : {
                    value:      $(this).find("#contestWeight").val(),
                    validate:   false,
                    name:       'Weight'
                }
            },
            msgContest = false,
            msgExtra = false;
        for (var field in contest) {
            if(contest[field].validate !== false){
                if(!contest[field].value){
					alert('Please accurately fill out all fields.');
					return false;
                    // msgContest = msgContest || 'Please fill out the following fields:';
                    // msgContest += '\r\t' + contest[field].name;
                }
                if(contest[field].validate === 'email' && contest[field].value && !checkEmail(contest[field].value, true)){
					alert('Please provide a valid email address');
					return false;
                    // msgExtra = msgExtra || '';
                    // msgExtra += 'Please provide a valid email';
                }
            }
        }
        if(msgExtra){
            // if(msgContest){
            //     msgContest += '\r\r';
            // }else{
            //     msgContest = '';
            // }
            // msgContest += msgExtra;
        }
        //require name, age, country
        //console.log('name: ' + contestName + ' typeof: ' + typeof contestName);
        //console.log('age: ' + contestAge + ' typeof: ' + typeof contestAge);
        //console.log('country: ' + contestCountry + ' typeof: ' + typeof contestCountry);
        if(msgContest){
            alert(msgContest);
        }else{ 
            $.ajax({
                type: "POST",
                url: "/?contest=true",
                data: "contestName="+contest.contestName.value+"&contestEmail="+contest.contestEmail.value+"&contestWeight="+contest.contestWeight.value+"&contestAge="+contest.contestAge.value+"&contestCountry="+contest.contestCountry.value,
                success: function(result) {
					if ( result == "success" && contest.contestWeight.value == "heavy" ){
						$('#contestBox').addClass('heavy').show(1,function(){
			                toShade();
			            });
					} else if ( result == "success" && contest.contestWeight.value == "light" ){
						$('#contestBox').show(1,function(){
			                toShade();
			            });	
					} else if ( result == "sneakypants") {
						$('#contestBox').addClass('sneakypants').show(1,function(){
			                toShade();
			            });						
					} else {
						console.log("PHP's fault")
						$('#contestBox').addClass('error').show(1,function(){
			                toShade();
			            });
					}
                },
				error: function(){
					console.log("JS's fault")
					$('#contestBox').addClass('error').show(1,function(){
		                toShade();
		            });
				}
            });
        }
        e.preventDefault();
        return false;
    });

	$('#launchLegal').click(function(e){
		$('#contestLegal').show(1,function(){
            toShade();
        });
		//return false;
	})

	/* TODO: Implement new modal system */

    /* Legacy Modal Codal */

    toShade();

    $('div.lightbox:not(#galleryBox)').each(function(){
        var it = $(this);
        it.find('a.close').click(function(){
            it.hide(1,function(){
                toShade();
            });
            return false;
        });
        if (it.attr('id') != "galleryBox" && it.height() < $(window).height() ) {
            it.css({
                top: ($(window).height() - it.height()) / 2,
                left: ($(window).width() - it.width()) / 2
            })
        } else {
            it.css({
                top: '50px',
                left: ($(window).width() - it.width()) / 2
            })
		}
    });

    $('div#galleryBox').each(function(){
        var it = $(this);
        it.find('a.close').click(function(){
            it.hide(1,function(){
                toShade();
                $('#galleryBox img').attr('src','');
            });
            return false;
        });
        it.css({
            'left':($(window).width() -800)/2
            })
    });

    $('#galleryBox img').bind('load',function(){
        $(this).fadeIn(500);
    })

    var picCur;

    $('div.gallery dl.gallery-item').each(function(){
        $(this).click(function(){
            picCur = $(this);
            $('#galleryBox img').attr('src',$(this).find('a').attr('href'));
            $('#galleryBox').show();
            toShade();
            return false;
        })
    });

    $('#galleryBox div.controls a.prev').bind('click',function(){
        if ( picCur.prev().length != 0 ) {
            $('#galleryBox img').fadeOut(1).attr('src', picCur.prev().find('a').attr('href'));
            picCur = picCur.prev();
        } else {
            $('#galleryBox').hide(1,function(){
                toShade();
                $('#galleryBox img').attr('src','');
            });
        }
        return false;
    });

    $('#galleryBox div.controls a.next').bind('click',function(){
        if ( picCur.next().length != 0 ) {
            $('#galleryBox img').fadeOut(1).attr('src',picCur.next().find('a').attr('href'));
            picCur = picCur.next();
        } else {
            $('#galleryBox').hide(1,function(){
                toShade();
                $('#galleryBox img').attr('src','');
            });
            $(this).unbind();
        }
        return false;
    });

    $('a.login-link').click(function(){
        scroll(0,0);
        $('#shade, #login').show();
        $('html').css('overflow','hidden'); // Using 'html' cause of ie7
        return false;
    });

    $('#agora table.thread td.report a').click(function(){
        scroll(0,0);
        var post_id = $(this).parent().parent().find('.user a:first').attr('name').split('-')[1];
        var poster_name = $(this).parent().parent().find('.user dl dt a').html();

        $('#report #reportPostID').attr("value", post_id);
        $('#report #reportPosterName').attr("value", poster_name);

        $('#shade, #report').show();
        $('html').css('overflow','hidden'); // Using 'html' cause of ie7
        return false;
    })

    $('#report table .buttons button').click(function(){
        var name = $("#report #reportPosterName").attr("value");
        var post_id = $("#report #reportPostID").attr("value");
        var reason = $("#report #reportReason").attr("value");

        $.ajax({
            type: "POST",
            url: "/?report=true",
            data: "name=" + name + "&post_id=" + post_id + "&reason=" + reason,
            success: function() {
                $("#report").hide(1,function(){
                    toShade();
                });
            }
        })
        return false;
    });

    $('#userStatus .logged-in p a, #userStatus .logged-in img').click(function(){
        $('#accountOptions').toggleClass('on');
        return false;
    });

    $('#accountOptions').hover(
        function(){
            $('#accountOptions').addClass('on');
        },
        function(){
            $('#accountOptions').removeClass('on');
        }
        );

    $('form:not(#signup_form,.edit-form) input[type="text"], input[type="password"]').focus(function() {
        if( this.value == this.defaultValue ) {
            this.value = "";
        }
    }).blur(function() {
        if( !this.value.length ) {
            this.value = this.defaultValue;
        }
    });

    $('input[type="text"], input[type="password"]').addClass('text');

    $('#changeTopAchievements input:checkbox').click(function(){
        if ( $('#changeTopAchievements input:checked').length > 4) {
            alert('You can only pick four! Sorry!');
            return false;
        } else return;
    });

    /* Number Stuff */

    nums2imgs();

    $('#eurynome table td.replies span').each(function(){
        var num = $(this).text();
        if ( num.length > 6 ) {
            num = Math.round(num*.000001);
            $(this).html(num+'m');
        } else if ( num.length == 6 ) {
            num = (num*.000001);
            num = num.toPrecision(1);
            num = num.replace(/^0+/, '');
            $(this).html(num+'m');
        } else if ( num.length > 3 ) {
            num = Math.round(num*.001);
            $(this).html(num+'k');
        } else if (num == 57) {
            $(this).html('Ω');
        } else if (num == 162) {
            $(this).html('φ');
        } else if (num == 272) {
            $(this).html('<em>e</em>');
        } else if (num == 314) {
            $(this).html('π');
        } else return;
    });

    $('#eurynome #leaderboards table.bigT td.points span, #moirae .callouts div.left-menu dl dd div.stats ul li strong, #moirae .callouts div.stats-battle dd table td strong').each(function(){
        var num = $(this).text();
        if ( num.length > 6 ) {
            num = Math.round(num*.000001);
            $(this).html(num+'m');
        } else if ( num.length == 6 ) {
            num = (num*.000001);
            num = num.toPrecision(1);
            num = num.replace(/^0+/, '');
            $(this).html(num+'m');
        } else if ( num.length > 3 ) {
            num = Math.round(num*.001);
            $(this).html(num+'k');
        } else return;
    });

    /* Tabs */

    $('#moirae #lachesis .tabnav li a').click(function(){
        var which = $(this).attr('href');
        $('.tabnav li').removeClass('current');
        $('.tabs div').removeClass('current');
        $(which).addClass('current');
        $(this).parent('li').addClass('current');
        $('.home #lachesis table').css('top',0);
        return false;
    });

    /* Game Tabs */

    $('.game .tabnav li a').click(function(){
        var which = $(this).attr('href');
        $('.tabs div').removeClass('current');
        $(which).addClass('current');
        $(this).parent('li').addClass('current');
        if ( $('#gametabs .tabnav ul').hasClass('singleton') ) {
            return false;
        } else {
            if ( which == "#fromBlog") {
                $('#gametabs .tabnav ul').removeClass('awards');
            } else {
                $('#gametabs .tabnav ul').addClass('awards');
            }
        }
        return false;
    });

    /* Home Est. Thing */

    $('#hestia').each(function(){
        $('span#athena').addClass('on');
    });

    /* Feature vertical align */

    $('.home #hestia dl dd ul li div.post-wrap').each(function(){
        var w = $(this).height() + 50;
        $(this).css('margin-top',(296-w)/2);
    });

    /* Feature Scroll */

    $('#hestia').scrollHoriz({
        viewSize: 1
    });

    /* Freshness Scroll */

    $('.home #lachesis .tabs div:has(div)').each(function(){

        // Customization
        var setVar = 4;   // How many rows in a set?
        var speed = 1500; // How fast should this animation go?

        // How tall is each row?
        if ( ($.browser.msie && $.browser.version.substr(0, 1) <= 7) || $.browser.safari){
            var rowH = $('.home #lachesis table tr:eq(0)').height() + 1;
        } else {
            var rowH = $('.home #lachesis table tr:eq(0)').height();
        }

        // Who all is along for this ride, exactly?
        var tabDiv = $(this);						// Duh.
        var tabTable = tabDiv.find('table');		// Child of duh.
        var tabRows = tabTable.find('tr');			// Grandchildren of duh.
        var rowNum = tabRows.length;				// How many grandchildren does duh have, exactly?
        var setNum = Math.ceil(rowNum/setVar);      // Therefore, how many sets are there?

        // Bookeeping
        var tabPos = 0; 						    // Flag to keep track of where we've scrolled to
        var counter = tabDiv.find('span.current');  // Where we keep track of which set we're on
        var set = parseInt(counter.html()); 		// Which set we're on
        var slideH = setVar*rowH;  					// How far do we scroll each time?
        var slideEnd = slideH*(setNum-1); 			// How far is TOO far?

        // Show the user how many sets we're working with.
        $(this).find('span.total').html(setNum);

        // What happens when we click "next"?
        $(this).find('a.next').click(function(){
            if ( tabPos > (0-slideEnd) && !tabTable.is(':animated') ) {  // If we're not at the end and we aren't still animating...
                tabTable.animate(
                {
                    "top": tabPos - slideH
                }, 	// Move it
                speed,
                function(){
                    tabPos -= slideH;			// Update our position bookeeper
                    counter.html(set+1); 		// Update the user
                    set += 1; 					// Update our set bookeeper
                }
                );
            } else if ( tabPos <= (0-slideEnd) ) {  // If we are at the end
                tabTable.animate(
                {
                    "top" : 0
                },  				// Rewind to the beginning
                speed,
                function(){
                    tabPos = 0; 				// Reset our position bookeeper
                    counter.html("1");			// Update the user
                    set = 1; 					// Reset our set bookeeper
                }
                );
            }
            return false;
        });

        // What happens when we click "prev"?
        $(this).find('a.prev').click(function(){
            if ( tabPos != 0 && !tabTable.is(':animated') ) {  // If we're not at the beginning and we aren't still animating...                
                tabTable.animate(
                {
                    "top": tabPos + slideH
                },	// Move it
                speed,
                function(){
                    tabPos += slideH;		// Update our position bookeeper
                    counter.html(set-1);	// Update the user
                    set -= 1;				// Update our set bookeeper
                }
                );
            } else if ( tabPos >= 0 ) {			// If we are at the beginning...
                tabTable.animate(
                {
                    "top": (0-slideEnd)
                },	// Fast forward to the end
                speed,
                function(){
                    tabPos = (0-slideEnd);	// Reset our position bookeeper
                    counter.html(setNum); 	// Update the user
                    set = setNum; 			// Reset our set bookeeper
                }
                );
            }
            return false;
        });

    });

    /* Flickr Feed */

    $('#flickrFeed').each(function() {
        jQuery(function(){
            jQuery.getJSON("http://api.flickr.com/services/feeds/groups_pool.gne?id=1220274@N25&lang=en-us&format=json&jsoncallback=?", function(data){
                jQuery.each(data.items, function(i, item){
                    var smURL = item.media.m;
                    smURL = smURL.replace('_m.jpg', '_t.jpg');
                    var lgURL = item.media.m;
                    lgURL = lgURL.replace('_m.jpg', '.jpg');
                    jQuery('<img />').attr('src', smURL).addClass('thumb').appendTo('#flickrScroll ul').wrap('<li class="pane"></li>').wrap('<a href="' + lgURL + '"></a>"');                    
                    if (i == 0) {
                        $('#flickrFeat img').attr('src',lgURL);
                        return;
                    }
                });
                $('#flickrFeat img').bind('load', function(){
                    $(this).fadeIn(500);
                })
            });
        });
    });
    
    $('#flickrScroll').scrollHoriz({
        viewSize: 1,
        paneWidth: 500,
        slideLength: 4
    });

    $('#flickrFeed .guts #flickrScroll ul li.pane a').live('click', function(){
        var which = $(this).attr('href');
        $('#flickrFeat img').css({
            'display':'none'
        }).attr('src', which);
        return false;
    });

    /* Search Results */

    $('#searchResults ol li').each(function(i){
        $(this).prepend('<span class="order">'+(i+1)+'.</span>');
    })

    /* Career List */

    $('div#lachesis.studio dl#positionList dt a.expand').click(function(){
        $('dl#positionList li.collapsed').addClass('expanded').removeClass('collapsed');
        return false;
    });

    $('div#lachesis.studio dl#positionList dt a.collapse').click(function(){
        $('dl#positionList li.expanded').removeClass('expanded').addClass('collapsed');
        return false;
    });

    /* Flag Togglers */

    $('div.togglers a.collapse').bind('click',function(){
        $(this).parents('.togglee').addClass('collapsed').removeClass('expanded');
        return false;
    });

    $('div.togglers a.expand').bind("click",function(){
        $(this).parents('.togglee').removeClass('collapsed').addClass('expanded');
        return false;
    });

    if ($('#lachesis.profile').length != 0 || $('#agora').length != 0) {

        /* Achievement Hovers */

        $('#lachesis.profile .main dl#profileAchievements ul li img, #agora table.thread td.user dl dd ul li img').tooltip({
            track: true,
            showBody: "",
            showURL: false,
            left: -77,
            top: -15,
            fixPNG: true,
            flip: true,
            bodyHandler: function(){
                return $($(this).next('div')).html();
            }
        });

    }

    if ( $('#agora, #comments').length != 0 ) {

        /* Avatar hovers */

        $('<div id="tartip"></div>').appendTo(document.body).hide();

        $('#agora table.thread td.user div.usertime').click(function(e){
            var guts = $(this).find('div.usernav').html();
            $('div#tartip').html(guts).css({
                top : e.pageY+5,
                left : e.pageX-17
            }).toggle();
        });

        $('div#tartip').hover(
            function(){
                $(this).show();
            },
            function(){
                $(this).hide();
            });

        /* BBcode/Smilie hovers */

        $('<div id="bbtip"></div>').appendTo(document.body).hide();

        $('#agora table.thread td.bbcode ul li dl dt').click(function(e){
            $(this).toggleClass('hot');
            var guts = $(this).next('dd').html();
            $('div#bbtip').html(guts).css({
                top : e.pageY-($('div#bbtip').height()+20),
                left : e.pageX-350
            }).toggle();
        });

    }

    /* Commenting (Keep this last if you can) */

    $('div#comments div.comments-head a.expand').click(function(){
        $('div#comments li.depth-1.collapsed').addClass('expanded').removeClass('collapsed');
        $('div#comments li.dumb').addClass('dumb-but').removeClass('dumb');
        return false;
    });

    $('div#comments div.comments-head a.collapse').click(function(){
        $('div#comments li.depth-1.expanded').addClass('collapsed').removeClass('expanded');
        $('div#comments li.dumb-but').addClass('dumb').removeClass('dumb-but');
        return false;
    });

    $('div#comments ul li.depth-1:has(li.comment)').each(function(){
        var replyNum = $('li.comment', this).length;
        if (replyNum > 1) {
            $(this).append('<div class="expand"><p>Click to expand <span class="reply-num">' + replyNum + '</span> replies.</p></div>');
        } else {
            $(this).append('<div class="expand"><p>Click to expand <span class="reply-num">' + replyNum + '</span> reply.</p></div>');
        }

        var reply1 = $('li.comment a.url:eq(0)', this);
        reply1.clone().appendTo($(this).find('span.reply1'));
    // var names = $('a.url',this);
    // names = unique(names);
    // alert(names);
    });

    $('div#comments ul li div.expand').live('click',function(){
        $(this).parent('li.depth-1.collapsed').addClass('expanded').removeClass('collapsed');
        $(this).parent('li.dumb').addClass('dumb-but').removeClass('dumb');
    });

    if ($.browser.msie && $.browser.version.substr(0,1)<7) {
        return true;
    } else {
        $('div#comments ul li.depth-1.expanded, dl#positionList ul li.expanded').addClass('collapsed').removeClass('expanded');
        $('div#comments ul li.dumb-but').addClass('dumb').removeClass('dumb-but');
        trueHeight();
    }

    /* Just to be sure... */

    trueHeight();

    $('#members-list li').equalize();

    /* Chrome? I wish this was a joke. */

    var browser = navigator.userAgent;
    browser = browser.search("Chrome");
    if ( browser != -1 ) {
        $('body').addClass('chrome');
    };
    
    /* Displaying notification, when user is not logged in
       and tries to see subscribed threads. */
    $("#nonLoginNotification").click(function(){
      $("#notAllowedSubscription").show('slow');
      return false;
    });
    
});

function nums2imgs(){
    $(".comment-count span.number, div.item-avatar span.number").each(function(){
        var theText = $(this);
        var theString = theText.text();
        var numCharacters = theString.length;
        var newHTML = '';
        for (i = 0; i < numCharacters; i++) {
            var newHTML = newHTML + '<span class="count' + theString.charAt(i) + '">'  + theString.charAt(i) + '</span>';
        }
        theText.html(newHTML);
        j=0;
        $($(this).find('span').get().reverse()).each(function(){
            if ( (j % 3 == 0) && (j != 0) ) {
                $(this).after('<span class="comma">,</span>');
            }
            j++;
        });
    });
}

function trueHeight(){

    if ( $('#moirae').length != 0 ) {
        var heights = new Array(
            $('#moirae .erebus #clotho').height(),
            $('#moirae .erebus #lachesis:not(.game)').height(),
            $('#moirae .erebus #atropos').height()
            );

        var highest = Math.max.apply(Math, heights);

        if ($.browser.msie && $.browser.version.substr(0,1)<7) {
            $('#moirae .erebus').css('height',highest);
        } else {
            $('#moirae .erebus #lachesis:not(.game)').css('min-height',highest);
        }
    } else if ( $('#dioscuri').length != 0 ) {
        var heights = new Array(
            $('#dioscuri .erebus #castor').height(),
            $('#dioscuri .erebus #pollux').height()
            );

        var highest = Math.max.apply(Math, heights);

        if ($.browser.msie && $.browser.version.substr(0,1)<7) {
            $('#dioscuri .erebus').css('height',highest);
        } else {
            $('#dioscuri .erebus #castor').css('min-height',highest);
        }
    }

}


function toShade() {
    if ( $('div.lightbox').is(':visible') ) {
        var bH = $('body').height();
        $('#shade')
        .css({
            'height': bH+100
            })
        .fadeIn(500);
        /* $('#shade').fadeIn(500);
		$('html').css('overflow','hidden'); // Using 'html' cause of ie7 */
        scroll(0,0);
    } else {
        $('#shade').fadeOut(500);
        $('html').css('overflow','auto'); // Using 'html' cause of ie7
    }
}

function unique(a){
    a.sort();
    for(var i = 1;i < a.length;){
        if(a[i-1] == a[i]){
            a.splice(i, 1);
        }
        else{
            i++;
        }
    }
    return a;
}

(function($){

    $.fn.scrollHoriz = function(options) {

        var defaults = {
            viewSize: 5,
            slideTime: 1500,
            paneWidth: null,
            slideLength: null
        };

        var options = $.extend(defaults, options);

        return this.each(function() {

            var obj = $(this);

            if (options.paneWidth == null){
                var q = $('.pane:eq(1)', obj).position();
                var paneWidth = q.left;
            } else {
                var paneWidth = options.paneWidth;
            }

            var slideWidth = options.viewSize*paneWidth;
            var slideTime = options.slideTime;
            var slideLength = options.slideLength;

            var paneNum;
            if (slideLength == null){
                paneNum = $('.pane', obj).length;
            } else {
                paneNum = slideLength;
            }

            var featureWidth = paneNum*paneWidth;

            var viewer = $('.viewer', obj);
            var film = $('.film', obj);
            var prev = $('.prev', obj);
            var next = $('.next', obj);

            film.width(featureWidth);

            if ($.browser.msie && $.browser.version.substr(0,1)==8) {
                var hack = 1
            } else {
                var hack = 0
            }

            // Unfortunately, the above is exactly what it looks like.

            $(prev).click(function(){
                var position = film.position();
                if ( film.is(':animated') ) {
                	return
                }
                else if ( position.left < 0 ) {  // Are we at the beginning?  Is the list still animating?
                    film.animate({
                        "left": position.left + slideWidth
                    }, {
                        queue: true,
                        duration: slideTime
                    });
                } else if ( position.left >= 0 ) {
                	film.animate({
                        "left" : (0-(featureWidth-slideWidth))
                    }, {
                        queue: true,
                        duration: slideTime
                    });
                }
                return false;
            });

            $(next).click(function(){
                var position = film.position();
                if ( film.is(':animated') ) {
                    return
                }
                else if ( position.left > (0-(featureWidth-slideWidth)) ) {  // Are we at the end?  Is the list still animating?
                    film.animate({
                        "left": position.left - slideWidth - hack
                    }, {
                        queue: true,
                        duration: slideTime
                    });
                } else if ( position.left <= (0-(featureWidth-slideWidth)) ) {
                    film.animate({
                        "left" : 0
                    }, {
                        queue: true,
                        duration: slideTime
                    });
                }
                return false;
            });
        });
    };
})(jQuery);

jQuery.fn.equalize = function(){
    var maxHeight = 0;
    $(this).each(function(){
        var height = $(this).height();
        if (height && height > maxHeight) maxHeight = height;
    });

    return $(this).each(function(){
        //Set each column to the max height
        $(this).css({
            'height': maxHeight
        });
    });
};

jQuery.fn.center = function(){

    var defaults = {
        child: "img"
    };

    var options = $.extend(defaults, options);

    return this.each(function() {
        var child = $(options.child,this);
        if (child.height() < $(this).height() ) {
            var diffH = (($(this).height() - child.height()) / 2);
            child.css({
                'top': diffH
            });
        } else if (child.width() < $(this).width() ) {
            var diffW = (($(this).width() - child.width()) / 2);
            child.css({
                'left': diffW
            });
        } else return;
    });
}

function pollBack(){
    $('div.wp-polls ul li:first-child').addClass('first');
}

function checkEmail(email,noAlert) {
    var filter = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/,
        noAlert = noAlert || false;
    if (!filter.test(email)) {
        if(!noAlert){
            alert('Please provide a valid email address');
        }
        return false;
    }

    return true;
}

