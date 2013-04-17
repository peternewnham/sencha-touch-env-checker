(function() {

/**
 * Generates the html for a table from an Ext.env.is type (Ext.browser.is, Ext.os.is, Ext.feature.is)
 */
function generateTable(type, colour) {

	// store names and objects
	var names = [];
	var objs = [];

	// loop through each field in 
	for (var field in type) {

		if (type.hasOwnProperty(field)) {

			if (!Ext.isFunction(type[field])) {

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
		var isBg = colour || obj.is ? '#90EE90' : '#F08080';
		html += '<tr style="background-color:' + stripe + ';"><th>' + obj.name + '</th><td style="text-align:center;background-color:' + isBg + ';">' + obj.is + '</td></tr>';
	}
	html += '</table>';

	return html;
}

// launch application
Ext.application({
	viewport: {
		// only auto-maximize safari
        autoMaximize:	Ext.os.is.ios && Ext.browser.is.safari
    },
	launch: function() {

		Ext.Viewport.add({
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
    								text:	'Sencha Touch 2.2',
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
        				styleHtmlContent:	true,
        				scrollable:			true
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
							html: function() {
								// user agent
								var html = '<b>Ext.browser.userAgent:</b><br/>' + Ext.browser.userAgent + '<br/><br/>';

								// version
								html += '<b>Ext.browser.version:</b><br/>';
								var versionObj = {
									version:Ext.browser.version, 
									shortVersion: Ext.browser.version.shortVersion,
									major: Ext.browser.version.major,
									minor: Ext.browser.version.minor,
									patch: Ext.browser.version.getPatch(),
									release: Ext.browser.version.getRelease()
								};
								html += generateTable(versionObj, true);

								// Ext.browser.is
								html +='<b>Ext.browser.is.*</b><br/>' + generateTable(Ext.browser.is, false);

								return html;
							}()
						},
						// Ext.os
						{
							title: 'OS',	
							html: '<b>Ext.os.is.*</b><br/>' + generateTable(Ext.os.is, false)
						},
						// Ext.feature
						{
							title: 'Feature',
							html: '<b>Ext.feature.has.*</b><br/>' + generateTable(Ext.feature.has, false)
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
								return '<b>Body Classes:</b>' + generateTable(bodyObj, false);
							}()
						}
					]
				}
    		]
    	});
	}

});

})();