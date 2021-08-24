<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md text-right">
        <h6 class="text-left">Add a new Employee</h6>
        <q-input v-model="form.name" outlined type="text" label="Name" />
        <q-input
          v-model="form.phone_number"
          outlined
          type="text"
          label="Phone Number"
        />
        <q-input v-model="form.address" outlined type="text" label="Address" />
        <q-select
          v-model="form.dep_id"
          outlined
          :options="departementOptions"
          label="Department"
        />
        <q-btn color="red" icon="block" label="Cancel" to="/employees" />
        <q-btn color="primary" icon="done" label="Submit" @click="submit" />
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
      firebase
        .firestore()
        .collection("employees")
        .add({
          name: this.form.name,
          phone_number: this.form.phone_number,
          address: this.form.address,
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });
    },
    loadDepartments() {
      this.departmentOptions = [];
      firebase
        .firestore()
        .collection("departments")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.departementOptions.push({
              label: doc.data().name,
              value: doc.id,
            });
          });
        });
    },
  },
  mounted() {
    this.loadDepartments();
  },
  data() {
    return {
      form: {
        name: "",
        phone_number: "",
        address: "",
        dep_id: " ",
      },
      departementOptions: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>