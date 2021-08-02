<template>
  <main class="container index">
    <todo-list />
  </main>
</template>

<script>
export default {
  name: "Index",
  components: {
    TodoList: () => import("../components/TodoList"),
  },
};
</script>
