<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md">
        <h6 class="text-left">Edit {{ form.name }}</h6>
        <q-input
          v-model="$route.params.id"
          outlined
          type="text"
          label="ID"
          readonly
        />
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
          color="primary"
          icon="done"
          label="Submit"
          to="/employees"
          @click="submit"
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
      const parameter = this.$route.params.id;
      firebase
        .firestore()
        .collection("employees")
        .doc(parameter)
        .set({
          name: this.form.name,
          phone_number: this.form.phone_number,
          address: this.form.address,
          department: this.form.department,
        })
        .then(() => {
          firebase
            .firestore()
            .collection("log")
            .add({
              user: firebase.auth().currentUser.uid,
              timestamp: new Date(),
              action: `Edited employee ${parameter}`,
              previous: this.form_previous,
              object: this.form,
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
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
    firebase
      .firestore()
      .collection("employees")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.form.name = doc.data().name;
          this.form.phone_number = doc.data().phone_number;
          this.form.address = doc.data().address;
          this.form.department = doc.data().department;
          this.form_previous = { ...this.form };
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  },
  data() {
    return {
      form: {
        name: "",
        phone_number: "",
        address: "",
        department: "",
      },
      form_previous: {},
      departmentSelect: "",
      departementOptions: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>