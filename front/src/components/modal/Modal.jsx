import { motion } from 'framer-motion';
import styled from 'styled-components';

function Modal({ onClose, children }) {
  return(
  <ModalBackground onClick={onClose}>
      <ModalContent 
        onClick={e => e.stopPropagation()} 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </ModalContent>
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled(motion.div)`
  z-index: 5;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%; 
  max-width: 500px; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 15px rgba(0,0,0,0.2);
`;

export default Modal;
