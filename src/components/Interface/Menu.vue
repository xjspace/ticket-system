<template>
    <div>
        <v-toolbar>
            <v-toolbar-items>
                <v-btn to="/tickets/list" text>Tickets</v-btn>
                <v-btn to="/employees/list" text>Employees</v-btn>
                <v-btn to="/reports/employees" text>Reports</v-btn>
            </v-toolbar-items>
            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-btn icon>
                    <v-icon>mdi-export-variant</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-delete-circle</v-icon>
                </v-btn>
                <v-btn icon>
                    <v-icon>mdi-plus-circle</v-icon>
                </v-btn>
            </template>
        </v-toolbar>
    </div>
</template>
<script>
export default {};
</script>