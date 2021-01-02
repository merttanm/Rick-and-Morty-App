// tslint:disable:max-line-length
import { Label } from "tns-core-modules/ui/label";


import { Observable } from "tns-core-modules/data/observable";
import { path, knownFolders, File } from "tns-core-modules/file-system";
import { Page } from "tns-core-modules/ui/page";
// >> import-http-get
import { getFile, getImage, getJSON, getString, request, HttpResponse } from "tns-core-modules/http";
// << import-http-get
import { Button } from "tns-core-modules/ui/button";
import { ImageSource } from "tns-core-modules/image-source";




export function onNavigatingTo(args) {
    const page: Page = <Page>args.object;
    const vm = new Observable();


    vm.set("getJSONResultButton", "Show getJSON result");
    vm.set("getJSONResultVisible", false);



    page.bindingContext = vm;
}

export function onButtonTap(args) {
    const button: Button = <Button>args.object;
    const page: Page = <Page>args.object.page;

    const vm = page.bindingContext;
    const id: string = button.get("id");
    const status: boolean = vm.get(`${id}ResultVisible`);

    vm.set("name_n", "             Name :");
    vm.set("air_date_d", "          Air date :");
    vm.set("episode_e", "          Episode :");
    vm.set("characters_c", "     Characters :");
    page.bindingContext = vm;


    if (!status) {
        switch (id) {

            case "getJSON":
                getJSONExample(vm);
                break;


            default:
                break;
        }
    }
    switch (!status) {
        case true:
            vm.set(`${id}ResultButton`, `Hide ${id} result`);
            break;
        case false:
            vm.set(`${id}ResultButton`, `Show ${id} result`);
            break;
        default:
            break;
    }
    vm.set(`${id}ResultVisible`, !status);
}

export function getJSONExample(viewModel) {
    // >> get-json-code-ts
    getJSON("https://rickandmortyapi.com/api/episode/8").then((r: any) => {
        // >> (hide)

        viewModel.set("name", r.name);
        viewModel.set("air_date", r.air_date);
        viewModel.set("episode", r.episode);
        viewModel.set("url", r.url);
        // << (hide)
    }, (e) => {
        // >> (hide)
        console.log("Error: ");
        console.log(e);
        // << (hide)
    });
    // << get-json-code-ts
}



