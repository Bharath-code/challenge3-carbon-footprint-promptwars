// Carbon Footprint Tracker - Calculation Logic
// All factors are in kg CO2e per unit

export interface CarbonInputs {
  // Transport inputs
  carMilesPerYear: number;
  carType: 'suv' | 'sedan' | 'hybrid' | 'ev';
  transitMilesPerYear: number;
  flightHoursShort: number; // short-haul flights (<3 hours)
  flightHoursLong: number;  // long-haul flights (>=3 hours)

  // Home energy inputs
  electricityKWhPerMonth: number;
  isElectricityRenewable: boolean;
  gasThermsPerMonth: number;
  householdSize: number;

  // Diet inputs
  dietType: 'vegan' | 'vegetarian' | 'low-meat' | 'high-meat';

  // Lifestyle / waste inputs
  shoppingLevel: 'low' | 'average' | 'high';
  doesRecycleAndCompost: boolean;
}

// Average factors in kg CO2e per mile
export const CAR_EMISSION_FACTORS = {
  suv: 0.55,
  sedan: 0.40,
  hybrid: 0.22,
  ev: 0.12,
};

export const TRANSIT_EMISSION_FACTOR = 0.14; // kg CO2e per mile

// Hourly flight emission factors (includes average radiative forcing multiplier of 1.9)
export const FLIGHT_SHORT_FACTOR = 180; // kg CO2e per hour
export const FLIGHT_LONG_FACTOR = 110;  // kg CO2e per hour

// Electricity grid carbon intensity (kg CO2e per kWh)
export const GRID_INTENSITY_STANDARD = 0.37;
export const GRID_INTENSITY_RENEWABLE = 0.02;

// Natural gas carbon intensity (kg CO2e per therm)
export const GAS_EMISSION_FACTOR = 5.3;

// Diet annual footprints (kg CO2e per year)
export const DIET_ANNUAL_FOOTPRINT = {
  vegan: 900,
  vegetarian: 1200,
  'low-meat': 1800,
  'high-meat': 2800,
};

// Consumption / waste annual footprints (kg CO2e per year)
export const SHOPPING_ANNUAL_FOOTPRINT = {
  low: 250,
  average: 750,
  high: 1600,
};

export const WASTE_ANNUAL_DEFAULT = 350;
export const WASTE_ANNUAL_REDUCED = 100;

/**
 * Calculates carbon emissions from vehicle usage (kg CO2e per year)
 */
export function calculateCarCarbon(miles: number, carType: keyof typeof CAR_EMISSION_FACTORS): number {
  return miles * CAR_EMISSION_FACTORS[carType];
}

/**
 * Calculates carbon emissions from public transit (kg CO2e per year)
 */
export function calculateTransitCarbon(miles: number): number {
  return miles * TRANSIT_EMISSION_FACTOR;
}

/**
 * Calculates carbon emissions from flight travel (kg CO2e per year)
 */
export function calculateFlightCarbon(shortHours: number, longHours: number): number {
  return (shortHours * FLIGHT_SHORT_FACTOR) + (longHours * FLIGHT_LONG_FACTOR);
}

/**
 * Calculates per-capita carbon emissions from home energy usage (kg CO2e per year)
 */
export function calculateEnergyCarbon(
  electricityKWh: number,
  isRenewable: boolean,
  gasTherms: number,
  householdSize: number
): number {
  const householdSizeChecked = Math.max(1, householdSize);
  const electricityFactor = isRenewable ? GRID_INTENSITY_RENEWABLE : GRID_INTENSITY_STANDARD;
  
  const annualElectricity = electricityKWh * 12 * electricityFactor;
  const annualGas = gasTherms * 12 * GAS_EMISSION_FACTOR;
  
  return (annualElectricity + annualGas) / householdSizeChecked;
}

/**
 * Calculates annual carbon emissions from diet choice (kg CO2e per year)
 */
export function calculateDietCarbon(dietType: keyof typeof DIET_ANNUAL_FOOTPRINT): number {
  return DIET_ANNUAL_FOOTPRINT[dietType];
}

/**
 * Calculates annual carbon emissions from waste and shopping habits (kg CO2e per year)
 */
export function calculateWasteCarbon(
  shoppingLevel: keyof typeof SHOPPING_ANNUAL_FOOTPRINT,
  doesRecycle: boolean
): number {
  const shoppingFootprint = SHOPPING_ANNUAL_FOOTPRINT[shoppingLevel];
  const wasteFootprint = doesRecycle ? WASTE_ANNUAL_REDUCED : WASTE_ANNUAL_DEFAULT;
  return shoppingFootprint + wasteFootprint;
}

export interface SectorBreakdown {
  transport: number;
  energy: number;
  diet: number;
  waste: number;
  total: number;
}

/**
 * Calculate total annual carbon footprint split by sectors
 */
export function calculateCarbonBreakdown(inputs: CarbonInputs): SectorBreakdown {
  const carCarbon = calculateCarCarbon(inputs.carMilesPerYear, inputs.carType);
  const transitCarbon = calculateTransitCarbon(inputs.transitMilesPerYear);
  const flightCarbon = calculateFlightCarbon(inputs.flightHoursShort, inputs.flightHoursLong);
  const transport = carCarbon + transitCarbon + flightCarbon;

  const energy = calculateEnergyCarbon(
    inputs.electricityKWhPerMonth,
    inputs.isElectricityRenewable,
    inputs.gasThermsPerMonth,
    inputs.householdSize
  );

  const diet = calculateDietCarbon(inputs.dietType);
  
  const waste = calculateWasteCarbon(inputs.shoppingLevel, inputs.doesRecycleAndCompost);

  const total = transport + energy + diet + waste;

  return {
    transport: Math.round(transport),
    energy: Math.round(energy),
    diet: Math.round(diet),
    waste: Math.round(waste),
    total: Math.round(total),
  };
}
