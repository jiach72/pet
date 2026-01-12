/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#3B82F6",
                    light: "#60A5FA",
                    dark: "#2563EB",
                },
                secondary: "#60A5FA",
                cta: "#F97316",
                background: "#F8FAFC",
                foreground: "#1E293B",
                border: "#E2E8F0",
                muted: "#64748B",
            },
            fontFamily: {
                sans: ["OpenSans", "System"],
                heading: ["Poppins", "System"],
            },
        },
    },
    plugins: [],
};
