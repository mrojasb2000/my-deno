import { HandlerFunc, Context } from "https://deno.land/x/abc/mod.ts"
import db from '../config/db.ts'
import { ErrorMiddleware, ErrorHandler } from "../middlewares/error.ts";

const database = db.getDatabase;
const employees = database.collection('employees');

interface Employee {
    _id: {
        $oid: string;
    };
    name: string;
    age: number;
    salary: number;
}


export const createEmployee: HandlerFunc = async (c: Context) => {
    try {
        if (c.request.headers.get("content-type") != "application/json"){
            throw new ErrorHandler("Invalid body", 422);
        }
        const body = await (c.body()) as {
            name?: string;
            salary: string;
            age?: string;
          };

        if (!Object.keys(body).length) {
            throw new ErrorHandler("Request body can not be empty!", 400);
        }
        const { name, salary, age } = body;

        const insertEmployee = await employees.insertOne({
            name,
            age,
            salary,
        });
        return c.json(insertEmployee, 201);
    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
}

export const fetchAllEmployees: HandlerFunc = async (c: Context) => {
    try {
        const fetchedEmployees: Employee[] = await employees.find();

        if (fetchedEmployees) {
            const list = fetchedEmployees.length ? fetchedEmployees.map((employee) => {
                const { _id: { $oid }, name, age, salary } = employee;
                return { id: $oid, name, age, salary }
            })
            : [];
            return c.json(list, 200);
        }

    } catch (error) {
        throw new ErrorHandler(error.message, error.status || 500);
    }
} 

/* export const fetchOneEmployee: HandlerFunc = async (c: Context) => {
    try {
      const { id } = c.params as { id: string };
  
      const fetchedEmployee = await employees.findOne({ _id: { "$oid": id } });
  
      if (fetchedEmployee) {
        const { _id: { $oid }, name, age, salary } = fetchedEmployee;
        return c.json({ id: $oid, name, age, salary }, 200);
      }
  
      throw new ErrorHandler("Employee not found", 404);
    } catch (error) {
      throw new ErrorHandler(error.message, error.status || 500);
    }
  }; */