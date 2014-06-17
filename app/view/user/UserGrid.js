Ext.define('Ares.view.user.UserGrid', {
    extend: 'Ext.grid.GridPanel',

    requires: [
        'Ext.grid.Panel',
        'Ext.grid.column.Action'
    ],

    alias: 'widget.usergrid',

    title: 'Users',

    /*selModel: {
        allowDeselect: true
    },*/

    tbar: [
        '->',
        {
            text: 'Create',
            handler: 'onCreateClick'
        },
        {
            text: 'Save',
            handler: 'onSaveClick'
        },
        {
            text: 'Delete',
            handler: 'onDeleteClick'
        },
        {
            text: 'Refresh',
            handler: 'onRefreshClick'
        }
    ],

    columns: [
        {
            text: 'ID',
            dataIndex: 'userId',
            width: 200
        },
        {
            text: 'First name',
            dataIndex: 'firstname'
        },
        {
            text: 'Last name',
            dataIndex: 'lastname'
        },
        {
            text: 'User name',
            dataIndex: 'username',
            width: 250
        },
        {
            text: 'Email',
            dataIndex: 'email',
            width: 350
        },
        {
            text: 'User group',
            dataIndex: 'usergroup',
            renderer: 'renderUsergroup',
            width: 250
        },
        {
            text: 'Created',
            dataIndex: 'created',
            formatter: 'date("Y-m-d")'
        },
        {
            text: 'Password',
            dataIndex: 'password'
        }
    ]
});