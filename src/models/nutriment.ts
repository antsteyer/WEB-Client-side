export default class Nutriment {
    constructor(public name: string, public value_for_100g: number, public unit: string) {}

    public getName(): string {
        return this.name;
    }

    public getValueFor100g(): number {
        return this.value_for_100g;
    }

    public getUnit(): string {
        return this.unit;
    }
}