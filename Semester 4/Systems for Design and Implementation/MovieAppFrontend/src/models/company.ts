export class Company {
    private company_id: number;
    private name: string;

    public constructor(id:number, name: string) {
        this.company_id = id;
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