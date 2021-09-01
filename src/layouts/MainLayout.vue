<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Performance Appraisal </q-toolbar-title>

        <div><AuthButton /></div>
        <!-- <div><q-btn color="primary" :label="username" @click="onClick" /></div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered class="bg-dark">
      <q-list>
        <q-item-label header class="text-grey-1">
          
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Employee",
    caption: "",
    icon: "school",
    link: "employees",
  },
  {
    title: "Departments",
    caption: "",
    icon: "code",
    link: "departments",
  },
  {
    title: "Tasks",
    caption: "",
    icon: "chat",
    link: "tasks",
  },
  {
    title: "Assign Task",
    caption: "",
    icon: "chat",
    link: "assignedtasks",
  },
  {
    title: "Log",
    caption: "",
    icon: "chat",
    link: "logs",
  },
];

import { defineComponent, ref } from "vue";
import AuthButton from "components/AuthButton.vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    AuthButton,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
