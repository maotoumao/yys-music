/** 每个模式的config */
interface IConfig {
    name: string,
    withDelay: boolean
}

const config: IConfig[] = [
    {
        name: '樱之声',
        withDelay: true
    }
]

export default config;