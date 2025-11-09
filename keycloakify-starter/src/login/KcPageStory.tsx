import { KcPage } from "./KcPage";
import { renderKcStory } from "keycloakify/storybook";

export default {
    title: "Login/KcPage",
    component: KcPage,
};

export const Default = renderKcStory(KcPage);