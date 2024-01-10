import { split } from "./util";

console.log(`detected OS: ${process.platform}    Arch: ${process.arch}`);

split("chrome-win64.zip", "chrome/win64").then((i) => {
    console.log(i);
});