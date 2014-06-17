Ext.define('Ares.LoginManager', {

    config: {
        /**
         * @cfg {Class} model
         * The model class from which to create the "user" record from the login.
         */
        model: null,

        /**
         * @cfg {Ext.data.Session} session
         */
        session: null
    },

    statics: {
        logout: function (options) {
            Ext.Ajax.request({
                url: '/WebService/anonymous/sessions',
                method: 'DELETE',
                scope: options.scope,
                callback: options.callback
            });
        }
    },

    constructor: function (config) {
        this.initConfig(config);
    },

    login: function(options) {
        Ext.Ajax.request({
            url: '/WebService/anonymous/sessions',
            method: 'POST',
            jsonData: options.data,
            scope: this,
            callback: this.onLoginReturn,
            original: options
        });
    },

    applyModel: function(model) {
        return model && Ext.data.schema.Schema.lookupEntity(model);
    },

    onLoginReturn: function (options, success, response) {
        options = options.original;
        var session = this.getSession(),
            resultSet;

        if (success) {
            resultSet = this.getModel().getProxy().getReader().read(response, {
                recordCreator: session ? session.recordCreator : null
            });

            if (resultSet.getSuccess()) {
                Ext.callback(options.success, options.scope, [resultSet.getRecords()[0]]);
                return;
            }
        }

        Ext.callback(options.failure, options.scope, [response, resultSet]);
    }
});