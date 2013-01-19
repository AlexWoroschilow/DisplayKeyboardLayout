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
    icon: null,
    button: null,

    _init: function (meta) {

      this.meta   = meta;
      this.config = Gkbd.Configuration.get();
      
      this.config.connect('changed',        Lang.bind(this, this.doDisplayLayout));
      this.config.connect('group-changed',  Lang.bind(this, this.doDisplayLayout));
      
      this.button = new St.Bin({ style_class: 'panel-button' });
      
      this.doDisplayLayout();
    },

    getIconImage: function () {
      
      var group_id   = this.config.get_current_group();
      var group_name = this.config.get_group_name(group_id);
      
      return Gio.icon_new_for_string(this.meta.path + "/icons/" + group_name + ".svg");
    },
    
    doDisplayLayout: function () {

      var flag = new St.Icon({
        style_class: 'display-keyboard-layout-image',
        gicon: this.getIconImage(),
        icon_size: 300,
      });

      var icon = new St.Icon({
        gicon: this.getIconImage(),
        icon_size: 25,
        style_class: 'system-status-icon' 
      });
      
      this.button.set_child(icon);
      
      Main.uiGroup.add_actor(flag);

      let monitor = Main.layoutManager.primaryMonitor;

      var x = Math.floor(monitor.width / 2 - flag.width / 2);
      var y = Math.floor(monitor.height / 2 - flag.height / 2); 

      flag.set_position(x, y);

      Tweener.addTween(flag, { 
        time: 1,
        opacity: 0,
        transition: 'easeOutQuad',
        onComplete: function () {
          Main.uiGroup.remove_actor(flag);
        }
      });				
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
