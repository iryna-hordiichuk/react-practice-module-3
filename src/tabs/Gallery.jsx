import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    isLoading: false,
    isShown: false,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImagesGallery(query, page);
    }
  }

  handleForm = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
      isShown: false,
      isEmpty: false,
    });
  };

  getImagesGallery = async (query, page) => {
    if (!query) {
      return;
    }
    this.setState({ isLoading: true });
    try {
      const images = await ImageService.getImages(query, page);
      if (images.photos.length === 0) {
        this.setState({ isEmpty: true });
      }
      this.setState(prevState => ({
        images: [...prevState.images, ...images.photos],
        isShown: prevState.page < Math.ceil(images.total_results / 15),
      }));
      console.log(Math.ceil(images.total_results / 15));
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  getPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { images } = this.state;
    return (
      <>
        <SearchForm handleForm={this.handleForm} />
        <Grid>
          {images.map(item => (
            <GridItem key={item.id}>
              <CardItem color={item.avg_color}>
                <img src={item.src.large} alt={item.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {this.state.isShown && (
          <Button onClick={this.getPage}>
            {this.state.isLoading ? 'Loading...' : 'Load More'}
          </Button>
        )}
        {this.state.isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
      </>
    );
  }
}
