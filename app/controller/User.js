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
            },
            {
                ref: 'manageLicensesWindow',
                selector: 'user-managelicenses'
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
                },
                'user-managelicenses button[action=savelicenses]': {
                    click: 'onLicenseSave'
                }
            }
        }
    },

    onLaunch: function () {
        this.planetypeStore = Ext.create('Ext.data.Store', {
            fields: ['type', 'name'],
            proxy: {
                type: 'ajax',
                url: Ares.CONFIG.URL.planes.types,
                sortParam: undefined,
                startParam: undefined,
                limitParam: undefined,
                pageParam: undefined,
                listeners: {
                    exception: function (proxy, response, operation) {
                        var errorMsg = 'Error',
                            error = Ext.JSON.decode(response.responseText);

                        if (error.reason) {
                            errorMsg = (Ares.CONFIG.REASONS[error.reason]) ? Ares.CONFIG.REASONS[error.reason] : error.reason;
                        }

                        Ext.Msg.alert('Connection Error', errorMsg);
                    }
                }

            }
        });
    },

    onReload: function () {
        this.getUserGrid().reloadData();
    },

    onCreate: function () {
        Ext.create('Ares.view.user.CreateUser');
    },

    onLicenses: function () {
        var sm = this.getUserGrid().getSelectionModel(),
            selection = sm.getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Error', 'No entry selection for license management');
        } else {
            this.openLicenseManagerAndLoadStores(selection[0]);
        }
    },

    openLicenseManagerAndLoadStores: function (user) {
        Ext.create('Ares.view.user.ManageLicenses', {
            user: user,
            planetypeStore: this.planetypeStore
        });

        this.planetypeStore.load({
            callback: function (records, operation, success) {
                if (success) {
                    this.getManageLicensesWindow().dataLoaded();
                } else {
                    Ext.Msg.alert('Error', 'Error loading planes.');
                }
            },
            scope: this
        })
    },

    onLicenseSave: function () {
        var i, planetype,
            iLen = this.planetypeStore.getCount(),
            form = this.getManageLicensesWindow().getLicenseForm().getForm(),
            licenseInformation = [];

        for (i = 0; i < iLen; i++) {
            planetype = this.planetypeStore.getAt(i);
            if (form.findField('checkbox_' + planetype.get('type')).getValue() === true) {
                licenseInformation.push({
                    planetype: planetype.get('type'),
                    validUntil: form.findField('datefield_' + planetype.get('type')).getValue()
                });
            }
        }

        var sm = this.getUserGrid().getSelectionModel(),
            selection = sm.getSelection();

        selection[0].set('licenses', licenseInformation);
        this.getUserGrid().getStore().add(selection);

        this.getManageLicensesWindow().setLoading(true);

        this.getUserGrid().getStore().sync({
            success: function () {
                this.getManageLicensesWindow().setLoading(false);
                this.getManageLicensesWindow().close();
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
            success: function () {
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