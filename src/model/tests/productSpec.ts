import { ProductModel } from "../product";

const product_model = new ProductModel();

console.log("Environment from Spec is" + process.env.ENV);

describe("Product Model", () => {
  it("Should have index method", () => {
    expect(product_model.index).toBeDefined();
  });
  it("Should have create method", () => {
    expect(product_model.create).toBeDefined();
  });
  it("Should have find method", () => {
    expect(product_model.find).toBeDefined();
  });
  it("Should have update method", () => {
    expect(product_model.update).toBeDefined();
  });
  it("Should have delete method", () => {
    expect(product_model.delete).toBeDefined();
  });

  it("Create Method should add new product", async () => {
    const result = await product_model.create({
      name: "product",
      price:150,
      pieces:20,
      category_id: 1,
      user_id: 1
    });
    
    expect(result).toEqual({
      id: 1,
      name: "product",
      price:150,
      pieces:20,
      category_id: '1' ,
      user_id: '1' 
    });
  });

  it("Index Method should Get All products in table ", async () => {
    const result = await product_model.index();
   
    expect(result).toEqual([
      {
        id: 1,
        name: "product",
        price:150,
        pieces:20,
        category_id: '1',
        user_id: '1' 
      },
    ]);
  });

  it("Find Method should Get product with id=1", async () => {
    const result = await product_model.find(1);
    
    expect(result).toEqual({
        id: 1,
        name: "product",
        price:150,
        pieces:20,
        category_id: '1' ,
        user_id: '1'
    });
  });

  it("update Method should update product name to product updated , price to 100 , pieces to 3", async () => {
    const result = await product_model.update(1,"product updated",100,3);
   
    expect(result).toEqual({
        id: 1,
        name: "product updated",
        price:100,
        pieces:3,
        category_id: '1',
        user_id: '1'
    });
  });

  it("Delete Method should Delete product with Id=1 ", async () => {
    product_model.delete(1);
    const result = await product_model.index();
    expect(result).toEqual([]);
  });
});
