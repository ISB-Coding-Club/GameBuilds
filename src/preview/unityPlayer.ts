import "../styles/unity.scss";
import { getGithubPagesUrl } from "../util/githubPages";

export const unityShowBanner = (
    msg: string,
    warningBanner: HTMLDivElement,
    type?: "error" | "warning"
) => {
    function updateBannerVisibility() {
        warningBanner.style.display = warningBanner.children.length
            ? "block"
            : "none";
    }

    const div = document.createElement("div");
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type == "error") {
        div.style.background = "red";
        div.style.padding = "10px";
    } else {
        if (type == "warning") {
            div.style.background = "yellow";
            div.style.padding = "10px";
        }
        setTimeout(function () {
            warningBanner.removeChild(div);
            updateBannerVisibility();
        }, 5000);
    }
    updateBannerVisibility();
};

export const createUnityPlayer = (build: string) => {
    const _container = document.createElement("div");
    _container.id = "unity-container";
    _container.className = "unity-desktop";
    _container.innerHTML = `
        <canvas id="unity-canvas" width=960 height=600></canvas>
        <div id="unity-loading-bar">
            <div id="unity-logo"></div>
            <div id="unity-progress-bar-empty">
                <div id="unity-progress-bar-full"></div>
            </div>
        </div>
        <div id="unity-warning"></div>
        <div id="unity-footer">
            <div id="unity-webgl-logo"></div>
            <div id="unity-build-title"><!-- Coding Club Game --></div>
            <div id="unity-fullscreen-button"></div>
        </div>
    `;
    document.body.appendChild(_container);

    const container =
        document.querySelector<HTMLDivElement>("#unity-container");
    const canvas = document.querySelector<HTMLCanvasElement>("#unity-canvas");
    const loadingBar =
        document.querySelector<HTMLDivElement>("#unity-loading-bar");
    const progressBarFull = document.querySelector<HTMLDivElement>(
        "#unity-progress-bar-full"
    );
    const fullscreenButton = document.querySelector<HTMLDivElement>(
        "#unity-fullscreen-button"
    );
    const warningBanner =
        document.querySelector<HTMLDivElement>("#unity-warning");

    if (
        !container ||
        !canvas ||
        !loadingBar ||
        !progressBarFull ||
        !fullscreenButton ||
        !warningBanner
    )
        return;

    const buildUrl = getGithubPagesUrl() + "/builds/" + build + "/Build";
    const loaderUrl = buildUrl + "/" + build + ".loader.js";
    const config = {
        dataUrl: buildUrl + "/" + build + ".data",
        frameworkUrl: buildUrl + "/" + build + ".framework.js",
        codeUrl: buildUrl + "/" + build + ".wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "DefaultCompany",
        productName: "Coding Club Game",
        productVersion: "0.1",
        showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        const meta = document.createElement("meta");
        meta.name = "viewport";
        meta.content =
            "width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes";
        document.getElementsByTagName("head")[0].appendChild(meta);
        container.className = "unity-mobile";

        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";

        unityShowBanner(
            "WebGL builds are not supported on mobile devices.",
            warningBanner
        );
    } else {
        canvas.style.width = "960px";
        canvas.style.height = "600px";
    }

    loadingBar.style.display = "block";

    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        // @ts-ignore This function will be added to the window once the script initializes.
        createUnityInstance(canvas, config, (progress) => {
            progressBarFull.style.width = 100 * progress + "%";
        })
            .then((unityInstance: any) => {
                loadingBar.style.display = "none";
                fullscreenButton.onclick = () => {
                    unityInstance.SetFullscreen(1);
                };
            })
            .catch((message: any) => {
                alert(message);
            });
    };
    document.body.appendChild(script);
};
