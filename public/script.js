function getNode(obj){
	var json = {};
	json.name = obj.data('value')+"";
	json.nodes = [];

	if(obj.children("ul").children("li").length > 0) {
		$(obj.children("ul").children("li").each(function(i,e){
			json.nodes.push(getNode($(e)));
		}));
	}
	return json;
}
function post_send(){
	$('.save').prop( "disabled", true );
	var req = new XMLHttpRequest();
	req.open('POST', '/');
	req.onreadystatechange = function() { 
	  if (req.readyState != 4) return;
	  $('.save').prop( "disabled", false );
	};

	req.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	req.send(JSON.stringify(getNode($('body>ul>li'))));

}
function close_form(){
	$("#add_form").hide();
	$("#add_form").attr('data-element','');
	$("[data-add=true]").attr("data-add","");
	$("#add_form input[type='text']").val('');
	$("body > ul").show();
	$(".save").show();
}
function add_node(){
	var val = $('input[type="text"]').val();
	$("[data-add=true]").append("<ul><li data-value='"+val+"' class='node'>"+val+"</li></ul>");
	close_form();
}
$(document).ready(function(){

	//Добавить лeвой кнопкой
	$(document).on('click','ul>li',function(e){
		if(e.target === this && e.button == 0){
			$(this).attr("data-add",true);
			$("#add_form").show();
			$("body > ul").hide();
			$(".save").hide();
			$("#add_form").attr('data-element',$(e.target).prop('outerHTML'));
		}
	})

	//Удалить средней кнопкой мыши
	$('ul>li').on('click',function(e){
		if(e.target === this && e.button == 1){
			if (confirm("Delete the branch?")){	
				$(this).remove();
			}
		}
	})
});