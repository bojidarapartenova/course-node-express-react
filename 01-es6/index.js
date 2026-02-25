'use strict'

class Person {
    static nextId = 0
    static getNextId() {
        return ++Person.nextId
    }

    constructor(fName, lName, age, address) {
        this.id = Person.getNextId()
        this.fName = fName
        this.lName = lName
        this.age = age
        this.address = address
    }

    toString() {
        return `${this.id}: ${this.fName} ${this.lName} ${this.age} ${this.address}`
    }
}

class Employee extends Person {
    constructor(fName, lName, age, address, company, salary) {
        super(fName, lName, age, address)
        this.company = company
        this.salary = salary
    }

    toString() {
        return super.toString() + `, ${this.company} ${this.salary}`
    }
}

const people = [
    new Person('John', 'Smith', 25, 'London'),
    new Employee('John', 'Doe', 32, 'New York', 'ABC Ltd.', 50000),
    new Employee('Jane', 'Smith', 19, 'London', 'ABC Ltd.', 75000),
    new Person('Ivan', 'Petrov', 34, 'Sofia'),
    new Employee('Yulia', 'Hristova', 22, 'Plovdiv', 'ABC Ltd.', 85000),
]

people.forEach(p => console.log(p.toString()))

function calcAverageSalary(people) {
    const employees = people.filter(p => p instanceof Employee);

    if (employees.length === 0) {
        return 0;
    }

    const totalSalary = employees.reduce((acc, curr) => acc + curr.salary, 0);
    return totalSalary / employees.length;
}

console.log(calcAverageSalary(people));

