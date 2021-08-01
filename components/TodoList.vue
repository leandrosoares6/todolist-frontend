  <template>
  <client-only>
    <v-data-table
      :headers="headers"
      :items="todos"
      :items-per-page="10"
      :search="search"
      class="elevation-1"
      :footer-props="{
        showFirstLastPage: true,
        itemsPerPageText: 'Registros por página',
      }"
    >
      <template v-slot:top>
        <v-text-field
          v-model="search"
          label="Pesquisar"
          class="mx-4"
        ></v-text-field>
        <v-row justify="center">
          <v-btn tile color="warning" class="mx-2 my-4">
            <v-icon left> mdi-eraser </v-icon>
            Limpar
          </v-btn>
          <v-btn tile color="info" class="mx-2 my-4">
            <v-icon left> mdi-magnify </v-icon>
            Consultar
          </v-btn>
          <v-btn tile color="success" class="mx-2 my-4">
            <v-icon left> mdi-plus </v-icon>
            Nova Tarefa
          </v-btn>
        </v-row>
      </template>
      ></v-data-table
    >
  </client-only>
</template>

<script>
export default {
  props: {
    todos: Array,
  },
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Titulo",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Descrição", value: "description" },
        { text: "Data Criação", value: "createdAt" },
      ],
    };
  },
};
</script>
