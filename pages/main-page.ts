import { Locator, Page } from "playwright";
import { BasePage } from "./base-page";


export class MainPage extends BasePage {

    constructor(page: Page) {
        super(page)
    }

}