<template>
  <q-page class="flex flex-center">
    <div style="max-width: 100%; text-align:center; padding: 50px">
      <h5
        class="segoeBold"
        style="font-size:24px;margin-top:25px; margin-bottom: 10px; color: #16335E"
      >
        Hola, bienvenido a
      </h5>
      <img
        alt="Encantate logo"
        src="~assets/logo.svg"
        style="max-width: 80%;margin-bottom:10px"
      />
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          style="text-transform:lowercase;"
          outlined
          color="orange-4"
          v-model="placa"
          label-slot
          clearable
          no-error-icon
          clear-icon="cancel"
          lazy-rules
          :rules="[
            val =>
             fieldValidate(val, 6, 6) ||
              'Por favor ingresa un numero de placa valido'
          ]"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events" style="text-transform: none;">
              <q-icon class="q-mr-xs" color="orange-4" size="24px" name="pin" />
              Tu numero de placa
            </div>
          </template>
        </q-input>

        <q-input
          outlined
          color="orange-4"
          v-model="password"
          label-slot
          no-error-icon
          :type="isPwd ? 'password' : 'text'"
          lazy-rules
          :rules="[val => (val && val.length > 7) || 'Minimo 8 caracteres']"
        >
          <template v-slot:label>
            <div class="row items-center all-pointer-events">
              <q-icon
                class="q-mr-xs"
                color="orange-4"
                size="24px"
                name="vpn_key"
              />
              Tu contraseña
            </div>
          </template>

          <template v-slot:append>
            <q-icon
              color="orange-4"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

        <div class="flex flex-center">
          <button
            style="background: rgb(255 152 0);color:white;border:none;padding:9px; border-radius:8px; margin-bottom:18px"
            type="submit"
            class="full-width"
          >
            Iniciar Sesión
          </button>
        </div>

        <div style="background: transparent; text-align:center; padding:20px">
          <span class="segoeBold" style="color:#A5A0A0;"
            >¿No tienes cuenta?
            <span
              class="segoeBold"
              style="color:#ffb74d;"
              @click="redirect('/register')"
              >Registrate</span
            >
          </span>
        </div>
      </q-form>
    </div>
  </q-page>
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
  name: "PageIndex",
  data() {
    return {
      email: null,
      password: null,
      isPwd: true,
      error: null
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
    redirect(e) {
      console.log(e);
      this.$router.push(e);
    },
    async onSubmit() {
      try {
        this.$q.loading.show();
        const response = await this.$axios.post("/user/login", {
          placa: this.placa.toLowerCase(),
          password: this.password
        });
        window.localStorage.setItem("autenticate", response.data.auth);
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
