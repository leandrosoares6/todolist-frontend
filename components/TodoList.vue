<template>
  <v-card class="mx-auto" max-width="700">
    <v-list two-line>
      <v-list-item-group>
        <template v-for="(item, index) in todos">
          <v-list-item :key="item.title">
            <nuxt-link :to="item.id">
              <template>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>

                  <v-list-item-subtitle
                    class="text--primary"
                    v-text="item.description"
                  ></v-list-item-subtitle>

                  <v-list-item-subtitle>
                    Atualizado em
                    {{ item.updatedAt | dateFormat("DD/MM/YY") }} às
                    {{ item.updatedAt | dateFormat("HH:mm") }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
            </nuxt-link>
          </v-list-item>

          <v-divider v-if="index < todos.length - 1" :key="index"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    todos: Array,
  },
  computed: {
    updatedAtLongDate() {
      return;
    },
  },
};
</script>
