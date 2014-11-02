'use strict';

// Configuring the Articles module
angular.module('timelines').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Timelines', 'timelines', 'dropdown', '/timelines(/create)?');
		Menus.addSubMenuItem('topbar', 'timelines', 'List Timelines', 'timelines');
		Menus.addSubMenuItem('topbar', 'timelines', 'New Timeline', 'timelines/create');
	}
]);