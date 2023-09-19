import { defineConfig } from 'unocss'
import { presetUno } from 'unocss';
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide';

export default defineConfig({
    presets: [
        presetUno(),
        presetScrollbarHide()
    ],
    shortcuts: {
        'wh-full': 'w-full h-full',
        'flex-col': 'flex flex-col',
        'flex-c-c': 'flex items-center justify-center',
        'bg-base': 'bg-[#fff] dark:bg-[#202020]',
        'card-base': 'bg-[#fff] dark:bg-[#101010]',
        'text-base': 'text-[#404040] dark:text-[#c0c0c0]',
    }
})