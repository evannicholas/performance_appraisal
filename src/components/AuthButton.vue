<template>
  <div>
    <q-btn color="primary" :label="name" />
  </div>
</template>

<script>
export default {
  computed: {
    name() {
      const user = this.$store.state.main.currentUser;
      if (user != null) {
        return user.name;
      } else {
        return "Login";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>