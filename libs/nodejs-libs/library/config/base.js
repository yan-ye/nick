

// global命名空间 下设置$CONFIG全局变量

global.$CONFIG = {
    web_type: '',
    web_port: '',
    template_language: [],
    support_template_locales: {},//支持模板本地化 key采集语言 value模板语言 en-US = en ...;
    template_locales: [],//本地化模板 en zh-CN
    session_secret: '123',
    session_prefix_key: 'SIV001',
    session_prefix_value: '-1'
}
