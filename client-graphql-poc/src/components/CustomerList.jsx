import React from "react";
import { useQuery, gql } from "@apollo/client";

const CUSTOMERS_QUERY = gql`
  query GetCustomers {
    customers {
      id
      email
      mobileNumber
    }
  }
`;

const CustomerList = ({ setSelectedCustomer, deleteCustomer }) => {
  const { loading, error, data } = useQuery(CUSTOMERS_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <div></div>
      <h2>Customer List</h2>
      <table border={1}>
        <thead>
          <tr>
            <td>Sl</td>
            <td>Email</td>
            <td>Mobile Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.customers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.email}</td>
              <td>{customer.mobileNumber}</td>
              <td>
                <center>
                  <button onClick={() => setSelectedCustomer(customer)}>
                    Edit
                  </button>
                  <br />
                  <button onClick={(e) => deleteCustomer(e, customer.id)}>
                    Delete
                  </button>
                </center>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot></tfoot>
      </table>
    </div>
  );
};

export default CustomerList;
