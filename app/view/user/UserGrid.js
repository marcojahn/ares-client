Ext.define('Ares.view.user.UserGrid', {
    extend: 'Ext.grid.GridPanel',

    requires: [
        'Ext.grid.plugin.RowEditing'
    ],

    store: 'Ares.store.Users',

    itemId: 'user-usergrid',
    alias: 'widget.user-usergrid',

    title: 'Users',

    autoScroll: true,

    //height: 300,
    //width: 600,

    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],

    initComponent: function () {
        this.columns = this.buildColumns();

        this.tbar = [
            {
                text: 'Reload',
                glyph: 'xf021@FontAwesome',
                action: 'reload'
            },
            {
                text: 'Create',
                glyph: 'xf067@FontAwesome',
                action: 'create'
            },
            {
                text: 'delete',
                glyph: 'xf014@FontAwesome',
                action: 'delete'
            },
            {
                text: 'change password',
                glyph: 'xf023@FontAwesome',
                action: 'changepassword'
            }
        ];

        this.callParent(arguments);

        this.on('edit', function(editor, e) {
            // commit the changes right after editing finished
            //e.record.commit();

            this.getStore().sync();
        }, this);
    },

    reloadData: function () {
        this.getStore().load();
    },

    buildColumns: function () {
        return [
            {
                text: 'ID',
                dataIndex: 'userId',
                width: 200,
                editor: null
            },
            {
                text: 'First name',
                dataIndex: 'firstname',
                editor: 'textfield'
            },
            {
                text: 'Last name',
                dataIndex: 'lastname',
                editor: 'textfield'
            },
            {
                text: 'User name',
                dataIndex: 'username',
                width: 250,
                editor: null
            },
            {
                text: 'Email',
                dataIndex: 'email',
                width: 350,
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },
            {
                text: 'User group',
                dataIndex: 'usergroup',
                //renderer: 'renderUsergroup',
                width: 250,
                editor: null
            },
            {
                text: 'Created',
                dataIndex: 'created',
                formatter: 'date("Y-m-d")',
                editor: null
            }
        ];
    }
});