import { Card, Col, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';
import loginImg from '../../img/login.png';

const LoginCard = () => {
  const { t } = useTranslation();

  return (
    <Col xs={12} md={8} xxl={6}>
      <Card className="shadow-sm">
        <Card.Body className="row p-5">
          <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
            <Image className="rounded-circle" with={200} height={200} alt={t('loginTitle')} src={loginImg} />
          </Col>
          <LoginForm />
        </Card.Body>
        <LoginFooter />
      </Card>
    </Col>
  );
};

export default LoginCard;
