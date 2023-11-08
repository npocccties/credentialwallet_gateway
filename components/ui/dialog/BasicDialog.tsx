import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import React, { MutableRefObject } from "react";

type Props = {
  title: string;
  message?: string;
  okButtonrText: string;
  closeButtontText?: string;
  okButtonColor?: "red" | "blue" | "teal" | "gray";
  isOpen: boolean;
  onClose: () => void;
  cancelRef: MutableRefObject<HTMLButtonElement>;
  handleOkClick: () => void;
};

export const BasicDialog = ({
  title,
  message,
  closeButtontText,
  okButtonrText,
  isOpen,
  onClose,
  cancelRef,
  handleOkClick,
  okButtonColor,
}: Props) => {
  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            {closeButtontText && (
              <Button ref={cancelRef} onClick={onClose}>
                {closeButtontText}
              </Button>
            )}
            <Button
              ml={3}
              colorScheme={okButtonColor}
              onClick={() => {
                handleOkClick();
              }}
            >
              {okButtonrText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
