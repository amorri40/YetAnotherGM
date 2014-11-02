'use strict';

// Configuring the Articles module
angular.module('objects').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Objects', 'objects', 'dropdown', '/objects(/create)?');
		Menus.addSubMenuItem('topbar', 'objects', 'List Objects', 'objects');
		Menus.addSubMenuItem('topbar', 'objects', 'New Object', 'objects/create');
	}
]);