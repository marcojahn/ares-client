Ext.define('Ares.view.login.LoginWindow', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.Label'
    ],

    height: 196,
    itemId: 'login-loginwindow',
    width: 400,
    bodyPadding: 15,
    closable: false,
    title: 'Ares Login',

    initComponent: function () {
        Ext.applyIf(this, {
            items: [
                this.buildForm()
            ]
        });

        this.callParent(arguments);
    },

    buildForm: function () {
        var me = this;

        return {
            xtype: 'form',
            itemId: 'login-loginwindow-loginform',
            defaults: {
                labelWidth: 150
            },
            bodyPadding: 10,
            header: false,
            submit: function () {
                var form = this.getForm(),
                    username = form.findField('username'),
                    password = form.findField('password');

                Ext.Ajax.request({
                    url: '/WebService/anonymous/sessions',
                    method: 'POST',
                    jsonData: {
                        username: username.getValue(),
                        password: password.getValue()
                    },
                    scope: this,
                    callback: function (options, success, response) {
                        var result = Ext.JSON.decode(response.responseText);
                        if (success) {
                            me.fireEvent('loginvalid', result);
                        } else {
                            Ext.Msg.alert('Loginerror', Ares.CONFIG.getReason(result.reason));
                        }
                    }
                });
            },
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Username',
                    name: 'username',
                    allowBlank: false,
                    blankText: 'Enter username'

                    ,value: 'marco.jahn'
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    fieldLabel: 'Password',
                    name: 'password',
                    inputType: 'password',
                    allowBlank: false,
                    blankText: 'Enter password'

                    ,value: '1234'
                }
            ],
            buttons: [
                {
                    xtype: 'button',
                    text: 'login',
                    formBind: true,
                    disabled: true,
                    align: 'right',
                    handler: function () {
                        this.up('#login-loginwindow-loginform').submit();
                    }
                }
            ]
        };
    }

});