import * as React from 'react';
import * as style from './style.css';
import * as classNames from 'classnames';
import { ImageModel } from 'app/models';

export namespace ImageItem {
  export interface Props {
    image: ImageModel;
  }

  export interface State {
    fullScreen: boolean;
  }
}

export class ImageItem extends React.Component<ImageItem.Props, ImageItem.State> {
  constructor(props: ImageItem.Props, context?: any) {
    super(props, context);
    this.state = { fullScreen: false };
  }

  handleClick() {
    this.setState({ fullScreen: !this.state.fullScreen });
  }

  render() {
    const { image } = this.props;
    const url = image.images[this.state.fullScreen ? 'original' : 'fixed_width_small_still']['url'].replace('media0', 'i');
    const classes = classNames({
      [style.imageContainer]: true,
      [style.fullScreen]: this.state.fullScreen,
    });

    return (
      <div className={classes} onClick={this.handleClick.bind(this)}>
        <figure>
          <img src={url} alt={image.slug} title={image.title} onClick={this.handleClick.bind(this)}/>
          <figcaption>
            here the footer
          </figcaption>
        </figure>
      </div>
    )
  }
}
