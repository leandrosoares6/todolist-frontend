<template>
  <main class="container index">
    <!-- <todo-insert @inserted="inserted" /> -->
    <todo-list />
  </main>
</template>

<script>
export default {
  name: "Index",
  components: {
    // TodoInsert: () => import("../components/TodoInsert"),
    TodoList: () => import("../components/TodoList"),
  },
  methods: {
    inserted(todo) {
      this.todos.push(todo);
    },
  },
};
</script>
