import { ChangeEvent, FormEvent, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Jumbotron,
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
} from "reactstrap";

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [budget, setBudget] = useState({
    name: "",
    email: "",
    phone: "",
    whatsApp: "",
    msg: "",
  });

  const [response, setResponse] = useState({
    formSave: false,
    type: "",
    message: "",
  });

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setBudget({ ...budget, [event.target.name]: event.target.value });
  }

  async function sendBudget(event: FormEvent) {
    event.preventDefault();

    setResponse({
      formSave: true,
      type: "success",
      message: "Enviando Formulário",
    });

    try {
      const response = await fetch("http://localhost:3333/budget", {
        method: "POST",
        body: JSON.stringify(budget),
        headers: { "Content-Type": "application/json" },
      });

      const responseJson = await response.json();
      const responseMessage = responseJson.message.includes("Budget validation failed");

      if (responseMessage) {
        setResponse({
          formSave: false,
          type: "error",
          message: responseJson.message,
        });
      } else {
        setResponse({
          formSave: false,
          type: "success",
          message: responseJson.message,
        });
      }
    } catch (err) {
      setResponse({
        formSave: false,
        type: "error",
        message: "Erro: Solicitação de orçamento não enviada, tente mais tarde!",
      });
    }
  }

  return (
    <div className="divheight">
      <style>
        {`.divheight{
          height: 100vh;
        }`}
      </style>

      <Navbar color="dark" dark expand="md">
        <Container>
          <NavbarBrand href="/">Home</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/budget">Budget</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>

      <Jumbotron className="budget">
        <style>
          {`.budget {
            height: 100%;
            margin-bottom: 0 !important;
          }`}
        </style>

        <Container>
          <h1 className="display-4 text-center">Nossos consultores estão prontos para lhe ajudar!</h1>
          <p className="lead text-center mb-4">
            Deixe seus contatos abaixo que retornaremos com uma proposta específica para sua necessidade.
          </p>

          {response.type === "error" ? <Alert color="danger">{response.message}</Alert> : ""}
          {response.type === "success" ? <Alert color="success">{response.message}</Alert> : ""}

          <Form onSubmit={sendBudget}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Nome</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Preencha com o nome completo"
                    onChange={onChangeInput}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="email">E-mail</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Preencha com o seu melhor"
                    onChange={onChangeInput}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="phone">Telefone</Label>
                  <Input
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="(XX) XXXX-XXXX"
                    onChange={onChangeInput}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="whatsApp">WhatsApp</Label>
                  <Input
                    type="text"
                    name="whatsApp"
                    id="whatsApp"
                    placeholder="(XX) XXXX-XXXX"
                    onChange={onChangeInput}
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="msg">Conteúdo</Label>
              <Input
                type="textarea"
                name="msg"
                id="msg"
                placeholder="Fale um pouco do seu projeto"
                onChange={onChangeInput}
              />
            </FormGroup>

            {response.formSave ? (
              <Button type="submit" outline color="secondary" disabled>
                Enviando...
              </Button>
            ) : (
              <Button type="submit" outline color="dark">
                Enviar
              </Button>
            )}
          </Form>
        </Container>
      </Jumbotron>
    </div>
  );
}

export default Home;
