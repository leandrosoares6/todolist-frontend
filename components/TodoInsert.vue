<template>
  <form class="todo-insert" @submit.prevent="insert">
    <input placeholder="O que precisa ser feito?"
      v-model="title" maxlength="50" autofocus>
  </form>
</template>

<script>
export default {
  data () {
    return { title: '' }
  },
  methods: {
    async insert () {
      if (this.title) {
        let todo = await this.$axios.$post('todos', { title: this.title })
        this.$emit('inserted', todo)
        this.title = ''
      }
    }
  }
}
</script>

<style>
.todo-insert {
  padding: 4rem 0 3rem;
  display: flex;
  justify-content: center;
}

.todo-insert input {
  min-width: 300px;
  max-width: 600px;
  width: 80%;
  text-align: center;
}
</style>
