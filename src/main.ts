import { buildsList } from "./builds/buildslist";
import { preview } from "./preview/preview";
import { getRoute } from "./router/router";

const main = () => {
    if (getRoute() == "list") buildsList();
    else if (getRoute() == "preview") preview();
};

main();
