Ext.define('Ares.view.login.Login', {
    extend: 'Ext.window.Window',

    requires: [
        'Ares.view.login.LoginController',
        'Ares.view.login.LoginModel',
        'Ext.form.Panel',
        'Ext.button.Button',
        'Ext.form.field.Text'
    ],

    viewModel: 'login',

    controller: 'login',
    bodyPadding: 10,
    title: 'Login - Ares',
    closable: false,

    cls: 'login',

    items: {
        xtype: 'form',
        reference: 'ref_loginForm',
        items: [
            {
                value: 'marco.jahn',
                xtype: 'textfield',
                name: 'username',
                bind: '{username}',
                fieldLabel: 'Username',
                allowBlank: false,
                enableKeyEvents: true,
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            },
            {
                value: '1234',
                xtype: 'textfield',
                name: 'password',
                inputType: 'password',
                fieldLabel: 'Password',
                allowBlank: false,
                enableKeyEvents: true,
                cls: 'password',
                listeners: {
                    specialKey: 'onSpecialKey'
                }
            },
            {
                xtype: 'displayfield',
                hideEmptyLabel: false,
                value: 'Enter any non-blank password',
                cls: 'hint'
            }
        ]
    },

    buttons: [
        {
            text: 'Login',
            listeners: {
                click: 'onLoginClick'
            }
        }
    ]
});