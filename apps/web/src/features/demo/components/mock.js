import { faker } from '@faker-js/faker';
var DATA_PER_ROW = 20;
export function generateMockBook() {
    var result = [];
    for (var i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.book.title(),
            price: faker.commerce.price(),
        });
    }
    return result;
}
export function generateMockCommerce() {
    var result = [];
    for (var i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.commerce.productName(),
            price: faker.commerce.price(),
        });
    }
    return result;
}
export function generateMockVehicle() {
    var result = [];
    for (var i = 0; i < DATA_PER_ROW; i++) {
        result.push({
            title: faker.vehicle.manufacturer() + ' ' + faker.vehicle.model(),
            price: faker.commerce.price(),
        });
    }
    return result;
}
