const Main 			= imports.ui.main;
const Lang 		  	= imports.lang;
const Gkbd 		  	= imports.gi.Gkbd;
const Me 		  	= imports.misc.extensionUtils.getCurrentExtension();
const Panel			= imports.ui.main.panel;
const Prefs			= Me.imports.convenience.getSettings();
const Monitor		= Main.layoutManager.primaryMonitor;

const Icon = Me.imports.icon;
const Flag = Me.imports.flag;


function keyboardLayoutIndicator (preferences) {
	this._init(preferences);
}

keyboardLayoutIndicator.prototype = {	

		icon: 			undefined,
		flag: 			undefined,
		_preferences:	undefined,

		_init: function (preferences) { 
			this._preferences = preferences; 
		},

		_index: function () {
			return Panel._rightBox.get_children().length - 1;			
		},
		
		_center: function (length1, length2) {
			return length1 / 2 - length2 / 2;			
		},

		enable: function () {
			
			this.icon = new Icon.KeyboardLayoutIcon({
				iconClass: 		this._preferences.iconClass,
				iconSize: 		this._preferences.iconSize,
				iconOpacity: 	this._preferences.iconOpacity,
				isEnabled:		this._preferences.iconIsEnabled,
			});
			
			this.flag = new Flag.KeyboardLayoutFlag({ 
				iconClass: 		this._preferences.flagClass,
				iconSize: 		this._preferences.flagSize,
				iconOpacity: 	this._preferences.flagOpacity,
				tweenTime: 		this._preferences.flagTweenTime,
				tweenOpacity: 	this._preferences.flagTweenOpacity,
				isEnabled: 		this._preferences.flagIsEnabled,
				iconX: 			Math.floor(this._center(Monitor.width, this._preferences.flagSize)),
				iconY: 			Math.floor(this._center(Monitor.height, this._preferences.flagSize)),
			}); 

			Panel._rightBox.insert_child_at_index(this.flag.ui(), this._index());
			Panel._rightBox.insert_child_at_index(this.icon.ui(), this._index());

			Gkbd.Configuration.get().connect('changed',        Lang.bind(this.icon, this.icon.onChanged));
			Gkbd.Configuration.get().connect('group-changed',  Lang.bind(this.icon, this.icon.onChanged));

			Gkbd.Configuration.get().connect('changed',        Lang.bind(this.flag, this.flag.onChanged));
			Gkbd.Configuration.get().connect('group-changed',  Lang.bind(this.flag, this.flag.onChanged));

			Gkbd.Configuration.get().start_listen();
		},

		disable: function () {
			Panel._rightBox.remove_child(this.flag.ui());
			Panel._rightBox.remove_child(this.icon.ui());
			
			Gkbd.Configuration.get().stop_listen();
			
			delete this.flag, this.icon;
		}
};

function init() {
	
	return new keyboardLayoutIndicator({ 
		iconClass: 			'keyboard-layout-flag-icon',
		iconSize: 			Prefs.get_int('control-size-on-panel'),
		iconOpacity: 		Prefs.get_int('control-opacity-on-panel'),
		iconIsEnabled:		Prefs.get_boolean('control-show-on-panel'),
		flagClass: 			'keyboard-layout-flag-image',
		flagSize: 			Prefs.get_int('control-size-on-screen'),
		flagOpacity: 		Prefs.get_int('control-opacity-on-screen'),
		flagTweenTime: 		Prefs.get_int('control-time-on-tween'),
		flagTweenOpacity: 	Prefs.get_int('control-opacity-on-tween'),
		flagIsEnabled: 		Prefs.get_boolean('control-show-on-screen'),
	});
}
