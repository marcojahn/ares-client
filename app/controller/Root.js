Ext.define('Ares.controller.Root', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ares.view.login.Login',
        'Ares.LoginManager',
        'Ares.view.main.Main'
    ],

    loadingText: 'Loading...',

    config: {
        control: {
            '#app-header button[action=logout]': {
                click: 'onLogout'
            }
        }
    },

    onLaunch: function () {
        console.log('Root::onLaunch')
        this.showLogin();
    },

    showLogin: function () {
        var session = this.session = new Ext.data.Session();

        this.login = new Ares.view.login.Login({
            session: session,
            autoShow: true,
            listeners: {
                scope: this,
                login: 'onLogin'
            }
        });
    },

    onLogout: function () {
        console.log('logout button pressed');
        Ares.LoginManager.logout({
            callback: function () {
                Ext.ComponentQuery.query('viewport')[0].destroy();
                this.showLogin();
            },
            scope: this
        });
    },

    onLogin: function (loginController, user, loginManager) {
        this.login.destroy();

        this.loginManager = loginManager;
        this.user = user;

        this.showUi();
    },

    showUi: function () {
        this.viewPort = new Ares.view.main.Main({
            session: this.session,
            viewModel: {
                data: {
                    currentUser: this.user
                }
            }
        });
    },

    getSession: function () {
        return this.session;
    }

});
