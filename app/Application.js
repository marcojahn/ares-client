/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('Ares.Application', {
    extend: 'Ext.app.Application',

    autoCreateViewport: false, // prevent viewport creation

    requires: [
        'Ares.CONFIG',
        'Ares.view.Viewport',
        'Ares.view.login.LoginWindow'
    ],

    views: [
        // TODO: add views here
    ],

    controllers: [
        'Ares.controller.Viewport',
        'Ares.controller.User',
        'Ares.controller.Plane',
        'Ares.controller.Monitoring'
    ],

    stores: [
        'Ares.store.Users',
        'Ares.store.Planes',
        'Ares.store.ResourceAggregations'
    ],

    onBeforeLaunch: function () {
        var loginWindow = Ext.create('Ares.view.login.LoginWindow');

        loginWindow.on('loginvalid', function (user) {
            loginWindow.destroy();

            Ares.CONFIG.CURRENT_USER = user;

            Ext.app.Application.prototype.onBeforeLaunch.call(this);
        }, this);

        loginWindow.show();
    },

    launch: function () {
        Ext.create('Ares.view.Viewport');
    }
});
