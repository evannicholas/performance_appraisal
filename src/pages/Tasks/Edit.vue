<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md text-right">
        <h6 class="text-left">Edit Tasks</h6>
        <q-input
          v-model="$route.params.id"
          outlined
          type="text"
          label="ID"
          readonly
        />
        <q-input v-model="form.name" outlined type="text" label="Name" />
        <q-input v-model="form.details" outlined type="text" label="Details" />
        <q-input v-model="form.deadline" outlined type="text" label="Duration(days)" />
        <q-input v-model="form.points" outlined type="text" label="Points" />
        <q-btn color="dark" label="back" to="/tasks" />
        <q-btn
          color="primary"
          icon="done"
          label="Submit"
          @click="submit"
          to="/tasks"
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
        .collection("tasks")
        .doc(this.$route.params.id)
        .set({
          name: this.form.name,
          details: this.form.details,
          deadline: this.form.deadline,
          points: this.form.points,
        })
        .then(() => {
          firebase
            .firestore()
            .collection("log")
            .add({
              user: firebase.auth().currentUser.uid,
              timestamp: new Date(),
              action: `Edited task ${parameter}`,
              previous: this.form_previous,
              object: this.form,
            });
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
      .collection("tasks")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          this.form.name = doc.data().name;
          this.form.details = doc.data().details;
          this.form.deadline = doc.data().deadline;
          this.form.points = doc.data().points;
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
        details: "",
        deadline: "",
        points: "",
      },
      form_previous:{},
    };
  },
 
};
</script>

<style lang="scss" scoped>
</style>