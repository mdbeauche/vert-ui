import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';

export interface SearchState {
  pending: boolean;
  error: boolean;
  errorMessage: string;
  term: string;
  data: SearchResult[];
}

const initialState: SearchState = {
  pending: false,
  error: false,
  errorMessage: '',
  term: '',
  data: [] as SearchResult[],
};

interface SearchResult {
  title: string;
  photo: string;
  shortDescription: string;
  description: string;
}

// interface SearchResultResponse {
//   data: SearchResult[];
// }

const apiSearch = createAsyncThunk('search/search', async ({ term }: { term: string }) => {
  const response = await axios({
    method: 'post',
    url: `${config.SERVER_URI}:${config.SERVER_PORT}/search`,
    data: {
      term,
    },
  });

  if (response.status === 200 && response.data) {
    return response.data;
  }

  throw new Error(`API error: ${response.data}`);
});

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    clearSearch(state) {
      state.pending = false;
      state.error = false;
      state.errorMessage = '';
      state.term = '';
      state.data = [] as SearchResult[];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiSearch.pending, (state) => {
      state.pending = true;
    });
    builder.addCase(apiSearch.fulfilled, (state, action: PayloadAction<object>) => {
      state.data = action.payload as SearchResult[];
      state.pending = false;
    });
    builder.addCase(apiSearch.rejected, (state, action) => {
      state.error = true;
      state.errorMessage = `${action.error.message}`;
      state.pending = false;
    });
  },
});

export { apiSearch };
export const { clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
