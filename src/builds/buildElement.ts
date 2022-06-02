import { BuildInfo } from "./fetchBuilds";

export const createBuildElement = (build: BuildInfo) => {
    const element = document.createElement("div");
    element.className = "build-info";

    element.innerHTML = `
        <p class="build-name">${build.name}</p>
    `;

    element.addEventListener("click", () => {
        window.open("preview?build=" + build.id);
    });

    return element;
};
