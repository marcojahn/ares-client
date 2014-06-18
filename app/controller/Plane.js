Ext.define('Ares.controller.Plane', {
    extend: 'Ext.app.Controller',

    config: {

        refs: [
            {
                ref: 'planeGrid',
                selector: 'plane-planegrid'
            },
            {
                ref: 'createPlaneWindow',
                selector: '#plane-createplane'
            }
        ],

        listen: {
            component: {
                'plane-planegrid button[action=reload]': {
                    click: 'onReload'
                },
                'plane-planegrid button[action=create]': {
                    click: 'onCreate'
                },
                'plane-planegrid button[action=delete]': {
                    click: 'onDelete'
                },
                '#plane-createplane #plane-createplane-form button[action=action]': {
                    click: 'onPlaneCreate'
                }
            }
        }
    },

    onReload: function () {
        this.getPlaneGrid().reloadData();
    },

    onCreate: function () {
        Ext.create('Ares.view.plane.CreatePlane');
    },

    onDelete: function () {
        var sm = this.getPlaneGrid().getSelectionModel(),
            selection = sm.getSelection();

        if (selection.length === 0) {
            Ext.Msg.alert('Error', 'No entry selection for deletion');
        } else {
            this.getPlaneGrid().getStore().remove(selection);
            this.getPlaneGrid().getStore().sync();
        }
    },

    onPlaneCreate: function () {
        var form = this.getCreatePlaneWindow().getPlaneForm().getForm(),
            planeData = {
                plane: form.findField('plane').getValue(),
                planetype: form.findField('planetype').getValue()
            };

        console.log('on plane create')

        this.getPlaneGrid().getStore().add(planeData);
        this.getPlaneGrid().getStore().sync({
            success: function () {
                this.getPlaneGrid().reloadData();
            },
            scope: this
        });

        this.getCreatePlaneWindow().close();
    }
});