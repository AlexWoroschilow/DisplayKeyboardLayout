const St 			= imports.gi.St;
const Lang 			= imports.lang;
const Gio 			= imports.gi.Gio;
const Main 			= imports.ui.main;
const Gkbd 			= imports.gi.Gkbd;
const Tweener   	= imports.ui.tweener;
const PanelMenu 	= imports.ui.panelMenu;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();
const Convenience 	= Me.imports.convenience;

function KeyboardLayoutFlag(parameters) {

	this._init(parameters);
};

KeyboardLayoutFlag.prototype = {

		_iconSize: 30,
		_iconImage: null,
		_iconClass: 'keyboard-layout-flag-image',
		_iconOpacity: 300,
		_positionX: null,
		_positionY: null,
		_tweenTime: 1,
		_tweenOpacity: 0,

		_config: Gkbd.Configuration.get(),

		_init: function (parameters) {

		},

		_getPositionX: function (width) {
			return Math.floor(
					Main.layoutManager.primaryMonitor.width / 2 - width / 2
			);
		},

		_getPositionY: function (height) {
			return Math.floor(
					Main.layoutManager.primaryMonitor.height / 2 - height / 2
			);
		},

		_onRefresh: function () {

			this._iconImage 	= this._getImage();
			this._iconSize  	= this._settings().get_int('control-size-on-screen');
			this._iconOpacity 	= this._settings().get_int('control-opacity-on-screen');

			this._tweenTime		= this._settings().get_int('control-time-on-tween');
			this._tweenOpacity	= this._settings().get_int('control-opacity-on-tween');

			this._positionX = this._getPositionX(this._iconSize);
			this._positionY = this._getPositionY(this._iconSize);
		},

		_onChange: function () {

			if(this.isEnabled()) {
				
				var flag  = new St.Icon({
					gicon: 		 this._getImage(),
					opacity: 	 this._iconOpacity,
					style_class: this._iconClass,
					icon_size: 	 this._iconSize,
					x: 			 this._positionX,
					y: 			 this._positionY,
				}); 
				
				Main.uiGroup.add_actor(flag );
				
				Tweener.addTween(flag , { 
					time: this._tweenTime,
					opacity: this._tweenOpacity,
					transition: 'easeOutQuad',
					onComplete: function () {
						Main.uiGroup.remove_actor(flag );
					}
				});
			}
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
		
		isEnabled: function () {
			return this._settings().get_boolean('control-show-on-screen');
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