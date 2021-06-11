<template>
  <div style="text-align: center; padding: 30px">
    <h6
      class="segoeBold"
      style="font-size:24px; margin-bottom: 25px;margin-top:20px; color: #16335E"
    >
      Inscribe tu vehículo 🚖
    </h6>
    <q-form @submit="onSubmit">
      <q-input
        style="margin-bottom:10px"
        outlined
          color="orange-4"
        v-model="name"
        label-slot
        clearable
        label="Tu nombre"
        no-error-icon
        lazy-rules
        :rules="[
          val =>
            fieldValidate(val, 5, 50) || 'Por favor ingresa un nombre valido'
        ]"
      >
      </q-input>
      <q-input
        style="margin-bottom:10px;text-transform:lowercase;"
        outlined
          color="orange-4"
        v-model="placa"
        label-slot
        clearable
        label="Placa de tu vehículo"
        no-error-icon
        @blur="validatePlaca"
        lazy-rules
        :rules="[
          val =>
            fieldValidate(val, 6, 6) || 'Por favor ingresa una placa valida'
        ]"
      >
      </q-input>
      <q-input
        outlined
        color="orange-4"
        v-model="password"
        label-slot
        no-error-icon
        :type="isPwd ? 'password' : 'text'"
        lazy-rules
        label=" Tu contraseña"
        :rules="[val => (val && val.length > 7) || 'Minimo 8 caracteres']"
      >
        <template v-slot:append>
          <q-icon
              color="orange-4"
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <q-input
        style="margin-bottom:10px"
        outlined
          color="orange-4"
        v-model="confirmPassword"
        label-slot
        clearable
        label="Confirmar contraseña"
        no-error-icon
        :type="isPwdconfirm ? 'password' : 'text'"
        lazy-rules
        :rules="[
          val => password == confirmPassword || 'Los campos no coinciden'
        ]"
      >
            <template v-slot:append>
          <q-icon
              color="orange-4"
            :name="isPwdconfirm ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwdconfirm = !isPwdconfirm"
          />
        </template>
      </q-input>
      <div class="flex flex-center">
        <button
          style="background: rgb(255 152 0);color:white;border:none;padding:9px; border-radius:8px; margin-bottom:18px"
          type="submit"
          class="full-width"
        >
          Continuar
        </button>
      </div>
    </q-form>
    <div style="background: transparent; text-align:center; padding:20px">
      <span class="segoeBold" style="color:#ffb74d;" @click="toLogin()"
        >¿Ya tienes una cuenta?</span
      >
    </div>
  </div>
</template>
<style>
@font-face {
  font-family: SegoeUI-Bold;
  src: url(/css/fonts/SegoeUI-Bold.woff);
}

.segoeBold {
  font-family: "Segoe UI";
  font-weight: bold;
  font-style: normal;
}
</style>
<script>
export default {
  data() {
    return {
      name: null,
      placa: null,
      password: null,
      confirmPassword: null,
      isPwd: true,
      isPwdconfirm: true
    };
  },
  methods: {
    fieldValidate(e, min, max) {
      if (e) {
        let validate = e.length < min || e.length > max;
        return validate == true ? (validate = false) : (validate = true);
      } else {
        return false;
      }
    },
        async validatePlaca() {
      if (this.placa != null && this.placa.length == 6) {
        try {
         await this.$axios.post("user/placa-validate", {
            placa: this.placa
          });
          return true;
        } catch (error) {
          this.placa = "";
          console.error(error.response.data);
          this.$q.notify({
            group: false,
            message: error.response.data.data[0],
            color: "red",
            position: "top"
          });
          return false;
        }
      }
    },

    toLogin() {
      this.$router.push("/login");
    },
  async onSubmit() {
      try {
        this.$q.loading.show();
        const response = await this.$axios.post("/user/register", {
          name: this.name,
          placa: this.placa,
          password: this.password
        });
        window.localStorage.setItem("autenticate", response.data.success);
        this.$store.commit("userData/updateToken", {
          token: response.data.token
        });
        this.$store.commit("userData/updateUser", {
          user: response.data.user
        });
        this.$q.loading.hide();
        this.$router.push("/");
      } catch (error) {
        this.$q.loading.hide();
        console.error(error.response.data);
        this.$q.notify({
          message: error.response.data.message,
          color: "red",
          position: "top"
        });
      }
    
    }
  }
};
</script>
