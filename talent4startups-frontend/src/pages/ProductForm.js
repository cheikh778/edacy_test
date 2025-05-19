import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductStart, fetchProductSuccess, fetchProductFailure, updateProductStart, updateProductSuccess, updateProductFailure, createProductStart, createProductSuccess, createProductFailure } from '../store/productSlice';
import { getProduct, createProduct, updateProduct } from '../services/mockData';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const ProductForm = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { product, loading, error } = useSelector(state => state.product);
  const { user } = useSelector(state => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: ''
  });
  const [validated, setValidated] = useState(false);
  
  useEffect(() => {
    if (isEditMode) {
      dispatch(fetchProductStart());
      try {
        // Utilisation des données mockées pour simuler la récupération d'un produit
        const productData = getProduct(parseInt(id));
        if (productData) {
          dispatch(fetchProductSuccess(productData));
          setFormData({
            name: productData.name,
            description: productData.description,
            price: productData.price,
            imageUrl: productData.imageUrl
          });
        } else {
          dispatch(fetchProductFailure('Produit non trouvé'));
          navigate('/products');
        }
      } catch (error) {
        dispatch(fetchProductFailure(error.message || 'Erreur lors de la récupération du produit'));
      }
    }
  }, [dispatch, id, isEditMode, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? (value === '' ? '' : parseFloat(value)) : value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }
    
    setValidated(true);
    
    if (isEditMode) {
      dispatch(updateProductStart());
      try {
        // Utilisation des données mockées pour simuler la mise à jour
        const updated = updateProduct(parseInt(id), formData);
        if (updated) {
          dispatch(updateProductSuccess(updated));
          navigate('/products');
        } else {
          dispatch(updateProductFailure('Erreur lors de la mise à jour du produit'));
        }
      } catch (error) {
        dispatch(updateProductFailure(error.message || 'Erreur lors de la mise à jour'));
      }
    } else {
      dispatch(createProductStart());
      try {
        // Utilisation des données mockées pour simuler la création
        const created = createProduct(formData, user.id);
        if (created) {
          dispatch(createProductSuccess(created));
          navigate('/products');
        } else {
          dispatch(createProductFailure('Erreur lors de la création du produit'));
        }
      } catch (error) {
        dispatch(createProductFailure(error.message || 'Erreur lors de la création'));
      }
    }
  };
  
  // Vérifier si l'utilisateur a le droit de modifier ce produit
  useEffect(() => {
    if (isEditMode && product && user) {
      const canEdit = user.roles.includes('ROLE_ADMIN') || user.id === product.createdBy;
      if (!canEdit) {
        navigate('/products');
      }
    }
  }, [isEditMode, product, user, navigate]);
  
  if (isEditMode && loading) {
    return <Container className="mt-5 text-center">Chargement...</Container>;
  }
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0">{isEditMode ? 'Modifier le produit' : 'Ajouter un produit'}</h3>
            </div>
            <div className="card-body">
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Nom du produit</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Entrez le nom du produit"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Le nom du produit est requis.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    placeholder="Entrez la description du produit"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formPrice">
                  <Form.Label>Prix (€)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    name="price"
                    placeholder="Entrez le prix du produit"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Le prix du produit est requis et doit être positif.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formImageUrl">
                  <Form.Label>URL de l'image</Form.Label>
                  <Form.Control
                    type="url"
                    name="imageUrl"
                    placeholder="Entrez l'URL de l'image du produit"
                    value={formData.imageUrl}
                    onChange={handleChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez entrer une URL valide.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="d-flex justify-content-between">
                  <Button 
                    variant="secondary" 
                    onClick={() => navigate('/products')}
                  >
                    Annuler
                  </Button>
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Enregistrement...' : (isEditMode ? 'Mettre à jour' : 'Créer')}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductForm;
