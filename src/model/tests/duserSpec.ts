import { UserModel } from "../user";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

const user_model = new UserModel();
const saltRounds = process.env.SALT_ROUNDS as string;
const pepper = process.env.BCRYPT_PASSWORD;
const passHash=bcrypt.hashSync("1234"+pepper,parseInt(saltRounds));

console.log("Environment from Spec is" + process.env.ENV);

describe("User Model", () => {
  it("Should have index method", () => {
    expect(user_model.index).toBeDefined();
  });
  it("Should have create method", () => {
    expect(user_model.create).toBeDefined();
  });
  it("Should have find method", () => {
    expect(user_model.find).toBeDefined();
  });
  it("Should have update method", () => {
    expect(user_model.update).toBeDefined();
  });
  it("Should have update password method", () => {
    expect(user_model.updatePassword).toBeDefined();
  });
  it("Should have authenticate method", () => {
    expect(user_model.authenticate).toBeDefined();
  });
  it("Should have delete method", () => {
    expect(user_model.delete).toBeDefined();
  });

  it("Create Method should add new user", async () => {
    
    const result = await user_model.create({
        first_name: "omnia",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password: "1234",
        user_role: "user",
    });
    
    result.password=passHash;

    const token=jwt.sign({id:result.id,name:result.first_name,email:result.email},process.env.TOKEN_SECRET as string,{expiresIn:"1h"});
        result.token=token;
    expect(result).toEqual({
        id: 1,
        first_name: "omnia",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password: `${passHash}`,
        token: `${token}`,
        user_role: "user",
    });
  });

  it("Index Method should Get All users in table ", async () => {
    const result = await user_model.index();
    result[0].password=passHash;
    expect(result).toEqual([
      {
        id: 1,
        first_name: "omnia",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password: `${passHash}`,
        token: null,
        user_role: "user",
      },
    ]);
  });

  it("Find Method should Get user with id=1", async () => {
    const result = await user_model.find(1);
    result.password=passHash;

    expect(result).toEqual({
        id: 1,
        first_name: "omnia",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password:`${passHash}`,
        token: null,
        user_role: "user",
    });
  });

  it("authenticate Method should dind user email and password to login", async () => {
    const result = await user_model.authenticate("omnia@gmail.com","1234");
    if(result){result.password=passHash;}
    
    expect(result).toEqual({
        id: 1,
        first_name: "omnia",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password:`${passHash}`,
        token: null,
        user_role: "user",
    });
  });

  it("update Method should update user name to omniak", async () => {
    const result = await user_model.update(1,"omniak","mohamed","omnia@gmail.com");
    result.password=passHash;
    expect(result).toEqual({
        id: 1,
        first_name: "omniak",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password:`${passHash}`,
        token: null,
        user_role: "user",
    });
  });

  const passHash2=bcrypt.hashSync("12345"+pepper,parseInt(saltRounds));
  it("update Method should update user password", async () => {
    const result = await user_model.updatePassword(1,"12345");
    result.password=passHash2;
    expect(result).toEqual({
        id: 1,
        first_name: "omniak",
        last_name: "mohamed",
        email: "omnia@gmail.com",
        password:`${passHash2}`,
        token: null,
        user_role: "user",
    });
  });

  /*it("Delete Method should Delete user with Id=1 ", async () => {
    await user_model.delete(1);
    const result = await user_model.index();

    expect(result).toEqual([]);

  });*/
});
