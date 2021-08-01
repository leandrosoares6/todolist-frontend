<template>
  <nav class="app-menu">
    <nuxt-link to="/">
      <v-icon large color="purple darken-2"> mdi-format-list-checks </v-icon>
      <h1>Tarefas</h1>
    </nuxt-link>
  </nav>
</template>

<style>
.app-menu {
  display: flex;
  justify-content: center;
  padding: 0.5rem 0 0.25rem;
  background: #fff;
  border-bottom: 1px solid #bdbdbd;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
}

.app-menu a {
  display: inline-flex;
  text-decoration: none;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
}

.app-menu h1 {
  margin: 0 0 0 0.5rem;
}
</style>

