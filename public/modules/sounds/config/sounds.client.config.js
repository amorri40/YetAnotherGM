'use strict';

// Configuring the Articles module
angular.module('sounds').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sounds', 'sounds', 'dropdown', '/sounds(/create)?');
		Menus.addSubMenuItem('topbar', 'sounds', 'List Sounds', 'sounds');
		Menus.addSubMenuItem('topbar', 'sounds', 'New Sound', 'sounds/create');
	}
]);