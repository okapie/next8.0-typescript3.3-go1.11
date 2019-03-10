import React from "react";

export interface InputProps {
  value: string;
}

export interface ButtonProps {
  value: string;
  onClick: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface ItemFormProps {
  value: {
    id: number;
    item: string;
  }
  onChange: (id: number) => void;
}

export interface PageProps {
  linkTo: string;
  NavigateTo: string;
  title: string;
  error?: string;
}
