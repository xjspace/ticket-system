<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="2"></v-col>
                    <v-col cols="4">
                        <v-menu
                            ref="menu1"
                            v-model="menu1"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="dateFormattedStartDate"
                                    label="From date"
                                    hint="DD/MM/YYYY"
                                    persistent-hint
                                    outlined
                                    @blur="
                                        start_date = parseDate(
                                            dateFormattedStartDate
                                        )
                                    "
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="start_date"
                                no-title
                                @input="menu1 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="4">
                        <v-menu
                            ref="menu2"
                            v-model="menu2"
                            :close-on-content-click="false"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                    v-model="dateFormattedEndDate"
                                    label="To date"
                                    hint="DD/MM/YYYY"
                                    persistent-hint
                                    outlined
                                    @blur="
                                        end_date = parseDate(
                                            dateFormattedEndDate
                                        )
                                    "
                                    v-on="on"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="end_date"
                                no-title
                                @input="menu2 = false"
                            ></v-date-picker>
                        </v-menu>
                    </v-col>
                    <v-col cols="2">
                        <v-btn color="primary" @click="getReport()" x-large
                            >Generate</v-btn
                        >
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12">
                        <v-data-table
                            :headers="reportHeaders"
                            :items="reportFormatter"
                            :loading="loading"
                        >
                            <template v-slot:item.from_date="{ item }">
                                {{
                                    parseDateToFormat(
                                        item.from_date,
                                        'DD/MM/YY h:mm:ss A'
                                    )
                                }}
                            </template>
                            <template v-slot:item.to_date="{ item }">
                                {{
                                    parseDateToFormat(
                                        item.to_date,
                                        'DD/MM/YY h:mm:ss A'
                                    )
                                }}
                            </template>
                        </v-data-table>
                        <div class="float-right">
                            <span class="font-weight-bold">Total:</span> {{totalHours}}
                        </div>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import moment from 'moment';

export default {
    data: vm => ({
        date: new Date().toISOString().substr(0, 10),
        dateFormattedStartDate: vm.formatDate(
            new Date().toISOString().substr(0, 10)
        ),
        dateFormattedEndDate: vm.formatDate(
            new Date().toISOString().substr(0, 10)
        ),
        menu1: false,
        menu2: false,
        start_date: new Date().toISOString().substr(0, 10),
        end_date: new Date().toISOString().substr(0, 10),
        loading: false,
        report: [],
        reportHeaders: [
            { text: 'Ticket#', value: 'id_ticket' },
            { text: 'Employee', value: 'employee' },
            { text: 'Note', value: 'note' },
            { text: 'Date Start', value: 'from_date' },
            { text: 'Date End', value: 'to_date' },
            { text: 'Hours', value: 'hours' }
        ]
    }),

    computed: {
        computedDateFormatted() {
            return this.formatDate(this.start_date);
            return this.formatDate(this.end_date);
        },
        reportFormatter() {
            let results = [];
            this.report.forEach(item => {
                item.employee = `${item.first_name} ${item.last_name}`;
                let a = moment(item.from_date);
                let b = moment(item.to_date);
                item.hours = a.diff(b, 'hours', true);
                results.push(item);
            });
            return results;
        },
        totalHours() {
            let result = 0;
            this.reportFormatter.forEach(item => {
                result += parseFloat(item.hours);
            });
            return result;
        }
    },

    watch: {
        start_date(val) {
            this.dateFormattedStartDate = this.formatDate(this.start_date);
        },
        end_date(val) {
            this.dateFormattedEndDate = this.formatDate(this.end_date);
        }
    },

    methods: {
        formatDate(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year}`;
        },
        parseDate(date) {
            if (!date) return null;

            const [day, month, year] = date.split('/');
            return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        },
        getReport() {
            this.loading = true;
            this.$store
                .dispatch('reports/get', {
                    start_date: this.start_date,
                    end_date: this.end_date
                })
                .then(response => {
                    this.report = response.data;
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        parseDateToFormat(date, format) {
            return moment(date).format(format);
        }
    }
};
</script>