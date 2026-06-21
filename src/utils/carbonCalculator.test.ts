import { describe, it, expect } from 'vitest';
import {
  calculateCarCarbon,
  calculateTransitCarbon,
  calculateFlightCarbon,
  calculateEnergyCarbon,
  calculateDietCarbon,
  calculateWasteCarbon,
  calculateCarbonBreakdown,
} from './carbonCalculator';
import type { CarbonInputs } from './carbonCalculator';
import { ACTION_ITEMS } from './actionItems';

describe('Carbon Calculator Logic', () => {
  describe('calculateCarCarbon', () => {
    it('calculates SUV carbon correctly', () => {
      expect(calculateCarCarbon(10000, 'suv')).toBe(5500);
    });

    it('calculates Sedan carbon correctly', () => {
      expect(calculateCarCarbon(10000, 'sedan')).toBe(4000);
    });

    it('calculates EV carbon correctly', () => {
      expect(calculateCarCarbon(10000, 'ev')).toBe(1200);
    });
  });

  describe('calculateTransitCarbon', () => {
    it('calculates transit emissions correctly', () => {
      expect(calculateTransitCarbon(1000)).toBe(140);
    });
  });

  describe('calculateFlightCarbon', () => {
    it('calculates short-haul and long-haul flights correctly', () => {
      // 10 short hours (10 * 180) + 20 long hours (20 * 110) = 1800 + 2200 = 4000
      expect(calculateFlightCarbon(10, 20)).toBe(4000);
    });
  });

  describe('calculateEnergyCarbon', () => {
    it('calculates per-capita energy emissions correctly for standard grid', () => {
      // Elec: 500 kWh/mo * 12 mo * 0.37 kg/kWh = 2220 kg
      // Gas: 10 therms/mo * 12 mo * 5.3 kg/therm = 636 kg
      // Total = 2856 kg. Shared by 2 people = 1428 kg
      expect(calculateEnergyCarbon(500, false, 10, 2)).toBe(1428);
    });

    it('calculates per-capita energy emissions correctly for renewable grid', () => {
      // Elec: 500 kWh/mo * 12 mo * 0.02 kg/kWh = 120 kg
      // Gas: 10 therms/mo * 12 mo * 5.3 kg/therm = 636 kg
      // Total = 756 kg. Shared by 1 person = 756 kg
      expect(calculateEnergyCarbon(500, true, 10, 1)).toBe(756);
    });

    it('defaults to household size of 1 if 0 is passed to avoid division by zero', () => {
      expect(calculateEnergyCarbon(500, true, 10, 0)).toBe(756);
    });
  });

  describe('calculateDietCarbon', () => {
    it('returns baseline for vegan diet', () => {
      expect(calculateDietCarbon('vegan')).toBe(900);
    });

    it('returns baseline for high-meat diet', () => {
      expect(calculateDietCarbon('high-meat')).toBe(2800);
    });
  });

  describe('calculateWasteCarbon', () => {
    it('calculates low shopping and recycled waste footprint correctly', () => {
      // low shopping (250) + reduced waste (100) = 350
      expect(calculateWasteCarbon('low', true)).toBe(350);
    });

    it('calculates high shopping and default waste footprint correctly', () => {
      // high shopping (1600) + default waste (350) = 1950
      expect(calculateWasteCarbon('high', false)).toBe(1950);
    });
  });

  describe('calculateCarbonBreakdown', () => {
    it('accurately aggregates all sectors', () => {
      const inputs: CarbonInputs = {
        carMilesPerYear: 5000, // Sedan: 5000 * 0.40 = 2000
        carType: 'sedan',
        transitMilesPerYear: 2000, // Transit: 2000 * 0.14 = 280
        flightHoursShort: 5, // Short: 5 * 180 = 900
        flightHoursLong: 10, // Long: 10 * 110 = 1100
        // Transport total = 2000 + 280 + 900 + 1100 = 4280

        electricityKWhPerMonth: 300, // Standard: 300 * 12 * 0.37 = 1332
        isElectricityRenewable: false,
        gasThermsPerMonth: 5, // Gas: 5 * 12 * 5.3 = 318
        householdSize: 2, // Energy total = (1332 + 318) / 2 = 825

        dietType: 'vegetarian', // Diet total = 1200

        shoppingLevel: 'average', // Shopping: 750
        doesRecycleAndCompost: true, // Reduced waste: 100 -> Waste total = 850
      };

      const breakdown = calculateCarbonBreakdown(inputs);

      expect(breakdown.transport).toBe(4280);
      expect(breakdown.energy).toBe(825);
      expect(breakdown.diet).toBe(1200);
      expect(breakdown.waste).toBe(850);
      expect(breakdown.total).toBe(4280 + 825 + 1200 + 850);
    });
  });

  describe('ACTION_ITEMS formulas', () => {
    const defaultInputs: CarbonInputs = {
      carMilesPerYear: 8000,
      carType: 'sedan',
      transitMilesPerYear: 1500,
      flightHoursShort: 6,
      flightHoursLong: 12,
      electricityKWhPerMonth: 450,
      isElectricityRenewable: false,
      gasThermsPerMonth: 15,
      householdSize: 2,
      dietType: 'low-meat',
      shoppingLevel: 'average',
      doesRecycleAndCompost: false,
    };

    it('calculates bike commute savings correctly', () => {
      const bikeCommute = ACTION_ITEMS.find((a) => a.id === 'bike-commute');
      expect(bikeCommute).toBeDefined();
      // Replaceable: Math.min(2500, 8000) = 2500 miles. Sedan factor: 0.40. Savings = 2500 * 0.40 = 1000
      expect(bikeCommute!.calculateSavings(defaultInputs)).toBe(1000);
    });

    it('calculates meatless mondays savings correctly', () => {
      const meatless = ACTION_ITEMS.find((a) => a.id === 'meatless-mondays');
      expect(meatless).toBeDefined();
      expect(meatless!.calculateSavings({ ...defaultInputs, dietType: 'high-meat' })).toBe(270);
      expect(meatless!.calculateSavings({ ...defaultInputs, dietType: 'low-meat' })).toBe(130);
      expect(meatless!.calculateSavings({ ...defaultInputs, dietType: 'vegetarian' })).toBe(45);
      expect(meatless!.calculateSavings({ ...defaultInputs, dietType: 'vegan' })).toBe(0);
    });

    it('calculates smart thermostat savings correctly', () => {
      const thermostat = ACTION_ITEMS.find((a) => a.id === 'smart-thermostat');
      expect(thermostat).toBeDefined();
      // Gas emissions: 15 * 12 * 5.3 = 954. Savings: Math.round((954 * 0.08) / 2) = Math.round(38.16) = 38
      expect(thermostat!.calculateSavings(defaultInputs)).toBe(38);
    });

    it('calculates line dry laundry savings correctly', () => {
      const lineDry = ACTION_ITEMS.find((a) => a.id === 'line-dry');
      expect(lineDry).toBeDefined();
      // Standard grid (0.37 factor): Math.round((450 * 0.37) / 2) = Math.round(83.25) = 83
      expect(lineDry!.calculateSavings(defaultInputs)).toBe(83);
      // Renewable grid (0.02 factor): Math.round((450 * 0.02) / 2) = Math.round(4.5) = 5
      expect(lineDry!.calculateSavings({ ...defaultInputs, isElectricityRenewable: true })).toBe(5);
    });

    it('calculates solar pledge savings correctly', () => {
      const solar = ACTION_ITEMS.find((a) => a.id === 'solar-pledge');
      expect(solar).toBeDefined();
      // Standard grid: Math.round((450 * 12 * (0.37 - 0.02)) / 2) = Math.round((5400 * 0.35) / 2) = Math.round(945) = 945
      expect(solar!.calculateSavings(defaultInputs)).toBe(945);
      // Renewable grid: 0
      expect(solar!.calculateSavings({ ...defaultInputs, isElectricityRenewable: true })).toBe(0);
    });

    it('calculates waste sorting savings correctly', () => {
      const sorting = ACTION_ITEMS.find((a) => a.id === 'waste-sorting');
      expect(sorting).toBeDefined();
      expect(sorting!.calculateSavings({ ...defaultInputs, doesRecycleAndCompost: false })).toBe(250);
      expect(sorting!.calculateSavings({ ...defaultInputs, doesRecycleAndCompost: true })).toBe(0);
    });
  });
});
