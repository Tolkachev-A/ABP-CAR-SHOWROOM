export type FormErrors = {
  name?: string;
  comment?: string;
};

export type ValidationRules = {
  name: {
    required: boolean;
    maxLength: number;
  };
  comment: {
    required: boolean;
    maxLength: number;
  };
};