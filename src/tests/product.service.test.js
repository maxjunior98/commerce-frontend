import { ProductService } from '../services/product.service'

global.fetch = jest.fn()

describe('Product Service', () => {

    const productService = new ProductService()

    const mockResults = [
        {id: 1, name: 'Sol', description: 'Cerveja 600ml', price: 5.99, owner_id: 1},
        {id: 2, name: 'Heineken', description: 'Cerveja 300ml', price: 6.59, owner_id: 2}
    ]

    afterEach(() => {
        jest.clearAllMocks();
    })

    test('should fetch all products', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults
        })

        const result = await productService.getAll()
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(result).toEqual(mockResults)
    })

    test('should fetch one product', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: true,
            json: async () => mockResults[0]
        })

        const result = await productService.getById(id)
        expect(fetch).toHaveBeenCalledTimes(1)
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:8000/product/" + id, 
            expect.objectContaining({
                method: "GET"
            }))
        expect(result).toEqual(mockResults[0])
    })

    test('should throw error when product fetch fails', async () => {
        const id = '1'

        fetch.mockResolvedValue({
            ok: false,
            text: async () => "Not Found"
        });

        await expect(productService.getById(id)).rejects.toThrow('Failed to get product')
    })
})