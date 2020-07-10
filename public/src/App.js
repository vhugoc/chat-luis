import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Input, ListGroup, ListGroupItem } from 'reactstrap';
import { FaChevronLeft } from 'react-icons/fa';
import ScrollToBottom from 'react-scroll-to-bottom';
import moment from 'moment';
import 'moment/locale/pt-br';

import Message from './components/Message'
import ProductList from './components/ProductList';

import './App.css';

import axios from 'axios';

function App() {

  const [inputMessage, setInputMessage] = useState();
  const [messages, setMessages] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState();
  const [updatedMoment, setUpdatedMoment] = useState();

  useEffect(() => {
    axios.get('http://localhost:3030/messages').then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:3030/orders').then((response) => {
      setOrders(response.data);
    });
  }, [updatedMoment])

  /** Handle input message */
  const handleInputMessage = e => {
    setInputMessage(e.target.value);
  }

  /** Handle submit message */
  const handleSubmit = async (e) => {
    e.preventDefault(false);
    setInputMessage('');

    setMessages(messages => [...messages, { value: inputMessage, from: "me" }]);
    await axios.post('http://localhost:3030/messages', { value: inputMessage, from: "me" });

    const luis = await axios.get(`https://westus.api.cognitive.microsoft.com/luis/prediction/v3.0/apps/23018091-b71f-42fb-8906-937e0adaf2f9/slots/staging/predict?subscription-key=9438e5ac59704f6798556382efdcf87a&query=${inputMessage}`);
    const intent = luis.data.prediction.topIntent;

    setMessages(messages => [...messages, { value: intent, from: "bot" }]);
    await axios.post('http://localhost:3030/messages', { value: intent, from: "bot" });

    activateLuisAction(intent, luis.data.prediction.entities.product);

  }

  /** Switch LUIS action */
  const activateLuisAction = async (event, products = null) => {
    switch (event) {
      case 'AddProductToCart':
        if (products) {
          products.map((product) => {
            setProductCart(productCart => [...productCart, { quantity: product.quantity[0], name: product.name[0] }]);
          });
        }
        break;
        
      case 'FinishOrder':
        await axios.post('http://localhost:3030/orders', { products: productCart });
        setUpdatedMoment(moment());
        setProductCart([]);
        break;

      case 'CancelOrder':
        await axios.delete(`http://localhost:3030/orders/cancel`);
        setUpdatedMoment(moment());
        break;
      default:
        return null;
    }
  }

  /** Handle click event on order */
  const handleClickOrder = id => {
    setSelectedOrder(id);
    axios.get(`http://localhost:3030/orders/${id}`).then((response) => {
      setProducts(response.data.products);
    });
  }

  /** Handle double click on order to set status */
  const handleDoubleClickorder = async (id) => {
    setSelectedOrder(id);
    await axios.put(`http://localhost:3030/orders/${id}/confirmed`);
    setUpdatedMoment(moment());
  }

  return (
    <Container fluid>
      <Row>
        <Col md="4">
          <div className="chat">
            <div className="navbar">
              <span><FaChevronLeft className="mr-4" />Conversa com <strong>Victor Hugo</strong></span>
            </div>
            <ScrollToBottom className="messages-container">
              {messages.map((message) => (
                <Message key={message._id} value={message.value} from={message.from} />
              ))}
            </ScrollToBottom>
            <div className="input-container">
              <form onSubmit={handleSubmit}>
                <Input className="form-control" type="text" placeholder="Digite alguma cosia aqui..." value={inputMessage} onChange={handleInputMessage} />
              </form>
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className="order">
            <div className="navbar">
              <h3>Histórico de Pedidos</h3>
            </div>
            <div className="order-content">
              <ListGroup>
                { orders.length < 1
                  ? <ListGroupItem className="no-orders">Nenhum pedido até agora</ListGroupItem>
                  : orders.map((order) => (

                    order._id === selectedOrder
                    ?
                    <ListGroupItem key={order._id} className="order selected" onClick={() => handleClickOrder(order._id) } onDoubleClick={() => handleDoubleClickorder(order._id)}>
                      <span className="order-info">Pedido código {order._id}</span>
                      { order.status === "waiting" ? <span className="order-status text-warning">Aguardando Confirmação</span> : <span className="order-status text-success">Confirmado</span> }
                      <span className="order-date">{moment(order.createdAt).locale('pt-br').fromNow()}</span>
                    </ListGroupItem>

                    :
                    <ListGroupItem key={order._id} className="order" onClick={() => handleClickOrder(order._id) }>
                      <span className="order-info">Pedido código {order._id}</span>
                      { order.status === "waiting" ? <span className="order-status text-warning">Aguardando Confirmação</span> : <span className="order-status text-success">Confirmado</span> }
                      <span className="order-date">{moment(order.createdAt).locale('pt-br').fromNow()}</span>
                    </ListGroupItem>

                  ))
                }
              </ListGroup>
            </div>
          </div>
        </Col>
        <Col md="4">
          <div className="products">
            <div className="navbar">
              <h3>Produtos</h3>
            </div>
            {selectedOrder
             ? <ProductList products={products} />
             : <h5 class = "no-order-selected">Nenhum pedido selecionado</h5>
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
