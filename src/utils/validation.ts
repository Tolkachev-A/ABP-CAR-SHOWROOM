import type { FormErrors, ValidationRules } from '@/types/validation';

export const DEFAULT_REVIEW_RULES: ValidationRules = {
  name: {
    required: true,
    maxLength: 50,
  },
  comment: {
    required: true,
    maxLength: 300,
  },
};

export const validateReviewForm = (
  name: string,
  comment: string,
  rules: ValidationRules = DEFAULT_REVIEW_RULES
): FormErrors | null => {
  let validationErrors: FormErrors | null = null;

  if (rules.name.required && !name.trim()) {
    validationErrors = { name: 'Name is required' };
  } else if (name.length > rules.name.maxLength) {
    validationErrors = {
      name: `Name must be ${rules.name.maxLength} characters or less`,
    };
  }
  if (rules.comment.required && !comment.trim()) {
    validationErrors = { ...validationErrors, comment: 'Comment is required' };
  } else if (comment.length > rules.comment.maxLength) {
    validationErrors = {
      ...validationErrors,
      comment: `Comment must be ${rules.comment.maxLength} characters or less`,
    };
  }
  return validationErrors;
};
