---
name: Achilles Elite
colors:
  surface: '#141218'
  surface-dim: '#141218'
  surface-bright: '#3b383e'
  surface-container-lowest: '#0f0d13'
  surface-container-low: '#1d1b20'
  surface-container: '#211f24'
  surface-container-high: '#2b292f'
  surface-container-highest: '#36343a'
  on-surface: '#e6e0e9'
  on-surface-variant: '#cbc4d2'
  inverse-surface: '#e6e0e9'
  inverse-on-surface: '#322f35'
  outline: '#948e9c'
  outline-variant: '#494551'
  surface-tint: '#cfbcff'
  primary: '#cfbcff'
  on-primary: '#381e72'
  primary-container: '#6750a4'
  on-primary-container: '#e0d2ff'
  inverse-primary: '#6750a4'
  secondary: '#cdc0e9'
  on-secondary: '#342b4b'
  secondary-container: '#4d4465'
  on-secondary-container: '#bfb2da'
  tertiary: '#e7c365'
  on-tertiary: '#3e2e00'
  tertiary-container: '#c9a74d'
  on-tertiary-container: '#503d00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#cfbcff'
  on-primary-fixed: '#22005d'
  on-primary-fixed-variant: '#4f378a'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#cdc0e9'
  on-secondary-fixed: '#1f1635'
  on-secondary-fixed-variant: '#4b4263'
  tertiary-fixed: '#ffdf93'
  tertiary-fixed-dim: '#e7c365'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#594400'
  background: '#141218'
  on-background: '#e6e0e9'
  surface-variant: '#36343a'
typography:
  display-2xl:
    fontFamily: Outfit
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 80px
    letterSpacing: -0.04em
  display-lg:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style
The brand personality is elite, athletic, and high-performance. It targets serious athletes and fitness professionals who demand precision and intelligence from their tools. The UI evokes a sense of "digital coaching" through a sophisticated, dark aesthetic that feels both powerful and understated.

The design style is **Premium Minimalist with a focus on Glassmorphism and subtle Glows**. It draws inspiration from high-end developer tools and creative platforms, prioritizing high-contrast typography and intentional use of negative space. The goal is to feel like a high-end sports car dashboard: functional, expensive, and incredibly fast.

## Colors
The palette is rooted in deep blacks and charcoals to create an infinite canvas feel. 
- **Primary Background (#0D0D0D):** Used for the base layer to ensure maximum contrast for the accent colors.
- **Surface (#1A1A1A):** Used for cards, panels, and elevated containers.
- **Electric Cyan (#00F2FF):** The primary action color, representing AI intelligence and data flow.
- **Lime Green (#CCFF00):** A secondary "performance" accent used for success states, progress indicators, and peak-performance highlights.
- **Subtle Glows:** Use the primary accent with low opacity (10-15%) for background blurs and hover states to create a "pulsing" energy.

## Typography
The system uses **Outfit** for high-impact display moments to convey confidence and modernity. **Inter** handles all functional UI and body text for maximum legibility. 
- Use **Display 2XL** sparingly for hero headlines and metric highlights.
- **Label SM** should be used for metadata and category headers, always in uppercase with increased letter spacing to enhance the technical aesthetic.
- Ensure "Inter" utilizes its optical sizing for small labels to maintain clarity against dark backgrounds.

## Layout & Spacing
The layout follows a **Fluid Grid** model with generous margins to maintain a premium, spacious feel. 
- **Desktop:** 12-column grid with 24px gutters. Use wide side margins (40px+) to center the focus on the anatomical 3D viewer.
- **Mobile:** 4-column grid with 16px margins.
- **Rhythm:** All spacing (padding, margins) must be multiples of 8px. Use larger gaps (64px, 80px) between major sections to prevent a "cluttered" feel.
- **Reflow:** Sidebars should collapse into a bottom drawer or full-screen overlay on mobile devices to prioritize the visual content.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Subtle Glows** rather than heavy shadows.
- **Level 0:** #0D0D0D (Base background).
- **Level 1:** #1A1A1A (Primary cards/containers).
- **Level 2:** #262626 (Hovered states or nested elements).
- **Borders:** Use 1px solid borders with `rgba(255, 255, 255, 0.08)`. For active elements, use a gradient border transitioning from Electric Cyan to transparent.
- **Shadows:** Use extremely soft, large-radius shadows (e.g., `0 20px 40px rgba(0,0,0,0.4)`) only on floating modals.

## Shapes
The design system utilizes **Rounded (2XL)** corners to soften the aggressive dark palette and imply a modern, "Apple-like" fit and finish.
- **Base Components:** 16px (1rem) corner radius.
- **Large Cards/Panels:** 24px (1.5rem) corner radius.
- **Buttons:** Fully pill-shaped or 12px depending on context.
- **Media/Viewers:** Should always use the 24px radius to frame the anatomical content elegantly.

## Components
- **Buttons:** Primary buttons use a solid Electric Cyan background with black text. Secondary buttons are "Ghost" style with a white-alpha border and subtle backdrop blur.
- **Anatomy Chips:** Small, pill-shaped labels used to identify muscle groups. Use a dark grey background (#262626) with Lime Green text for "active" or "targeted" muscles.
- **Input Fields:** Minimalist design; only a bottom border or a very subtle container. On focus, the border glows Electric Cyan.
- **Cards:** Glassmorphic effect with `backdrop-filter: blur(12px)` and a subtle inner stroke to catch the light.
- **Progress Rings:** Use thin strokes with the Lime Green accent to track workout completion or muscle fatigue.
- **Navigation:** A docked bottom bar on mobile and a slim, translucent sidebar on desktop to keep the focus on the 3D model.