import { mount } from '@vue/test-utils';
import { describe, test, expect } from 'vitest';
import FilterGroup from './filter-group.vue';

const title = 'Categories';
const buttonTxt = 'Toon meer';
const slotContent = '<ul><li>Filter...</li></ul>';

describe('FilterGroup', () => {
  test('Renders the component correctly', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        title: title,
        showButton: true,
        buttonTxt: buttonTxt,
      },
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find('h3').text()).toBe(title);
    expect(wrapper.find('button').text()).toBe(buttonTxt);
    expect(wrapper.find('ul li').text()).toBe('Filter...');
  });

  test('Does not render the button when showButton is false', () => {
    const wrapper = mount(FilterGroup, {
      props: {
        title: title,
        showButton: false,
        buttonTxt: 'Show More',
      },
      slots: {
        default: slotContent,
      },
    });

    expect(wrapper.find('button').exists()).toBe(false);
  });

  test('Emits toggle:show event when the button is clicked', async () => {
    const wrapper = mount(FilterGroup, {
      props: {
        title: title,
        showButton: true,
        buttonTxt: buttonTxt,
      },
      slots: {
        default: slotContent,
      },
    });

    await wrapper.find('button').trigger('click');

    expect(wrapper.emitted('toggle:show')).toBeTruthy();
    expect(wrapper.emitted('toggle:show')!.length).toBe(1);
  });
});
