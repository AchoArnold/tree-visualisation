<template>
  <div id="app">
      <h1>Tree Visualizer</h1>
      <div v-if="dataIsLoaded">
          <ItemsTreeVisualiser :items-tree-root="itemsTreeRoot"></ItemsTreeVisualiser>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ItemsDataFetcherService, { ItemData } from '@/services/ItemsDataFetcherService';
import keys from '@/keys';
import ItemsTreeBuilder from '@/services/ItemsTreeBuilder';
import { ItemsTreeNode } from '@/entities/ItemsTree';
import ItemsTreeVisualiser from '@/components/ItemsTreeVisualiser.vue';

@Component({
  name: 'App',
  components: {
    ItemsTreeVisualiser
  }
})
export default class App extends Vue {
  private itemsTreeRoot ?: ItemsTreeNode;
  private dataIsLoaded: boolean = false;

  mounted() {
    const itemsDataFetcher = new ItemsDataFetcherService(keys.GET_ITEMS_ENDPOINT)
    const itemsTreeBuilder = new ItemsTreeBuilder()

    itemsDataFetcher.fetch().then((items: ItemData[]) => {
      this.itemsTreeRoot = itemsTreeBuilder.build(items)
      this.dataIsLoaded = true;
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
