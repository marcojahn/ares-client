Ext.define('Ares.controller.User', {
    extend: 'Ext.app.Controller',

    config: {

        refs: [
            {
                ref: 'userGrid',
                selector: 'user-usergrid'
            },
            {
                ref: 'createUserWindow',
                selector: '#user-createuser'
            }
        ],

        listen: {
            component: {
                'user-usergrid button[action=reload]': {
                    click: 'onReload'
                },
                'user-usergrid button[action=create]': {
                    click: 'onCreate'
                },
                'user-usergrid button[action=delete]': {
                    click: 'onDelete'
                },
                'user-usergrid button[action=licenses]': {
                    click: 'onLicenses'
                },
                'user-usergrid button[action=changepassword]': {
                    click: 'onChangePassword'
                },
                '#user-createuser #user-createuser-form button[action=action]': {
                    click: 'onUserCreate'
                }
            }
        }
    },

    onReload: function () {
        this.getUserGrid().reloadData();
    },

    onCreate: function () {
        Ext.create('Ares.view.user.CreateUser');
    },

    onLicenses: function () {
        Ext.create('Ares.view.user.ManageLicenses');
    },

    onDelete: function () {
        var sm = this.getUserGrid().getSelectionModel(),
            selection = sm.getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Error', 'No entry selection for deletion');
        } else {
            this.getUserGrid().getStore().remove(selection);
            this.getUserGrid().getStore().sync();
        }
    },

    onUserCreate: function () {
        var form = this.getCreateUserWindow().getUserForm().getForm(),
            userData = {
                username: form.findField('username').getValue(),
                password: form.findField('password').getValue(),
                email: form.findField('email').getValue(),
                usergroup: form.findField('usergroup').getGroupValue()
            };

        this.getUserGrid().getStore().add(userData);
        this.getUserGrid().getStore().sync({
            success: function () {
                this.getUserGrid().reloadData();
            },
            failure: function (batch, options) {
                if (batch.hasException()) {
                    var error = batch.getExceptions()[0].getError();
                    Ext.Msg.alert(error.status + ' - ' + error.statusText, error.response.responseText);

                }
                this.getUserGrid().reloadData();
            },
            scope: this
        });

        this.getCreateUserWindow().close();
    },

    onChangePassword: function () {
        Ext.Msg.alert('TODO', 'To be implemented')
    }
});