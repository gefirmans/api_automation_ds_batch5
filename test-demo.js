const request = require('supertest');
var chai = require('chai');
chai.use(require('chai-json-schema'));
const fs = require('fs')

const assert = chai.assert

describe('API test for "https://reqres.in"', () => {
    const BASE_URL = "https://reqres.in"
    // it('test GET all objects', async () => {
        //restful
        // const response = await request("https://api.restful-api.dev/").get("objects")
        // console.log(response.statusCode);
        // console.log(response.body)

        //reqres
    it('test GET users', async () => {
        const response = await request(BASE_URL)
        .get("/api/users/2")
        // console.log(response.statusCode);
        // console.log(response.body)
    
        //assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.data.first_name, "Janet")
        assert.equal(response.body.data.last_name, "Weaver")

        const schemaPath = "resources/jsonschema/get-object-scheme.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
        
    });

    it('test POST users', async () => {
        const body = {
            "name": "Michael",
            "job": "Leader"
        }
        const response = await request(BASE_URL)
        .post("/api/users")
        .send(body)
        // console.log(response.statusCode);
        // console.log(response.body)

        //assertion
        assert.equal(response.statusCode, 201)
        assert.equal(response.body.name, "Michael")

        const schemaPath = "resources/jsonschema/post-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });

    it('test PUT users', async () => {
        const body = {
            "name": "morpheus",
            "job": "zion resident"
        }
        const response = await request(BASE_URL)
        .put("/api/users/2")
        .send(body)
        // console.log(response.statusCode);
        // console.log(response.body)

        //assertion
        assert.equal(response.statusCode, 200)
        assert.equal(response.body.name, "morpheus")
        assert.equal(response.body.job, "zion resident")

        const schemaPath = "resources/jsonschema/put-object-schema.json"
        const jsonSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'))
        assert.jsonSchema(response.body, jsonSchema)
    });
    
    it('test DELETE user', async () => {
        const response = await request("https://reqres.in/api/")
        .delete("1")
        console.log(response.statusCode);
        console.log(response.body)
    });
}); 