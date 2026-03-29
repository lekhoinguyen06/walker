import type { CreateLinkDto, UpdateLinkDto } from '@repo/api';
import { LinksService } from './links.service';
export declare class LinksController {
    private readonly linksService;
    constructor(linksService: LinksService);
    create(createLinkDto: CreateLinkDto): string;
    findAll(): import("@repo/api").Link[];
    findOne(id: string): string;
    update(id: string, updateLinkDto: UpdateLinkDto): string;
    remove(id: string): string;
}
//# sourceMappingURL=links.controller.d.ts.map