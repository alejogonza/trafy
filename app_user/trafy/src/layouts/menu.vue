<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar 
           style="background: rgb(255 152 0)"
      >

        <q-toolbar-title>
          Trafy
        </q-toolbar-title>

        <div>Infracciones: {{ infracciones }}</div>
      </q-toolbar>
    </q-header>



    <q-page-container>
      <router-view @infracciones="changed"/>
    </q-page-container>
  </q-layout>
</template>

<script>


export default {
  name: 'MainLayout',

  data () {
    return {
      infracciones: 0 
    }
  },
methods:{
  changed(prop){
    this.infracciones = prop
  }
}
}
</script>
