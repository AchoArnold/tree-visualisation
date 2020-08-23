<template>
    <div id="app">
        <h1 class="text-xl font-bold">Tree Visualizer</h1>
        <div v-if="dataIsLoaded">
            <ItemsTreeVisualiser
                :items-tree-root="itemsTreeRoot"
            ></ItemsTreeVisualiser>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import ItemsDataFetcherService, {
  ItemData,
} from '@/services/ItemsDataFetcherService';
import keys from '@/keys';
import ItemsTreeBuilder from '@/services/ItemsTreeBuilder';
import { ItemsTreeNode } from '@/entities/ItemsTree';
import ItemsTreeVisualiser from '@/components/ItemsTreeVisualiser.vue';

@Component({
  name: 'App',
  components: {
    ItemsTreeVisualiser,
  },
})
export default class App extends Vue {
    private itemsTreeRoot?: ItemsTreeNode;

    private dataIsLoaded = false;

    mounted() {
      const itemsDataFetcher = new ItemsDataFetcherService(
        keys.GET_ITEMS_ENDPOINT,
      );

      itemsDataFetcher
        .fetch()
        .then((items: ItemData[]) => {
          this.itemsTreeRoot = ItemsTreeBuilder.build(items);
          this.dataIsLoaded = true;
        })
        .catch(() => {
          /* eslint-disable */
                /**
                 * ON production this should be handled gracefully
                 */
                alert('Error fetching the tree items from the API');
                /* eslint-enable */
        });
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
