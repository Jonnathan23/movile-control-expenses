export class CategoryEntity {
    public constructor(
        public readonly id: string,
        public readonly key: string,
        public readonly label: string,
        public readonly icon: string,
        public readonly color: string,
    ) {}
}
