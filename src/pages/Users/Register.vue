<template>
  <q-form class="columns q-pa-md q-gutter-md" @submit="register">
    <h5>Register a new account</h5>
    <div>
      <q-input v-model="user.name" type="text" required label="Name" />
    </div>
    <div>
      <q-input v-model="user.email" type="email" required label="Email" />
    </div>
    <div>
      <q-input
        v-model="user.password"
        type="password"
        required
        label="Password"
      />
    </div>
    <div>
      <q-input
        required
        v-model="temp.passwordRepeat"
        type="password"
        label="Enter password again"
      />
    </div>
    <div><q-btn type="submit" color="primary" label="Register" /></div>
  </q-form>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: {
        email: "",
        password: "",
        name: "",
      },
      temp: {
        passwordRepeat: "",
      },
    };
  },
  methods: {
    register() {
      if (this.user.password == this.temp.passwordRepeat) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((userCredential) => {
            this.$q.notify({
              message: "Registration success",
              color: "primary",
            });
            userCredential.user.updateProfile({
              displayName: this.user.name,
              // photoURL: "https://example.com/jane-q-user/profile.jpg",
            });
            // verify signup
            // Back to employee list
          })
          .catch((error) => {
            this.$q.notify({
              message: error.message,
              color: "red",
            });
          });
      } else {
        this.$q.notify({
          message: "Password is not matched",
          color: "red",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>