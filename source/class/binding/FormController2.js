qx.Class.define("binding.FormController2", {
  extend : qx.data.controller.Form,
  construct: function(model, target) {
    this.base(arguments, model, target);
    this.__setUpBinding = this.setUpUnibinding;
  },
  members : {

    setUpUnibinding : function() {
      // create the object controller
      if (this.__objectController == null) {
        this.__objectController = new qx.data.controller.Object(this.getModel());
      }

      // get the form items
      var items = this.getTarget().getItems();

      // connect all items
      for (var name in items) {
        var item = items[name];
        var targetProperty =
          this.__isModelSelectable(item) ? "modelSelection[0]" : "value";
        var options = this.__bindingOptions[name];

        if (options == null) {
          this.__objectController.addTarget(item, targetProperty, name, false);
        } else {
          this.__objectController.addTarget(
            item, targetProperty, name, false, options[0], options[1]
          );
        }
      }
    },

    reset: function() {
      var items = this.getTarget().getItems();
      for (var name in items) {
        var item = items[name];
        item.setValue(this.getModel()['get' + name];
      }
    },

    commit: function() {
      var items = this.getTarget().getItems();
      for (var name in items) {
        var item = items[name];
        this.getModel()['set' + name](item.getValue());
      }
    }

  }
});

