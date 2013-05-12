const Lang 		  	= imports.lang;
const Gkbd 		  	= imports.gi.Gkbd;
const Me 		  	= imports.misc.extensionUtils.getCurrentExtension();
const Panel			= imports.ui.main.panel;

const Icon = Me.imports.icon;
const Flag = Me.imports.flag;


function keyboardLayoutIndicator (parameters) {
	this._init(parameters);
}

keyboardLayoutIndicator.prototype = {	

		icon: undefined,
		flag: undefined,

		_init: function (parameters) { 
			
		},

		_index: function () {
			return Panel._rightBox.get_children().length - 1;			
		},

		enable: function () {
			this.icon = new Icon.KeyboardLayoutIcon({ });
			this.flag = new Flag.KeyboardLayoutFlag({ }); 

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
	return new keyboardLayoutIndicator({ });
}
