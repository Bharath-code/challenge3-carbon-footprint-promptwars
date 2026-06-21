# Carbon Ledger // Individual Carbon Footprint Tracker

A high-end, world-class web application designed to help individuals calculate, audit, track, and reduce their carbon footprint. The user interface is engineered under a strict **Industrial Brutalist** design system featuring high-contrast layout grids, thick borders, concrete backgrounds, and warning-style neon green accents.

## 01. Chosen Vertical & Persona

- **Vertical:** Individual Carbon Accounting and Action Tracking.
- **Audience:** Design-conscious consumers, carbon-conscious individuals, and modern developers looking for zero-fluff data dashboards.
- **Core Aesthetic:** Industrial Brutalist UI. Clean structure, monospaced metadata, bold asymmetric layouts, and physical-tactile controls.

## 02. Approach and Accounting Logic

Carbon calculations are scientifically derived from baseline emissions factors defined by environmental groups (e.g. EPA, DEFRA).

### A. Transportation Accounting
- **Vehicle Travel:** Carbon is calculated based on annual miles driven and vehicle powertrain factors:
  - Gasoline SUV: 0.55 kg CO2e / mile
  - Gasoline Sedan: 0.40 kg CO2e / mile
  - Hybrid Vehicle: 0.22 kg CO2e / mile
  - Electric Vehicle (EV): 0.12 kg CO2e / mile (reflects average grid charging intensity)
- **Public Transit:** 0.14 kg CO2e / mile.
- **Flight Travel:** Flight times are separated into short-haul (&lt;3h) and long-haul (&gt;=3h) segments.
  - Short-haul emissions: 180 kg CO2e / hour
  - Long-haul emissions: 110 kg CO2e / hour
  - Altitude Multiplier: Includes a radiative forcing multiplier of 1.9 for high-altitude non-CO2 climate effects.

### B. Household Energy Accounting
- **Electricity:** Monthly consumption (kWh) * grid intensity * 12 months / occupants.
  - Standard Grid Mix: 0.37 kg CO2e / kWh
  - Renewable/Green Tariff: 0.02 kg CO2e / kWh
- **Natural Gas:** Monthly usage (therms) * 5.3 kg CO2e/therm * 12 months / occupants.
- **Sharing Model:** Household emissions are divided equally among all household members to represent individual per-capita footprints.

### C. Dietary Accounting
- Annual diet category footprints (derived from lifecycle analysis averages):
  - Vegan: 900 kg CO2e / year
  - Vegetarian: 1,200 kg CO2e / year
  - Low-Meat: 1,800 kg CO2e / year
  - High-Meat: 2,800 kg CO2e / year

### D. Consumption & Waste Accounting
- **Shopping Habits:** Categorized into low (250 kg/yr), average (750 kg/yr), or active (1,600 kg/yr) consumer behavior.
- **Solid Waste:** Default waste disposal adds 350 kg/yr. Toggling active sorting (recycling & composting) reduces this to 100 kg/yr.

## 03. Pledges & Live Ledger

Instead of static recommendations, the Action Ledger calculates potential savings dynamically:
- **Bike Transit:** Savings are linked directly to your current vehicle efficiency and driving distance.
- **Smart Heating:** Calculates an 8% reduction in gas heating based on your actual gas bills.
- **Solar Conversion:** Projects complete reduction of electricity emissions if you are currently using a standard grid mix.

## 04. Technical Architecture

- **Framework:** React 19 + TypeScript + Vite.
- **Styling:** Tailwind CSS v4 + custom utility class tokens (border-4, shadow offsets).
- **Icons:** Phosphor Icons (`@phosphor-icons/react`).
- **Testing:** Unit tests built on Vitest.
- **Local Storage:** Historical state log committing and reloading.

## 05. Project Setup and Running Locally

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- NPM (v9.0.0 or higher)

### Installation
1. Clone the repository and navigate to the project directory:
   ```bash
   cd challenge3-carbon-footprint
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```

### Running the App
- Run the local development server:
  ```bash
  npm run dev
  ```
  Open `http://localhost:5173` in your browser.

### Running Tests
- Execute the test suite:
  ```bash
  npm run test
  ```
  or
  ```bash
  npx vitest run
  ```

### Building for Production
- Compile TypeScript and bundle assets:
  ```bash
  npm run build
  ```
