  <template>
  <client-only>
    <v-data-table
      :page="page"
      :pageCount="numberOfPages"
      :options.sync="options"
      :server-items-length="totalTodos"
      :loading="loading"
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
          clearable
          outlined
          ref="searchref"
          v-model="search"
          label="Pesquisar"
          class="mx-4"
        ></v-text-field>
        <v-row justify="end">
          <v-btn @click="reset" color="warning" class="mx-2 my-4">
            <v-icon left> mdi-eraser </v-icon>
            Limpar
          </v-btn>
          <v-btn color="info" class="mx-2 my-4">
            <v-icon left> mdi-magnify </v-icon>
            Consultar
          </v-btn>
          <v-btn color="success" class="ms-2 me-7 my-4">
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
  data() {
    return {
      search: "",
      searchref: null,
      headers: [
        {
          text: "Titulo",
          align: "start",
          sortable: false,
          value: "title",
        },
        { text: "Descrição", value: "description" },
        { text: "Data Criação", value: "createdAtFormatted" },
      ],
      loading: true,
      page: 1,
      numberOfPages: 0,
      todos: [],
      totalTodos: 0,
      options: {},
    };
  },
  watch: {
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  methods: {
    reset() {
      this.$refs.searchref.reset();
    },
    async readDataFromAPI() {
      this.loading = true;
      const { page, itemsPerPage } = this.options;
      let pageNumber = page - 1;
      await this.$axios
        .$get("todos?size=" + itemsPerPage + "&page=" + pageNumber)
        .then((response) => {
          this.loading = false;
          this.todos = response.content.map((todo) => {
            return {
              ...todo,
              createdAtFormatted: this.$options.filters.dateFormat(
                todo.createdAt, "DD/MM/YYYY"
              ),
            };
          });
          this.totalTodos = response.totalElements;
          this.numberOfPages = response.totalPages;
        });
    },
    mounted() {
      this.readDataFromAPI();
    },
  },
};
</script>
