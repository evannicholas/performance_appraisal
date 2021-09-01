<template>
  <div class="q-pa-md q-gutter-md">
    <q-select
      v-model="form.employeeid"
      outlined
      :options="employeeOptions"
      label="Employees"
      emit-value
      map-options
    />
    <q-select
      v-model="form.taskid"
      outlined
      :options="taskOptions"
      label="Tasks"
      emit-value
      map-options
    />
    <div v-if="form.taskid != ''">
      <q-date v-model="form.deadline" minimal />
      <q-input v-model="form.points" type="text" label="Points" />
      <q-btn
        class="q-ma-md"
        color="primary"
        icon="check"
        label="Assign"
        @click="onClick"
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";

export default {
  methods: {
    loadEmployees() {
      this.employeeOptions = [];
      firebase
        .firestore()
        .collection("employees")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.employeeOptions.push({
              label: doc.data().name,
              value: doc.id,
            });
          });
        });
    },
    loadTasks() {
      this.taskOptions = [];
      firebase
        .firestore()
        .collection("tasks")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            this.taskOptions.push({
              label: doc.data().name,
              value: doc.id,
            });
            this.taskMap.set(doc.id, {
              deadline: doc.data().deadline,
              points: doc.data().points,
            });
          });
        });
    },
  },
  data() {
    return {
      employeeOptions: null,
      taskOptions: null,
      taskMap: new Map(),
      form: {
        employeeid: "",
        taskid: "",
        deadline: "",
        points: "",
      },
    };
  },
  watch: {
    "form.taskid"(newValue, oldValue) {
      const selectedTask = this.taskMap.get(this.form.taskid);
      this.form.points = selectedTask.points;
      const today = new Date();
      today.setDate(today.getDate() + parseInt(selectedTask.deadline));
      // this.form.deadline = `${today.getFullYear()}/${today.getUTCMonth()}/${today.getUTCDate()}`;
      this.form.deadline = today.toLocaleDateString("zh-Hans-CN", {
        // you can use undefined as first argument
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
    },
  },
  mounted() {
    this.loadEmployees();
    this.loadTasks();
  },
};
</script>

<style lang="scss" scoped>
</style>