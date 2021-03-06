export type Model = Readonly<{
    logs: Map<number, Log[]>
    alarmMaxLength: number
    temperatureTypes: TemperatureType[]
    sumPrice: number
}>

export type Row = Readonly<{
    row_id: number
    name: string
    state: string
    account: string
    host: string
    price: number
    alarms: string[]
    amounts: Map<TemperatureType, number>
    articles: Article[]
    updatedAt: string
    memo: string
}>

export type Log = Readonly<{
    log_id: number
    loggedAt: string
}>

export type Article = Readonly<{
    title: string
    comments: ArticleComment[]
}>

export type ArticleComment = string

export type TemperatureType = "high" | "low"

export function generateTableRows(): Row[] {
    return generate(2, rows)

    function rows(): Row[] {
        return [
            {
                row_id: 12,
                name: "GETTO CSS",
                state: "仮",
                account: "admin",
                host: "getto.systems",
                price: 1200,
                alarms: ["10:00"],
                amounts: amount(300, 200),
                articles: [
                    {
                        title: "Hello, World!",
                        comments: ["first comment", "second comment"],
                    },
                    {
                        title: "GETTO CSS",
                        comments: ["production ready!"],
                    },
                    {
                        title: "GETTO Example",
                        comments: ["code template", "status: green"],
                    },
                    {
                        title: "awesome article",
                        comments: [],
                    },
                    {
                        title: "another article",
                        comments: ["comment"],
                    },
                ],
                updatedAt: "2020/06/19 08:03",
                memo: "simple admin theme",
            },
            {
                row_id: 123,
                name: "GETTO Example",
                state: "作業中",
                account: "user",
                host: "example.com",
                price: 13500,
                alarms: ["12:00", "16:00", "20:00"],
                amounts: amount(500, 100),
                articles: [
                    {
                        title: "awesome article",
                        comments: [],
                    },
                    {
                        title: "another article",
                        comments: ["comment"],
                    },
                ],
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
            {
                row_id: 1234,
                name: "GETTO KeyTuner",
                state: "完了",
                account: "info",
                host: "getto.systems",
                price: 600,
                alarms: [],
                amounts: amount(500, 100),
                articles: [
                    {
                        title: "awesome article",
                        comments: [],
                    },
                    {
                        title: "another article",
                        comments: ["comment"],
                    },
                ],
                updatedAt: "2020/01/10",
                memo: "simple css theme",
            },
        ]
    }

    function amount(high: number, low: number): Map<TemperatureType, number> {
        const amount = new Map()
        amount.set("high", high)
        amount.set("low", low)
        return amount
    }
}

export function generateLogs(): Map<number, Log[]> {
    const logs: Map<number, Log[]> = new Map()

    logs.set(12, generate(3, rows))
    logs.set(123, generate(0, rows))
    logs.set(1234, generate(5, rows))

    return logs

    function rows(index: number): Log[] {
        return [
            {
                log_id: index + 1,
                loggedAt: `${Math.ceil(Math.random() * 1000)}`,
            },
        ]
    }
}

function generate<T>(count: number, rows: { (index: number): T[] }): T[] {
    const result: T[] = []
    for (let i = 0; i < count; i++) {
        result.push(...rows(i))
    }
    return result
}
