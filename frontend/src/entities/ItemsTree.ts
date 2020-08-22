import TreeNode from '@/entities/TreeNode';

export interface ItemsProps {
    name: string;
    description: string;
}

export type ItemsTreeNode = TreeNode<ItemsProps>;
