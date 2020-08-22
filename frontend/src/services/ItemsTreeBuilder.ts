import { ItemsTreeNode, ItemsProps } from '@/entities/ItemsTree';
import { ItemData } from '@/services/ItemsDataFetcherService';
import TreeNode from '@/entities/TreeNode';

export default class ItemsTreeBuilder {
  static build(itemsData: ItemData[]): ItemsTreeNode {
    const nodes = new Map<string, ItemsTreeNode>();
    let root: ItemsTreeNode | undefined;

    itemsData.forEach((itemData: ItemData) => {
      nodes.set(itemData.name, new TreeNode<ItemsProps>(itemData));
    });

    itemsData.forEach((itemData: ItemData) => {
      if (itemData.parent) {
        (nodes.get(itemData.parent) as ItemsTreeNode).addChild(
                    nodes.get(itemData.name) as ItemsTreeNode,
        );
        (nodes.get(itemData.name) as ItemsTreeNode).setParent(
                    nodes.get(itemData.parent) as ItemsTreeNode,
        );
      } else {
        root = nodes.get(itemData.name) as ItemsTreeNode;
      }
    });

    if (root === undefined) {
      throw new Error('items data does not have a valid root node');
    }

    return root;
  }
}
