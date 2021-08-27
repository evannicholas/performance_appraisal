<template>
  <div class="q-pa-md q-gutter-md">
    <div v-if="logs != null">
      <div class="row" v-for="log in logs" :key="log.timestamp">
        <div class="col-2">
          <!-- {{ log.timestamp.seconds }} -->
          {{ new Date(log.timestamp.seconds * 1000).toLocaleString() }}
        </div>
        <div class="col-2 q-pa-md">{{ log.user }}</div>
        <div class="col-2 q-pa-md">{{ log.action }}</div>
        <div class="col-3 q-pa-md">{{ log.previous }}</div>
        <div class="col-3 q-pa-md">{{ log.object }}</div>
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
      logs: null,
    };
  },
  mounted() {
    firebase
      .firestore()
      .collection("log")
      .orderBy("timestamp", "desc")
      .get()
      .then((snapshot) => {
        this.logs = [];
        snapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
          this.logs.push(doc.data());
        });
      });
  },
};
</script>

<style lang="scss" scoped>
</style>