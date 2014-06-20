Ext.define('Ares.view.plane.PlaneGrid', {
    extend: 'Ext.grid.GridPanel',

    requires: [
        'Ext.grid.plugin.RowEditing',
        'Ext.grid.feature.Grouping'
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

    config: {
        planetypeStore: null
    },

    initComponent: function () {
        function _ptypeRenderer (v) {
            var ptype = this.getPlanetypeStore().findRecord('type', v).get('name');
            return ptype;
        }
        var ptypeRenderer = _ptypeRenderer.bind(this);

        this.columns = this.buildColumns(ptypeRenderer);

        this.tbar = this.buildTBar();

        this.features = this.buildFeatures(ptypeRenderer);

        this.buildPlaneTypeStore();

        this.callParent(arguments);

        this.on('edit', function(editor, e) {
            // commit the changes right after editing finished
            //e.record.commit();

            this.getStore().sync();
        }, this);
    },

    buildPlaneTypeStore: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['type', 'name'],
            proxy: {
                type: 'ajax',
                url: Ares.CONFIG.URL.planes.types
            }
        });

        store.load();

        this.setPlanetypeStore(store)
    },

    reloadData: function () {
        this.getStore().load();
    },

    buildColumns: function (ptypeRenderer) {
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
                editor: null,
                renderer: ptypeRenderer
            },
            {
                text: 'Created',
                dataIndex: 'created',
                formatter: 'date("' + Ares.CONFIG.formattings.dateLong + '")',
                editor: null
            }
        ];
    },

    buildTBar: function () {
        return [
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
    },

    buildFeatures: function (ptypeRenderer) {
        var me = this;
        return [
            {
                ftype: 'grouping',
                groupHeaderTpl: [
                    '{columnName}: {name:this.getNameForType} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
                    {
                        getNameForType: ptypeRenderer
                    }
                ],
                startCollapsed: true
            }
        ];
    }
});