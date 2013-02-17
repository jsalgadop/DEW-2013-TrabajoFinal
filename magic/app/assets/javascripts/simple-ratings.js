jQuery(document).ready(function($) {
    $("a.up:not(a.voted)").bind("click", apply_rating);
    $("a.down:not(a.voted)").bind("click", apply_rating);
    
    $("a.voted").bind("click", novotetwice);
    
    $("a.posted").unbind("click", apply_rating);
    $("a.posted").bind("click", noownvote);
    
    function apply_rating(e) {
        if($("div.logged-out").length != 0) {
		   $('div#tartip').html("<p>No log in, no ratey!</p>").css({
					top : e.pageY+5,
					left : e.pageX-17
				}).fadeIn("medium", function(){
					setInterval(function(){
						$('div#tartip').fadeOut("medium")
					}, 2000);
				});
            return false;
        }
        
        var attr = $(this).attr("id").split("-");
        var id = attr[1];
        var dir = attr[0];
        var context = attr[2];
        
        $.ajax({
           url: "/wp-content/plugins/simple-ratings/rating-ajax.php",
           type: "POST",
           data: 'id=' + id + '&dir=' + dir + '&context=' + context,
           success: function(html) {
               var resp = html.split(" ");
               $("#" + trim(resp[0])).next("span").html('(' + resp[1] + ')');
               $('div#tartip').html("<p>Thanks for voting!</p>").css({
						top : e.pageY+5,
						left : e.pageX-17
					}).fadeIn("medium", function(){
						setInterval(function(){
							$('div#tartip').fadeOut("medium")
						}, 2000);
					});
           }
        }); 
        
        $(this).parent().parent().find("a.up").unbind("click", apply_rating);
        $(this).parent().parent().find("a.down").unbind("click", apply_rating);
        $(this).parent().parent().find("a.up").bind("click", novotetwice);
        $(this).parent().parent().find("a.down").bind("click", novotetwice);
        
        $(this).parent().addClass("on");
        
        return false;
    }
    
    function returnfalse() { return false; }
    
    function novotetwice(e) {
        $('div#tartip').html("<p>Hey! No Voting Twice!</p>").css({
					top : e.pageY+5,
					left : e.pageX-17
				}).fadeIn("medium", function(){
					setInterval(function(){
						$('div#tartip').fadeOut("medium")
					}, 2000);
				});
	return false;   
    }
    
    function noownvote(e) {
        $('div#tartip').html("<p>No way, scrub. You can't post on your own stuff.</p>").css({
					top : e.pageY+5,
					left : e.pageX-17
				}).fadeIn("medium", function(){
					setInterval(function(){
						$('div#tartip').fadeOut("medium")
					}, 5000);
				});
	return false;   
    }
    
    function trim(str, chars) {
    	return ltrim(rtrim(str, chars), chars);
    }

    function ltrim(str, chars) {
    	chars = chars || "\\s";
    	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
    }

    function rtrim(str, chars) {
    	chars = chars || "\\s";
    	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
    }
});