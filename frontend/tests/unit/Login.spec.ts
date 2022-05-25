import { shallowMount } from "@vue/test-utils";
import LoginComponent from "@/components/LoginComponent.vue";

describe("LoginComponent.vue", () => {
  it("로그인 화면 렌더링", () => {
    const msg = "new message";
    const wrapper = shallowMount(LoginComponent, {
      propsData: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
