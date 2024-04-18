const fs = require('fs');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
  }

  addProduct(product) {
    try {
      const products = this.getProductsFromFile();
      product.id = this.generateId(products);
      products.push(product);
      this.saveProductsToFile(products);
      console.log("Producto agregado:", product);
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  }

  getProducts() {
    try {
      return this.getProductsFromFile();
    } catch (error) {
      console.error("Error al obtener productos:", error);
      return [];
    }
  }

  getProductById(id) {
    try {
      const products = this.getProductsFromFile();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    try {
      let products = this.getProductsFromFile();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        this.saveProductsToFile(products);
        console.log("Producto actualizado:", products[index]);
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  }

  deleteProduct(id) {
    try {
      let products = this.getProductsFromFile();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        this.saveProductsToFile(products);
        console.log("Producto eliminado:", deletedProduct);
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  }

  getProductsFromFile() {
    const data = fs.readFileSync(this.path, 'utf8');
    return JSON.parse(data);
  }

  saveProductsToFile(products) {
    fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
  }

  generateId(products) {
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastId + 1;
  }
}

// Ejemplo de uso
// const productManager = new ProductManager('products.json');

// productManager.addProduct({
//  title: "Camiseta",
//  description: "Camiseta de algodón",
//  price: 20,
//  thumbnail: "camiseta.jpg",
//  code: "CAM001",
//  stock: 50
//  });

//productManager.addProduct({
//  title: "Pantalón",
//  description: "Pantalón vaquero",
//  price: 30,
//  thumbnail: "pantalon.jpg",
//  code: "PAN001",
//  stock: 30
//  });

//  console.log("Todos los productos:", productManager.getProducts());

//  const productId = 1;
//  const product = productManager.getProductById(productId);
//  console.log(`Producto con ID ${productId}:`, product);

//  const updatedFields = {
//    price: 25,
//    stock: 40
//  };
//  productManager.updateProduct(productId, updatedFields);

//  productManager.deleteProduct(productId);