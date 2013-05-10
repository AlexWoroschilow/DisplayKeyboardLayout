const St 		  	= imports.gi.St;
const Lang 		  	= imports.lang;
const Gio 		  	= imports.gi.Gio;
const Main 		  	= imports.ui.main;
const Gkbd 		  	= imports.gi.Gkbd;
const Tweener     	= imports.ui.tweener;
const PanelMenu   	= imports.ui.panelMenu;
const Me 		  	= imports.misc.extensionUtils.getCurrentExtension();
const Convenience 	= Me.imports.convenience;

const Icon = Me.imports.icon;
const Flag = Me.imports.flag;


function keyboardLayoutIndicator (parameters) {
	this._init(parameters);
}

keyboardLayoutIndicator.prototype = {	
	
	_elements: undefined,
	
	_init: function (parameters) {
		
		this._elements = {
			flag: new Flag.KeyboardLayoutFlag(parameters),
			icon: new Icon.KeyboardLayoutIcon(parameters) 
		};
	},
	
	_settings: function () {
		return Convenience.getSettings();
	},
	
	enable: function () {
		
		if(this._elements) {
			
			for(var element in this._elements) {
				this._elements[element].enable();
			}
		}
	},
	
	disable: function () {
		if(this._elements) {
			
			for(var element in this._elements) {
				this._elements[element].disable();
			}
		}
	}
};

function init() {

	return new keyboardLayoutIndicator({ });
}
