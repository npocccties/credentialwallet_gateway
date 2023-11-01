import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useRef, useState } from "react";

import { axiosClient } from "@/lib/axios";

type Props = {
  children: ReactNode;
};

export const AxiosErrorHandling = (props: Props) => {
  const { children } = props;
  const [unexpectedError, setUnexpectedError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [clientReqestError, setClientReqestError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const responseInterceptor = axiosClient.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: AxiosError) => {
        switch (error.response?.status) {
          //TODO: 未実装 401 UnAuthrized
          case 401:
            setErrorMessage(error.message);
            return Promise.reject(error.response?.data);
          case 400:
            setClientReqestError(true);
            setErrorMessage(error.response?.data?.message);
            return Promise.reject(error.response?.data);
          case 500:
            setServerError(true);
            setErrorMessage(error.response?.data?.message);
            return Promise.reject(error.response?.data);
          default:
            setUnexpectedError(true);
            setErrorMessage("予期せぬエラーが発生しました。");
            return Promise.reject(error.response?.data);
        }
      },
    );

    return () => {
      axiosClient.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  if (unexpectedError) {
    return (
      <>
        {children}
        <ErrorDialog
          title={"Un Expected Error"}
          message={"予期せぬエラーが発生しました。管理者へお問い合わせください。"}
          detail={errorMessage}
        />
      </>
    );
  } else if (serverError) {
    return (
      <>
        {children}
        <ErrorDialog
          title={"500: Internal Server Error"}
          message={"サーバーサイドの処理中にエラーが発生しました。管理者へお問い合わせください。"}
          detail={errorMessage}
        />
      </>
    );
  } else if (clientReqestError) {
    return (
      <>
        {children}
        <ErrorDialog
          title={"400: Bad Request"}
          message={"リクエスト時のパラメータが不正です。"}
          detail={errorMessage}
        />
      </>
    );
  } else {
    return <>{children}</>;
  }
};

const ErrorDialog = ({ title, message, detail }: { title: string; message: string; detail }) => {
  const router = useRouter();
  const cancelRef = useRef();
  const { onClose } = useDisclosure();
  return (
    <AlertDialog isOpen={true} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="xl" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text fontSize={"lg"} mb={4}>
              {message}
            </Text>
            <Text fontSize={"md"}>詳細: {detail}</Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button
              ml={3}
              colorScheme="red"
              onClick={() => {
                router.reload();
              }}
            >
              戻る
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
