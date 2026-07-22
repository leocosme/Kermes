// Carga categorías y productos en vivo desde Firestore y arranca la app del menú.
// Si Firestore falla por cualquier razón, se sigue usando MENU_DATA.categories/porciones
// tal como vienen de menu-data.js (respaldo estático), sin romper el sitio.
import { firebaseConfig } from "./firebase-config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const ICONS = {
  arroces: "rice",
  "pescados-fritos": "fish",
  seviches: "shrimp",
  sudados: "pot",
  viudos: "leaf",
  "platos-a-la-carta": "plate",
  "plato-del-dia": "star",
  fritanga: "fry",
  especiales: "dessert",
};

const PLACEHOLDER_IMG = "images/placeholder-dish.svg";

async function loadMenuFromFirestore() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const catsSnap = await getDocs(query(collection(db, "categorias"), where("visible", "==", true)));
  const categorias = catsSnap.docs
    .map((d) => ({ id: d.id, ...d.data() }))
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  const prodsSnap = await getDocs(query(collection(db, "productos"), where("visible", "==", true)));
  const productos = prodsSnap.docs
    .map((d) => d.data())
    .filter((p) => p.disponible)
    .sort((a, b) => (a.orden || 0) - (b.orden || 0));

  const categories = categorias
    .filter((cat) => cat.id !== "porciones")
    .map((cat) => ({
      id: cat.id,
      name: cat.nombre,
      icon: ICONS[cat.id] || "plate",
      items: productos
        .filter((p) => p.categoriaid === cat.id)
        .map((p) => ({
          name: p.nombre,
          desc: p.descripcion || "",
          modalDesc: p.descripcionLarga || p.descripcion || "",
          price: p.precio,
          priceLabel: p.etiquetaPrecio || undefined,
          images: p.imagenes && p.imagenes.length ? p.imagenes : [PLACEHOLDER_IMG],
        })),
    }))
    .filter((cat) => cat.items.length > 0);

  const porciones = productos
    .filter((p) => p.categoriaid === "porciones")
    .map((p) => ({
      name: p.nombre,
      price: p.precio,
      image: p.imagenes && p.imagenes[0] ? p.imagenes[0] : null,
    }));

  return { categories, porciones };
}

async function boot() {
  // Pintado instantáneo con el respaldo estático de menu-data.js — no se espera a la red.
  window.__initMenuApp();

  try {
    const { categories, porciones } = await loadMenuFromFirestore();
    if (categories.length) {
      window.MENU_DATA.categories = categories;
      window.MENU_DATA.porciones = porciones;
      window.__refreshMenuData();
    } else {
      console.warn("Firestore devolvió el menú vacío; se mantiene el respaldo estático de menu-data.js.");
    }
  } catch (err) {
    console.error("No se pudo actualizar el menú desde Firestore; se mantiene el respaldo estático:", err);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
