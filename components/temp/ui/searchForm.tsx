import React from "react";
import { Button, Grid, FormControl, FormLabel, Input, GridItem } from "@chakra-ui/react";
import { UseFormHandleSubmit, UseFormRegister } from "react-hook-form";
import { SearchFormItem } from "../../../types/temp";

type Props = {
  register: UseFormRegister<SearchFormItem>;
  handleSubmit: UseFormHandleSubmit<SearchFormItem, undefined>;
  isSubmitting: boolean;
};
export const SearchForm = ({ register, handleSubmit, isSubmitting }: Props) => {
  const onSubmit = (values) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(JSON.stringify(values, null, 2));
        resolve();
      }, 1000);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <Grid templateColumns={"repeat(2, 1fr)"} gap={8}>
          <GridItem>
            <FormLabel htmlFor="badgeName" mt={4}>
              バッジ名
            </FormLabel>
            <Input id="badgeName" {...register("badgeName")} />
            <FormLabel htmlFor="issueDateTo" mt={4}>
              発行日To
            </FormLabel>
            <Input id="issueDateTo" type="date" {...register("issueDateTo")} />
            <FormLabel htmlFor="issuerName" mt={4}>
              カテゴリ
            </FormLabel>
            <Input id="issuerName" {...register("issuerName")} />
          </GridItem>
          <GridItem>
            <FormLabel htmlFor="issuerName" mt={4}>
              発行者名
            </FormLabel>
            <Input id="issuerName" {...register("issuerName")} />
            <FormLabel htmlFor="issueDateEnd" mt={4}>
              発行日End
            </FormLabel>
            <Input id="issueDateEnd" type="date" {...register("issueDateEnd")} />
          </GridItem>
        </Grid>
      </FormControl>
      <Button colorScheme={"teal"} mt={8} w={24} isLoading={isSubmitting} type="submit">
        検索
      </Button>
    </form>
  );
};
