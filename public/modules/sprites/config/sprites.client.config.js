'use strict';

// Configuring the Articles module
angular.module('sprites').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Sprites', 'sprites', 'dropdown', '/sprites(/create)?');
		Menus.addSubMenuItem('topbar', 'sprites', 'List Sprites', 'sprites');
		Menus.addSubMenuItem('topbar', 'sprites', 'New Sprite', 'sprites/create');
	}
]);