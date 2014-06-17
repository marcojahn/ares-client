Ext.define('Ares.view.user.UserForm', {
    extend: 'Ext.form.Panel',

    requires: [
    ],

    alias: 'widget.userform',

    title: 'User',

    bodyPadding: 10,
    width: 450,

    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },

    // The fields
    defaultType: 'textfield',
    items: [
        {
            fieldLabel: 'Username',
            name: 'username',
            bind: '{user.username}'
        },
        {
            fieldLabel: 'First Name',
            name: 'firstnamne',
            bind: '{user.firstname}'
        },
        {
            fieldLabel: 'Last Name',
            name: 'lastname',
            bind: '{user.lastname}'
        },
        {
            fieldLabel: 'Email',
            name: 'email',
            allowBlank: false,
            bind: '{user.email}'
        },
        {
            fieldLabel: 'Usergroup', // TODO > combobox
            name: 'usergroup',
            allowBlank: false,
            bind: '{user.usergroup}'
        },
        {
            fieldLabel: 'Password',
            name: 'password',
            allowBlank: true,
            bind: '{user.password}'
        }
    ]
});