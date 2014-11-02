'use strict';

// Configuring the Articles module
angular.module('scripts').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Scripts', 'scripts', 'dropdown', '/scripts(/create)?');
		Menus.addSubMenuItem('topbar', 'scripts', 'List Scripts', 'scripts');
		Menus.addSubMenuItem('topbar', 'scripts', 'New Script', 'scripts/create');
	}
]);