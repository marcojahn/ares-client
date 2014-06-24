Ext.define('Ares.view.user.UserGrid', {
    extend: 'Ext.grid.GridPanel',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping'
    ],

    store: 'Ares.store.Users',

    itemId: 'user-usergrid',
    alias: 'widget.user-usergrid',

    title: 'Users',

    autoScroll: true,

    selType: 'rowmodel',
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToEdit: 2
        })
    ],

    features: [
        {
            ftype: 'grouping',
            groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})', startCollapsed: true
        }
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
            },
            {
                text: 'licenses',
                glyph: 'xf19d@FontAwesome',
                action: 'licenses'
            }
        ];

        this.callParent();

        this.on('edit', function (editor, e) {
            // commit the changes right after editing finished
            //e.record.commit();

            this.getStore().sync();
        }, this);
    },

    reloadData: function () {
        this.getStore().load();
    },

    buildColumns: function () {
        return {
            defaults: {
                flex: 1
            },
            items: [
                {
                    text: 'ID',
                    dataIndex: 'userId',
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
                    text: 'Licenses',
                    dataIndex: 'licenses',
                    editor: null,
                    renderer: function (v) {
                        // check if any license is invalid
                        var i, license,
                            licenses = Ext.isArray(v) ? v : [],
                            iLen = licenses.length,
                            invalidLicenses = 0;

                        for (i = 0; i < iLen; i++) {
                            license = licenses[i];
                            if (new Date(license.validUntil) < Ext.Date.subtract(new Date(), Ext.Date.DAY, 1)) {
                                invalidLicenses++;
                            }
                        }
                        return (invalidLicenses === 0) ? licenses.length : licenses.length + ' (invalid: ' + invalidLicenses + ')';
                    }
                },
                {
                    text: 'User name',
                    dataIndex: 'username',
                    editor: null
                },
                {
                    text: 'Email',
                    dataIndex: 'email',
                    editor: {
                        xtype: 'textfield',
                        allowBlank: false
                    }
                },
                {
                    text: 'User group',
                    dataIndex: 'usergroup',
                    editor: null
                },
                {
                    text: 'Created',
                    dataIndex: 'created',
                    formatter: 'date("' + Ares.CONFIG.formattings.dateLong + '")',
                    editor: null
                }
            ]
        };
    }
});