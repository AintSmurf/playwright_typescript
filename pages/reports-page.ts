import { Download, Locator, Page } from "playwright";
import { MainPage } from "./main-page";

export class ReportsPage extends MainPage {

    private _companyNameField: Locator
    private _quarterOptions: Locator
    private _startYear: Locator
    private _endYear: Locator
    private _sortButton: Locator
    private pdfLink: Locator
    private downloadButton: Locator



    constructor(page: Page) {
        super(page)
        this._companyNameField = page.locator('#level3Div > div > div > div > input');
        this._quarterOptions = page.locator('//div[@class="filterRadio"]')
        this._startYear = page.locator('#f-year')
        this._endYear = page.locator('#t-year')
        this._sortButton = page.locator('#sidebar-filter-wrapper > div.sideFilterOperations.hidden-xs.hidden-sm > button')
        this.pdfLink = page.locator('//i[@class="mf mf-pdf"]')
        this.downloadButton = page.locator('div > div.messageBody > ul > div > div:nth-child(4) > a')
    }

    fillCompanyName = async (name: string): Promise<void> => {
        await this._companyNameField.fill(name);
        await this._page.waitForSelector('#level3Div > div > ul')
        const options: Locator = this._page.locator('#level3Div > div > ul')
        await options.first().click()
    }
    checkQuarterType = async (option: number): Promise<void> => {
        if (option > 5) {
            option = 1
        }
        await this._quarterOptions.nth(option).click()
    }
    pickStartYear = async (sy: string): Promise<void> => {
        await this._startYear.selectOption(sy)
    }
    pickEndYear = async (ey: string): Promise<void> => {
        await this._endYear.selectOption(ey)
    }
    applyFilters = async (): Promise<void> => {
        await this._sortButton.click()
    }
    navigateToPdfPage = async (): Promise<void> => {
        await this.pdfLink.first().click()
    }
    downloadPDF = async (): Promise<void> => {
        await this.downloadButton.click()


    }

    fillEntirePage = async (name: string, option: number, startYear: string, endYear: string): Promise<void> => {
        let s = parseInt(startYear)
        let e = parseInt(endYear)
        if ((s > 2023 || s < 2000) && (e > 2023 || e < 2000)) {
            startYear = s.toString()
            endYear = e.toString()
        }
        await this.fillCompanyName(name);
        await this.checkQuarterType(option)
        await this.pickStartYear(startYear)
        await this.pickEndYear(endYear)
        await this.applyFilters()
        await this.navigateToPdfPage()
    }
}

