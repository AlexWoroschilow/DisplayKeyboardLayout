const St 			= imports.gi.St;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();
const Prefs			= Me.imports.convenience.getSettings();
const Helper 		= Me.imports.helper;

function KeyboardLayoutIcon(parameters) {
	this._init(parameters);
};

KeyboardLayoutIcon.prototype = {

		_ui: 			undefined,
		_iconClass: 	undefined,
		_iconSize: 		undefined,
		_iconOpacity: 	undefined,

		_init: function (parameters) {
			this._iconClass 	= 'keyboard-layout-flag-icon',
			this._iconSize 		= Prefs.get_int('control-size-on-panel');
			this._iconOpacity 	= Prefs.get_int('control-opacity-on-panel');
			this._isEnabled		= Prefs.get_boolean('control-show-on-panel');
		},

		_icon: function () {
			return new St.Icon({
				gicon: 		 (new Helper.Keyboard()).getLayoutImage(),
				icon_size: 	 this._iconSize,
				style_class: this._iconClass, 
				opacity: 	 this._iconOpacity, 					
			});			
		},

		ui: function () {
			if(!this._ui) {
				this._ui = new St.Bin({ });
				if(this._isEnabled) {
					this._ui.set_child (this._icon());
				}
			}
			return this._ui;			
		},

		onChanged: function () {
			if(this._isEnabled) {
				if(this.ui()) {
					this.ui().set_child(this._icon());
				}
			}
		}
};