import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from 'src/app/shared/interfaces';

const ROUTE = 'http://localhost:5000/game/';
const optionsObj = { withCredentials: true };

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) { }

    getLatest() {
        return this.http.get<Product[]>(ROUTE + 'latest');
    }

    getOne(id: string) {
        return this.http.get<{success: boolean , product: Product}>(ROUTE + id);
    }

    create(data) {
        return this.http.post<{ product: any, message: string, errors: any }>(ROUTE, data, optionsObj);
    }

    edit(data) {
        const { _id: id } = data.product;
        return this.http.patch<{ product: any, message: string, errors: any }>(ROUTE + id, data.product, optionsObj);
    }

    remove(id: string) {
        return this.http.delete<{ message: string }>(ROUTE + id, optionsObj);
    }
}
