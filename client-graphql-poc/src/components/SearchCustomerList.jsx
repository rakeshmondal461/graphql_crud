import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

const SEARCH_QUERY = gql`
  query Search($query: String!) {
    searchCustomers(name: $query) {
      id
      name
      email
      mobileNumber
    }
  }
`;

const SearchCustomerList = ({
  setSelectedCustomer,
  deleteCustomer,
  searchName,
}) => {
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { query: searchName },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Customer List</h2>

      <br />
      <table border={1}>
        <thead>
          <tr>
            <td>Sl</td>
            <td>Email</td>
            <td>Name</td>
            <td>Mobile Number</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {data.searchCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{customer.email}</td>
              <td>{customer.name}</td>
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

export default SearchCustomerList;
