import { Product } from "../models/product.model";

export class ProductService {
    private baseUrl = 'http://localhost:8000/product/'

    async getAll(): Promise<Product[]> {
        const response = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const data: Product[] = await response.json()
        return data
    }

    async getById(id: string): Promise<Product> {
        const response = await fetch(this.baseUrl + id, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const data: Product = await response.json()
        return data
    }

    async create(product: Product) {
        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        })

        return response
    }

    async update(product: Product) {        
        const response = await fetch(this.baseUrl + `${product.product_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(product)
        })

        return response
    }

    async delete(id: string) {
        const response = await fetch(this.baseUrl + id, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })

        return response
    }

}