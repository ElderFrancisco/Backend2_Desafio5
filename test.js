const object1 = {
  id: 1,
  products: [
    {
      id: 3,
      quantity: 200,
    },
    {
      id: 5,
      quantity: 50,
    },
  ],
};
const object2 = [
  {
    id: 10,
    quantity: 20000,
  },
  {
    id: 8,
    quantity: 1250,
  },
];
object2.forEach((e) => {
  object1.products.push(e);
});

// object1.products.join(object2);
console.log(object1);
