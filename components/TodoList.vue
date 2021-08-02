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
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Atualizar tarefa</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.title"
                      label="Título"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Descrição"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.status"
                      label="Status"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Você realmente deseja excluir este item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancelar</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      ></v-data-table
    >
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogDelete: false,
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
        { text: "Ações", align: "right", sortable: false, value: "actions" },
      ],
      loading: true,
      page: 1,
      numberOfPages: 0,
      todos: [],
      totalTodos: 0,
      options: {},
      editedItem: {
        item: "",
        description: "",
      },
      defaultItem: {
        item: "",
        description: "",
      },
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
    options: {
      handler() {
        this.readDataFromAPI();
      },
    },
    deep: true,
  },
  methods: {
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
                todo.createdAt,
                "DD/MM/YYYY"
              ),
            };
          });
          this.totalTodos = response.totalElements;
          this.numberOfPages = response.totalPages;
        });
    },
    editItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      this.editedIndex = this.todos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.$axios
        .$delete("todos/" + this.todos[this.editedIndex].id)
        .then(() => {
          this.todos.splice(this.editedIndex, 1);
          this.closeDelete();
          this.readDataFromAPI();
        });
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    save() {
      if (this.editedIndex > -1) {
        this.$axios
          .$put("todos/" + this.todos[this.editedIndex].id, this.editedItem)
          .then(() => {
            Object.assign(this.todos[this.editedIndex], this.editedItem);
            this.close();
            this.readDataFromAPI();
          });
      } else {
        this.$axios.$post("todos", this.editedItem).then(() => {
          this.todos.push(this.editedItem);
          this.close();
          this.readDataFromAPI();
        });
      }
    },
    mounted() {
      this.readDataFromAPI();
    },
    reset() {
      this.$refs.searchref.reset();
    },
  },
};
</script>
