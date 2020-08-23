import TreeNode from '@/entities/TreeNode';

describe('TreeNode', () => {
    it('returns the correct root after adding elements', () => {
        const root = new TreeNode<string>('');
        root.addChild(new TreeNode<string>('two'));
        expect(root.isRoot()).toBe(true);
    });

    it('can add 2 child nodes with relationships', () => {
        const root = new TreeNode<string>('root');
        root.addChild(new TreeNode<string>('one'));
        root.addChild(new TreeNode<string>('two'));

        expect(root.getChildren().length).toBe(2);
        expect(root.getChildren()[0].getProperties()).toBe('one');
        expect(root.getChildren()[1].getProperties()).toBe('two');
        expect(root.getChildren()[0].getParent()?.getProperties()).toBe('root');
    });

    it('can set properties', () => {
        const root = new TreeNode<string>('root');
        root.setProperties('new property');
        expect(root.getProperties()).toBe('new property');
    });
});
