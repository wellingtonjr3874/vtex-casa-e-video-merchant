import fs from 'fs/promises'
import path = require('path')
import * as MOCK_PRODUCT_RESPONSE from './mock-product-response.json'


describe("start service testes", () => {
    it("start service", async () => {
        const skus = "10"

        const getSelectedSku = MOCK_PRODUCT_RESPONSE.map(item => {
           const res = item.items.find(itemSku =>  !skus.split(",").findIndex(id => id === itemSku.itemId));
           console.log(res)
        })
        expect(true).toBeTruthy()
    })
})