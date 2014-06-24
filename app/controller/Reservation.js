Ext.define('Ares.controller.Reservation', {
    extend: 'Ext.app.Controller',

    config: {

        refs: [
            {
                ref: 'availablePlanesGrid',
                selector: 'reservation-availableplanesgrid'
            },
            {
                ref: 'reservationsGrid',
                selector: 'reservation-reservationsgrid'
            },
            {
                ref: 'createReservationWindow',
                selector: 'reservation-createreservation'
            }
        ],

        listen: {
            component: {
                'reservation-availableplanesgrid': {
                    rowdblclick: 'onItemDblClick'
                },
                'reservation-reservationsgrid': {
                    processworkflow: 'onProcessWorkflow'
                },
                'reservation-createreservation button[action=createReservation]': {
                    click: 'onCreateReservation'
                }
            }
        }
    },

    onLaunch: function () {

    },

    onProcessWorkflow: function (record) {

        var recordId = record.get('reservationId'),
            wfConfig = Ares.CONFIG.WORKFLOW.status[record.get('status')];

        if (Ext.isArray(wfConfig.next)) {

            var win = Ext.create('Ext.window.MessageBox', {
                width: 300,
                height: 100,
                buttons: [
                    {
                        text: Ares.CONFIG.WORKFLOW.status[wfConfig.next[0]].value,
                        workflowStep: wfConfig.next[0],
                        handler: function (btn) {
                            this.updateWorkflow(recordId, btn.workflowStep);
                            win.close();
                        },
                        scope: this
                    },
                    {
                        text: Ares.CONFIG.WORKFLOW.status[wfConfig.next[1]].value,
                        workflowStep: wfConfig.next[1],
                        handler: function (btn) {
                            this.updateWorkflow(recordId, btn.workflowStep);
                            win.close();
                        },
                        scope: this
                    }
                ]
            });

            win.show({
                title: 'Choose',
                msg: 'next workflwo step',
                icon: Ext.Msg.QUESTION
            });

        } else {
            this.updateWorkflow(recordId, wfConfig.next);
        }
    },

    updateWorkflow: function (recordId, step) {
        Ext.Ajax.request({
            method: 'PUT',
            url: Ares.CONFIG.URL.reservation.processWorkflow + '/' + recordId,
            jsonData: {
                nextStep: step
            },
            callback: function (options, success, response) {
                if (success) {
                    this.getReservationsGrid().reloadData();
                } else {
                    Ext.Msg.alert('Error', response.responseText);
                }
            },
            scope: this
        });
    },

    onItemDblClick: function () {
        var sm = this.getAvailablePlanesGrid().getSelectionModel();

        Ext.widget('reservation-createreservation', {
            plane: sm.getSelection()[0]
        });
    },

    onCreateReservation: function () {
        var startdate, enddate,
            sm = this.getAvailablePlanesGrid().getSelectionModel(),
            selection = sm.getSelection()[0],
            form = this.getCreateReservationWindow().getDateForm().getForm();


        startdate = Ext.Date.parse(Ext.Date.format(form.findField('startdate').getValue(), 'Y-m-d') + ' ' + Ext.Date.format(form.findField('starttime').getValue(), 'g:i:s A'), 'Y-m-d g:i:s A');
        enddate = Ext.Date.parse(Ext.Date.format(form.findField('enddate').getValue(), 'Y-m-d') + ' ' + Ext.Date.format(form.findField('endtime').getValue(), 'g:i:s A'), 'Y-m-d g:i:s A');

        var newReservation = {
            plane: selection.get('plane'),
            planetype: selection.get('planetype'),
            start: startdate,
            until: enddate,
            by: Ares.CONFIG.CURRENT_USER.username,
            status: Ares.CONFIG.WORKFLOW.start
        };

        this.getReservationsGrid().getStore().add(newReservation);
        this.getReservationsGrid().getStore().sync({
            success: function () {
                this.getReservationsGrid().reloadData();
                this.get
            },
            failure: function (batch, options) {
                if (batch.hasException()) {
                    var error = batch.getExceptions()[0].getError();
                    Ext.Msg.alert(error.status + ' - ' + error.statusText, error.response.responseText);

                }
                this.getReservationsGrid().reloadData();
            },
            scope: this
        });

        this.getCreateReservationWindow().close();
    }
});