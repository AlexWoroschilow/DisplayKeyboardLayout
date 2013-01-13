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

    _init: function (meta) {
      
      this.meta   = meta;
      this.config = Gkbd.Configuration.get();
      
      this.config.connect('changed',        Lang.bind(this, this.doDisplayLayout));
      this.config.connect('group-changed',  Lang.bind(this, this.doDisplayLayout));
    },

    doDisplayLayout: function (display, screen, window, binding) {

      var group_id   = this.config.get_current_group();
      var group_name = this.config.get_group_name(group_id);

      var text = new St.Icon({
        gicon: Gio.icon_new_for_string(this.meta.path + "/icons/"+group_name+".png"),
        style_class: 'display-keyboard-layout-image',
        icon_size: 300,
      });

      Main.uiGroup.add_actor(text);

      let monitor = Main.layoutManager.primaryMonitor;

      var x = Math.floor(monitor.width / 2 - text.width / 2);
      var y = Math.floor(monitor.height / 2 - text.height / 2); 

      text.set_position(x, y);

      Tweener.addTween(text, { 
        time: 1,
        opacity: 0,
        transition: 'easeOutQuad',
        onComplete: function () {
          Main.uiGroup.remove_actor(text);
        }
      });				
    },

    enable: function () {
      
      this.config.start_listen();
      
    },

    disable: function () {
      
      this.config.stop_listen();
    }
};

function init(extensionMeta) {

  return new DisplayKeyboardLayout(extensionMeta);
}
