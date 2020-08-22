export default class TreeNode<Properties> {
  children: Set<TreeNode<Properties>>
  parent ?: TreeNode<Properties>
  properties: Properties

  constructor(properties: Properties) {
    this.children = new Set<TreeNode<Properties>>();
    this.properties = properties
  }

  isRoot(): boolean {
    return this.parent === undefined
  }

  addChild(node: TreeNode<Properties>) {
    this.children.add(node)
  }

  setParent(node: TreeNode<Properties>) {
    this.parent = node
  }

  setProperties(properties: Properties) {
    this.properties = properties
  }

  getChildren(): TreeNode<Properties>[] {
    return Array.from(this.children)
  }

  getProperties(): Properties {
    return this.properties;
  }
}
