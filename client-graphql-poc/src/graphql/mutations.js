import { gql } from "@apollo/client";
export const ADD_CUSTOMER_MUTATION = gql`
  mutation CreateCustomer($createCustomerInput: createCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      email
      mobileNumber
    }
  }
`;

export const UPDATE_CUSTOMER_MUTATION = gql`
  mutation UpdateCustomer($updateCustomerInput: UpdateCustomerInput!) {
    updateCustomer(updateCustomerInput: $updateCustomerInput) {
      email
      id
      mobileNumber
    }
  }
`;

export const DELETE_CUSTOMER_MUTATION = gql`
  mutation RemoveCustomer($id: Int!) {
    removeCustomer(id: $id) {
      id
    }
  }
`;
