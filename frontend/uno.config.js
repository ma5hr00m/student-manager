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
    }
})