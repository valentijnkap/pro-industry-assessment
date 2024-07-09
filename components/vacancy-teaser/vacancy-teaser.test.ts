import VacancyTeaser from "../components/vacancy-teaser/vacancy-teaser.vue";
import { mount } from "@vue/test-utils";

describe("Vacancy Teaser component", () => {
  test("mount component", async () => {
    expect(VacancyTeaser).toBeTruthy();

    const wrapper = mount(VacancyTeaser, {
      props: {
        title: "HeftruckChauffeur",
        description: "Dag dienst en magazijn werk",
      },
    });

    expect(wrapper.find("h3").text()).toBe("HeftruckChauffeur");
    expect(wrapper.find("p").text()).toBe("Dag dienst en magazijn werk");
  });
});
