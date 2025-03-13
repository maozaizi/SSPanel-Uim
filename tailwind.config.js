/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4285f4',      // 主色调，来自header.tpl
        secondary: '#ff5722',    // 次要色调，用于强调
        success: '#4caf50',      // 成功状态
        warning: '#ff9800',      // 警告状态
        danger: '#f44336',       // 危险/错误状态
        info: '#2196f3',         // 信息状态
        dark: '#212121',         // 深色文本
        light: '#f5f5f5',        // 浅色背景
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
      },
      spacing: {
        '72': '18rem',
        '80': '20rem',
        '96': '24rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        'md': '0.25rem',
        'lg': '0.5rem',
        'xl': '1rem',
      },
      boxShadow: {
        'card': '0 2px 5px 0 rgba(0,0,0,0.16), 0 2px 10px 0 rgba(0,0,0,0.12)',
        'btn': '0 2px 5px 0 rgba(0,0,0,0.16)',
        'hover': '0 5px 11px 0 rgba(0,0,0,0.18), 0 4px 15px 0 rgba(0,0,0,0.15)',
      }
    },
  },
  plugins: [],
} 