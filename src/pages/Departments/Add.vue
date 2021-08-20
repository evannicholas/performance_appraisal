<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md text-right">
        <h6 class="text-left">Add a new Department</h6>
        <q-input v-model="form.name" outlined type="text" label="Name" />
        <q-btn
          color="primary"
          icon="done"
          label="Submit"
          @click="submit"
          to="/departments"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  methods: {
    submit() {
      firebase.firestore().collection("departments")
        .add({
          name: this.form.name,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
  },
  mounted() {},
  data() {
    return {
      form: {
        name: "",
      },
      departments: [],
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>