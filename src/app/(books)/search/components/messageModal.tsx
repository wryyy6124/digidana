"use client";

import {
  Button,
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const MessageModal: React.FC<ModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>登録結果</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{message}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MessageModal;
