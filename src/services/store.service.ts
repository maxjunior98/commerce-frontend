import { Store } from "../models/store.model";

export class StoreService {
    private baseUrl = 'http://localhost:8000/store/'

    async getAll (): Promise<Store[]> {
        const response = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const data: Store[] = await response.json()
        return data

    }

    async getById (id: string): Promise<Store> {
        const response = await fetch(this.baseUrl + id, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        const data: Store = await response.json()
        return data
    }

    async create (store: Store) {
        const payload = {
            store_name: store.store_name,
            store_email: store.store_email,
            store_password: store.store_password
        }

        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
            const errTxt = "Failed to create store"
            throw new Error(errTxt)
        }

        return response
    }

    async update (store: Store) {
        const payload = {
            store_name: store.store_name,
            store_email: store.store_email,
            store_password: store.store_password
        }

        const response = await fetch(this.baseUrl + `${store.store_id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })

        if(!response.ok){
            const errTxt = "Failed to update store"
            throw new Error(errTxt)
        }

        return response
    }

    async delete (id: string) {
        const response = await fetch(this.baseUrl + id, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            const errTxt = "Failed to delete store"
            throw new Error(errTxt)
        }

        return response
    }

}