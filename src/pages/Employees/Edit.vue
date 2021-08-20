<template>
  <div>
    <div class="row q-pa-md">
      <div class="col q-gutter-md q-pa-md">
        <h6 class="text-left">Edit {{form.name}}</h6>
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
          v-model="form.dep_id"
          outlined
          :options="departementOptions"
          label="Department"
        />
         <q-btn color="red" icon="block" label="Cancel" to ="/employees" />
        <q-btn color="primary" icon="done" label="Submit" @click="submit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    submit() {
     
    },
  },
  mounted() {
    
  },
  data() {
    return {
      form: {
        emp_id: this.$route.params.id,
        name: "",
        phone_number: "",
        address: "",
        dep_id: "",
      },
      departments: [],
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