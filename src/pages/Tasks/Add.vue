<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md text-right">
        <h6 class="text-left">Add a new Template</h6>
        <q-input v-model="form.name" outlined type="text" label="Name" />
        <q-input v-model="form.details" outlined type="text" label="Details" />
        <q-input v-model="form.deadline" outlined type="text" label="Duration (Days)" />
        <q-input v-model="form.points" outlined type="text" label="Points" />
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
      firebase.firestore().collection("tasks")
        .add({
          name: this.form.name,
          details: this.form.details,
          deadline: this.form.deadline,
          points: this.form.points,
        })
        .then((docref) => {
          firebase
            .firestore()
            .collection("log")
            .add({
              user: firebase.auth().currentUser.uid,
              timestamp: new Date(),
              action: `Created a task ${docref.id}`,
              object: this.form,
            });
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
        details: "",
        deadline: "",
        points: "",
      },
    };
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
</style>