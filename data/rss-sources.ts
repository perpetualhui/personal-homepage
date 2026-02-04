// data/rss-sources.ts
import { RssSource } from '@/types/rss';

export const rssSources: RssSource[] = [
  {
    name: '我的微信公众号',
    url: 'https://rsshub.app/weixin/mp/YOUR_ACCOUNT_ID', // 请替换为实际的RSS地址
    type: 'wechat',
    enabled: false, // 暂时禁用，配置完成后再启用
    updateInterval: 60
  }
  // 未来可以添加更多源
  // {
  //   name: '掘金专栏',
  //   url: 'https://juejin.cn/rss/user/xxx',
  //   type: 'juejin',
  //   enabled: true,
  //   updateInterval: 120
  // },
];
