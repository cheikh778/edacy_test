import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchProductStart, fetchProductSuccess, fetchProductFailure, deleteProductStart, deleteProductSuccess, deleteProductFailure } from '../store/productSlice';
import { getProduct, deleteProduct } from '../services/mockData';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, loading, error } = useSelector(state => state.product);
  const { user } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchProductStart());
    try {
      // Utilisation des données mockées pour simuler la récupération d'un produit
      const productData = getProduct(parseInt(id));
      if (productData) {
        dispatch(fetchProductSuccess(productData));
      } else {
        dispatch(fetchProductFailure('Produit non trouvé'));
        navigate('/products');
      }
    } catch (error) {
      dispatch(fetchProductFailure(error.message || 'Erreur lors de la récupération du produit'));
    }
  }, [dispatch, id, navigate]);
  
  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      dispatch(deleteProductStart());
      try {
        // Utilisation des données mockées pour simuler la suppression
        const deleted = deleteProduct(parseInt(id));
        if (deleted) {
          dispatch(deleteProductSuccess(parseInt(id)));
          navigate('/products');
        } else {
          dispatch(deleteProductFailure('Produit non trouvé'));
        }
      } catch (error) {
        dispatch(deleteProductFailure(error.message || 'Erreur lors de la suppression'));
      }
    }
  };
  
  const canEdit = () => {
    return user && product && (user.roles.includes('ROLE_ADMIN') || user.id === product.createdBy);
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
  
  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Produit non trouvé</Alert>
        <Button variant="primary" onClick={() => navigate('/products')}>
          Retour à la liste
        </Button>
      </Container>
    );
  }
  
  return (
    <Container className="mt-5">
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Card>
        <Row className="g-0">
          <Col md={4}>
            <Card.Img 
              src={product.imageUrl} 
              alt={product.name} 
              className="img-fluid rounded-start"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <Card.Body>
              <Card.Title as="h2">{product.name}</Card.Title>
              <Card.Text className="fs-4 text-primary mb-4">
                {product.price.toFixed(2)} €
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text className="text-muted">
                <small>Créé le: {new Date(product.createdAt).toLocaleDateString()}</small>
                <br />
                <small>Dernière mise à jour: {new Date(product.updatedAt).toLocaleDateString()}</small>
              </Card.Text>
              
              <div className="d-flex mt-4">
                <Button 
                  variant="secondary" 
                  onClick={() => navigate('/products')}
                  className="me-2"
                >
                  Retour à la liste
                </Button>
                
                {canEdit() && (
                  <>
                    <Link 
                      to={`/products/edit/${product.id}`} 
                      className="btn btn-warning me-2"
                    >
                      Modifier
                    </Link>
                    <Button 
                      variant="danger" 
                      onClick={handleDelete}
                    >
                      Supprimer
                    </Button>
                  </>
                )}
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default ProductDetail;
