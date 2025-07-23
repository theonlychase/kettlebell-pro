# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) and Junie when working with code in this repository.

## Development Commands

### Core Development Scripts
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build for production
- `npm run generate` - Generate static site
- `npm run preview` - Preview production build locally

### Code Quality and Linting
- `npx eslint .` - Run ESLint for JavaScript/TypeScript/Vue files
- `npx stylelint "**/*.{css,vue}"` - Run Stylelint for CSS and Vue styles

## Project Architecture

### Tech Stack
- **Framework**: Nuxt 4 with Vue 3 and TypeScript
- **Content Management**: Nuxt Content v3 with Markdown files
- **UI Library**: Nuxt UI Pro with Tailwind CSS
- **Image Handling**: Nuxt Image module
- **Icons**: Heroicons and Lucide via Iconify

### Directory Structure

#### App Directory (`/app/`)
- `app.vue` - Main application layout with navigation setup
- `layouts/` - Page layouts (default.vue, exercises.vue)
- `pages/` - File-based routing pages
- `components/` - Reusable Vue components organized by feature
- `composables/` - Vue composables for business logic (usePrograms.ts, useWorkouts.ts)
- `assets/` - Static assets including CSS and icons

#### Content System (`/content/`)
- `exercises/` - Markdown files for exercise content, organized into 15 categories
- Each exercise file includes frontmatter with structured metadata (difficulty, muscle groups, equipment, etc.)

#### Configuration Files
- `content.config.ts` - Nuxt Content configuration with Zod schemas for exercise and blog collections
- `nuxt.config.ts` - Main Nuxt configuration
- `tsconfig.json` - TypeScript configuration referencing Nuxt-generated configs

### Key Components and Features

#### Content Management
- Exercises are stored as Markdown files with rich frontmatter metadata
- Zod schemas enforce content structure in `content.config.ts`
- Exercise categories: carries-holds, chest-pushup, mobility, movement-prep, squat-variations, deadlift-variations, lunge-variations, swings-ballistic, cleans, pressing, rowing-pulling, rotational-core, single-leg-balance, complex-combination, curls-extensions

#### Type System (`/shared/types/`)
- `Exercise` interface with comprehensive metadata (difficulty, muscle groups, equipment, instructions, tips, cautions)
- `BlogPost` interface for blog content

#### Exercise Content Structure
Exercise Markdown files include:
- Structured frontmatter with difficulty, muscle groups, equipment, instructions, tips, cautions
- Custom Vue components for metadata display (ExerciseMetadata, CustomVideo, ExerciseTips, Instructions)
- Video integration support
- Related exercise suggestions

#### UI Patterns
- Uses Nuxt UI Pro components throughout
- Tailwind CSS for styling with custom configurations in `stylelint.config.js`
- Custom icon system with local SVG assets (`kettlebell.svg`, `kettlebell-dark.svg`)
- Responsive layouts with mobile-first approach

### Content Authoring
When creating new exercises:
1. Follow the frontmatter schema defined in `content.config.ts`
2. Place in appropriate category subdirectory under `/content/exercises/`
3. Use the example file `content/exercises/example-enhanced-exercise.md` as a template
4. Include all required fields: title, description, difficulty, exerciseType, bodyPosition, targetMuscleGroups, equipment, instructions, tips

### Navigation and Routing
- File-based routing with dynamic catch-all routes for exercises (`[...slug].vue`)
- Navigation data auto-generated from content collections
- SEO-optimized with proper meta tags and structured data
