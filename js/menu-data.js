// Datos del menú — edita este archivo cada mes para actualizar la Kermes.
// count = cuántas fotos existen para ese plato (1-3). Por defecto 3 (los 11 platos
// del primer lote). 14 platos tienen 2 fotos (1 presentación adicional) y
// Encocado de Langosta también quedó en 2.
function dishImages(base, count) {
  count = count || 3;
  const imgs = ["images/" + base + ".jpg"];
  for (let i = 2; i <= count; i++) imgs.push("images/" + base + "-" + i + ".jpg");
  return imgs;
}

const MENU_DATA = {
  event: {
    title: "Gran Kermes",
    subtitle: "Sabores del Pacífico Colombiano",
    org: "Iglesia Lluvias de Bendición",
    schedule: "Este domingo",
    phone: "3153760995",
    phoneDisplay: "315 376 0995"
  },

  categories: [
    {
      id: "arroces",
      name: "Arroces",
      icon: "rice",
      items: [
        { name: "Arroz con Pollo", desc: "Sancocho, porción de arroz con pollo, tostada de plátano, ensalada", modalDesc: "Un festín de arroz dorado con especias, mezclado con trozos jugosos de pollo y verduras frescas. Se sirve caliente, recién hecho, acompañado de tostada de plátano crocante y un toque de limonada de panela que despierta el paladar.", price: 16000, images: dishImages("arroz-con-pollo", 2) }
      ]
    },
    {
      id: "pescados",
      name: "Pescados Fritos",
      icon: "fish",
      items: [
        { name: "Tilapia Frita", desc: "Sancocho, tilapia, arroz, ensalada, tostada, limonada", modalDesc: "Tilapia fresca, frita hasta lograr una piel dorada y crujiente que se rompe al primer bocado, dejando ver una carne suave y jugosa por dentro. El sabor del mar Pacífico en su punto exacto.", price: 25000, images: dishImages("tilapia-frita", 2) },
        { name: "Bocachico Frito", desc: "Sancocho, porción de bocachico, arroz con coco, ensalada, tostada, limonada", modalDesc: "El clásico bocachico de río, frito entero hasta quedar crocante por fuera y tierno por dentro. Servido con arroz con coco que suaviza cada bocado con su dulzura tropical.", price: 28000, images: dishImages("bocachico-frito", 2) },
        { name: "Pelada Frita", desc: "Sancocho, porción de pelada, arroz con coco, ensalada, tostada, limonada", modalDesc: "Pescado pelada dorado a la perfección, con ese crocante inconfundible que solo da la fritura en su punto. Un plato humilde que sabe a tradición del Pacífico.", price: 30000, images: dishImages("pelada-frita") }
      ]
    },
    {
      id: "seviche",
      name: "Seviche",
      icon: "shrimp",
      items: [
        { name: "Seviche de Camarón Titi", desc: "Galleta saltín y porción de seviche", modalDesc: "Camarón titi fresco marinado en limón, cebolla y cilantro: una explosión cítrica y salada que despierta los sentidos. Se disfruta con galleta saltín, el maridaje perfecto entre lo crocante y lo fresco.", price: 12000, images: dishImages("seviche-camaron") }
      ]
    },
    {
      id: "sudados",
      name: "Sudados y Encocados",
      icon: "pot",
      items: [
        { name: "Sudado de Camarón Tigre", desc: "Sancocho, porción de camarón, tostada, ensalada, arroz, limonada", modalDesc: "Camarones tigre grandes y jugosos, cocinados lentamente en un sudado espeso de tomate y especias que impregna cada bocado de sabor. Una receta que honra el mar del Pacífico.", price: 31000, images: dishImages("sudado-camaron-tigre") },
        { name: "Sudado de Camarón Titi", desc: "Sancocho, porción de camarón, tostada, ensalada, arroz, limonada", modalDesc: "Camarón titi pequeño pero lleno de sabor, sudado en una salsa casera que combina lo dulce y lo picante en su punto justo. Comida reconfortante del litoral.", price: 25000, images: dishImages("sudado-camaron-titi") },
        { name: "Sudado de Piangua", desc: "Sancocho, porción de piangua, tostada, ensalada, arroz, limonada", modalDesc: "La piangua, tesoro de los manglares del Pacífico, cocinada en un sudado profundo de sabores marinos. Un plato ancestral recolectado a mano por las mujeres del manglar.", price: 35000, images: dishImages("sudado-piangua") },
        { name: "Sudado de Tollo", desc: "Sancocho, porción de tollo, tostada, ensalada, arroz, limonada", modalDesc: "Tollo tierno cocinado a fuego lento en una salsa espesa y aromática, un plato que representa la esencia de la cocina afropacífica: sencilla, honesta y llena de sabor.", price: 25000, images: dishImages("sudado-tollo") },
        { name: "Plato Triple", desc: "Piangua, camarón titi y tollo, con tostada, arroz, ensalada, limonada", modalDesc: "La trilogía del Pacífico en un solo plato: piangua, camarón titi y tollo, unidos en una explosión de sabores marinos que cuenta la riqueza de la cocina de la región.", price: 42000, images: dishImages("plato-triple") },
        { name: "Encocado de Jaiba", desc: "Jaiba, sancocho, tostada, arroz, ensalada, limonada", modalDesc: "Jaiba fresca bañada en una cremosa salsa de coco que envuelve cada pedazo con dulzura y sabor a mar. Uno de los platos más queridos de la cocina del Pacífico colombiano.", price: 40000, images: dishImages("encocado-jaiba") },
        { name: "Encocado de Langosta", desc: "Langosta, sancocho, tostada, arroz, ensalada, limonada", modalDesc: "Langosta bañada en salsa de coco, cremosa y aromática, un plato de fiesta que celebra lo mejor del mar Pacífico en cada cucharada.", price: 40000, images: dishImages("encocado-langosta", 2) }
      ]
    },
    {
      id: "viudos",
      name: "Viudos",
      icon: "leaf",
      items: [
        { name: "Viudo de Bocachico", desc: "Bocachico con plátano, yuca y papa, ensalada, arroz, limonada", modalDesc: "Bocachico envuelto en hoja de plátano junto a yuca y papa, cocido al vapor para conservar todo su sabor natural. Una receta ancestral que se sirve como se ha servido por generaciones.", price: 35000, images: dishImages("viudo-bocachico", 2) },
        { name: "Viudo de Pelada", desc: "Pelada con plátano, yuca y papa, ensalada, arroz, limonada", modalDesc: "Pescado pelada cocido suavemente envuelto en hoja de plátano con yuca y papa, un plato reconfortante que guarda el sabor puro del río y la montaña.", price: 37000, images: dishImages("viudo-pelada", 2) }
      ]
    },
    {
      id: "carta",
      name: "Platos a la Carta",
      icon: "plate",
      items: [
        { name: "Súper Tostón", desc: "Pollo, carne, queso, chicharrón, salsas", modalDesc: "Un tostón gigante coronado con pollo, carne, queso derretido y chicharrón crocante, bañado en salsas caseras. Una fiesta de sabores y texturas en un solo bocado.", price: 22000, images: dishImages("super-toston", 2) },
        { name: "Camarón Tigre Apanado", desc: "Sancocho, porción de camarón, tostada, ensalada, arroz, limonada", modalDesc: "Camarones tigre grandes, apanados y fritos hasta quedar dorados y crujientes por fuera, jugosos por dentro. Un capricho irresistible del mar.", price: 32000, images: dishImages("camaron-tigre-apanado", 2) }
      ]
    },
    {
      id: "dia",
      name: "Plato del Día",
      icon: "star",
      items: [
        { name: "Costilla a la BBQ", desc: "Sancocho de pescado, arroz, costilla, porción, ensalada, limonada", modalDesc: "Costilla tierna bañada en salsa BBQ dulce y ahumada, acompañada de un sancocho de pescado que equilibra cada bocado con sabor casero.", price: 15000, images: dishImages("costilla-bbq", 2) },
        { name: "Sancocho de Gallina", desc: "Sancocho, presa, agua de panela, arroz, ensalada, limonada", modalDesc: "Un sancocho tradicional con presa de gallina, cocido a fuego lento con yuca, plátano y las especias de siempre. El plato que reúne a la familia alrededor de la mesa.", price: 21000, images: dishImages("sancocho-gallina", 2) }
      ]
    },
    {
      id: "fritanga",
      name: "Fritanga",
      icon: "fry",
      items: [
        { name: "Tostadas con Tollo", modalDesc: "Tostadas de plátano crocantes coronadas con tollo desmechado y sazonado, un bocado callejero lleno de sabor del Pacífico.", price: 12000, images: dishImages("tostadas-tollo", 2) },
        { name: "Papa Rellena", modalDesc: "Papa rellena dorada y crocante por fuera, con un relleno jugoso de carne sazonada en su interior. El antojo perfecto para cualquier momento.", price: 5000, images: dishImages("papa-rellena", 2) },
        { name: "Empanadas de Camarón", modalDesc: "Empanadas doradas y crujientes rellenas de camarón sazonado, un bocado que estalla en sabor con cada mordisco.", price: 5000, images: dishImages("empanadas-camaron", 2) },
        { name: "Papa Aborrajada con Salchichón", modalDesc: "Papa envuelta en masa dorada, rellena de salchichón y queso derretido. Un antojo callejero irresistible, crocante por fuera y goloso por dentro.", price: 3000, images: dishImages("papa-aborrajada", 2) }
      ]
    },
    {
      id: "especiales",
      name: "Especiales Dulces",
      icon: "dessert",
      items: [
        { name: "Torta de Chontaduro", modalDesc: "Torta húmeda hecha con chontaduro, el fruto de palma típico del Pacífico, con un sabor único entre dulce y terroso que no encontrarás en ningún otro postre.", priceLabel: "$7.000 y $5.000", images: dishImages("torta-chontaduro", 2) },
        { name: "Torta de Coco", modalDesc: "Torta esponjosa de coco, dulce y aromática, cubierta con coco rallado tostado. El postre que cierra con broche de oro cualquier comida del Pacífico.", price: 7000, images: dishImages("torta-coco", 2) },
        { name: "Helado de Naidí", modalDesc: "Helado artesanal hecho con naidí, el fruto morado de los manglares, de sabor intenso y refrescante. Una joya poco conocida de la selva pacífica.", price: 8000, images: dishImages("helado-naidi", 2) },
        { name: "Helado de Coco", modalDesc: "Helado cremoso de coco natural, servido en su propia cáscara. Fresco, dulce y tropical, el final perfecto para un día de Kermes.", price: 7000, images: dishImages("helado-coco", 2) }
      ]
    }
  ],

  porciones: [
    { name: "Arroz Blanco", price: 4000 },
    { name: "Arroz con Coco", price: 5000 },
    { name: "Arroz con Pollo", price: 12000 },
    { name: "Bocachico Frito", price: 20000 },
    { name: "Camarón Tigre apanado o sudado", price: 20000 },
    { name: "Camarón Titi sudado", price: 15000 },
    { name: "Jaiba", price: 32000 },
    { name: "Pelada Frita", price: 23000 },
    { name: "Presa de costilla y pollo", price: 10000 },
    { name: "Sancocho de Gallina con presa", price: 13000 },
    { name: "Sancocho de pescado con presa", price: 8000 },
    { name: "Sancochos sin presa", price: 6500 },
    { name: "Tilapia", price: 20000 },
    { name: "Tollo", price: 17000 },
    { name: "Viudo de Bocachico", price: 24000 },
    { name: "Viudo de Pelada", price: 25000 }
  ]
};
