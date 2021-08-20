<template>
  <div>
    <q-btn color="primary" icon="account_circle" :label="name" @click="dialog = !dialog" />

    <q-dialog v-model="dialog">
      <q-card>
        <q-card-section v-if="name != ''" class="q-pa-md q-gutter-md">
          <div>
            <q-btn
              color="primary"
              icon="check"
              label="Logout"
              @click="logout"
              class="full-width"
            />
          </div>
        </q-card-section>
        <q-card-section v-else class="q-pa-md q-gutter-md">
          <div>
            <q-btn
              color="primary"
              icon="check"
              label="Login"
              class="full-width"
              to="/login"
            />
          </div>
          <div>
            <q-btn
              color="primary"
              icon="check"
              label="Register"
              class="full-width"
              to="/register"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    name() {
      const user = this.$store.state.main.currentUser;
      if (user != null) {
        return user.name;
      } else {
        return "";
      }
    },
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.dialog = false;
          this.$router.push("/login");
        })
        .catch((error) => {
          // An error happened.
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>