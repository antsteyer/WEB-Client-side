import Nutriment from './nutriment';

export default class Product {
    constructor(private name: string, public nutriments: Nutriment[], public ingredients: string, public additives: string[]) {}

    getName(): string {
        return this.name;
    }

    getNutriments(): Nutriment[] {
        return this.nutriments;
    }
}