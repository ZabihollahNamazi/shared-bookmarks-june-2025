import { dateForDisplay } from "./common.js";
import assert from 'node:assert';
import test from 'node:test';

test('dateForDisplay formats full date-time object correctly', () => {
  const date = new Date('Mon Jun 23 2025 21:48:42 GMT+0100 (British Summer Time)');
  const formatted = dateForDisplay(date);
  assert.strictEqual(formatted, '2025-06-23', `Expected "2025-06-23", got "${formatted}"`);
});


