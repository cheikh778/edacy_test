// Données mockées pour le développement front-end

// Utilisateurs mockés
export const users = [
  {
    id: 1,
    email: "admin@example.com",
    password: "password123", // En production, les mots de passe seraient hachés
    roles: ["ROLE_ADMIN", "ROLE_USER"]
  },
  {
    id: 2,
    email: "user@example.com",
    password: "password123",
    roles: ["ROLE_USER"]
  }
];

// Produits mockés
export const products = [
  {
    id: 1,
    name: "Ordinateur portable",
    description: "Ordinateur portable haute performance pour développeurs",
    price: 1299.99,
    imageUrl: "https://via.placeholder.com/300x200?text=Laptop",
    createdAt: "2025-05-15T10:30:00",
    updatedAt: "2025-05-15T10:30:00",
    createdBy: 1
  },
  {
    id: 2,
    name: "Smartphone",
    description: "Smartphone dernière génération avec appareil photo professionnel",
    price: 899.99,
    imageUrl: "https://via.placeholder.com/300x200?text=Smartphone",
    createdAt: "2025-05-16T14:20:00",
    updatedAt: "2025-05-16T14:20:00",
    createdBy: 1
  },
  {
    id: 3,
    name: "Tablette",
    description: "Tablette légère et performante pour la mobilité",
    price: 499.99,
    imageUrl: "https://via.placeholder.com/300x200?text=Tablet",
    createdAt: "2025-05-17T09:15:00",
    updatedAt: "2025-05-17T09:15:00",
    createdBy: 2
  },
  {
    id: 4,
    name: "Écran 4K",
    description: "Écran 4K 32 pouces pour une expérience visuelle immersive",
    price: 349.99,
    imageUrl: "https://via.placeholder.com/300x200?text=Monitor",
    createdAt: "2025-05-18T11:45:00",
    updatedAt: "2025-05-18T11:45:00",
    createdBy: 2
  }
];

// Fonction pour simuler l'authentification
export const authenticate = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return {
      token: "mock-jwt-token-" + user.id,
      user: {
        id: user.id,
        email: user.email,
        roles: user.roles
      }
    };
  }
  return null;
};

// Fonction pour simuler l'enregistrement d'un nouvel utilisateur
export const register = (email, password) => {
  const newId = users.length + 1;
  const newUser = {
    id: newId,
    email,
    password,
    roles: ["ROLE_USER"]
  };
  users.push(newUser);
  return {
    token: "mock-jwt-token-" + newId,
    user: {
      id: newId,
      email,
      roles: ["ROLE_USER"]
    }
  };
};

// Fonctions CRUD pour les produits
export const getProducts = () => {
  return [...products];
};

export const getProduct = (id) => {
  return products.find(p => p.id === id);
};

export const createProduct = (product, userId) => {
  const newId = products.length + 1;
  const now = new Date().toISOString();
  const newProduct = {
    id: newId,
    ...product,
    createdAt: now,
    updatedAt: now,
    createdBy: userId
  };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = (id, updates) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const now = new Date().toISOString();
    products[index] = {
      ...products[index],
      ...updates,
      updatedAt: now
    };
    return products[index];
  }
  return null;
};

export const deleteProduct = (id) => {
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    const deleted = products[index];
    products.splice(index, 1);
    return deleted;
  }
  return null;
};
