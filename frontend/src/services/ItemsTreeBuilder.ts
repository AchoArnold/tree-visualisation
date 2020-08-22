import { ItemsTreeNode, ItemsProps } from '@/entities/ItemsTree';
import { ItemData } from '@/services/ItemsDataFetcherService';
import TreeNode from '@/entities/TreeNode';

export default class ItemsTreeBuilder {
  build(itemsData: ItemData[]): ItemsTreeNode {
    return new TreeNode<ItemsProps>({name: 'name', description: ''})
  }
}
