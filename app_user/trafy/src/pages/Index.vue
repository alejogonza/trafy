<template>
  <q-page class="flex flex-center">
<div>
<div v-if="loaded == true">
    <div style="text-align: center; padding:10px" v-if="broken" >
    <q-img style="width: 100%;
    height: 100%;" src="~assets/apagado.svg"/>
    <br>
<h4>Semaforo en mal estado</h4>
</div>

    <div style="text-align: center; padding:10px" v-if="green">
    <q-img style="width: 100%;
    height: 100%;" src="~assets/verde.svg"/>
    <br>
<h4>Semaforo verde en {{green.mts}} mts</h4>
</div>

    <div style="text-align: center; padding:10px" v-if="red" >
    <q-img style="width: 100%;
    height: 100%;" src="~assets/apagado.svg"/>
    <br>
<h4>Semaforo rojo en {{red.mts}} mts</h4>
</div>

    <div style="text-align: center; padding:10px" v-if="yellow">
    <q-img style="width: 100%;
    height: 100%;" src="~assets/apagado.svg"/>
    <br>
<h4>Semaforo amarillo en {{yellow.mts}} mts</h4>
</div>

<q-btn color="primary" label="Tuve un accidente" />
<q-btn color="primary" label="Solicitar información del trayecto" />

</div>
<div v-else style="text-align: center; padding:10px">
    <img
      class="ball-one"
      alt="Encantate logo"
      src="~assets/logo.svg"
      style="width: 200px;margin:auto"
    />
</div>
</div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data(){
  return{
    broken: null,
    green: null,
    red: null,
    yellow: null,
    loaded: false
  }
}
}

</script>
<style>
.ball-one {
  animation: jump 0.5s ease 0s infinite alternate;
}
@keyframes jump {
  0% {
    transform: scaleY(0.8);
  }
  100% {
    transform: translateY(-70px);
  }
}
</style>