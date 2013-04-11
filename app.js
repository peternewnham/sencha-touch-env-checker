(function() {

/**
 * Generates the html for a table from an Ext.env.is type (Ext.browser.is, Ext.os.is, Ext.feature.is)
 */
function generateTable(type) {

	// store names and objects
	var names = [];
	var objs = [];

	// loop through each field in 
	for (var field in type) {

		// only interested in Boolean fields
		if (Ext.isBoolean(type[field])) {

			// check it's not already been added
			// Camel and Lower case version are generated so this ignores duplicates for convenience
			if (names.indexOf(field.toLowerCase()) < 0) {

				// add to objects which we will add to the html table
				objs.push({
					name: field,
					is: type[field]
				});

				// add lowercase name to the list of names so we can ignore it if it appears again
				names.push(field.toLowerCase());

			}

		}

	}

	// sort objects by name
	objs.sort(function(a,b) {
		return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
	});

	// generate html table
	var html = '<table>';
	for (var i=0,ilen=objs.length; i<ilen; i++) {
		var obj = objs[i];
		// green if true, red if not
		var stripe = i%2 === 0 ? '#ddd' : '#eee';
		var isBg = obj.is ? '#90EE90' : '#F08080';
		html += '<tr style="background-color:' + stripe + ';"><th>' + obj.name + '</th><td style="text-align:center;background-color:' + isBg + ';">' + obj.is + '</td></tr>';
	}
	html += '</table>';

	return html;
}

// launch application
Ext.application({
	viewport: {
		// only auto-maximize safari
        autoMaximize: Ext.os.is.ios && Ext.browser.is.safari
    },
	launch: function() {

		var src = {
			'220rc': {
				css:	"2.2rc/sencha-touch.css",
				js:		"2.2rc/sencha-touch-all.js"
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

		Ext.create('Ext.Container', {
    		fullscreen: true,
    		layout: 'fit',
    		items:		[
    			{
    				xtype:	'fieldset',
    				docked: 'top',
    				margin: 10,
    				items:	[
    					{
    						xtype:	'selectfield',
    						label:	'Version',
    						value: function() {
    							return Ext.version.getShortVersion();
    						}(),
    						options:	[
    							{
    								text:	'Sencha Touch 2.2 RC',
    								value:	'220'
    							},
    							{
    								text:	'Sencha Touch 2.1.1',
    								value:	'211'
    							},
    							{
    								text:	'Sencha Touch 2.1.0',
    								value:	'210'
    							},
    							{
    								text:	'Sencha Touch 2.0.1',
    								value:	'201'
    							},
    							{
    								text:	'Sencha Touch 2.0.0',
    								value:	'200'
    							}
    						],
    						listeners: {
    							change: function(select, newValue, oldValue) {
    								if (Ext.isObject(newValue)) {
    									newValue = newValue.get('value');
    								}
    								// redirect to load the new version
    								window.location = './?version=' + newValue + location.hash;
    							}
    						}
    					}
	    			]
    			},
				{
					xtype: "tabpanel",
					defaults: {
        				styleHtmlContent: true,
        				scrollable: true
    				},
    				activeItem: parseInt(location.hash.replace(/^#tab/, ''), 10) || 0,
    				listeners: {
    					activeitemchange: function(tabPanel, newTab, oldTab) {
    						// change the url hash so we can open this tab again on reload
    						window.location.href = '#tab' + tabPanel.getInnerItems().indexOf(newTab);
    					}
    				},
					items: [
						// Ext.browser + user agent
						{
							title: 'Browser',
							html: '<b>User Agent:</b><br/>' + Ext.browser.userAgent + '<br/><br/>' + generateTable(Ext.browser.is)
						},
						// Ext.os
						{
							title: 'OS',	
							html: generateTable(Ext.os.is)
						},
						// Ext.feature
						{
							title: 'Feature',
							html: generateTable(Ext.feature.has)
						},
						// body classes
						{
							title: 'Body',
							html: function() {

								var bodyClasses = Ext.getBody().dom.className.split(' ');
								var bodyObj = {};
								for (var i=0,ilen=bodyClasses.length; i<ilen;i++) {
									bodyObj[bodyClasses[i]] = true;
								}
								return '<b>Body Classes:</b>' + generateTable(bodyObj);
							}()
						}
					]
				}
    		]
    	});
	}

});

})();