<template>
<div class="container-content">
    <div class="content-view">
  <v-card class="mx-auto" style="min-width:50%; margin: 50px">
    <v-container>
      <h1>ADMIN PANEL</h1>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="12" sm="12" md="12" lg="12" xl="12">Here you can edit your company details.</v-col>
      </v-row>
    </v-container>
  </v-card>
  </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Admin"
})
export default class Admin extends Vue {}
</script>
