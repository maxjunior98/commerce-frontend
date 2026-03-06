import { Customer } from "../models/customer.model";


export class CustomerService{
    private baseUrl = 'http://localhost:8000/customer/'

    async getAll(): Promise<Customer[]>{
        const response = await fetch(this.baseUrl, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            const errTxt = "Failed to get all customer"
            throw new Error(errTxt)
        }

        const data: Customer[] = await response.json()
        // console.log(data)
        return data
    }

    async getById(id: string): Promise<Customer> {
        const response = await fetch(this.baseUrl + id, {
            method: "GET",
            headers: {
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            const errTxt = "Failed to get customer"
            throw new Error(errTxt)
        }

        const data: Customer = await response.json()
        // console.log(data)
        return data
    }

    async create(customer: Customer) {

        const response = await fetch(this.baseUrl, {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(customer)
        })
        
        if(!response.ok){
            const errTxt = "Failed to create customer"
            throw new Error(errTxt)
        }

        // console.log(response)
        return response.json()
    }

    async update (customer: Customer) {
        const payload = {
            "customer_name": customer.name,
            "customer_email": customer.email,
            "customer_password": customer.password
        }

        const response = await fetch(this.baseUrl + `${customer.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(payload)
        })
        
        if(!response.ok){
            const errTxt = "Failed to update customer"
            throw new Error(errTxt)
        }

        // console.log(response)
        return response.json()
    }

    async delete (id: string) {
        const response = await fetch(this.baseUrl + id, {
            method: "DELETE",
            headers: {
                "Content-Type":"application/json"
            }
        })

        if(!response.ok){
            const errTxt = "Failed to delete customer"
            throw new Error(errTxt)
        }

        // console.log(response)
        return response.json()
    }
}