import "../styles/index.scss";
import { createUnityPlayer } from "./unityPlayer";

export const preview = () => {
    const build = new URLSearchParams(window.location.search).get("build");
    createUnityPlayer(build || "");
};
