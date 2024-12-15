import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    colorPrimary: 'rgb(45, 51, 57)',
    borderRadius: 6,
    fontSize: 18,
    colorText:'#4f4f4f'
  },
  components: {
     Button: {
      primaryColor: '#ffffff',
      defaultBg: '#2DD4BF',
      defaultColor: '#ffffff',
    },
    Layout: {
      siderBg: '#ffffff',
      headerBg: '#ffffff',
    },
    Menu: {
      itemHoverBg: '#e6f7ff',
    },
  },
};

export default theme;