const Gtk 			= imports.gi.Gtk;
const Gio 			= imports.gi.Gio;
const GObject 		= imports.gi.GObject;
const GtkBuilder 	= Gtk.Builder;
const Me 			= imports.misc.extensionUtils.getCurrentExtension();
const Convenience 	= Me.imports.convenience;


const KeyboardLayoutFlagPrefsWidget = new GObject.Class({
	
	Name: 'KeyboardLayoutFlag.Prefs.Widget',
	GTypeName: 'KeyboardLayoutFlagExtensionPrefsWidget',
	Extends: Gtk.Box,

	Window : new Gtk.Builder(),
	
	_init: function(params) {
		
		this.parent(params);

		this.Window.add_from_file( this._getPathDefault() + '/keyboard-layout-flag.ui');

		(function (that, switcher) {
			switcher.set_active(that._settings().get_boolean('control-show-on-panel'));
			switcher.connect('notify::active', function (widget, value) {
				that._settings().set_boolean(widget.get_name(), widget.get_active());
			});
		})(this, this.Window.get_object('control-show-on-panel'));

		
		(function (that, switcher) {
			switcher.set_active(that._settings().get_boolean('control-show-on-screen'));
			switcher.connect('notify::active', function (widget, value) {
				that._settings().set_boolean(widget.get_name(), widget.get_active());
			});
		})(this, this.Window.get_object('control-show-on-screen'));
		

		(function (that, spin) {
			spin.set_range(0, 35);
			spin.set_increments(1, 10);
			spin.set_value(that._settings().get_int('control-size-on-panel'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-size-on-panel'));

		
		(function (that, spin) {
			spin.set_range(0, 1000);
			spin.set_increments(1, 10, 100, 1000);
			spin.set_value(that._settings().get_int('control-size-on-screen'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-size-on-screen'));
		
		
		(function (that, spin) {
			spin.set_range(0, 1000);
			spin.set_increments(1, 10, 100, 1000);
			spin.set_value(that._settings().get_int('control-opacity-on-panel'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-opacity-on-panel'));
		
		
		(function (that, spin) {
			spin.set_range(0, 1000);
			spin.set_increments(1, 10, 100, 1000);
			spin.set_value(that._settings().get_int('control-opacity-on-screen'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-opacity-on-screen'));
		
		
		(function (that, spin) {
			spin.set_range(0, 1000);
			spin.set_increments(1, 10, 100, 1000);
			spin.set_value(that._settings().get_int('control-opacity-on-tween'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-opacity-on-tween'));
		

		(function (that, spin) {
			spin.set_range(1, 10);
			spin.set_increments(1, 10);
			spin.set_value(that._settings().get_int('control-time-on-tween'));
			spin.connect('value-changed', function (widget, value) {
				that._settings().set_int(widget.get_name(), widget.get_value());
			});
		})(this, this.Window.get_object('control-time-on-tween'));
		
		
		this.add(this.Window.get_object('main-widget'));
	},
	
	_getPathDefault: function ( ) {
		return Me.dir.get_path();
	},
	
	_settings: function () {
		return Convenience.getSettings();
	}
});


function init() { }

function buildPrefsWidget()
{
	let Widget = new KeyboardLayoutFlagPrefsWidget({ });
	Widget.show_all();
	return Widget;
}
