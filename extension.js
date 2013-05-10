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
				icon: new Icon.KeyboardLayoutIcon(parameters), 
				flag: new Flag.KeyboardLayoutFlag(parameters)
			};
		},

		enable: function () {

			for(var element in this._elements) {

				(function (extension) {
					
					if(extension.isEnabled()) {

						Gkbd.Configuration.get().connect('changed',        Lang.bind(extension, extension.onChanged));
						Gkbd.Configuration.get().connect('group-changed',  Lang.bind(extension, extension.onChanged));
					}

				})(this._elements[element]);
			}

			Gkbd.Configuration.get().start_listen();
		},

		disable: function () {

			Gkbd.Configuration.get().stop_listen();
		}
};

function init() {

	return new keyboardLayoutIndicator({ });
}
