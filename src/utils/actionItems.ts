import type { CarbonInputs } from './carbonCalculator';
import {
  CAR_EMISSION_FACTORS,
  GRID_INTENSITY_RENEWABLE,
  GRID_INTENSITY_STANDARD,
  GAS_EMISSION_FACTOR,
} from './carbonCalculator';

export interface ActionItem {
  id: string;
  name: string;
  category: 'transport' | 'energy' | 'diet' | 'waste';
  description: string;
  calculateSavings: (inputs: CarbonInputs) => number; // Returns savings in kg CO2e per year
}

export const ACTION_ITEMS: ActionItem[] = [
  {
    id: 'bike-commute',
    name: 'Shift to bike / pedestrian transit',
    category: 'transport',
    description: 'Replace 2,500 miles of annual vehicle driving with cycling or walking.',
    calculateSavings: (inputs) => {
      const replaceableMiles = Math.min(2500, inputs.carMilesPerYear);
      return Math.round(replaceableMiles * CAR_EMISSION_FACTORS[inputs.carType]);
    },
  },
  {
    id: 'meatless-mondays',
    name: 'Implement meatless mondays',
    category: 'diet',
    description: 'Reduce meat consumption by 15% through plant-based days.',
    calculateSavings: (inputs) => {
      if (inputs.dietType === 'high-meat') return 270; // 15% of 1800 to 2800 difference
      if (inputs.dietType === 'low-meat') return 130;
      if (inputs.dietType === 'vegetarian') return 45;
      return 0; // vegan already optimized
    },
  },
  {
    id: 'smart-thermostat',
    name: 'Smart thermostat calibration',
    category: 'energy',
    description: 'Lower thermostat by 2 degrees in winter and raise by 2 degrees in summer.',
    calculateSavings: (inputs) => {
      // Typically saves 8% of natural gas heating emissions
      const gasEmissions = inputs.gasThermsPerMonth * 12 * GAS_EMISSION_FACTOR;
      return Math.round((gasEmissions * 0.08) / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'line-dry',
    name: 'Line-dry laundry load cycles',
    category: 'energy',
    description: 'Hang dry clothes instead of using an electric tumble dryer.',
    calculateSavings: (inputs) => {
      // Dryer usage is roughly 3 kWh per load, ~150 loads per year = 450 kWh.
      // Savings depends on grid intensity.
      const gridFactor = inputs.isElectricityRenewable ? GRID_INTENSITY_RENEWABLE : GRID_INTENSITY_STANDARD;
      return Math.round((450 * gridFactor) / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'solar-pledge',
    name: 'Pledge solar energy conversion',
    category: 'energy',
    description: 'Install residential solar panels or opt into local community solar grids.',
    calculateSavings: (inputs) => {
      if (inputs.isElectricityRenewable) return 0; // already green
      // Saves the standard vs renewable grid intensity gap
      const electricitySavings = inputs.electricityKWhPerMonth * 12 * (GRID_INTENSITY_STANDARD - GRID_INTENSITY_RENEWABLE);
      return Math.round(electricitySavings / Math.max(1, inputs.householdSize));
    },
  },
  {
    id: 'waste-sorting',
    name: 'Rigorous recycling and composting',
    category: 'waste',
    description: 'Separate organic waste and paper/plastic/metal to minimize landfill input.',
    calculateSavings: (inputs) => {
      if (inputs.doesRecycleAndCompost) return 0; // already recycling
      return 250; // saves waste factor gap
    },
  },
];
