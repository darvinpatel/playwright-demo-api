import { devices, PlaywrightTestConfig } from "@playwright/test";
require('dotenv').config({path: '.env'});


const config: PlaywrightTestConfig = {
    use: {
        viewport: null,
        headless: !true,
        screenshot: "on",
        video: "on",
        // trace: "on",
        baseURL: "https://restful-booker.herokuapp.com",
        extraHTTPHeaders: {
            "Authorization": "Basic YWRtaW46cGFzc3dvcmQxMjM="
        }
        // contextOptions: {
        //     permissions: ["clipboard-read"]
        // }
        ,
        launchOptions: {
            args: ["--start-maximized"],

            // logger: {
            //     // isEnabled: (name, severity) => true,
            //     // log: (name, severity, message, args) => console.log(name, severity)
            // }
        }
    },
    // timeout: 60000,
    // grep: [new RegExp("@smoke"), new RegExp("@reg")],
    // testMatch: ["harDemo/trackRequest.test.ts"],
    retries: 0,
    // reporter: "./customReport/myReporter.ts"
    reporter: [
        ["dot"], // -> console
        ["json", { outputFile: "test-result.json" }], //  -> JSON
        ['html', {
            open: "always"
        }]
    ],
    globalSetup: require.resolve('./global-setup')
}
export default config;