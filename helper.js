const Gio 			= imports.gi.Gio;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();
const KeyboardGnome	= imports.gi.Gkbd.Configuration.get();


function Keyboard(parameters) {
	this._init(parameters);
};

Keyboard.prototype = {

		_init: function (parameters) {

		},

		getLayoutName: function () {
			return KeyboardGnome.get_group_name(
					KeyboardGnome.get_current_group()    		  
			);		
		},

		getLayoutImage: function () {
			return Gio.icon_new_for_string(
					Me.dir.get_path() + '/icons/' + this.getLayoutName() + '.svg'
			);
		}
};