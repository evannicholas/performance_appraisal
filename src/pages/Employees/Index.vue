<template>
  <div class="q-pa-lg">
    <div class="q-pa-md text-right">
      <q-btn to="/employees/add" color="primary" icon="add" />
    </div>
    <div v-if="employees.length > 0" class="q-pa-md">
      <div class="row q-mb-lg table-header">
        <div class="col-1">ID</div>
        <div class="col-2">Name</div>
        <div class="col-2">Phone Number</div>
        <div class="col-3">Address</div>
        <div class="col-2">Department</div>
        <div class="col-2"></div>
      </div>
      <div class="row q-my-sm" v-for="employee in employees" :key="employee.id">
        <div class="col-1">{{ employee.id }}</div>
        <div class="col-2">{{ employee.name }}</div>
        <div class="col-2">{{ employee.phone_number }}</div>
        <div class="col-3">{{ employee.address }}</div>
        <div class="col-2">{{ employee.department }}</div>
        <div class="col-1">
          <q-btn
            small
            color="primary"
            icon="edit"
            :to="`/employees/edit/${employee.id}`"
          />
        </div>
        <div class="col-1">
          <q-btn
            small
            color="red"
            icon="delete"
            @click="deletePopupOn(employee)"
          />
        </div>
      </div>
    </div>

    <q-dialog v-model="deletePopup" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="red" text-color="white" />
          <span class="q-ml-sm"
            >Are you sure you want to delete?.</span
          >
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="white" v-close-popup />
          <q-btn flat label="Delete" color="red" v-close-popup @click="deleteEmployee" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/firestore";
export default {
  data() {
    return {
      employees: [],
      deletePopup : false,
      employeeToBeDeleted: null,
    };
  },
  methods: {
    loadData() {
      this.employees = [];
      firebase
        .firestore()
        .collection("employees")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            data.id = doc.id;
            this.employees.push(data);
          });
        });
    },
    deletePopupOn(employee){
      this.employeeToBeDeleted = employee;
      this.deletePopup = true;
    },
    deleteEmployee() {
      firebase
        .firestore()
        .collection("employees")
        .doc(id)
        .delete()
        .then(() => {
          this.loadData();
        });
    },
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