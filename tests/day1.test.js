import { describe, expect } from 'vitest';
import {calculateSimilarityScore, calculateDistance} from '../day1/day1';

describe('Advent of code Day 1, PART 1', () => {

    const left = [3, 4, 25, 22, 3, 3];
    const right = [4, 3, 15, 3, 94, 3];

    test('calculateDistance', () => {
        expect((calculateDistance(left, right))).toBe(76);
        expect((calculateSimilarityScore(left, right))).toBe(31);
    });
});
