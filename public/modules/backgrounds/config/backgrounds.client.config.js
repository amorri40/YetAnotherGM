'use strict';

// Configuring the Articles module
angular.module('backgrounds').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Backgrounds', 'backgrounds', 'dropdown', '/backgrounds(/create)?');
		Menus.addSubMenuItem('topbar', 'backgrounds', 'List Backgrounds', 'backgrounds');
		Menus.addSubMenuItem('topbar', 'backgrounds', 'New Background', 'backgrounds/create');
	}
]);