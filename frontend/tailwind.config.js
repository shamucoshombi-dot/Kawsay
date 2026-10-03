/** @type {import('tailwindcss').Config} */
module.exports = {
    // `overline` is a Tailwind utility; without this an app's own eyebrow-label class draws a line above the text.
    blocklist: ["overline"],
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        kawsay: {
          ivory: '#F7F3EA',
          cream: '#EFE8D8',
          creamWarm: '#F4EBDA',
          sand: '#E2D8C0',
          sage: '#E7EDD8',
          line: '#E3DAC3',
          forest: '#33422C',
          pine: '#3E5233',
          leaf: '#5C7043',
          olive: '#6E7F45',
          moss: '#97A56B',
          brown: '#7A5138',
          ocre: '#C99A3C',
          night: '#222C1E',
          nightSoft: '#2A3624',
          nightCard: '#303D28',
          nightLine: '#3F4E33',
          nightText: '#F1EBDC',
          nightMuted: '#B3BF9F',
          bark: '#5C5045',
          ink: '#2A321E',
          peru: '#C43B2F',
          guinda: '#7B1230',
          gold: '#E8B800'
        }
      },
      fontFamily: {
        display: ['Fredoka', 'sans-serif'],
        body: ['"Nunito Sans"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 18px 45px -22px rgba(51, 66, 44, 0.28)',
        lift: '0 28px 60px -28px rgba(51, 66, 44, 0.38)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        marquee: 'marquee 50s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out infinite',
        sway: 'sway 9s ease-in-out infinite'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
};
