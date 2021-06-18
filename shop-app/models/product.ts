class Product {
  id: string;
  ownerId: string;
  imageUrl: any;
  title: string;
  description: any;
  price: any;

  constructor(
    id: string,
    ownerId: string,
    title: string,
    imageUrl: any,
    description: any,
    price: any
  ) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

export default Product;
