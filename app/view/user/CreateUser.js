Ext.define('Ares.view.user.CreateUser', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.RadioGroup'
    ],

    height: 245,
    itemId: 'user-createuser',
    width: 475,
    bodyPadding: 15,
    title: 'Create user',

    autoShow: true,
    modal: true,

    config: {
        userForm: null
    },

    initComponent: function() {
        this.buildUserForm();

        this.items = [
            this.getUserForm()
        ];

        this.callParent(arguments);
    },

    buildUserForm: function () {
        this.setUserForm(Ext.create('Ext.form.Panel', {
            buttons: [
                {
                    text: 'Save',
                    action: 'action',
                    formBind: true,
                    disabled: true
                }
            ],
            itemId: 'user-createuser-form',
            defaults: {
                labelWidth: 150
            },
            bodyPadding: 10,
            header: false,
            items: [
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'username',
                    fieldLabel: 'Username',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'password',
                    fieldLabel: 'Password',
                    inputType: 'password',
                    allowBlank: false
                },
                {
                    xtype: 'textfield',
                    anchor: '100%',
                    name: 'email',
                    fieldLabel: 'Email',
                    allowBlank: false
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Usergroup',
                    allowBlank: false,
                    items: [
                        {
                            name: 'usergroup',
                            boxLabel: 'Guest',
                            checked: true,
                            inputValue: 'guest'
                        },
                        {
                            name: 'usergroup',
                            boxLabel: 'User',
                            inputValue: 'user'
                        },
                        {
                            name: 'usergroup',
                            boxLabel: 'Admin',
                            inputValue: 'admin'
                        }
                    ]
                }
            ]
        }));
    }
});