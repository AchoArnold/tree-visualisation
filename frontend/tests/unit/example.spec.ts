import { shallowMount } from '@vue/test-utils';
import ItemsTreeVisualiser from '@/components/ItemsTreeVisualiser.vue';

describe('TreeVisualizer.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(ItemsTreeVisualiser, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
