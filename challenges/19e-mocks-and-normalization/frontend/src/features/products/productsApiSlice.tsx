import { createEntityAdapter, createSelector } from '@reduxjs/toolkit';
import { apiSlice } from 'app/api/apiSlice';
import { TRootState } from 'app/store';
import { IProduct } from 'common/types/product.interface';

const productsAdapter = createEntityAdapter<IProduct>();

const initialState = productsAdapter.getInitialState();

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    list: builder.query({
      transformResponse: (responseData) => {
        // @ts-ignore
        return productsAdapter.setAll(initialState, responseData);
      },
      query: () => '/products',
      //providesTags: (result, error, arg) => [
      //...result.ids.map((id: string) => ({ type: 'Product', id })),
      //{ type: 'Product', id: 'LIST' },
      //],
    }),
  }),
});

export const { useListQuery } = productApiSlice;

// returns the query result object
// @ts-ignore
export const selectProductsResult = productApiSlice.endpoints.list.select();

// Creates memoized selector
const selectProductsData = createSelector(
  selectProductsResult,
  (productsResult) => productsResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  // Pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(
  (state: TRootState) => selectProductsData(state) ?? initialState
);
