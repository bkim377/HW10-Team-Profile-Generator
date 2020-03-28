// TODO: Write code to define and export the Employee class
// The first class is an `Employee` parent class with the following properties and
// methods:
//   * name
//   * id
//   * email
//   * getName()
//   * getId()
//   * getEmail()
//   * getRole() // Returns 'Employee'

class Employee {
    constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
    this.getName = function() {
        return this.name;
    }
    this.getId = function() {
        return this.id;
    }
    this.getEmail = function() {
        return this.email;
    }
    this.getRole = function() {
        return `Employee`;
    }
  }
}

module.exports = Employee;