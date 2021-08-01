<template>
  <main class="container index">
    <!-- <todo-insert @inserted="inserted" /> -->
    <todo-list :todos="orderedTodos" />
  </main>
</template>

<script>
export default {
  name: "Index",
  components: {
    TodoInsert: () => import("../components/TodoInsert"),
    TodoList: () => import("../components/TodoList"),
  },
  async asyncData({ $axios }) {
    const data = await $axios.$get("todos");
    return { todos: data.content };
  },
  methods: {
    inserted(todo) {
      this.todos.push(todo);
    },
  },
  computed: {
    orderedTodos() {
      return this.todos.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
    },
  },
};
</script>
