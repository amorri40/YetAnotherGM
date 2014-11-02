'use strict';

// Configuring the Articles module
angular.module('paths').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Paths', 'paths', 'dropdown', '/paths(/create)?');
		Menus.addSubMenuItem('topbar', 'paths', 'List Paths', 'paths');
		Menus.addSubMenuItem('topbar', 'paths', 'New Path', 'paths/create');
	}
]);