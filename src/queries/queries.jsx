import {gql} from '@apollo/client'

export const categories = gql`
    query {categories {
        name
        }
    }`

export const categoryItems = gql`
        query($title: String!){
          category(input: {title: $title}){
          name
            products{
              id
              brand
              name
              inStock
              gallery
              attributes {
      id
      type
      items{
        id
        value
      }
    }
              prices {
                currency {
                   label
                   symbol
                }
                amount
              }
            }
          }
        }`

export const currencyList = gql`
    query {currencies
    {
    label
    symbol 
    }}`

export const product = gql`
query($prodId: String!){
  product(id: $prodId){
    id
    name
    brand
    inStock
    gallery
    description
    attributes {
      id
      type
      items{
        id
        value
      }
    }
    prices {
    currency {
      label
      symbol
    }
  amount
   }
  }
}`