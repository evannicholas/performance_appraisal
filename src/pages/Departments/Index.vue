<template>
  <div class="q-pa-lg">
    <div class="q-pa-md text-right">
      <q-btn to="/departments/add" color="primary" icon="add" />
    </div>
    <div v-if="departments.length > 0" class="q-pa-md">
      <div class="row q-mb-lg table-header">
        <div class="col-10">Department Name</div>
        <div class="col-2"></div>
      </div>
      <div
        class="row q-my-sm"
        v-for="department in departments"
        :key="department.id"
      >
        <div class="col-10">{{ department.name }}</div>
        <div class="col-1"><q-btn small color="primary" icon="edit" :to="`/departments/edit/${department.id}`" /></div>
        <div class="col-1"><q-btn small color="red" icon="delete" @click="deleteData(department.id)" /></div>
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
      departments: [],
    };
  },
  methods: {
    loadData() {
      this.departments = [];
      firebase
        .firestore()
        .collection("departments")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
            let data = doc.data();
            data.id = doc.id;
            this.departments.push(data);
          });
        });
    },
    deleteData(id){
      firebase
        .firestore()
        .collection("departments")
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