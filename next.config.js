/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    bundlePagesRouterDependencies: true,
    images: {
        unoptimized: true
    }
}

module.exports = nextConfig
