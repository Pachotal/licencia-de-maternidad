import { addDays, subDays } from 'date-fns';
/**
 * Calculates the leave start date (Retiro).
 * Exactly 41 days before the Estimated Due Date (FPP).
 */
export function calculateRetiro(fpp: Date): Date {
  return subDays(fpp, 41);
}
/**
 * Calculates the return to work date (Reintegro).
 * Exactly 57 days after the Estimated Due Date (FPP).
 */
export function calculateReintegro(fpp: Date): Date {
  return addDays(fpp, 57);
}