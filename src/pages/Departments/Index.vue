<template>
  <div class="q-pa-lg">
    <div class="q-pa-md text-right">
      <q-btn to="/departments/add" color="primary" icon="add" />
    </div>
    <div v-if="departments.length > 0" class="q-pa-md">
      <div class="row q-mb-lg table-header">
        <div class="col-1">ID</div>
        <div class="col-9">Department Name</div>
        <div class="col-2"></div>
      </div>
      <div class="row q-my-sm" v-for="department in departments" :key="department.id">
        <div class="col-1">{{ department.dep_id }}</div>
        <div class="col-9">{{ department.dep_name }}</div>
        <div class="col-1">
        </div>
        <div class="col-1"><q-btn small color="red" icon="delete" /></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      departments: [],
    };
  },
  methods: {
    loadData() {
      
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