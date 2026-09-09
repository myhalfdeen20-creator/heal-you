module.exports = {
    content: ["./public/**/*.{html,js}", "./src/**/*.{html,js,jsx}"],
    theme: {
        extend: {
            colors: {
                white: '#FDFDFE',
                black: '#1F2220',
                slate: {
                    50: '#f8fafc',
                    100: '#f1f5f9',
                    200: '#e2e8f0',
                    300: '#cbd5e1',
                    400: '#94a3b8',
                    500: '#64748b',
                    600: '#475569',
                    700: '#334155',
                    800: '#1e293b',
                    900: '#0f172a',
                }
            },
            fontFamily: {
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
                serif: ['"Playfair Display"', 'serif'],
            },
            fontSize: {
                'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.05em' }],
                'sm': ['0.875rem', { lineHeight: '1.5' }],
                'base': ['1rem', { lineHeight: '1.6' }],
                'lg': ['1.333rem', { lineHeight: '1.5' }],
                'xl': ['1.777rem', { lineHeight: '1.4' }],
                '2xl': ['2.369rem', { lineHeight: '1.2' }],
                '3xl': ['3.157rem', { lineHeight: '1.1' }],
                '4xl': ['4.209rem', { lineHeight: '1.1' }],
                '5xl': ['5.61rem', { lineHeight: '1.1' }],
            }
        }
    }
}
