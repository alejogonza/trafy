<template>
  <q-page class="flex flex-center">
    <div>
      <div class="flex flex-center" v-if="loaded == true">
        <div style="text-align: center; padding:10px;width: 100%;">
          <q-img
            style="width: 100%;
    height: 100%;"
            src="~assets/rojo.svg"
          />
          <br />
          <span class="text">Semaforo rojo se acaba en {{ red }}</span>
        </div>

        <!-- <q-btn
          color="red-7"
          label="Tuve un accidente"
          style="width: 300px; margin-bottom:10px; display:block"
        />

        <q-btn color="yellow-7" label="Solicitar información del trayecto" /> -->
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
  name: "PageIndex",
  data() {
    return {
      red: 60,
      loaded: false
    };
  },

  mounted() {
    setTimeout(() => (this.loaded = true), 2000);
    setInterval(this.counter, 1000);
  },
  methods: {
    counter() {
      if(this.red == 23){
          this.$emit("infracciones", 1);

           var audio = new Audio('https://github.com/alejogonza/trafy/raw/main/app_user/trafy/src/assets/text.mp3');
   audio.play();
         this.$q.notify({
        message:
          "Cometiste una infracción de tránsito: Te pasaste un semaforo en rojo",
        color: "red",
        position: "top"
      });
      }
      setTimeout(
        () => (this.red = this.red == 0 ? (this.red = 0) : this.red - 1),
        2000
      );
    }
  }
};
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
.text {
  font-size: 25px;
  margin-bottom: 30px;
  margin-top: 10px;
  display: block;
  font-weight: 500;
}
</style>
