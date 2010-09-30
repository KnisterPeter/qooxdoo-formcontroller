/* ************************************************************************
#asset(binding/*)
************************************************************************ */
qx.Class.define("binding.Application", {
  extend : qx.application.Standalone,
  members :
  {
    main : function()
    {
      this.base(arguments);
      if (qx.core.Variant.isSet("qx.debug", "on")) {
        qx.log.appender.Native;
        qx.log.appender.Console;
      }

      var doc = this.getRoot();

      var list = new qx.ui.form.List();
      doc.add(list, {left: 400, top: 50});

      var f1 = new qx.ui.form.TextField()
      var f2 = new qx.ui.form.TextField()
      var btn = new qx.ui.form.Button("Save");
      var form = new qx.ui.form.Form();
      form.addGroupHeader("Form");
      form.add(f1, "Name");
      form.add(f2, "Value");
      form.addButton(btn);
      doc.add(new qx.ui.form.renderer.Single(form), {left: 510, top: 50});

      var model = qx.data.marshal.Json.createModel([
        { "name": "name1", "value": "val1" },
        { "name": "name2", "value": "val2" }
      ]);
      var ctrl = new qx.data.controller.List(model, list, 'name');
      var formCtrl = new binding.FormController2(null, form);
      formCtrl.createModel();
      ctrl.bind('selection[0]', formCtrl, 'model');
      btn.addListener('execute', function(e) {
	formCtrl.commit();
      });
    }
  }
});

