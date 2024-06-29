export class Movie {
    private id: number;
    private title: string;
    private year: number;
    private genre: string;
    private company: string;
    private image: string;

    public constructor(id:number, title: string, price: number, brand: string, company: string, image: string) {
        this.id = id;
        this.title = title;
        this.year = price;
        this.genre = brand;
        this.company = company;
        this.image = image;
    }

    public getId(): number {
        return this.id;
    }

    public getTitle(): string {
        return this.title;
    }

    public getYear(): number {
        return this.year;
    }

    public getGenre(): string {
        return this.genre;
    }

    public getCompany(): string {
        return this.company;
    }

    public getImage(): string {
        return this.image;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public setYear(price: number): void {
        this.year = price;
    }

    public setGenre(brand: string): void {
        this.genre = brand;
    }

    public setCompany(company: string): void {
        this.company = company;
    }

    public setImage(image: string): void {
        this.image = image;
    }
}
