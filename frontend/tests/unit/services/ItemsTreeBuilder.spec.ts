import ItemsTreeBuilder from '@/services/ItemsTreeBuilder';
import { ItemData } from '@/services/ItemsDataFetcherService';

describe('ItemsTreeBuilder', () => {
  it('throws an error when the list of items have no root', () => {
    const items: ItemData[] = [
      {
        name: 'A',
        description: 'A',
        parent: 'B',
      },
      {
        name: 'B',
        description: 'A',
        parent: 'A',
      },
    ];
    expect(() => ItemsTreeBuilder.build(items)).toThrow(Error);
  });

  it('builds a valid tree with 4 nodes', () => {
    const items: ItemData[] = [
      {
        name: 'A',
        description: 'A description',
        parent: '',
      },
      {
        name: 'B',
        description: 'B description',
        parent: 'A',
      },
      {
        name: 'C',
        description: 'C description',
        parent: 'A',
      },
      {
        name: 'D',
        description: 'D description',
        parent: 'C',
      },
    ];

    const rootNode = ItemsTreeBuilder.build(items);

    expect(rootNode.isRoot()).toBe(true);
    expect(rootNode.getProperties().name).toBe('A');
    expect(
            rootNode.getChildren()[0].getParent()?.getProperties().name,
    ).toBe('A');
    expect(rootNode.getChildren()[1].getProperties().name).toBe('C');
    expect(
      rootNode.getChildren()[1].getChildren()[0].getProperties().name,
    ).toBe('D');
    expect(
            rootNode
              .getChildren()[1]
              .getChildren()[0]
              .getParent()
                ?.getProperties().name,
    ).toBe('C');
  });
});
