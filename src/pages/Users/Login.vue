<template>
  <div class="q-pa-md q-gutter-md">
    <q-input required v-model="email" type="email" label="Email" @keydown.enter="login" />
    <q-input required v-model="password" type="password" label="Password" @keydown.enter="login" />
    <q-btn color="primary" label="Login" @click="login" />
  </div>
</template>

<script>
import firebase from "firebase/app";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.$router.push("/");
        })
        .catch((error) => {
          this.$q.notify({
            message: error.message,
            color: "red",
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>