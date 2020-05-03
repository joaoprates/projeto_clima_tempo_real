$(function(){

	$('button').bind('click', function(){
		var city = $('#city').val();
		var now = new Date();

		var tempURL = 'https://query.yahooapis.com/v1/public/yql?format=json&rnd=' +now.getFullYear() + now.getMonth() + now.getDay() + now.getHours() + '&diagnostics=true&callback=?&q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="'+city+'") and u="c"';
		
		$.ajax({
			url:encodeURI(tempURL),
			dataType:'json',
			type:'GET',
			beforeSend:function(){
				$('#res').html('Carregando...');
			}
			success:function(data) {
				if(data !== null && data.query !== null && data.query.results !== null && data.query.results.channel.description !== 'Yahoo! weather Error') {
					var temp = data.query.results.channel.item.condition.temp;
					$('#res').html(temp+'° C');
				}
			},
			error:function(){
				$('#res').html('Error');
			}
		});
	});
});