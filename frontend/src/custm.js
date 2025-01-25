import { useQuery } from '@tanstack/react-query';

const createUnique = (product, listName) => {
  return `${listName}--${product.id}`;
};


const fetchDataOne = async () => {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return response.json();
};

export const useProductArray = () => {
  const { data: productsA = [], error:oneError, isLoading:isOneLoading } = useQuery({
    queryKey: ['products_store1'],
    queryFn: fetchDataOne,
  });


  const store_1 = Array.isArray(productsA)
    ? productsA.map((product) => ({
        ...product,
        fob: createUnique(product, 'store_1'),
        quantity:150
      }))
    : [];

  return { store_1, oneError, isOneLoading };
};
const fetchDataTwo = async()=>{
  const response = await fetch('https://fakestoreapi.in/api/products');
  if(!response.ok){
    throw new Error('Failed to fetch products')
  }
  return response.json();
}
export const useProductArrayTwo=()=>{
  const {data:{products}={},error:twoError,isLoading:isTwoLoading} = useQuery({
    queryKey:['products_store2'],
    queryFn:fetchDataTwo

  })
  const store_3 = 
  Array.isArray(products)? products.map((product)=>({
    ...product,
    fob:createUnique(product,'store_3'),
    quantity:150

  })):[];
  return{store_3,twoError,isTwoLoading}
}



