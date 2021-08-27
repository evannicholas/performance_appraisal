<template>
  <div class="q-pa-lg">
    <div class="q-pa-md text-right">
      <q-btn to="/tasks/add" color="primary" icon="add" />
    </div>
    <div v-if="tasks.length > 0" class="q-pa-md">
      <div class="row q-mb-lg table-header">
        <div class="col-3">Task Name</div>
        <div class="col-4">Details</div>
        <div class="col-2">Duration</div>
        <div class="col-1">Points</div>
        <div class="col-2"></div>
      </div>
      <div
        class="row q-my-sm"
        v-for="task in tasks"
        :key="task.id"
      >
        <div class="col-3">{{ task.name }}</div>
        <div class="col-4">{{ task.details }}</div>
        <div class="col-2">{{ task.deadline }}</div>
        <div class="col-1">{{ task.points }}</div>
        <div class="col-1"><q-btn small color="primary" icon="edit" :to="`/tasks/edit/${task.id}`" /></div>
        <div class="col-1"><q-btn small color="red" icon="delete" @click="deleteData(task.id)" /></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    loadData() {
      this.tasks = [];
      firebase
        .firestore()
        .collection("tasks")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            data.id = doc.id;
            this.tasks.push(data);
          });
        });
    },
    deleteData(id){
      firebase
        .firestore()
        .collection("tasks")
        .doc(id)
        .delete()
        .then(() => {
          this.loadData();
        });
    }
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  font-weight: bold;
}
</style>