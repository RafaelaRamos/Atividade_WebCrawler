var Crawler = {
	request : null,
	cheerio : null,
	fs      : null,
	init : function(){
		Crawler.request = require('request');
		Crawler.cheerio = require('cheerio');
		Crawler.fs      = require('fs');
		Crawler.getMovies();
	},
	getMovies: function(){
		Crawler.request('https://noticias.r7.com/brasil/noticias', function(err, res, body){
			if(err)
				console.log('Error: ' + err);
			var $ = Crawler.cheerio.load(body);
			$('.wrap-article li').each(function(){
				var data  = $(this).find('.time time').text().trim();
				var titulo = $(this).find('.listing-title a').text().trim();
				
				Crawler.fs.appendFile('r7.txt', data + ' - ' + titulo + '\n');
			});
		});
	}
};
Crawler.init();
