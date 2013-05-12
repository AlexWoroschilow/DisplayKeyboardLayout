const St 			= imports.gi.St;
const Main 			= imports.ui.main;
const Tweener   	= imports.ui.tweener;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();

const Prefs			= Me.imports.convenience.getSettings();
const Monitor		= Main.layoutManager.primaryMonitor;
const Helper 		= Me.imports.helper;

function KeyboardLayoutFlag(parameters) {
	this._init(parameters);
};

KeyboardLayoutFlag.prototype = {

		_ui: 			undefined,
		_isEnabled: 	undefined,
		_tweenTime: 	undefined,
		_iconSize: 		undefined,
		_iconImage: 	undefined,
		_iconOpacity: 	undefined,
		_tweenOpacity: 	undefined,
		_iconClass: 	undefined,
		_iconX: 		undefined,
		_iconY: 		undefined,

		_init: function (parameters) {
			this._iconClass		= parameters.iconClass;
			this._iconSize 		= parameters.iconSize;
			this._iconOpacity 	= parameters.iconOpacity;
			this._tweenTime 	= parameters.tweenTime;
			this._tweenOpacity 	= parameters.tweenOpacity;
			this._isEnabled		= parameters.isEnabled;
			this._iconX 		= parameters.iconX;
			this._iconY 		= parameters.iconY;
		},

		_center: function (length1, length2) {
			return length1 / 2 - length2 / 2;			
		},

		ui: function () {
			if(!this._ui) {
				this._ui = new St.Bin({ });
			}
			return this._ui;			
		},

		onChanged: function () {
			(function (that, flag) {
				if(that._isEnabled) {
					Main.uiGroup.add_actor(flag);
					Tweener.addTween(flag , {
						time: 		that._tweenTime,
						opacity: 	that._tweenOpacity,
						onComplete: function () {
							Main.uiGroup.remove_actor(flag);
						}
					});
				}

			})(this, new St.Icon({
				gicon: 		 (new Helper.Keyboard()).getLayoutImage(),
				x:			 this._iconX,
				y:			 this._iconY,
				opacity: 	 this._iconOpacity,
				icon_size: 	 this._iconSize,
				style_class: this._iconClass,
			}));
		}
};