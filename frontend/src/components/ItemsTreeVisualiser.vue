<template>
    <!-- eslint-disable max-len -->
    <div>
        <div class="max-w-sm inline-block text-left" v-if="hasActiveNode">
            <div
                class="border border-green-400 bg-white rounded p-4 flex flex-col justify-between leading-normal"
            >
                <div class="mb-2">
                    <button
                        @click="onTreeNodeClick(activeNodeId)"
                        class="float-right text-red-700 font-bold -mt-4 -mr-4 text-2xl px-2 focus:outline-none outline-none"
                    >
                        &times;
                    </button>
                    <p>Name: {{ getDomNode(activeNodeId).title }}</p>
                    <p>
                        Description: {{ getDomNode(activeNodeId).description }}
                    </p>
                </div>
            </div>
        </div>

        <template v-for="node in nodes">
            <div
                v-if="node.type === 'node'"
                class="border-2 border-gray-900 tree-node absolute flex items-center cursor-pointer"
                :class="{ 'tree-node--active': treeNodeActive(node.id) }"
                :key="node.id"
                :id="node.id"
                :style="{ top: node.top + 'px', left: node.left + 'px' }"
                @click="onTreeNodeClick(node.id)"
            >
                <div class="mx-auto">
                    {{ node.title }}
                </div>
            </div>
            <div
                :key="node.id"
                class="absolute"
                v-if="node.type === 'line'"
                :style="{
                    top: node.startTop + 'px',
                    left: node.startLeft + 'px',
                    width: node.stopLeft - node.startLeft + 1 + 'px',
                    height: node.stopTop - node.startTop + 'px'
                }"
            >
                <svg
                    :height="(node.stopTop - node.startTop)"
                    :width="(node.stopLeft - node.startLeft + 1)"
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="100%"
                        y2="100%"
                        style="stroke: #000; stroke-width: 1;"
                    />
                </svg>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
import {
  Vue, Component, Prop,
} from 'vue-property-decorator';
import { ItemsTreeNode } from '@/entities/ItemsTree';

interface DomNode {
    title: string;
    description: string;
    id: string;
    top: number;
    left: number;
    type: string;
}

interface DomLine {
    type: string;
    startTop: number;
    startLeft: number;
    stopTop: number;
    stopLeft: number;
}

@Component({
  name: 'ItemsTreeVisualiser',
})
export default class ItemsTreeVisualiser extends Vue {
    @Prop({ type: Object, required: true })
    readonly itemsTreeRoot!: ItemsTreeNode;

    private activeNodeId: string | undefined = undefined;

    private hasActiveNode = false;

    private domNodes: Map<string, DomNode | DomLine> = new Map<
        string,
        DomNode | DomLine
    >();

    get treeNodeActive() {
      return (nodeId: string) => this.activeNodeId === nodeId;
    }

    get nodes(): Array<DomNode | DomLine> {
      const nodeHeight = 50;
      const nodeWidth = 100;

      let left = 30;
      let top = 150;

      this.domNodes = new Map<string, DomNode | DomLine>([
        [
          ItemsTreeVisualiser.makeNodeId(this.itemsTreeRoot.getProperties().name),
          {
            title: this.itemsTreeRoot.getProperties().name,
            description: this.itemsTreeRoot.getProperties().description,
            id: ItemsTreeVisualiser.makeNodeId(
              this.itemsTreeRoot.getProperties().name,
            ),
            top,
            left,
            type: 'node',
          },
        ],
      ]);

      let queue: ItemsTreeNode[] = this.itemsTreeRoot.getChildren();
      while (queue.length > 0) {
        const newQueue: ItemsTreeNode[] = [];
        top += 300;
        left = 30;

        for (let i = 0; i < queue.length; i += 1) {
          const node = queue[i];

          const domNode = {
            title: node.getProperties().name,
            description: node.getProperties().description,
            id: ItemsTreeVisualiser.makeNodeId(node.getProperties().name),
            top,
            left,
            type: 'node',
          };
          this.domNodes.set(
            ItemsTreeVisualiser.makeNodeId(node.getProperties().name),
            domNode,
          );

          const parentGraphNode: ItemsTreeNode = node.getParent() as ItemsTreeNode;
          const parentDomNode: DomNode = this.domNodes.get(
            ItemsTreeVisualiser.makeNodeId(parentGraphNode.getProperties().name),
          ) as DomNode;

          this.domNodes.set(
            ItemsTreeVisualiser.makeLineId(
              parentDomNode.title,
              node.getProperties().name,
            ),
            {
              type: 'line',
              startTop: parentDomNode.top + nodeHeight,
              startLeft: parentDomNode.left + nodeWidth / 2,
              stopTop: domNode.top,
              stopLeft: domNode.left + nodeWidth / 2,
            },
          );

          newQueue.push(...node.getChildren());
          left += 300;
        }
        queue = newQueue;
      }

      return Array.from(this.domNodes.values());
    }

    getDomNode(nodeId: string): DomNode {
      return this.domNodes.get(nodeId) as DomNode;
    }

    static makeLineId(parent: string, child: string): string {
      return `line-id-${parent}-${child}`;
    }

    static makeNodeId(name: string): string {
      return `node-id-${name}`;
    }

    onTreeNodeClick(nodeId: string) {
      if (this.activeNodeId === nodeId) {
        this.activeNodeId = undefined;
        this.hasActiveNode = false;
      } else {
        this.activeNodeId = undefined;
        this.hasActiveNode = false;
        this.activeNodeId = nodeId;
        this.hasActiveNode = true;
      }
    }
}
</script>

<style scoped lang="scss">
.tree-node {
    width: 100px;
    height: 50px;

    &--active {
        border: 2px solid green;
    }
}
</style>
