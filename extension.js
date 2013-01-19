const St 		= imports.gi.St;
const Lang 		= imports.lang;
const Gio 		= imports.gi.Gio;
const Main 		= imports.ui.main;
const Gkbd 		= imports.gi.Gkbd;
const Tweener   = imports.ui.tweener;
const PanelMenu = imports.ui.panelMenu;
const Meta 		= imports.gi.Meta;

function DisplayKeyboardLayout(extensionMeta) {

  this._init(extensionMeta);
};

DisplayKeyboardLayout.prototype = {

    __proto__: PanelMenu.Button.prototype,

    meta: 	null,
    config: null,
    button: null,

    _init: function (meta) {

      this.meta   = meta;
      this.config = Gkbd.Configuration.get();
      this.button = new St.Bin({ style_class: 'panel-button' });
      
      this.config.connect('changed',        Lang.bind(this, this._displayLayoutIcon));
      this.config.connect('group-changed',  Lang.bind(this, this._displayLayoutIcon));
      
      this.config.connect('changed',        Lang.bind(this, this._displayLayoutFlag));
      this.config.connect('group-changed',  Lang.bind(this, this._displayLayoutFlag));
      
      this._displayLayoutIcon();
    },

    getIconImage: function () {
      var group_id   = this.config.get_current_group();
      var group_name = this.config.get_group_name(group_id);
      return Gio.icon_new_for_string(this.meta.path + "/icons/" + group_name + ".svg");
    },

    getPositionX: function (width) {
      return Math.floor(Main.layoutManager.primaryMonitor.width / 2 - width / 2);
    },
    
    getPositionY: function (height) {
      return Math.floor(Main.layoutManager.primaryMonitor.height / 2 - height / 2);
    },
    
    _displayLayoutFlag: function () {
      var flag = new St.Icon({
        style_class: 'display-keyboard-layout-image',
        gicon: this.getIconImage(),
        icon_size: 300,
        x: this.getPositionX(300),
        y: this.getPositionY(300),
      });
      Main.uiGroup.add_actor(flag);
      Tweener.addTween(flag, { 
        time: 1,
        opacity: 0,
        transition: 'easeOutQuad',
        onComplete: function () {
          Main.uiGroup.remove_actor(flag);
        }
      });				
    },

    _displayLayoutIcon: function () {
      var icon = new St.Icon({
        gicon: this.getIconImage(),
        icon_size: 25,
        style_class: 'system-status-icon' 
      });
      this.button.set_child(icon);
    },
    
    enable: function () {
      Main.panel._rightBox.insert_child_at_index(this.button, 0);      
      this.config.start_listen();
    },

    disable: function () {
      Main.panel._rightBox.remove_child(this.button);      
      this.config.stop_listen();
    }
};

function init(extensionMeta) {

  return new DisplayKeyboardLayout(extensionMeta);
}
