$(function() {

	$("#open-1").click(function(){sendLetter("1");});
	$("#open-2").click(function(){sendLetter("2");});
	$("#open-3").click(function(){sendLetter("3");});
	$("#open-4").click(function(){sendLetter("4");});

	$("#choose-left").click(function(){sendLetter("j");});
	$("#choose-right").click(function(){sendLetter("k");});
	$("#wrong").click(function(){sendLetter("q");});

	$("#start-game").click(function(){sendLetter("s");});
	$("#next-round").click(function(){sendLetter("r");});
	$("#music-toggle").click(function(){sendLetter("m");});
	
	$("#refresh-page").click(function(){
		alert("test");
		if (confirm('Are you sure you want to refresh the game screen?')) {
			sendLetter("!");
		} else {
			alert("Aborted");
		}
	});
	
	function sendLetter(letterToSend){
		//alert("Should send letter: " + letterToSend);
		$.post(".", { btn: letterToSend })
		.done(function( data ) {
			//alert( "result_from_server: " + data );
		});
	}
});