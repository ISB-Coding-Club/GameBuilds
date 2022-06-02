import "../styles/index.scss";
import { createBuildElement } from "./buildElement";
import { fetchBuilds } from "./fetchBuilds";

export const buildsList = async () => {
    const app = document.createElement("div");
    const builds = await fetchBuilds();

    builds.forEach((b) => app.appendChild(createBuildElement(b)));

    document.body.appendChild(app);
};
