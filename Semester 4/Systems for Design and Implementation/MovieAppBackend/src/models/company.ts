export class Company {
    private static nextId = 1;
    private company_id: number;
    private name: string;

    public constructor(name: string) {
        this.company_id = Company.nextId++;
        this.name = name;
    }

    public getId(): number {
        return this.company_id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }
}