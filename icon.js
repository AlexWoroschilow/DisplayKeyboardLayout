const St 			= imports.gi.St;
const Lang 			= imports.lang;
const Gio 			= imports.gi.Gio;
const Main 			= imports.ui.main;
const Gkbd 			= imports.gi.Gkbd;
const Tweener   	= imports.ui.tweener;
const PanelMenu		= imports.ui.panelMenu;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();
const Convenience 	= Me.imports.convenience;

function KeyboardLayoutIcon(parameters) {

	this._init(parameters);
};

KeyboardLayoutIcon.prototype = {

		_iconSize: 30,
		_iconImage: null,
		_iconOpacity: 300,
		_iconClass: 'keyboard-layout-flag-icon',
		_config: Gkbd.Configuration.get(),

		_element: new St.Bin({ }),

		_init: function (parameters) {

			this._onRefresh();
			this._onChange();
		},

		_getImage: function () {

			var language = this._config.get_group_name(
					this._config.get_current_group()    		  
			);

			return Gio.icon_new_for_string(
					this._getPathDefault() + "/icons/" + language + ".svg"
			);
		},

		_settings: function () {
			return Convenience.getSettings();
		},    

		_getPathDefault: function ( ) {
			return Me.dir.get_path();
		},

		_onRefresh: function () {
			this._iconImage 	= this._getImage();
			this._iconSize  	= this._settings().get_int('control-size-on-panel');
			this._iconOpacity 	= this._settings().get_int('control-opacity-on-panel');
		},

		_onChange: function () {
			
			if(!this.isEnabled ()) {
				
				return Main.panel._rightBox.remove_child(this._element);
			}
			
			this._element.set_child(new St.Icon({
				gicon: 		 this._iconImage,
				opacity: 	 this._iconOpacity, 					
				icon_size: 	 this._iconSize,
				style_class: this._iconClass 
			}));
			
			return Main.panel._rightBox.insert_child_at_index(this._element, 0);
			
		},
		
		isEnabled: function () {
			return this._settings().get_boolean('control-show-on-panel');
		},

		enable: function () {

			this._config.connect('changed',        Lang.bind(this, this._onRefresh));
			this._config.connect('group-changed',  Lang.bind(this, this._onRefresh));

			this._config.connect('changed',        Lang.bind(this, this._onChange));
			this._config.connect('group-changed',  Lang.bind(this, this._onChange));

			this._config.start_listen();
		},

		disable: function () {

			this._config.stop_listen();
		} 
};