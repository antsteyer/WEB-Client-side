import Nutriment from './nutriment';
import { Shop } from './shop';

export default class Product {
    constructor(private name: string, public nutriments: Nutriment[], public ingredients: string, public additives: string[], public shops: Shop[]) {}

    getName(): string {
        return this.name;
    }

    getNutriments(): Nutriment[] {
        return this.nutriments;
    }
}