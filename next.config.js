/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    async rewrites() {
        return [
            {
                source: '/bee.js',
                destination: 'https://cdn.splitbee.io/sb.js'
            },
            {
                source: '/_hive/:slug',
                destination: 'https://hive.splitbee.io/:slug'
            }
        ];
    }
};

module.exports = nextConfig;
