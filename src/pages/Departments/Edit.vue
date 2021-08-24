<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md text-right">
        <h6 class="text-left">Edit Department</h6>
        <q-input
          v-model="$route.params.id"
          outlined
          type="text"
          label="ID"
          readonly
        />
        <q-input v-model="form.name" outlined type="text" label="Name" />
        <q-btn color="dark" label="back" to="/departments" />
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
      firebase
        .firestore()
        .collection("departments")
        .doc(this.$route.params.id)
        .set({
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
  mounted() {
    firebase
      .firestore()
      .collection("departments")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.form.name = doc.data().name;
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
      },
    };
  },
  computed: {
    departementOptions() {
      let options = [];
      this.departments.forEach((dep) => {
        options.push({
          label: dep.dep_name,
          value: dep.dep_id,
        });
      });
      return options;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>