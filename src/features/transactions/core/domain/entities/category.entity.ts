interface CategoryEntityProps {
    id: string;
    name: string;
    icon: string;
    color: string;
}

export class CategoryEntity {
    public readonly id: string;
    public readonly name: string;
    public readonly icon: string;
    public readonly color: string;

    public constructor(props: CategoryEntityProps) {
        const { id, name, icon, color } = props;

        this.id = id;
        this.name = name;
        this.icon = icon;
        this.color = color;
    }
}
