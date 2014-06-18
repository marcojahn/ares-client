Ext.define('Ares.view.plane.PlaneGrid', {
    extend: 'Ext.grid.GridPanel',

    requires: [
        'Ext.grid.plugin.RowEditing'
    ],

    store: 'Ares.store.Planes',

    itemId: 'plane-planegrid',
    alias: 'widget.plane-planegrid',

    title: 'Planes',

    autoScroll: true,

    flex: 20,

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
                dataIndex: 'planeId',
                width: 200,
                editor: null
            },
            {
                text: 'Plane',
                dataIndex: 'plane',
                editor: 'textfield'
            },
            {
                text: 'Plane type',
                dataIndex: 'planetype',
                //editor: 'textfield'
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