<template>
  <main class="viewer">
    <div class="container">
      <nav class="buttons">
        <button v-if="editing" @click="editing = false">
          <i class="material-icons">arrow_back</i>
          <span>Voltar</span>
        </button>
        <nuxt-link v-else to="/">
          <i class="material-icons">arrow_back</i>
          <span>Voltar</span>
        </nuxt-link>

        <button v-if="!editing" @click="editing = true">
          <i class="material-icons">edit</i>
          <span>Editar</span>
        </button>

        <button @click.prevent="remove">
          <i class="material-icons">delete</i>
          <span>Excluir</span>
        </button>
      </nav>

      <time
        v-if="todo.updatedAt"
        :datetime="$options.filters.dateFormat(todo.updatedAt)"
      >
        Atualizado em {{ todo.updatedAt | dateFormat("DD/MM/YY") }} às
        {{ todo.updatedAt | dateFormat("HH:mm") }}
      </time>
      <time v-else :datetime="$options.filters.dateFormat(todo.createdAt)">
        Criado em {{ todo.createdAt | dateFormat("DD/MM/YY") }} às
        {{ todo.createdAt | dateFormat("HH:mm") }}
      </time>

      <form>
        <input
          v-if="editing"
          v-model.lazy="todo.title"
          maxlength="50"
          placeholder="Título da tarefa"
        />
        <h2 v-else>{{ todo.title }}</h2>

        <textarea
          v-if="editing"
          v-model.lazy="todo.description"
          cols="30"
          rows="10"
          maxlength="2000"
          placeholder="Descrição da tarefa"
        />
        <p v-else-if="todo.description">{{ todo.description }}</p>
      </form>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const id = params.id;
    const data = await $axios.$get(`todos/${id}`);
    return { todo: data };
  },
  data() {
    return { editing: false };
  },
  methods: {
    async remove() {
      const id = this.todo.id;
      await this.$axios.$delete(`todos/${id}`);
      this.$router.push("/");
    },

    async update(todo) {
      const id = this.todo.id;
      const data = await this.$axios.$put(`todos/${id}`, this.todo);
      this.todo = data;
    },
  },
  watch: {
    "todo.title"() {
      this.update();
    },
    "todo.description": function () {
      this.update();
    },
  },
};
</script>

<style>
.viewer {
  padding: 4rem 0 3rem;
}

.viewer .container {
  display: flex;
  flex-flow: column;
}

.viewer .buttons {
  align-self: center;
  display: flex;
  padding-bottom: 1rem;
}

.viewer .buttons a,
.viewer .buttons button {
  display: flex;
  align-items: center;
  text-decoration: none;
  border: none;
  background: transparent;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
}

.viewer .buttons a:hover,
.viewer .buttons button:hover {
  background: #e0e0e0;
}

.viewer .buttons a:active,
.viewer .buttons button:active {
  background: #d0d0d0;
}

.viewer .buttons span {
  margin-left: 4px;
}

.viewer h2 {
  margin: 0.5rem 0 0.25rem;
}

.viewer form {
  display: flex;
  flex-flow: column;
  text-align: center;
}

.viewer form input,
.viewer form textarea {
  margin-bottom: 1rem;
  text-align: center;
}

.viewer time {
  display: block;
  text-align: center;
  font-size: 0.75em;
  padding-bottom: 1em;
  color: rgba(0, 0, 0, 0.57);
}
</style>
