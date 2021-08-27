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
          v-model="form.department"
          outlined
          :options="departementOptions"
          label="Department"
          emit-value
          map-options
        />
        <q-btn color="red" icon="block" label="Cancel" to="/employees" />
        <q-btn
          :loading="isSubmitting"
          color="primary"
          icon="done"
          label="Submit"
          @click="submit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
export default {
  methods: {
    submit() {
      this.isSubmitting = true;
      // this.form.department = this.departmentSelect.value;
      firebase
        .firestore()
        .collection("employees")
        .add(this.form)
        .then((docref) => {
          this.isSubmitting = false;
          console.log("Document successfully written!");

          firebase
            .firestore()
            .collection("log")
            .add({
              user: firebase.auth().currentUser.uid,
              timestamp: new Date(),
              action: `Created a new employee ${docref.id}`,
              object: this.form,
            });
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
        department: "",
      },
      departmentSelect: "",
      departementOptions: [],
      isSubmitting: false,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>