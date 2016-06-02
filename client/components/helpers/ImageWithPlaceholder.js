import React from 'react';

class ImageWithPlaceholder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: './assets/image-loading.gif'
    };
  }

  handleImageLoaded() {
    this.setState({ src: this.props.src });
  }

  handleImageErrored() {
    //TODO: set state to image failed to load image
  }

  render() {
    return (
      <div>
        <img
          src={this.state.src}
          onLoad={this.handleImageLoaded.bind(this)}
          onError={this.handleImageErrored.bind(this)}
          />
      </div>
    );
  }
}
export default ImageWithPlaceholder;
