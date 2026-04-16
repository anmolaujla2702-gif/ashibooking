# Personalized Booking Bridge Page

A high-converting, minimal, and fast-loading booking bridge page designed for B2B cold email funnels.

## Features
- **URL Personalization**: Automatically extracts `name`, `email`, and `clinic` from URL parameters.
- **Pre-filled Form**: Injects data into form fields and the personalized headline.
- **Calendly Integration**: Seamlessly embeds Calendly with pre-filled user data.
- **Premium Design**: Dark-themed, mobile-first, and optimized for conversion.

## How to Test
Open the app with the following sample URL parameters:
`?name=Dr.%20Hughes&email=mark@harleystreet.com&clinic=Harley%20Street%20Dental`

## Setup Instructions
1. **Update Calendly Link**: Open `src/App.tsx` and replace `https://calendly.com/ashi-os/30min` with your actual Calendly event link.
2. **Customize Branding**: Modify the color palette in `src/index.css` or `src/App.tsx` (Tailwind classes) to match your brand.
3. **Install Dependencies**: Run `npm install` to install `react-calendly`, `motion`, and `lucide-react`.

## Deployment
### Vercel / Netlify
1. Push this code to a GitHub repository.
2. Connect the repository to Vercel or Netlify.
3. The build command is `npm run build` and the output directory is `dist`.

## Connecting a Domain
1. In your Vercel/Netlify dashboard, go to **Domain Settings**.
2. Add your subdomain (e.g., `book.mydomain.com`).
3. Update your DNS provider with the CNAME record provided by the hosting platform.

## Email Tool Integration (Lemlist / Instantly)
To use this in your cold email campaigns, append the variables to your link:

**Lemlist:**
`https://book.yourdomain.com/?name={{firstName}}%20{{lastName}}&email={{email}}&clinic={{companyName}}`

**Instantly:**
`https://book.yourdomain.com/?name={{firstName}}%20{{lastName}}&email={{email}}&clinic={{companyName}}`

## Technical Details
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Framer Motion (motion/react)
