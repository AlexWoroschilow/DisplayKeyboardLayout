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

		_element: new St.Bin({ }),

		_config: Gkbd.Configuration.get(),

		_init: function (parameters) {

		},

		_image: function () {

			var config = Gkbd.Configuration.get();

			var filename = config.get_group_name(
					config.get_current_group()    		  
			);

			return Gio.icon_new_for_string(
					Me.dir.get_path() + "/icons/" + filename + ".svg"
			);
		},

		isEnabled: function () {

			if(Convenience.getSettings().get_boolean('control-show-on-panel')) {

				Main.panel._rightBox.insert_child_at_index(this._element,  
						Main.panel._rightBox.get_children().length-1);

				this.onChanged();

				return true;

			}

			Main.panel._rightBox.remove_child(this._element);

			return false;
		},

		onChanged: function () {

			this._iconClass 	= 'keyboard-layout-flag-icon',
			this._iconSize 		= Convenience.getSettings().get_int('control-size-on-panel');
			this._iconOpacity 	= Convenience.getSettings().get_int('control-opacity-on-panel');

			this._element.set_child(new St.Icon({
				gicon: 		 this._image(),
				opacity: 	 this._iconOpacity, 					
				icon_size: 	 this._iconSize,
				style_class: this._iconClass 
			}));
		}
};