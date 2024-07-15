import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import FilterComponent from './filter.vue';

const id = 'category-1';
const value = 'Machineoperator';
const group = 'categories';

describe('FilterComponent', () => {
  test('Renders the component correctly', () => {
    const wrapper = mount(FilterComponent, {
      props: {
        id: id,
        value: value,
        checked: false,
        label: value,
        groupName: group,
      },
    });

    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true);
    expect(wrapper.find(`input#${id}`).exists()).toBe(true);
    expect(wrapper.find('label').text()).toBe(value);
  });

  test('Emits update:checked event when checkbox has been checked', async () => {
    const wrapper = mount(FilterComponent, {
      props: {
        id: id,
        value: value,
        checked: false,
        label: value,
        groupName: group,
      },
    });

    const checkbox = wrapper.find('input[type="checkbox"]');
    await checkbox.setValue(true);

    expect(wrapper.emitted('update:checked')).toBeTruthy();
    expect(wrapper.emitted('update:checked')![0]).toEqual([
      {
        checked: true,
        value: value,
        groupName: group,
      },
    ]);
  });
});
