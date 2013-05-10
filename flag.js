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

		_tweenTime: 	1,
		_tweenOpacity: 	0,
		_iconSize: 		30,
		_iconOpacity: 	300,
		_iconImage: 	null,
		_iconClass: 	'keyboard-layout-flag-image',

		_init: function (parameters) {

		},

		_center: function (length1, length2) {

			return length1 / 2 - length2 / 2;			
		},

		_x: function (length) {
			return Math.floor(
					this._center(Main.layoutManager.primaryMonitor.width, length)
			);
		},

		_y: function (length) {
			return Math.floor(
					this._center(Main.layoutManager.primaryMonitor.height, length)
			);
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

			return Convenience.getSettings().get_boolean('control-show-on-screen');
		},


		onChanged: function () {

			if(this.isEnabled ()) {

				this._iconImage 	= this._image();
				this._iconClass 	= 'keyboard-layout-flag-image',
				this._iconSize 		= Convenience.getSettings().get_int('control-size-on-screen');
				this._iconOpacity 	= Convenience.getSettings().get_int('control-opacity-on-screen');
				this._tweenTime 	= Convenience.getSettings().get_int('control-time-on-tween');
				this._tweenOpacity 	= Convenience.getSettings().get_int('control-opacity-on-tween');

				var flag  = new St.Icon({
					gicon: 		 this._iconImage,
					x:			 this._x(this._iconSize),
					y:			 this._y(this._iconSize),
					opacity: 	 this._iconOpacity,
					icon_size: 	 this._iconSize,
					style_class: this._iconClass
				});

				Main.uiGroup.add_actor(flag);

				Tweener.addTween(flag , {
					time: 		this._tweenTime,
					opacity: 	this._tweenOpacity,
					transition: 'easeOutQuad',
					onComplete: function () {

						Main.uiGroup.remove_actor(flag );
					}
				});
			}
		}
};