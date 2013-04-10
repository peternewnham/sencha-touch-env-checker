(function() {

window.addEventListener("DOMContentLoaded", function() {

	// default to latest release - 2.1.1
	var version = '211';

	// js and css src for all versions
	var src = {
		// release candidate not yet on cdn
		'220': {
			css:	"2.2rc/sencha-touch.css",
			js:		"2.2rc/sencha-touch-all.js"
		},
		'211': {
			css:	"http://cdn.sencha.io/touch/sencha-touch-2.1.1/resources/css/sencha-touch.css",
			js:		"http://cdn.sencha.io/touch/sencha-touch-2.1.1/sencha-touch-all.js"
		},
		'210': {
			css:	"http://cdn.sencha.io/touch/sencha-touch-2.1.0/resources/css/sencha-touch.css",
			js:		"http://cdn.sencha.io/touch/sencha-touch-2.1.0/sencha-touch-all.js"
		},
		'201': {
			css:	"http://cdn.sencha.io/touch/sencha-touch-2.0.1/resources/css/sencha-touch.css",
			js:		"http://cdn.sencha.io/touch/sencha-touch-2.0.1/sencha-touch-all.js"
		},
		'200': {
			css:	"http://cdn.sencha.io/touch/sencha-touch-2.0.0/resources/css/sencha-touch.css",
			js:		"http://cdn.sencha.io/touch/sencha-touch-2.0.0/sencha-touch-all.js"
		}
	};

	// check querystring for version
	var querystring = window.location.search;
	if (!!querystring) {

		// strip out ?
		querystring = querystring.substring(1);

		// find version 
		var queries = querystring.split('&');
		for (var i=0,ilen=queries.length; i<ilen; i++) {
			var parts = queries[i].split('=');
			var key = parts[0];
			var value = parts[1];
			if (key === "version" && src.hasOwnProperty(value)) {
				version = value;
				break;
			}
		}

	}
	
	// get sencha file locations
	var js = src[version].js;
	var css = src[version].css;

	// load sencha touch css
	var senchaCss = document.createElement('link');
	senchaCss.setAttribute('rel', 'stylesheet');
	senchaCss.setAttribute('href', css);
	document.querySelector('head').appendChild(senchaCss);

	// load sencha touch js
	var senchaJs = document.createElement('script');
	senchaJs.setAttribute('src', js);
	senchaJs.addEventListener('load', function() {
		// load app js once sencha touch has loaded
		var appJs = document.createElement('script');
		appJs.setAttribute('src', 'app.js');
		document.body.appendChild(appJs);
	});
	document.body.appendChild(senchaJs);


});

})();