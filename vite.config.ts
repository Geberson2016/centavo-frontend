import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // A UI só fala com o BFF, sempre pela mesma origem: o Vite faz proxy de /bff.
  // Assim o cookie de sessão (httpOnly, SameSite=Lax) funciona sem CORS.
  const bffProxy = {
    '/bff': { target: env.BFF_URL || 'http://localhost:3000' },
  }

  return {
    plugins: [react(), svgr()],
    server: { proxy: bffProxy },
    preview: { proxy: bffProxy },
  }
})
