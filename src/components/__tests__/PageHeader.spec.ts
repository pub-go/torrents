import { gettext } from '@/i18n/gettext';
import router from '@/router';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import PageHeader from "../PageHeader.vue";

describe('PageHeader', () => {
  it('renders page header', async () => {
    router.push('/')
    await router.isReady()
    const wrapper = mount(PageHeader, {
      global: {
        plugins: [router, gettext]
      }
    })
    expect(wrapper.find('li:nth-child(1)').classes('is-active')).toBe(true)
  })
})
