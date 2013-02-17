jQuery(document).ready(function($) {
	$('.ps-add-row').bind('click', cloneLastRow);
	$('.ps-show-full-desc').bind('click', showFullDesc);
	$('.manage-column input').bind('change', checkAll);
	$('.enabler').bind('change', enableNextInput);
	$('#ps_badge_selector').bind('change', showBadgePreview);
	
	function showBadgePreview() {
		if($(this).find(':selected').attr('rel') != "") {
			$('#ps_badge_preview').show()
			$('#ps_badge_preview').attr('src', '/wp-content/plugins/post_shock/badges/' + $(this).find(':selected').attr('rel'));
		} else {
			$('#ps_badge_preview').hide()
		}
	}
	
	function enableNextInput() {
		if($(this).attr('checked')) {
			$(this).next('span').find(':input').removeAttr('disabled');
			$(this).next('span').find(':input').attr("value", "");
			$(this).next('span').find(':input').focus()
		} else {
			$(this).next('span').find(':input').attr("disabled", "disabled");
			$(this).next('span').find(':input').attr("value", "");
		}
	}
	
	function checkAll() { }
	
	function cloneLastRow() {
		clonedRow = $(this).closest('table').find("tr:last").prev().clone()
		clonedRow.find("input").attr("value", "");
		$(this).closest('tr').prev().after(clonedRow);
		return false;
	}
	
	function showFullDesc() {
		full_desc = $(this).parent().parent().parent().find(".ps-full-desc")
		
		if($(this).html() == "Show Full Description") {
			full_desc.show();
			$(this).html("Hide Full Description")
		} else {
			full_desc.hide();
			$(this).html("Show Full Description")
		}
		return false;
	}
});