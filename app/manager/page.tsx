"use client"

import { useState } from "react"
import { Customer } from "../../src/models/customer.model"
import { CustomerService } from "../../src/services/customer.service"
import { StoreService } from "@/src/services/store.service"
import { Store } from "@/src/models/store.model"

export default function Manager() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [customer, setCustomer] = useState<Customer>()
  const [store, setStore] = useState<Store>()
  const [stores, setStores] = useState<Store[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const service = new CustomerService()
  const storeService = new StoreService()

  const handleGetAllCustomers = async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await service.getAll()
      setCustomers(data)
      console.log("Customers:", data)
    } catch (err) {
      setError("Failed to Get All Customers")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleGetCustomer = async () => {
    try{
      setLoading(true)
      setError(null)
  
      const data = await service.getById('3')
      setCustomer(data)
      console.log(data)
    } catch (err) {
      setError("Failed to Get Customer")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateCustomer = async () => {
    try {
      setLoading(true)
      setError(null)
      const mockCustomer: Customer = {id: 1, name: 'alex', email: 'alex@email.com', password: '1234'}

      const data = await service.create(mockCustomer)
      console.log(data)
    } catch (err) {
      setError("Failed to Create Customer")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateCustomer = async () => {
    try {
      setLoading(true)
      setError(null)
      const mockCustomer: Customer = {id: 3, name: 'jao', email: 'jao@email.com', password: '4321'}

      const data = await service.update(mockCustomer)
    } catch (err) {
      setError("Failed to Update Customer")
      console.error(err)

    } finally {
      setLoading(false)
    }
  }

  const handleDeleteCustomer = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await service.delete("5")
      console.log(data)

    } catch (err) {
      setError("Failed to Delete Customer")
      console.error(err)

    } finally {
      setLoading(false)
    }
  }

  const handleStoreService = async (value: string) => {
    try {
      setLoading(true)
      setError(null)

      let data
      if(value == "Get") {
        data = await storeService.getById('1')
        console.log(data)
        setStore(data)
      }
      if(value == "GetAll") {
        data = await storeService.getAll()
        console.log(data)
        setStores(data)
      }
      if(value == "Post") {
        const mockStore: Store = {
          store_id: 2,
          store_name: 'passo fundo',
          store_email: 'passofundo@email.com',
          store_password: 'teste1234'
        }
        data = await storeService.create(mockStore)
      }
      if(value == "Patch") {
        const mockStore: Store = {
          store_id: 3,
          store_name: 'LA Test',
          store_email: 'passofundo@email.com',
          store_password: 'teste4321'
        }
        data = await storeService.update(mockStore)
      }
      if(value == "Del") {
        data = await storeService.delete('1')
      }
      console.log(data)

    } catch (err) {
      setError("Failed to Delete Customer")
      console.error(err)

    } finally {
      setLoading(false)
    }

  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 gap-2">
      <h1 className="text-2xl font-bold mb-6">
        Test Customer API
      </h1>

      <button
        onClick={handleGetAllCustomers}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Fetch All Customers"}
      </button>

      <button
        onClick={handleGetCustomer}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Fetch Customer"}
      </button>

      <button
        onClick={handleCreateCustomer}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Create Customer"}
      </button>

      <button
        onClick={handleUpdateCustomer}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Update Customer"}
      </button>

      <button
        onClick={handleDeleteCustomer}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Delete Customer"}
      </button>

      <h1 className="text-2xl font-bold mb-6 mt-6">
        Test Store API
      </h1>
      
      <button
        onClick={() => handleStoreService('GetAll')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Get All Store"}
      </button>

      <button
        onClick={() => handleStoreService('Get')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Get Store"}
      </button>

      <button
        onClick={() => handleStoreService('Post')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Create Store"}
      </button>

      <button
        onClick={() => handleStoreService('Patch')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Update Store"}
      </button>

      <button
        onClick={() => handleStoreService('Del')}
        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {loading ? "Loading..." : "Delete Store"}
      </button>

      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}
    </div>
  )
}