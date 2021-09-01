<template>
  <div class="q-pa-lg">
    <div v-if="loadingProgress > 2">
      <div class="q-pa-md text-right">
        <q-btn to="/assigntask" color="primary" icon="add" />
      </div>
      <div v-if="tasks.length > 0" class="q-pa-md">
        <div class="row q-mb-lg table-header">
          <div class="col-3">Employee</div>
          <div class="col-4">Task</div>
          <div class="col-2">Deadline</div>
          <div class="col-1">Points</div>
          <div class="col-2"></div>
        </div>
        <div class="row q-my-sm" v-for="task in tasks" :key="task.id">
          <div class="col-3">{{ employeeMap.get(task.employeeid).name }}</div>
          <div class="col-4">{{ taskMap.get(task.taskid).name }}</div>
          <div class="col-2">{{ task.deadline }}</div>
          <div class="col-1">{{ task.points }}</div>
          <div class="col-1">
            <q-btn
              small
              color="primary"
              icon="edit"
              :to="`/tasks/edit/${task.id}`"
            />
          </div>
          <div class="col-1">
            <q-btn
              small
              color="red"
              icon="delete"
              @click="deleteData(task.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <q-spinner-gears color="primary" size="3rem" :thickness="5" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  methods: {
    deleteData(id) {
      firebase
        .firestore()
        .collection("taskAssigned")
        .doc(id)
        .delete()
        .then(() => {
          firebase
            .firestore()
            .collection("log")
            .add({
              user: firebase.auth().currentUser.uid,
              timestamp: new Date(),
              action: `Unassigned task ${id}`,
              object: null,
            });
          this.loadData();
        });
    },
    loadData() {
      this.tasks = [];
      firebase
        .firestore()
        .collection("taskAssigned")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            data.id = doc.id;
            this.tasks.push(data);
          });
          this.loadingProgress++;
        });

      firebase
        .firestore()
        .collection("tasks")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            this.taskMap.set(doc.id, doc.data());
          });
          this.loadingProgress++;
        });

      firebase
        .firestore()
        .collection("employees")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            this.employeeMap.set(doc.id, doc.data());
          });
          this.loadingProgress++;
        });
    },
  },
  data() {
    return {
      tasks: [],
      taskMap: new Map(),
      employeeMap: new Map(),
      loadingProgress: 0,
    };
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style lang="scss" scoped>
</style>