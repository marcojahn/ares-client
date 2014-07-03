Ext.define('Ares.view.reservation.CreateReservation', {
    extend: 'Ext.window.Window',

    requires: [
        'Ext.form.Panel',
        'Ext.form.FieldSet',
        'Ext.form.field.Date',
        'Ext.form.field.Time',
        'Ares.overrides.VTypes'
    ],

    height: 274,
    width: 348,
    bodyPadding: 10,
    title: 'Create reservation',

    autoShow: true,
    modal: true,
    itemId: 'reservation-createreservation',
    alias: 'widget.reservation-createreservation',

    config: {
        plane: null,
        dateForm: null
    },

    initComponent: function() {
        this.buildDateForm();

        this.items = [
            this.getDateForm()
        ];

        this.callParent(arguments);
    },

    buildDateForm: function () {
        // booking date max value
        var i,
            user = Ares.CONFIG.CURRENT_USER,
            licenses = user.licenses,
            iLen = licenses.length,
            dateMaxValue = undefined;

        for (i = 0; i < iLen; i++) {
            if (licenses[i].planetype === this.getPlane().get('planetype')) {
                dateMaxValue = licenses[i].validUntil;
                break;
            }
        }

        this.setDateForm(Ext.create('Ext.form.Panel', {
            buttons: [
                {
                    text: 'Reserve plane',
                    action: 'createReservation',
                    disabled: true,
                    formBind: true
                }
            ],
            items: [
                {
                    xtype: 'fieldset',
                    title: 'From',
                    items: [
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'Date',
                            minValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 0),
                            maxValue: Ext.Date.subtract(new Date(dateMaxValue), Ext.Date.DAY, 1),
                            allowBlank: false,
                            name: 'startdate',
                            itemId: 'startdate',
                            vtype: 'daterange',
                            endDateField: 'enddate'
                        },
                        {
                            xtype: 'timefield',
                            anchor: '100%',
                            fieldLabel: 'Time',
                            increment: 60,
                            allowBlank: false,
                            name: 'starttime'
                        }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Until',
                    items: [
                        {
                            xtype: 'datefield',
                            anchor: '100%',
                            fieldLabel: 'Date',
                            minValue: Ext.Date.subtract(new Date(), Ext.Date.DAY, 0),
                            maxValue: Ext.Date.subtract(new Date(dateMaxValue), Ext.Date.DAY, 1),
                            allowBlank: false,
                            name: 'enddate',
                            itemId: 'enddate',
                            vtype: 'daterange',
                            startDateField: 'startdate'
                        },
                        {
                            xtype: 'timefield',
                            anchor: '100%',
                            fieldLabel: 'Time',
                            increment: 60,
                            allowBlank: false,
                            name: 'endtime'
                        }
                    ]
                }
            ]
        }));
    }
});