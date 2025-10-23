import CategoryOverviewType from "./categoryOverviewType";

export interface OverviewDetailsItemsType {
    header: string,
    price: number,
    details?: {
        heading: string,
        value: string
    }[]
}

export interface ChartDataType {
    month: string,
    [year: `${number}`]: number | undefined;
}

export interface MonthItemsType {
    month: string,
    year: number,
    lowestCategory: string,
    highestCategory: string,
    totalSpent: number
}

export interface DashboardOverviewContentType {
    year: string | undefined,
    semester: number | undefined,
    overviewDetailsItems: OverviewDetailsItemsType[] | undefined,
    chartData: ChartDataType[] | undefined,
    monthItems: MonthItemsType[] | undefined,
    yearList: string[] | undefined,
    categoryOverview: CategoryOverviewType[] | undefined
}