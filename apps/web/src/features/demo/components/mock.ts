import { faker } from '@faker-js/faker';
import { CardProp } from '../page';

const DATA_PER_ROW = 20;

export function generateMockBook(): CardProp[] {
    let result: CardProp[] = [];
    for (let i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.book.title(),
            price: faker.commerce.price(),
            url: faker.image.url(),
        })
    }
    return result;
}

export function generateMockCommerce(): CardProp[] {
    let result: CardProp[] = [];
    for (let i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
            url: faker.image.url(),
        })
    }
    return result;
}

export function generateMockVehicle(): CardProp[] {
    let result: CardProp[] = [];
    for (let i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.vehicle.manufacturer() + faker.vehicle.model(),
            price: faker.commerce.price(),
            url: faker.image.url(),
        })
    }
    return result;
}