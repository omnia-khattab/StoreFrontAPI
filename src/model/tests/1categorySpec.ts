import { CategoryModel } from '../category';

const category_model = new CategoryModel();

describe('Category Model', () => {
  it('Should have index method', () => {
    expect(category_model.index).toBeDefined();
  });
  it('Should have create method', () => {
    expect(category_model.create).toBeDefined();
  });
  it('Should have find method', () => {
    expect(category_model.find).toBeDefined();
  });
  it('Should have update method', () => {
    expect(category_model.update).toBeDefined();
  });
  it('Should have delete method', () => {
    expect(category_model.delete).toBeDefined();
  });

  it('Create Method should add new Category', async () => {
    const result = await category_model.create({
      name: 'category1',
    });

    expect(result).toEqual({
      id: 1,
      name: 'category1',
    });
  });

  it('Index Method should Get All categories in table ', async () => {
    const result = await category_model.index();

    expect(result).toEqual([
      {
        id: 1,
        name: 'category1',
      },
    ]);
  });

  it('Find Method should Get category with id=1', async () => {
    const result = await category_model.find(1);

    expect(result).toEqual({
      id: 1,
      name: 'category1',
    });
  });

  it('update Method should update category with id=1 from category1 to Category updated', async () => {
    const result = await category_model.update(1, 'Category updated');

    expect(result).toEqual({
      id: 1,
      name: 'Category updated',
    });
  });

  /*it("Delete Method should Delete Category with Id=1 ", async () => {
    await category_model.delete(1);
    const result = await category_model.index();
    expect(result).toEqual([]);
  });*/
});
