import { CustomerService } from "../services/customer.service";

global.fetch = jest.fn();

describe('Customer Service', () => {

    const customerService = new CustomerService()

    const mockResults = [
        {id: 1, name: 'John Doe', email: 'johndoe@email.com', password: 'a1b2'},
        {id: 2, name: 'Johana Doe', email: 'johanadoe@email.com', password: 'c3d4'}
    ]

    afterEach(() => {
        jest.clearAllMocks();
    })
    

    test('should fetch all customers', async () => {
    
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults
        })

        const result = await customerService.getAll()
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResults)
    })

    test('should fetch one customer', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults[0]
        })

        const result = await customerService.getById(id)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/customer/" + id, 
            expect.objectContaining({
                method: "GET"
            }))
        expect(result).toEqual(mockResults[0])
    })

    test('should throw error when customer fetch fails', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: false,
            text: async () => "Not Found"
        });

        await expect(customerService.getById(id)).rejects.toThrow('Failed to get customer')
    })

    test('should create one customer', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults[0]
        })

        const result = await customerService.create(mockResults[0])
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/customer/", 
            expect.objectContaining({
                method: "POST",
                body: JSON.stringify(mockResults[0])
            })
        )
        expect(result).toEqual(mockResults[0])
    })

    test('should throw error when create customer fails', async () => {
        fetch.mockResolvedValue({
            ok: false,
            text: async () => "Failed to create"
        });

        await expect(customerService.create(mockResults[0])).rejects.toThrow('Failed to create customer')
    })

    test('should delete one customer', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults[0]
        })

        const result = await customerService.delete(id)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/customer/1",
            expect.objectContaining({
                method: "DELETE"
            })
        )
        expect(result).toEqual(mockResults[0])
    })

    test('should throw error when delete customer fails', async () => {
        const id = '1'
        fetch.mockResolvedValue({
            ok: false,
            text: async () => 'Failed to delete'
        })
        await expect(customerService.delete(id)).rejects.toThrow('Failed to delete customer')
    })


})