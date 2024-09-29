const { log } = require("console");

class ProductsManager {
  //con static se define atributos y métodos de la clase
  //con # se define atributos y métodos privados
  static #all = []; //Atributo que guardará todos los productos
  static #id = 0;

  constructor() {}

  //para crear un producto se necesita que se pase como argumento los datos del producto
  create = (data) => {
    data.id = ProductsManager.#id;
    ProductsManager.#id++;

    //buscar la manera de asignar un id aleatorio
    //agregar al array all con método push
    ProductsManager.#all.push(data);
  };

  //Método que devuelve todos los productos guardados en el atributo estático y privado all
  readAll = () => ProductsManager.#all;

  //Método que devuelve el primer producto que coincida con el parámetro
  readByName = (clave) =>
    ProductsManager.#all.find((each) =>
      each.name.toLowerCase().includes(clave.toLowerCase())
    );

  //Método que actualiza un producto existente
  update = (id, newData) => {
    let index = ProductsManager.#all.findIndex(
      (product) => product.id === id); //product: Elemento del array #all. product.id: id de los productos en el array #all. id es el id del elemento que se dese updatear que llega al método por parámetro.
    
    if (index === -1) {
      return `Producto con ID ${id} no encontrado.`;
    }
    ProductsManager.#all[index] = {...ProductsManager.#all[index], ...newData};
    return ProductsManager.#all[index];
  };

  //Método para eliminar un producto
  distroy = (id) => {
    let index = ProductsManager.#all.findIndex((product) => product.id === id);

    if (index === -1){
        return `Producto con ID ${id} no encontrado`;
    }

    ProductsManager.#all.splice(index, 1);
    console.log (`El producto con ID ${id} ha sido eliminado`);
    console.log (ProductsManager.#all);
    //NOTA: Al hacer console.log del array con SPLICE, muestra unincamente el elemento aliminado
  }
}

const manager = new ProductsManager();
manager.create({
  category: "Agenda",
  design: "Michis",
  name: "Santuario de Michis",
  price: 15000,
  stock: 20,
  photo: "agendaMichi.png",
});
manager.create({
  category: "Agenda",
  design: "Carpinchos",
  name: "Carpinchosa",
  price: 12000,
  stock: 50,
  photo: "agendaCarpi.png",
});

let all = manager.readAll();
console.log(all);
// console.log(manager.readByName("coca"));
// console.log(manager.readByName("pinchos"));
// console.log(manager.readByName("chis"));

const mod = manager.update(1, { name: "La Carpincheada" });
console.log(mod);

manager.distroy(1);