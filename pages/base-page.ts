import { Page } from "playwright";

export class BasePage {
    protected _page: Page;

    constructor(page: Page) {
        this._page = page;
    }
    goto = async (): Promise<void> => {
        await this._page.goto('https://maya.tase.co.il/reports/finance');
        await this._page.waitForLoadState('load');
    }

    reload = async (): Promise<void> => {
        await this._page.reload();
    };
}
