Ext.define('Ares.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',

    loginText: 'Logging in...',

    constructor: function () {
        this.callParent(arguments);

        console.log('LoginController::constructor')

        this.loginManager = new Ares.LoginManager({
            session: this.session,
            model: 'User'
        });
    },

    onSpecialKey: function (field, e) {
        if (e.getKey() === e.ENTER) {
            this.doLogin();
        }
    },

    onLoginClick: function () {
        this.doLogin();
    },

    doLogin: function () {
        var form = this.lookupReference('ref_loginForm');

        if (form.isValid()) {
            Ext.getBody().mask(this.loginText);

            this.loginManager.login({
                data: form.getValues(),
                scope: this,
                success: 'onLoginSuccess',
                failure: 'onLoginFailure'
            });
        }
    },

    onLoginFailure: function () {
        console.log('loginFailure - TODO');
        Ext.getBody().unmask();
    },

    onLoginSuccess: function(user) {
        Ext.getBody().unmask();

        //var org = this.lookupReference('organization').getSelectedRecord();
        this.fireViewEvent('login', this.getView(), user, this.loginManager);
    }
});