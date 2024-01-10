import extract from 'extract-zip';
import { merge } from './util';
import * as fs from "fs";

const sourceZip = () : string => {
    const host:NodeJS.Platform = process.platform;

    console.log(`detected OS: ${host}    Arch: ${process.arch}`);

    if (host === "win32" && process.arch === "x64") {
        return "chrome/chrome-win64.zip";
    } else throw Error(`Host OS: ${host}    Arch: ${process.arch} is not supported`);
}

const targetPath = () : string => {
    let path = `${__dirname}/drivers/`;

    if (process.env.PUPPETEER_DRIVER_PATH_WIN64 !== undefined) {
        console.log("setting desired driver path using `PUPPETEER_DRIVER_PATH_WIN64` env variable");
        path = process.env.PUPPETEER_DRIVER_PATH_WIN64;
    };

    console.log(`installing drivers to: ${path}`);
    return path;
}

export const extractDriver = async () => {
    if (process.env.WIN_CI_DRIVER_SKIP_SETUP === "false") {
        console.log("merging fragments together");
        let zipFile = `${__dirname}/${sourceZip()}`
        await merge(zipFile);

        try {
            await extract(sourceZip(), {dir: targetPath()});

            console.log("cleaning up...");
            fs.unlinkSync(zipFile);
            console.log('Extraction complete');
        } catch (err) {
            console.log(err);
        }
    } else console.log(`Skipping driver extraction. 'WIN_CI_DRIVER_SKIP_SETUP' is set to ${process.env.WIN_CI_DRIVER_SKIP_SETUP}`);
}

console.log("running post install script....");

extractDriver();