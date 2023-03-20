/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    theme: {
        extend: {
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        blockquote: {
                            background: theme('colors.gray.600'),
                            'border-left-color': theme('colors.zinc.400'),
                            content: 'none'
                        },
                        maxWidth: '100%',
                        '&:firstChild': { marginTop: 0 },
                        'h1,h2,h3,h,h5,h6': { marginTop: '0.75rem', marginBottom: '0.75rem' },
                        h1: { fontSize: '1.8rem' },
                        h2: { fontSize: '1.5rem' },
                        h3: { fontSize: '1.25rem' },
                        '*:is(:first-child)': { marginTop: '0px' },
                        p: { marginTop: '0.5rem', marginBottom: '0.5rem' },
                        ul: {
                            marginTop: '1rem',
                            '> li > input': { margin: 0 }
                        },
                        hr: {
                            marginTop: '0.75rem',
                            marginBottom: '0.75rem'
                        },
                        a: {
                            color: theme('colors.blue.600')
                        }
                    }
                }
            })
        }
    },
    future: { hoverOnlyWhenSupported: true },
    plugins: [require('@tailwindcss/typography')]
};
