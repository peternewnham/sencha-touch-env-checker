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
	launch: function() {
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
    						// default latest release version - 2.1.0
    						value: function() {
    							var qs = Ext.urlDecode(window.location.search);
    							return qs.version || '210';
    						}(),
    						options:	[
    							{
    								text:	'Sencha Touch 2.2 RC',
    								value:	'220rc'
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
    								window.location = '?version=' + newValue;
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
					items: [
						// body classes
						{
							title: 'Body',
							html: function() {
								var bodyClasses = Ext.getBody().dom.className.split(' ');
								var html = '<b>Body Classes:</b><table>';
								for (var i=0,ilen=bodyClasses.length; i<ilen; i++) {
									html += '<tr><th>' + bodyClasses[i] + '</th></tr>';
								}

								html += '</table>';
								return html;
							}()
						},
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
						}
					]
				}
    		]
    	});
	}

});

})();