export default class Nutriment {
    constructor(public name: string, public value_for_100g: number, public unit: string) {}

    public getName(): string {
        let name: string = '';
        const parsedNameArr: string [] = this.name.split('-');
        parsedNameArr.forEach((el: string) => {
            name += el + ' ';
        });
        return name.charAt(0).toUpperCase() + name.substring(1, name.length);
    }

    public getValueFor100g(): number {
        return Math.round(this.value_for_100g * 100) / 100;
    }

    public getUnit(): string {
        return this.unit;
    }
}