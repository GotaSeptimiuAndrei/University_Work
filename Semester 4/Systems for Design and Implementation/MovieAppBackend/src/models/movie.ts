export class Movie {
    private static nextId = 1;
    private id: number;
    private title: string;
    private year: number;
    private genre: string;
    private company: string;
    private image: string;

    public constructor(title: string, year: number, genre: string, company:string, image: string) {
        this.id = Movie.nextId++;
        this.title = title;
        this.year = year;
        this.genre = genre;
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

    public setGenre(genre: string): void {
        this.genre = genre;
    }

    public setCompany(brand: string): void {
        this.company = brand;
    }
    public setImage(image: string): void {
        this.image = image;
    }
}
