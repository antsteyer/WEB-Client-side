import Nutriment from './nutriment';

export default class Ingredient {
    constructor(private name: string, public nutriments: Nutriment[]) {}

    getName(): string {
        return this.name;
    }

    getNutriments(): Nutriment[] {
        return this.nutriments;
    }
}