const allProducts = [
  {
    category: 'Electronics',
    products: [
      {
        id: 1,
        name: 'Laptop Mockup',
        price: 1000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-psd/laptop-mock-up-isolated_1310-1463.jpg?size=626&ext=jpg',
      },
      {
        id: 2,
        name: 'Realistic MacBook Mockup',
        price: 1200,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-psd/realistic-macbook-mock-up_1022-57.jpg?size=626&ext=jpg',
      },
      {
        id: 3,
        name: 'Smartphone Mockup',
        price: 800,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/smartphone-mock-up_81761-26.jpg?w=740',
      },
      {
        id: 4,
        name: 'Smart TV',
        price: 1500,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/tv-that-has-picture-buffalo-it_1095889-4438.jpg?w=1380',
      },
      {
        id: 5,
        name: 'Computer Monitor Display',
        price: 400,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/view-computer-monitor-display_23-2150757327.jpg',
      },
      {
        id: 6,
        name: 'Laptop Holder Stand',
        price: 60,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/running-laptop-is-installed-notebook-holder-stand_351981-1088.jpg?w=996',
      },
      {
        id: 7,
        name: 'Kitchen Appliances Set',
        price: 250,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-vector/white-household-kitchen-appliances-transparent-set_1284-26015.jpg',
      },
      {
        id: 8,
        name: 'Mixer',
        price: 80,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-vector/kitchen-appliances-electric-blender-whisk-household-equipment-cooking-food-mixer_107791-6644.jpg',
      },
      {
        id: 9,
        name: 'Blender with Fresh Fruits',
        price: 100,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/metal-food-blender-close-up-with-fresh-exotic-tropic-fruits-it-kitchen-background-with-empty-space-blender-wooden-table-kitchen_639032-170.jpg',
      },
      {
        id: 10,
        name: 'Coffee Machine',
        price: 120,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-vector/coffee-drinks-realistic-illustration-with-coffee-machine-cup_1284-58702.jpg',
      },
    ],
  },
  {
    category: 'Sports',
    products: [
      {
        id: 1,
        name: 'Sneakers',
        price: 50,
        quantity: 10,
        imageSrc:
          'https://images.pexels.com/photos/1580267/pexels-photo-1580267.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 2,
        name: 'Sneakers',
        price: 50,
        quantity: 10,
        imageSrc:
          'https://images.pexels.com/photos/4462782/pexels-photo-4462782.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      },
      {
        id: 3,
        name: 'Sneakers',
        price: 50,
        quantity: 10,
        imageSrc:
          'https://images.pexels.com/photos/998883/pexels-photo-998883.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
      },
      {
        id: 4,
        name: 'T-shirt',
        price: 50,
        quantity: 10,
        imageSrc:
          'https://img.freepik.com/free-vector/soccer-jersey-front-back-design_52683-44070.jpg',
      },
      {
        id: 5,
        name: 'T-shirt',
        price: 50,
        quantity: 10,
        imageSrc:
          'https://img.freepik.com/free-vector/soccer-jersey-template-sport-t-shirt-design_29096-1299.jpg',
      },
      {
        id: 6,
        name: 'T-shirt',
        price: 35,
        quantity: 10,
        imageSrc:
          'https://img.freepik.com/premium-vector/vector-vector-modern-trendy-sports-jersey-template-design-football-gaming-jersey_795261-21.jpg',
      },
      {
        id: 7,
        name: 'T-shirt',
        price: 35,
        quantity: 10,
        imageSrc:
          'https://img.freepik.com/free-vector/soccer-jersey-pattern-design_23-2150294664.jpg',
      },
      {
        id: 8,
        name: 'T-shirt',
        price: 35,
        quantity: 10,
        imageSrc:
          'https://img.freepik.com/free-vector/sports-shirt-design-ready-print-football-shirt-sublimation_29096-4134.jpg',
      },
      {
        id: 9,
        name: 'Sneakers',
        price: 35,
        quantity: 10,
        imageSrc:
          'https://images.pexels.com/photos/1032110/pexels-photo-1032110.jpeg?auto=compress&cs=tinysrgb&w=1260',
      },
      {
        id: 10,
        name: 'Sneakers',
        price: 35,
        quantity: 10,
        imageSrc:
          'https://images.pexels.com/photos/1070360/pexels-photo-1070360.jpeg?auto=compress&cs=tinysrgb&w=1260',
      },
    ],
  },
  {
   category:'Home and Kitchen',
   products:[
     {
              "id": 1,
              "name": "Blender",
              "price": 45.99,
              "quantity": 10,
              "imageSrc": "https://cdn.pixabay.com/photo/2014/12/21/23/29/blender-575445_1280.png"
            },
            {
              "id": 2,
              "name": "Microwave",
              "price": 120.50,
              "quantity": 5,
              "imageSrc": "https://cdn.pixabay.com/photo/2020/12/12/07/35/microwave-5824723_640.png"
            },
            {
              "id": 3,
              "name": "Toaster",
              "price": 25.99,
              "quantity": 20,
              "imageSrc": "https://cdn.pixabay.com/photo/2013/07/12/13/18/toaster-146784_640.png"
            },
            {
              "id": 4,
              "name": "Stove",
              "price": 299.99,
              "quantity": 3,
              "imageSrc": "https://cdn.pixabay.com/photo/2020/11/23/13/18/stove-5769724_1280.png"
            },
            {
              "id": 5,
              "name": "Kettle",
              "price": 30.00,
              "quantity": 15,
              "imageSrc": "https://cdn.pixabay.com/photo/2022/06/22/08/34/kettle-7277415_640.png"
            },
            {
              "id": 6,
              "name": "Rice Cooker",
              "price": 60.99,
              "quantity": 8,
              "imageSrc": "https://cdn.pixabay.com/photo/2022/05/11/14/35/rice-7189498_640.png"
            },
            {
              "id": 7,
              "name": "Air Fryer",
              "price": 75.50,
              "quantity": 6,
              "imageSrc": "https://media.istockphoto.com/id/1475226180/photo/air-fryer-machine-cooking-potato-fried-in-kitchen-lifestyle-of-new-normal-cooking.jpg?s=612x612&w=0&k=20&c=6JN6lOKtaBxqHNDA_Q545PH7gDvjZiOl7ImsHFRPsFM="
            },
            {
              "id": 8,
              "name": "Lemon Squeezer",
              "price": 15.99,
              "quantity": 25,
              "imageSrc": "https://cdn.pixabay.com/photo/2017/01/02/10/31/lemon-squeezer-1946441_640.jpg"
            },
            {
              "id": 9,
              "name": "Refrigerator",
              "price": 899.99,
              "quantity": 2,
              "imageSrc": "https://media.istockphoto.com/id/2162681544/photo/modern-kitchen-with-front-view-of-refrigerator-and-white-cabinets.jpg?s=612x612&w=0&k=20&c=Z1vEaHfWu3kdU5Q0JKAaTBluLfQHZrQMYb5huOIRvIY="
            },
            {
              "id": 10,
              "name": "Wood Furniture",
              "price": 450.00,
              "quantity": 4,
              "imageSrc": "https://www.shutterstock.com/image-photo/wood-furniture-house-2521591797"
            },
            {
              "id": 11,
              "name": "Black Chair",
              "price": 89.99,
              "quantity": 10,
              "imageSrc": "https://www.shutterstock.com/image-photo/black-chair-isolated-on-white-background-leather-2505643633"
            },
            {
              "id": 12,
              "name": "Modern Lobby",
              "price": 250.00,
              "quantity": 3,
              "imageSrc": "https://www.shutterstock.com/image-illustration/modern-lobby-interior-featuring-stylish-seating-blue-2523844011"
            }
            ]
  },
  {
    category: 'Motors',
    products: [
      {
        id: 1,
        name: 'Motorcycle - 3D Rendering',
        price: 8000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/motorcycle-transparent-background-3d-rendering-illustration_494250-61443.jpg',
      },
      {
        id: 2,
        name: 'Motorcycle - Indoor Presentation',
        price: 7500,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/cool-motorcycle-presentation-indoors_23-2150849583.jpg',
      },
      {
        id: 3,
        name: 'Yellow Sportbike',
        price: 8500,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/isolated-realistic-metal-yellow-sportbike-motorcycle-from-left-front-view_16145-1925.jpg',
      },
      {
        id: 4,
        name: 'Motorcycle - Outdoors',
        price: 7000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/cool-motorcycle-outdoors_23-2150849447.jpg',
      },
      {
        id: 5,
        name: 'Offroader Jeep',
        price: 30000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg',
      },
      {
        id: 6,
        name: 'Black Mini Coupe',
        price: 25000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/black-mini-coupe-road_114579-5056.jpg',
      },
      {
        id: 7,
        name: 'Luxury Car - 3D Rendering',
        price: 45000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/luxury-car-transparent-background-3d-rendering-illustration_494250-32501.jpg',
      },
      {
        id: 8,
        name: 'White Sport Car',
        price: 50000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/white-sport-car-isolated_798986-2262.jpg',
      },
      {
        id: 9,
        name: 'Blue Sport SUV',
        price: 42000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/isolated-realistic-matte-blue-sport-city-suv-car-from-left-front-view_16145-4922.jpg',
      },
      {
        id: 10,
        name: 'Luxury Car - 3D Rendering',
        price: 46000,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/luxury-car-transparent-background-3d-rendering-illustration_494250-32501.jpg',
      },
    ],
  },
  {
    category: 'Jewelry',
    products: [
      {
        id: 1,
        name: 'Gold Chain 1',
        price: 200,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/display-shiny-elegant-gold-chain_23-2149635331.jpg',
      },
      {
        id: 2,
        name: 'Gold and Silver Jewelry Display',
        price: 250,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-vector/realistic-gold-silver-jewelry-display-black-mannequins-stands-grey-surface_1284-9644.jpg',
      },
      {
        id: 3,
        name: 'Jewelry Photography',
        price: 220,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/jewelry-photography_808279-7.jpg',
      },
      {
        id: 4,
        name: 'Earrings with Blue Precious Stones',
        price: 180,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/model-shows-earrings-ring-with-beautiful-blue-precious-stones_8353-5043.jpg',
      },
      {
        id: 5,
        name: 'Luxurious Gold Chain 2',
        price: 210,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/display-shiny-luxurious-golden-chain_23-2149635270.jpg',
      },
      {
        id: 6,
        name: 'Luxury Necklace Display',
        price: 230,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/beautiful-luxury-necklace-jewelry-stand-neck_1339-7946.jpg',
      },
      {
        id: 7,
        name: 'Abstract Gold Chain Presentation',
        price: 190,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/abstract-gold-chain-jewellery-presentation_23-2149599059.jpg',
      },
      {
        id: 8,
        name: 'Gold Necklace Stand',
        price: 260,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/gold-necklace-necklace-display-stand_28549-329.jpg',
      },
      {
        id: 9,
        name: 'Gold Jewelry on White Background',
        price: 240,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/gold-jewelry-white-background_237502-499.jpg',
      },
      {
        id: 10,
        name: 'Gold Wedding Rings',
        price: 270,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/two-gold-wedding-rings-with-blue-background_176841-63571.jpg',
      },
    ],
  },
  {
    category: 'Beauty',
    products: [
      {
        id: 1,
        name: 'Beauty Products Set',
        price: 30,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/close-up-beauty-products-white-background_1048944-30689032.jpg',
      },
      {
        id: 2,
        name: 'Watercolor Wellness Design',
        price: 20,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-psd/watercolor-wellness-design-template_23-2149549911.jpg',
      },
      {
        id: 3,
        name: 'Cosmetic Treatment Kit',
        price: 40,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/cosmetic-treatment-with-copy-space_23-2148574963.jpg',
      },
      {
        id: 4,
        name: 'Natural Cosmetic Banner',
        price: 25,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-vector/natural-cosmetic-banner_23-2148971922.jpg',
      },
      {
        id: 5,
        name: 'Cosmetic Bottle with Ginkgo Leaves',
        price: 35,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-vector/cosmetics-skincare-product-bottle-mockup-ginkgo-leaves_148899-221.jpg',
      },
      {
        id: 6,
        name: 'Bath Concept with Marble Background',
        price: 28,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/free-photo/flat-lay-bath-concept-marble-background_23-2148295951.jpg',
      },
      {
        id: 7,
        name: 'Organic Cosmetics with Spa Products',
        price: 30,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-photo/organic-cosmetics-with-spa-products-flatlay-plants-pink-background_124507-33952.jpg',
      },
      {
        id: 8,
        name: 'Beauty Concept with Organic Cosmetics',
        price: 22,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/beauty-concept-with-organic-cosmetics_23-2148608250.jpg',
      },
      {
        id: 9,
        name: 'Argan Oil Products Mockup',
        price: 45,
        quantity: 50,
        imageSrc:
          'https://img.freepik.com/premium-psd/argan-oil-products-mockup_23-2149287504.jpg',
      },
    ],
  },
];


const products_ = allProducts.flatMap(categoryObj =>
  categoryObj.products.map(product => ({
    ...product,
    category: categoryObj.category,
  }))
);

const newProducts=(products)=>{
  let nextId = 1 
  let updated=[]
  for (const product of products){
    const updatedProduct ={...product,id:nextId++}
    updated.push(updatedProduct)


  }
  return updated
}
const newList = newProducts(products_)
const updatedProducts = newList.map(product=>({
    id: product.id,
    title: product.name,  
    price: product.price,
    quantity: product.quantity,
    image: product.imageSrc ,
    category:product.category
  
  }))
  

  

export const store_2 = updatedProducts.map((product)=>({
  ...product,
  fob:createUnique(product,'store_2')
}))






