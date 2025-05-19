import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsStart, fetchProductsSuccess, fetchProductsFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure } from '../store/productSlice';
import { getProducts, deleteProduct } from '../services/mockData';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, Button, Alert, Spinner } from 'react-bootstrap';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.product);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchProductsStart());
    try {
      // Utilisation des données mockées pour simuler la récupération des produits
      const productsData = getProducts();
      dispatch(fetchProductsSuccess(productsData));
    } catch (error) {
      dispatch(fetchProductsFailure(error.message || 'Erreur lors de la récupération des produits'));
    }
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch(deleteProductStart());
      try {
        // Utilisation des données mockées pour simuler la suppression
        const deleted = deleteProduct(id);
        if (deleted) {
          dispatch(deleteProductSuccess(id));
        } else {
          dispatch(deleteProductFailure('Produit non trouvé'));
        }
      } catch (error) {
        dispatch(deleteProductFailure(error.message || 'Erreur lors de la suppression'));
      }
    }
  };

  const canEdit = (productUserId) => {
    return user && (user.roles.includes('ROLE_ADMIN') || user.id === productUserId);
  };

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Chargement...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h2>Liste des Produits</h2>
        </Col>
        <Col className="text-end">
          <Link to="/products/new" className="btn btn-primary">
            Ajouter un produit
          </Link>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {products.length === 0 ? (
        <Alert variant="info">Aucun produit disponible.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</td>
                <td>{product.price.toFixed(2)} €</td>
                <td>
                  <Link to={`/products/${product.id}`} className="btn btn-info btn-sm me-2">
                    Voir
                  </Link>
                  {canEdit(product.createdBy) && (
                    <>
                      <Link to={`/products/edit/${product.id}`} className="btn btn-warning btn-sm me-2">
                        Modifier
                      </Link>
                      <Button 
                        variant="danger" 
                        size="sm" 
                        onClick={() => handleDelete(product.id)}
                      >
                        Supprimer
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProductList;
