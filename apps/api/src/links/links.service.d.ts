import { Link, CreateLinkDto, UpdateLinkDto } from '@repo/api';
export declare class LinksService {
    private readonly _links;
    create(createLinkDto: CreateLinkDto): string;
    findAll(): Link[];
    findOne(id: number): string;
    update(id: number, updateLinkDto: UpdateLinkDto): string;
    remove(id: number): string;
}
//# sourceMappingURL=links.service.d.ts.map